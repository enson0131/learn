import { useRef } from 'react';

/**
 * 异步管理器 Hook
 * 用于防止异步操作乱序，确保返回最新异步处理的结果
 */
export const useAsyncManager = <T = any>() => {
  const requestIdRef = useRef(0);
  const latestRequestPromiseRef = useRef<Promise<T> | null>(null);

  /**
   * 创建受管理的异步请求
   * @param requestHandler 请求处理函数，接收 requestId 作为参数
   * @returns Promise<T> 返回最新请求的结果
   */
  const createManagedAsync = (requestHandler: () => Promise<T>): Promise<T> => {
    const currentRequestId = ++requestIdRef.current;

    const requestPromise = (async (): Promise<T> => {
      try {
        const result = await requestHandler();

        // 检查是否是最新请求
        if (currentRequestId !== requestIdRef.current) {
          console.log(`请求已过期，等待最新请求。当前请求ID: ${currentRequestId}, 最新请求ID: ${requestIdRef.current}`);

          // 等待最新请求完成
          if (latestRequestPromiseRef.current && latestRequestPromiseRef.current !== requestPromise) {
            const latestResult = await latestRequestPromiseRef.current;
            return latestResult;
          }
        }

        return result;
      } catch (error) {
        console.error(`请求ID ${currentRequestId} 执行失败:`, error);
        throw error;
      }
    })();

    // 如果是最新请求，保存Promise引用
    if (currentRequestId === requestIdRef.current) {
      latestRequestPromiseRef.current = requestPromise;
    }

    return requestPromise;
  };

  /**
   * 检查指定请求ID是否为最新请求
   * @param requestId 要检查的请求ID
   * @returns boolean 是否为最新请求
   */
  const isLatestRequest = (requestId: number): boolean => {
    return requestId === requestIdRef.current;
  };

  /**
   * 获取当前最新的请求ID
   * @returns number 最新请求ID
   */
  const getCurrentRequestId = (): number => {
    return requestIdRef.current;
  };

  /**
   * 清理请求管理器状态
   */
  const cleanup = (): void => {
    requestIdRef.current = 0;
    latestRequestPromiseRef.current = null;
  };

  return {
    createManagedAsync,
    isLatestRequest,
    getCurrentRequestId,
    cleanup,
  };
};

export default useAsyncManager;
