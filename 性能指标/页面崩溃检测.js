/*
 页面崩溃值在页面运行过程中页面完全无响应的现象，通常有俩种情况会导致页面崩溃
 1 JS 主线程出现死循环，触发浏览器保护策略，结束当前页面的进程
 2 内存不足

 发生崩溃时主线程被阻塞，因此对崩溃的监控只能在独立于JS主线程的 Worker 线程中进行，我们可以采用 Web Worker 心跳检测的方式
 来对主线程进行不断的探测，如果主线程崩溃，就不会有任何响应，那就可以在 Worker 线程中进行崩溃异常的上报

 策略
 - JS主线程:
    1 每 2s 向 web Worker 发送心跳
 - Web Worker:
    1 定期（2s）检查是否收到心跳
    2 超过一定时间（6s）后, 未收到心跳，则认为页面崩溃
    3 检测到崩溃后，上报
*/


// 奔溃异常监控 浏览器必须支持 serviceWorker
if (navigator.serviceWorker && win.addEventListener && win.postMessage) {
  var crashHost = 'https://fe.faisco.cn';
  var crashSrc = crashHost + '/hawkEye/crash.jsp';

  var connect = function () {
    var iframe = this;
    var HEARTBEAT_INTERVAL = 5 * 1000; // 每五秒发一次心跳
    var sessionId = HE._TOOL._getId(HE._DEF._IDTYPE._CRASH_ID);
    var base_data = {};

    base_data[HE._DEF._REPORT._EXCEPTION._URL] = document.URL;
    base_data[HE._DEF._REPORT._EXCEPTION._TYPE] = HE._DEF._REPORT._EXCEPTION._EXCEPTION_TYPE._PAGE_CRASH;

    for (var key in HE._DATA) {
      base_data[key] = HE._DATA[key];
    }
    // 记录上报类型
    base_data[HE._DEF._REPORT._BASIC._REPORT_TYPE] = self._type;

    iframe.contentWindow.postMessage({
      type: 'baseData',
      id: sessionId,
      base_data: base_data,
      report_url: HE.FAI_HAWK_EYE_REPORT_URL
    }, crashSrc);

    (function heartbeat() {
      // 附加信息，如果页面 crash，上报的附加数据
      var memoryData = {};
      if (performance) {
        var memory = performance.memory;
        if (memory) {
          memoryData.memory = {
            totalJSHeapSize: memory.totalJSHeapSize, // 已分配的堆体积
            usedJSHeapSize: memory.usedJSHeapSize, // 当前 JS 堆活跃段（segment）的体积，以字节计算。
            jsHeapSizeLimit: memory.jsHeapSizeLimit, // 上下文内可用堆的最大体积
            // 通常，usedJSHeapSize不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏。
            usedRatio: (memory.usedJSHeapSize / memory.totalJSHeapSize * 100).toFixed(4) + "%"
          }
        }
      }

      var exp_data = {};
      exp_data[HE._DEF._REPORT._EXCEPTION._MESSAGE] = JSON.stringify(memoryData);
      // 记录上报时间
      exp_data[HE._DEF._REPORT._BASIC._CLI_TIME] = new Date().getTime();

      iframe.contentWindow.postMessage({
        type: 'heartbeat',
        id: sessionId,
        exp_data: exp_data,
      }, crashSrc);

      setTimeout(heartbeat, HEARTBEAT_INTERVAL);
    })();

    window.addEventListener('beforeunload', function () {
      iframe.contentWindow.postMessage({
        type: 'unload',
        id: sessionId
      }, crashSrc);
    });
  }

  // 由于 sw 只能检测当前域名，所以这里检测当前的资源域名其实是没有意义的。
  // 所以用 iframe 作中转。起到两个作用：
  // 1、可以监听各个业务的崩溃异常，并通过真正的 crash.jsp 去上报异常信息。
  // 2、一定程度上，可以避免 sw 重复注册带来的性能损失。
  var appendIframe = function () {
    try {
      if (document.body.querySelector('#crashIframe')) return;

      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = crashSrc;
      iframe.id = 'crashIframe';
      iframe.addEventListener('load', connect, false);
      document.body.appendChild(iframe);
    } catch (e) {
      console.log(e);
    }
  }

  if (document.body) {
    appendIframe();
  } else {
    win.addEventListener('load', appendIframe, false);
  }
}