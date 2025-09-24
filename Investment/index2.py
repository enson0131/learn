import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from matplotlib.ticker import PercentFormatter
import baostock as bs
import datetime
from pandas.tseries.offsets import BDay

# 设置中文显示
plt.rcParams["font.family"] = ["Arial Unicode MS", "PingFang SC", "Heiti SC", "sans-serif"]
plt.rcParams["axes.unicode_minus"] = False  # 解决负号显示问题

def get_hs300_data(start_date, end_date):
    """获取沪深300指数数据"""
    # 登录baostock
    lg = bs.login()
    if lg.error_code != '0':
        print(f"登录失败：{lg.error_msg}")
        return None
    
    # 获取沪深300指数数据
    rs = bs.query_history_k_data_plus(
        "sh.000300",
        "date,close",
        start_date=start_date,
        end_date=end_date,
        frequency="d",
        adjustflag="3"  # 复权类型，3表示不复权
    )
    
    # 处理数据
    data_list = []
    while (rs.error_code == '0') & rs.next():
        data_list.append(rs.get_row_data())
    
    # 登出baostock
    bs.logout()
    
    # 转换为DataFrame
    if not data_list:
        print("未获取到数据")
        return None
        
    df = pd.DataFrame(data_list, columns=rs.fields)
    df['date'] = pd.to_datetime(df['date'])
    df['close'] = df['close'].astype(float)
    df.set_index('date', inplace=True)
    
    return df

def simulate_strategy(data):
    """模拟交易策略：每月1号-5号持有，其他时间空仓"""
    # 复制数据用于计算
    df = data.copy()
    
    # 计算每日收益率
    df['daily_return'] = df['close'].pct_change()
    df['daily_return'] = df['daily_return'].fillna(0)
    
    # 获取每个交易日的日期信息
    df['day_of_month'] = df.index.day
    
    # 标记交易区间：1号到5号（包含边界）
    df['is_trading_day'] = (df['day_of_month'] >= 1) & (df['day_of_month'] <= 5)
    
    # 计算策略每日收益率：交易日跟随指数收益，非交易日为0
    df['strategy_return'] = df['daily_return'] * df['is_trading_day']
    
    # 计算累计收益率
    df['index_cum_return'] = (1 + df['daily_return']).cumprod() - 1
    df['strategy_cum_return'] = (1 + df['strategy_return']).cumprod() - 1
    
    return df

def plot_results(df):
    """绘制收益率曲线"""
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # 绘制累计收益率曲线
    ax.plot(df.index, df['strategy_cum_return'], label='策略累计收益率', 
            color='#2c7fb8', linewidth=2.5)
    ax.plot(df.index, df['index_cum_return'], label='沪深300累计收益率', 
            color='#fdae61', linestyle='--', linewidth=2)
    
    # 标记交易区间（每月1-5号）
    df['month_year'] = df.index.to_period('M')
    for month, group in df.groupby('month_year'):
        trading_days = group[group['is_trading_day']]
        if not trading_days.empty:
            start = trading_days.index[0]
            end = trading_days.index[-1]
            ax.axvspan(start, end, color='#bdd7e7', alpha=0.3)
    
    # 设置图表格式
    ax.set_title('每月1-5号满仓沪深300指数策略收益率', fontsize=16)
    ax.set_xlabel('日期', fontsize=12)
    ax.set_ylabel('累计收益率', fontsize=12)
    ax.yaxis.set_major_formatter(PercentFormatter(xmax=1, decimals=1))
    ax.grid(True, linestyle='--', alpha=0.7)
    ax.legend(fontsize=12)
    
    # 设置x轴日期格式
    ax.xaxis.set_major_locator(mdates.YearLocator())
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y'))
    
    plt.tight_layout()
    # 保存图表而不是显示，避免GUI问题
    plt.savefig('strategy_backtest_result.png', dpi=300, bbox_inches='tight')
    print("图表已保存为 strategy_backtest_result.png")
    
    # 计算并打印策略表现
    print(f"回测时间段: {df.index[0].strftime('%Y-%m-%d')} 至 {df.index[-1].strftime('%Y-%m-%d')}")
    print(f"策略总收益率: {df['strategy_cum_return'].iloc[-1]:.2%}")
    print(f"沪深300总收益率: {df['index_cum_return'].iloc[-1]:.2%}")
    
    # 计算年化收益率
    start_date = df.index[0]
    end_date = df.index[-1]
    years = (end_date - start_date).days / 365.25
    
    strategy_annualized = (1 + df['strategy_cum_return'].iloc[-1]) ** (1 / years) - 1
    index_annualized = (1 + df['index_cum_return'].iloc[-1]) ** (1 / years) - 1
    
    print(f"策略年化收益率: {strategy_annualized:.2%}")
    print(f"沪深300年化收益率: {index_annualized:.2%}")

def main():
    # 设置回测时间段（2012到2022年）
    start_date = '2012-01-01'
    end_date = '2022-12-31'
    
    print(f"获取沪深300指数数据: {start_date} 至 {end_date}")
    
    # 获取数据
    hs300_data = get_hs300_data(start_date, end_date)
    
    if hs300_data is None or hs300_data.empty:
        print("无法获取数据，使用模拟数据进行演示")
        # 生成模拟数据
        date_range = pd.date_range(start=start_date, end=end_date, freq='B')
        np.random.seed(42)
        returns = np.random.normal(0, 0.01, len(date_range))
        prices = np.cumprod(1 + returns) * 3000
        hs300_data = pd.DataFrame({'close': prices}, index=date_range)
    
    # 模拟策略
    result_df = simulate_strategy(hs300_data)
    
    # 绘制结果
    plot_results(result_df)

if __name__ == "__main__":
    main()
