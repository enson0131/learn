const CHECK_CRASH_INTERVAL = 10 * 1000; // 每 10s 检查一次
const CRASH_THRESHOLD = 15 * 1000; // 15s 超过15s没有心跳则认为已经 crash
const pages = {};
let timer;

function checkCrash() {
  const now = Date.now()
  for (var id in pages) {
    let page = pages[id]
    if ((now - page.t) > CRASH_THRESHOLD) {
      // 上报 crash
      let url = page.report_url;
      if(url){
        let data = Object.assign({}, page.base_data, page.exp_data);
        var param = ''
        for (var key in data){
          param += key + '=' + encodeURIComponent(data[key]) + '&';
        }
        url += '?' + param;
        fetch && fetch(url, {method: 'GET', mode: 'no-cors', credentials: 'include'}).catch(function (error) {
          console.log(error)
        });
      }
      delete pages[id]
    }
  }
  if (!Object.keys(pages).length) {
    clearInterval(timer);
    timer = null
  }
}

function getPage(id) {
  let data = pages[id];
  if(!data){
    pages[id] = data = {};
  }
  return data;
}

this.addEventListener('message', function(e) {
  const data = e.data;
  if (data.type === 'heartbeat') {
    //console.log('heartbeat');
    let page = getPage(data.id);
    page.exp_data = data.exp_data;
    page.t = Date.now();

    if (!timer) {
      timer = setInterval(function () {
        checkCrash()
      }, CHECK_CRASH_INTERVAL);
    }
  } else if (data.type === 'baseData') {
    let page = getPage(data.id);
    page.base_data = data.base_data;
    page.report_url = data.report_url;
  } else if (data.type === 'unload') {
    delete pages[data.id]
  }
})