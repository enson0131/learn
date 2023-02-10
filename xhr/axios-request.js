/***
 * 总结: 请求中拦截器只能对公共部分做处理
 * 例如请求拦截器统一添加参数/统一设置默认请求头
 * 响应拦截器统一对返回的rt做处理 例如-23退出登录/-22刷新token
 * 
 * 封装request请求统一对返回的结果进行封装
 * 封装get/post请求统一对请求的参数进行定制化处理, 例如post请求可以新增队列控制，请求完成时在request统一对post队列进行清除处理
 * 
 */

import axios from 'axios';
import { merge } from 'lodash';

// 创建axios实例
const axiosInstance = axios.create({
    timeout: 1000 * 60, // 设置1分钟超时
});

const errMsgStructure = {
  data: {},
  msg: '系统繁忙，请稍后重试',
  rt: -1,
  success: false,
  total: 0,
}

// 设置请求拦截器
axiosInstance.interceptors.request.use(config => {
    if (config.method === 'get') { // 如果是 GET 请求
        const param = config.param;
        param._t = Date.now(); // 给参数加上时间戳, 因为GET请求有缓存
        config.param = param;
    }

    if (config.method === 'post') { // 如果是 POST 请求
        // 请求体默认是表单格式
        config = merge({}, {
            headers: {
               'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', 
            }
        }, config)
    }

    return merge(config, { // 给请求统一添加上token, 防止XSS工具
        url: addUrlParams(url, {
            token,
            login_token,
        })
    })
})

// 设置拦截器
axiosInstance.interceptors.response.use(async response => {
    // 对登陆失败/token需要刷新的场景做处理
    // 返回数据的统一格式交付由request做处理
    const { data = {} } = response;
    const { rt } = data;

    if (rt === -23) {
        // 跳转到登陆页面
    }

    if (rt === -22) {
        // token需要替换
    }

    return merge({}, errMsgStructure, data)
}, err => {
    return Promise.reject(errMsgStructure); // 响应出错则统一返回默认格式
})


const post = async function (url, ...param) {
    // 对POST请求做队列处理
    // 可以根据post请求对参数做一些特殊处理, 拦截器处理统一的配置
    return axiosInstance.post(url, ...param);
}

const get = function (url, ...param) {
    // 可以根据get请求对参数做一些特殊处理, 拦截器处理统一的配置
    return axiosInstance.get(url, ...param);
}


const request = function(method) {
    return async (...methodParam) => {
        return await method(...methodParam).then(res => {
            const { success } = res;

            if (success) {
                return [null, res];
            } else {
                const err = res;
                return [err, null]
            }
        }).catch(err => {
            return [err, null]
        })
    }
}


export const POST_WRAP = request(post);
export const GET_WRAP = request(get);
export default axiosInstance;