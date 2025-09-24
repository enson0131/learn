import backtrader as bt
import matplotlib.pyplot as plt
import yfinance as yf
import pandas as pd
from datetime import datetime

class FirstFiveDaysStrategy(bt.Strategy):
    params = (
        ('printlog', False),
    )

    def __init__(self):
        self.order = None
        self.buyprice = None
        self.buycomm = None
        self.month_start = None
        self.trade_days_in_month = 0
        self.equity_curve = []

    def next(self):
        current_date = self.datas[0].datetime.date(0)
        
        # 检查是否是新月份的开始
        if self.month_start != current_date.month:
            self.month_start = current_date.month
            self.trade_days_in_month = 0
        
        # 增加当月交易天数计数
        self.trade_days_in_month += 1
        
        # 每月前5个交易日满仓
        if self.trade_days_in_month <= 5:
            if not self.position:
                self.order = self.order_target_percent(target=1.0)
        else:
            # 其他时间空仓
            if self.position:
                self.order = self.close()
        
        # 记录每日净值
        self.equity_curve.append(self.broker.getvalue())

    def stop(self):
        # 计算收益率曲线
        initial_value = self.equity_curve[0] if self.equity_curve else 0
        returns = [((value - initial_value) / initial_value) * 100 for value in self.equity_curve]
        
        # 绘制收益率曲线
        plt.figure(figsize=(12, 6))
        plt.plot(self.data.datetime.array[-len(returns):], returns)
        plt.title('Strategy Returns Over Time')
        plt.xlabel('Date')
        plt.ylabel('Return (%)')
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

# 下载沪深300指数数据（使用ASHR作为代理，或使用本地数据）
def fetch_data():
    try:
        # 这里使用ASHR（沪深300指数ETF）作为示例，实际应用中可以使用本地沪深300数据
        data = yf.download('ASHR', start='2015-01-01', end='2023-12-31', progress=False)
        
        # 检查数据是否为空
        if data.empty:
            print("无法获取ASHR数据，使用模拟数据")
            return create_sample_data()
        
        return data
    except Exception as e:
        print(f"下载数据时出错: {e}")
        print("使用模拟数据进行回测")
        return create_sample_data()

def create_sample_data():
    """创建模拟的股票数据用于回测"""
    import numpy as np
    
    # 创建日期范围
    dates = pd.date_range(start='2015-01-01', end='2023-12-31', freq='B')  # 工作日
    
    # 生成模拟价格数据
    np.random.seed(42)  # 固定随机种子以确保结果可重现
    
    # 初始价格
    initial_price = 100.0
    returns = np.random.normal(0.0005, 0.02, len(dates))  # 日收益率
    prices = [initial_price]
    
    for ret in returns:
        prices.append(prices[-1] * (1 + ret))
    
    prices = prices[1:]  # 移除初始价格
    
    # 创建OHLC数据
    data = pd.DataFrame(index=dates)
    data['Close'] = prices
    data['Open'] = data['Close'] * (1 + np.random.normal(0, 0.01, len(dates)))
    data['High'] = np.maximum(data['Open'], data['Close']) * (1 + np.random.uniform(0, 0.02, len(dates)))
    data['Low'] = np.minimum(data['Open'], data['Close']) * (1 - np.random.uniform(0, 0.02, len(dates)))
    data['Volume'] = np.random.randint(1000000, 10000000, len(dates))
    data['Adj Close'] = data['Close']
    
    return data

# 运行回测
def run_backtest():
    # 创建Cerebro引擎
    cerebro = bt.Cerebro()
    
    # 添加策略
    cerebro.addstrategy(FirstFiveDaysStrategy)
    
    # 获取数据
    data = fetch_data()
    
    # 确保数据不为空
    if data.empty:
        print("错误：无法获取有效数据")
        return
    
    print(f"数据范围: {data.index[0]} 到 {data.index[-1]}")
    print(f"数据行数: {len(data)}")
    
    # 将数据转换为Backtrader可用的格式
    datafeed = bt.feeds.PandasData(
        dataname=data,
        datetime=None,  # 使用索引作为日期
        open=0,         # Open列的位置
        high=1,         # High列的位置  
        low=2,          # Low列的位置
        close=3,        # Close列的位置
        volume=4,       # Volume列的位置
        openinterest=-1 # 不使用
    )
    cerebro.adddata(datafeed)
    
    # 设置初始资金
    cerebro.broker.setcash(100000.0)
    
    # 设置佣金
    cerebro.broker.setcommission(commission=0.001)  # 0.1%佣金
    
    # 运行回测
    print('初始资金: %.2f' % cerebro.broker.getvalue())
    cerebro.run()
    print('最终资金: %.2f' % cerebro.broker.getvalue())

if __name__ == '__main__':
    run_backtest()