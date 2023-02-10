 // 获取链接上的参数
 const getUrlParams1 = function (url) {
    const index = url.indexOf('?');
    if (index < 0) return;
    const res = {};
    const paramsArr = url.slice(index + 1).split("&");

    for(let i = 0; i < paramsArr.length; i++) {
        const value = paramsArr[i];
        if (value.indexOf("=") > -1) {
            const valueArr = value.split("=");
            res[valueArr[0]] = valueArr[1];
        }
    }

    return res;
}

// 获取链接上的参数
const getUrlParams2 = function (url) {
    const params = new URLSearchParams(new URL(url).search);
    return Object.fromEntries(params.entries());
}




// -------- 二刷 -----------------------

const getUrlParams3 = function(url) {
    const param = new URLSearchParams(new URL(url).search);
    return Object.fromEntries(param.entries())
}

const getUrlParams4 = function(url) {
    const res = {};
    const paramArr = url.split('?')[1].split('&');

    for(let item of paramArr) {
        const [key, value] = item.split('=');
        res[key] = value;
    }

    return res;
}



let url = "http://www.baidu.com?name=张三&age=25&sex=男&wife=小红" 
console.log(`getUrlParams:`, getUrlParams4(url))