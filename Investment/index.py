import pandas as pd
import numpy as np
import yfinance as yf
import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib import rcParams

# 设置中文字体和图表样式
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'Helvetica', 'DejaVu Sans', 'sans-serif']
plt.rcParams['axes.unicode_minus'] = False
sns.set_style("whitegrid")

# 检查并设置图表后端（用于保存图片而不显示）
import matplotlib
matplotlib.use('Agg')  # 使用非交互式后端

# 设置时间范围
start = "2002-01-01"
end = "2020-12-31"

# 下载数据
symbols = {
    "stock": "^GSPC",          # 标普500 (替代沪深300)
    "gold": "GC=F",            # COMEX黄金
    "usdcny": "USDCNY=X",      # 美元兑人民币
}

data = {}
for name, ticker in symbols.items():
    try:
        print(f"正在下载 {name} ({ticker})...")
        df_temp = yf.download(ticker, start=start, end=end)
        if not df_temp.empty:
            # 检查是否有 Adj Close 列
            if "Adj Close" in df_temp.columns:
                data[name] = df_temp["Adj Close"]
                print(f"✓ {name} 数据获取成功，共 {len(df_temp)} 行")
            else:
                # 如果没有 Adj Close，使用 Close
                data[name] = df_temp["Close"]
                print(f"✓ {name} 数据获取成功 (使用Close列)，共 {len(df_temp)} 行")
        else:
            print(f"警告：{name} ({ticker}) 没有数据")
    except Exception as e:
        print(f"下载 {name} ({ticker}) 失败: {e}")

print(f"获取到的数据: {list(data.keys())}")
if not data:
    print("错误：没有获取到任何数据")
    exit(1)

# 检查数据长度
for name, series in data.items():
    print(f"{name}: {len(series)} 行, 起始日期: {series.index[0]}, 结束日期: {series.index[-1]}")

# 使用concat来处理不同长度的序列
df = pd.concat(data, axis=1)
df.columns = list(data.keys())
print(f"数据框形状: {df.shape}")
print(f"缺失值统计:\n{df.isnull().sum()}")

# 删除有缺失值的行
df = df.dropna()
print(f"删除缺失值后数据框形状: {df.shape}")

# 用人民币计价黄金
df["gold_cny"] = df["gold"] * df["usdcny"]

# 计算收益率
returns = pd.DataFrame()
returns["stock"] = df["stock"].pct_change()
returns["gold"] = df["gold_cny"].pct_change()

# 假设10年期国债年化收益 = 平均票息 3%
returns["bond"] = 0.03 / 252  # 日化

# 假设现金年化收益 = 2%
returns["cash"] = 0.02 / 252  # 日化

# 组合收益
weights = {"stock": 0.25, "gold": 0.25, "bond": 0.25, "cash": 0.25}
returns["portfolio"] = (
    returns["stock"] * weights["stock"]
    + returns["gold"] * weights["gold"]
    + returns["bond"] * weights["bond"]
    + returns["cash"] * weights["cash"]
)

# 计算净值
df["portfolio_value"] = (1 + returns["portfolio"]).cumprod()

# 年化收益率
total_return = df["portfolio_value"].iloc[-1] - 1
years = (df.index[-1] - df.index[0]).days / 365
cagr = (df["portfolio_value"].iloc[-1]) ** (1 / years) - 1

# 最大回撤
roll_max = df["portfolio_value"].cummax()
drawdown = df["portfolio_value"] / roll_max - 1
max_drawdown = drawdown.min()

print(f"2002-2020 年化收益率: {cagr:.2%}")
print(f"2002-2020 最大回撤: {max_drawdown:.2%}")

# 创建图表
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Portfolio Analysis Report (2002-2020)', fontsize=16, fontweight='bold')

# 1. 投资组合净值曲线
ax1 = axes[0, 0]
ax1.plot(df.index, df["portfolio_value"], linewidth=2, color='#2E86C1', label='Portfolio Value')
ax1.set_title('Portfolio Value Trend', fontsize=14, fontweight='bold')
ax1.set_xlabel('Time')
ax1.set_ylabel('Value')
ax1.legend()
ax1.grid(True, alpha=0.3)

# 添加关键统计信息到图上
textstr = f'Annual Return: {cagr:.2%}\nMax Drawdown: {max_drawdown:.2%}'
props = dict(boxstyle='round', facecolor='wheat', alpha=0.8)
ax1.text(0.02, 0.98, textstr, transform=ax1.transAxes, fontsize=10,
         verticalalignment='top', bbox=props)

# 2. 各资产收益率对比（累积收益）
ax2 = axes[0, 1]
# 计算各资产的累积收益
stock_cumret = (1 + returns["stock"]).cumprod()
gold_cumret = (1 + returns["gold"]).cumprod()
bond_cumret = (1 + returns["bond"]).cumprod()
cash_cumret = (1 + returns["cash"]).cumprod()

ax2.plot(df.index, stock_cumret, label='Stock (S&P500)', linewidth=2)
ax2.plot(df.index, gold_cumret, label='Gold (CNY)', linewidth=2)
ax2.plot(df.index, bond_cumret, label='Bond (3% annual)', linewidth=2)
ax2.plot(df.index, cash_cumret, label='Cash (2% annual)', linewidth=2)
ax2.plot(df.index, df["portfolio_value"], label='Portfolio', linewidth=3, color='red', linestyle='--')

ax2.set_title('Asset Performance Comparison', fontsize=14, fontweight='bold')
ax2.set_xlabel('Time')
ax2.set_ylabel('Cumulative Return')
ax2.legend()
ax2.grid(True, alpha=0.3)

# 3. 回撤分析
ax3 = axes[1, 0]
ax3.fill_between(df.index, drawdown * 100, 0, alpha=0.3, color='red', label='Drawdown')
ax3.plot(df.index, drawdown * 100, color='darkred', linewidth=1)
ax3.set_title('Portfolio Drawdown Analysis', fontsize=14, fontweight='bold')
ax3.set_xlabel('Time')
ax3.set_ylabel('Drawdown (%)')
ax3.legend()
ax3.grid(True, alpha=0.3)

# 添加最大回撤标注
max_dd_date = drawdown.idxmin()
ax3.annotate(f'Max Drawdown: {max_drawdown:.2%}', 
             xy=(max_dd_date, max_drawdown * 100), 
             xytext=(max_dd_date, max_drawdown * 100 - 5),
             arrowprops=dict(arrowstyle='->', color='red', lw=1.5),
             fontsize=10, ha='center')

# 4. 资产配置饼图
ax4 = axes[1, 1]
labels = ['Stock', 'Gold', 'Bond', 'Cash']
sizes = [weights['stock'], weights['gold'], weights['bond'], weights['cash']]
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
explode = (0.05, 0.05, 0.05, 0.05)

wedges, texts, autotexts = ax4.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%',
                                   explode=explode, shadow=True, startangle=90)
ax4.set_title('Asset Allocation', fontsize=14, fontweight='bold')

# 美化饼图文字
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')

plt.tight_layout()
plt.savefig('portfolio_analysis_report.png', dpi=300, bbox_inches='tight')
# 不使用plt.show()因为使用了Agg后端

print("\n图表已保存为 'portfolio_analysis_report.png'")
