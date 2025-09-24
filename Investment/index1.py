# 编写交易策略
# 每个月1号买入，5号卖出沪深300 指数，其他时间空仓

import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import matplotlib.dates as mdates

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

def download_hs300_data():
    """下载沪深300指数数据"""
    try:
        # 尝试多个数据源
        symbols = ['000300.SS', 'ASHR', 'FXI']  # 沪深300, A股ETF, 中国大盘ETF
        
        for symbol in symbols:
            try:
                print(f"尝试下载 {symbol} 数据...")
                data = yf.download(symbol, start='2012-01-01', end='2022-12-31')
                if not data.empty:
                    print(f"数据下载成功: {symbol}")
                    return data
            except Exception as e:
                print(f"下载 {symbol} 失败: {e}")
                continue
        
        # 如果所有数据源都失败，生成模拟数据
        print("所有数据源都失败，生成模拟数据进行演示...")
        return generate_mock_data()
        
    except Exception as e:
        print(f"数据下载失败: {e}")
        return generate_mock_data()

def generate_mock_data():
    """生成模拟的沪深300指数数据"""
    import random
    
    # 生成日期范围
    date_range = pd.date_range(start='2012-01-01', end='2022-12-31', freq='D')
    # 只保留工作日
    date_range = date_range[date_range.weekday < 5]
    
    # 模拟价格数据
    np.random.seed(42)  # 设置随机种子以确保结果可重现
    
    # 初始价格
    initial_price = 3000
    prices = [initial_price]
    
    # 生成价格序列（随机游走）
    for i in range(1, len(date_range)):
        # 模拟股票价格的随机变动
        daily_return = np.random.normal(0.0005, 0.02)  # 平均日收益率0.05%，波动率2%
        new_price = prices[-1] * (1 + daily_return)
        prices.append(new_price)
    
    # 创建DataFrame
    mock_data = pd.DataFrame({
        'Open': [p * (1 + np.random.normal(0, 0.005)) for p in prices],
        'High': [p * (1 + abs(np.random.normal(0, 0.01))) for p in prices],
        'Low': [p * (1 - abs(np.random.normal(0, 0.01))) for p in prices],
        'Close': prices,
        'Adj Close': prices,
        'Volume': [np.random.randint(1000000, 10000000) for _ in prices]
    }, index=date_range)
    
    print("模拟数据生成完成")
    return mock_data

def create_trading_strategy(data):
    """创建交易策略：每月1号买入，5号卖出，其他时间空仓"""
    if data is None or data.empty:
        return None
    
    # 复制数据
    df = data.copy()
    
    # 确保索引是日期类型，并重置索引
    if not isinstance(df.index, pd.DatetimeIndex):
        df.index = pd.to_datetime(df.index)
    
    df.reset_index(inplace=True)
    
    # 确保Date列存在
    if 'Date' not in df.columns:
        df.rename(columns={df.columns[0]: 'Date'}, inplace=True)
    
    # 计算每日收益率
    df['daily_return'] = df['Adj Close'].pct_change()
    
    # 添加年月列用于分组
    df['year_month'] = df['Date'].dt.to_period('M')
    
    # 初始化交易信号
    df['position'] = 0  # 0表示空仓，1表示满仓
    
    # 按月份分组，确定每月1号到5号的交易日
    for period, group in df.groupby('year_month'):
        # 获取该月所有日期
        month_data = group.copy()
        
        # 找到1号到5号之间的交易日
        buy_sell_days = month_data[month_data['Date'].dt.day <= 5]
        
        if not buy_sell_days.empty:
            # 设置1号到5号期间为满仓
            df.loc[buy_sell_days.index, 'position'] = 1
    
    # 计算策略收益
    df['strategy_return'] = df['daily_return'] * df['position'].shift(1)
    
    # 计算累计收益率
    df['cumulative_return'] = (1 + df['strategy_return']).cumprod() - 1
    df['benchmark_return'] = (1 + df['daily_return']).cumprod() - 1
    
    return df

