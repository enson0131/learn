import React, { useEffect, useState } from 'react';

/**
 * https://www.xiabingbao.com/post/react/react-hook-userequest.html
 * 还可以参考一下 添加配置config、取消请求、手动/自动触发、轮训、防抖
 * @param {*} requestFn 
 * @returns 
 */
const useRequest = (requestFn) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const [err, data] = await requestFn();
            setLoading(false);
            setData(data);
            setError(err);
        }

        getData();
    }, [requestFn])

    return [data, error, loading]
}

export default useRequest