def plot_returns(df):
    """绘制收益率图表"""
    if df is None:
        return
    
    # 创建图表
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 10))
    
    # 上图：累计收益率对比
    ax1.plot(df['Date'], df['cumulative_return'] * 100, 
             label='策略收益率', linewidth=2, color='red')
    ax1.plot(df['Date'], df['benchmark_return'] * 100, 
             label='沪深300基准收益率', linewidth=2, color='blue')
    
    ax1.set_title('交易策略（每月1-5号持仓） vs 沪深300基准收益率对比', fontsize=14, fontweight='bold')
    ax1.set_ylabel('累计收益率 (%)', fontsize=12)
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # 格式化x轴日期
    ax1.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
    ax1.xaxis.set_major_locator(mdates.YearLocator())
    plt.setp(ax1.xaxis.get_majorticklabels(), rotation=45)
    
    # 下图：持仓信号
    ax2.fill_between(df['Date'], 0, df['position'], 
                     alpha=0.3, color='green', label='持仓期间')
    ax2.set_title('持仓信号（每月1-5号满仓）', fontsize=14, fontweight='bold')
    ax2.set_xlabel('时间', fontsize=12)
    ax2.set_ylabel('持仓状态', fontsize=12)
    ax2.set_ylim(-0.1, 1.1)
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # 格式化x轴日期
    ax2.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
    ax2.xaxis.set_major_locator(mdates.YearLocator())
    plt.setp(ax2.xaxis.get_majorticklabels(), rotation=45)
    
    plt.tight_layout()
    plt.show()

def calculate_performance_metrics(df):
    """计算策略表现指标"""
    if df is None or df.empty:
        return
    
    # 去除NaN值
    strategy_returns = df['strategy_return'].dropna()
    benchmark_returns = df['daily_return'].dropna()
    
    # 计算年化收益率
    total_days = len(strategy_returns)
    years = total_days / 252  # 假设一年252个交易日
    
    strategy_total_return = df['cumulative_return'].iloc[-1]
    benchmark_total_return = df['benchmark_return'].iloc[-1]
    
    strategy_annual_return = (1 + strategy_total_return) ** (1/years) - 1
    benchmark_annual_return = (1 + benchmark_total_return) ** (1/years) - 1
    
    # 计算年化波动率
    strategy_annual_vol = strategy_returns.std() * np.sqrt(252)
    benchmark_annual_vol = benchmark_returns.std() * np.sqrt(252)
    
    # 计算夏普比率（假设无风险利率为3%）
    risk_free_rate = 0.03
    strategy_sharpe = (strategy_annual_return - risk_free_rate) / strategy_annual_vol if strategy_annual_vol != 0 else 0
    benchmark_sharpe = (benchmark_annual_return - risk_free_rate) / benchmark_annual_vol if benchmark_annual_vol != 0 else 0
    
    # 计算最大回撤
    strategy_cumret = (1 + df['strategy_return']).cumprod()
    strategy_max_dd = ((strategy_cumret / strategy_cumret.cummax()) - 1).min()
    
    benchmark_cumret = (1 + df['daily_return']).cumprod()
    benchmark_max_dd = ((benchmark_cumret / benchmark_cumret.cummax()) - 1).min()
    
    print("=" * 60)
    print("策略表现分析")
    print("=" * 60)
    print(f"策略总收益率:     {strategy_total_return:.2%}")
    print(f"基准总收益率:     {benchmark_total_return:.2%}")
    print(f"策略年化收益率:   {strategy_annual_return:.2%}")
    print(f"基准年化收益率:   {benchmark_annual_return:.2%}")
    print(f"策略年化波动率:   {strategy_annual_vol:.2%}")
    print(f"基准年化波动率:   {benchmark_annual_vol:.2%}")
    print(f"策略夏普比率:     {strategy_sharpe:.2f}")
    print(f"基准夏普比率:     {benchmark_sharpe:.2f}")
    print(f"策略最大回撤:     {strategy_max_dd:.2%}")
    print(f"基准最大回撤:     {benchmark_max_dd:.2%}")
    
    # 计算持仓天数占比
    total_trading_days = len(df)
    holding_days = df['position'].sum()
    holding_ratio = holding_days / total_trading_days
    print(f"持仓天数占比:     {holding_ratio:.2%}")
    print("=" * 60)

def main():
    """主函数"""
    print("开始执行交易策略分析...")
    
    # 下载数据
    print("正在下载沪深300指数数据...")
    data = download_hs300_data()
    
    if data is None:
        print("数据下载失败，程序退出")
        return
    
    # 创建交易策略
    print("正在创建交易策略...")
    strategy_data = create_trading_strategy(data)
    
    if strategy_data is None:
        print("策略创建失败，程序退出")
        return
    
    # 计算表现指标
    calculate_performance_metrics(strategy_data)
    
    # 绘制图表
    print("正在生成图表...")
    plot_returns(strategy_data)
    
    print("分析完成！")

if __name__ == "__main__":
    main()