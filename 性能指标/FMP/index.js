/*
https://segmentfault.com/a/1190000017092752
在2013年之后，标准组织推出了 performance timing api 
以上的指标可以对网页进行数值化的衡量，但是其实这种衡量只能体现一个视角的性能观点，
比如TTFB很快，就能代表用户能够很快的看到页面的内容嘛？
这个不一定是成立的，因此人们有开始从用户的视角去分析网页加载的性能情况，将用户看待加载过程，分成了以下几个阶段
  - 1 页面是否正在正常加载 （happening）- FP/FCP
  - 2 页面加载的内容是否已经足够（useful）- FMP
  - 3 页面是否已经可以操作了 （usable）- TTI
  - 4 页面是否可以交互，动画是否顺畅（delightful）- FPS

成为FMP的条件:
  - 1 体积占比比较大
  - 2 屏幕内可见占比大
  - 3 资源加载元素占比更高(img, svg , video , object , embed, canvas)
  - 4 主要元素可能是多个组成的

FMP我们可以通过MutationObserver对页面的元素进行监听, 当元素渲染时，我们会记录元素的渲染时间，通过元素的宽/高/权重/以及是否在视口中计算出页面的总分
分数最高的元素对应的渲染时间就是我们的FMP时间
*/

import utils from "./utils.js";

const START_TIME = performance && performance.timing.responseEnd;

const IGNORE_TAG_SET = ["SCRIPT", "STYLE", "META", "HEAD", "LINK"];

const TAG_WEIGHT_MAP = {
  SVG: 2,
  IMG: 2,
  CANVAS: 4,
  OBJECT: 4,
  EMBED: 4,
  VIDEO: 4,
};

const LIMIT = 1000;

const WW = window.innerWidth;

const WH = window.innerHeight;

const VIEWPORT_AREA = WW * WH;

const DELAY = 500;

class FMPTiming {
  constructor() {
    this.statusCollector = []; // 收集元素被渲染出来的时间
    this.flag = true;
    this.muo = MutationObserver;
    this.observer = null;
    this.callbackCount = 1;
    this.mp = {};

    this.initObserver();
  }
  firstSnapshot() {
    let t = Date.now() - START_TIME;
    let bodyTarget = document.body;

    if (bodyTarget) {
      this.doTag(bodyTarget, this.callbackCount++); // 给元素打标记，标记是第几次渲染出来的
    }
    this.statusCollector.push({
      t,
    });
  }
  initObserver() {
    this.firstSnapshot();

    this.observer = new MutationObserver(() => {
      let t = Date.now() - START_TIME;
      let bodyTarget = document.body;

      if (bodyTarget) {
        this.doTag(bodyTarget, this.callbackCount++);
      }
      this.statusCollector.push({
        t,
      });
    });

    this.observer.observe(document, {
      childList: true, // 也会监听目标节点的子节点
      subtree: true,
    });

    if (document.readyState === "complete") {
      this.calFinallScore();
    } else {
      window.addEventListener(
        "load",
        () => {
          this.calFinallScore();
        },
        true
      );
    }
  }

  /**
   * 获取各个资源加载的时间
   */
  initResourceMap() {
    performance.getEntries().forEach((item) => {
      // console.log(`item---->`, item);
      // https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceResourceTiming
      this.mp[item.name] = item.responseEnd;
    });
  }

  doTag(target, callbackCount) {
    let tagName = target.tagName;

    if (IGNORE_TAG_SET.indexOf(tagName) === -1) {
      let childrenLen = target.children ? target.children.length : 0;
      if (childrenLen > 0) {
        for (let childs = target.children, i = childrenLen - 1; i >= 0; i--) {
          if (childs[i].getAttribute("f_c") === null) {
            childs[i].setAttribute("f_c", callbackCount);
          }
          this.doTag(childs[i], callbackCount);
        }
      }
    }
  }

  calFinallScore() {
    if (MutationObserver && this.flag) {
      if (this.checkCanCal(START_TIME)) {
        console.time("calTime");
        this.observer.disconnect();

        this.flag = false;

        let res = this.deepTraversal(document.body);

        let tp;

        res.dpss.forEach((item) => {
          if (tp && tp.st) {
            if (tp.st < item.st) {
              tp = item;
            }
          } else {
            tp = item;
          }
        });

        // console.log("tp---->", tp, this.statusCollector);

        this.initResourceMap();

        let resultSet = this.filterTheResultSet(tp.els);

        // console.log(`resultSet--->`, resultSet);

        let fmpTiming = this.calResult(resultSet);

        console.log("FMP 指标: ", fmpTiming);

        console.timeEnd("calTime");
      } else {
        setTimeout(() => {
          this.calFinallScore();
        }, DELAY);
      }
    }
  }

  calResult(resultSet) {
    let rt = 0;

    resultSet.forEach((item) => {
      let t = 0;
      if (item.weight === 1) {
        let index = +item.node.getAttribute("f_c") - 1;
        t = this.statusCollector[index].t;
      } else if (item.weight === 2) {
        if (item.node.tagName === "IMG") {
          // console.log(`item.node.src-->`, item.node.src, this.mp);
          let index = +item.node.getAttribute("f_c") - 1;
          t = this.statusCollector[index].t + this.mp[item.node.src];
          // t = this.mp[item.node.src];
        } else if (item.node.tagName === "SVG") {
          let index = +item.node.getAttribute("f_c") - 1;
          t = this.statusCollector[index].t;
        } else {
          //background image
          let match = utils
            .getStyle(item.node, "background-image")
            .match(/url\(\"(.*?)\"\)/);

          let s;
          if (match && match[1]) {
            s = match[1];
          }
          if (s.indexOf("http") == -1) {
            s = location.protocol + match[1];
          }
          t = this.mp[s];
        }
      } else if (item.weight === 4) {
        if (item.node.tagName === "CANVAS") {
          let index = +item.node.getAttribute("f_c") - 1;
          t = this.statusCollector[index].t;
        } else if (item.node.tagName === "VIDEO") {
          t = this.mp[item.node.src];

          !t && (t = this.mp[item.node.poster]);
        }
      }

      // console.log(t, item.node);
      rt < t && (rt = t);
    });

    return rt;
  }

  filterTheResultSet(els) {
    let sum = 0;
    els.forEach((item) => {
      sum += item.st;
    });

    let avg = sum / els.length;

    return els.filter((item) => {
      return item.st >= avg;
    });
  }

  deepTraversal(node) {
    if (node) {
      let dpss = [];

      for (let i = 0, child; (child = node.children[i]); i++) {
        let s = this.deepTraversal(child);
        if (s.st) {
          dpss.push(s); // dpss为子节点的分数
        }
      }

      return this.calScore(node, dpss);
    }
    return {};
  }

  calScore(node, dpss) {
    let { width, height, left, top, bottom, right } =
      node.getBoundingClientRect();
    let f = 1;

    if (WH < top || WW < left) {
      //不在可视viewport中
      f = 0;
    }

    let sdp = 0; // 子元素的总得分

    dpss.forEach((item) => {
      sdp += item.st;
    });

    let weight = TAG_WEIGHT_MAP[node.tagName] || 1;

    if (
      weight === 1 &&
      utils.getStyle(node, "background-image") &&
      utils.getStyle(node, "background-image") !== "initial"
    ) {
      weight = TAG_WEIGHT_MAP["IMG"]; //将有图片背景的普通元素 权重设置为img
    }

    let st = width * height * weight * f;

    let els = [{ node, st, weight }];

    let areaPercent = this.calAreaPercent(node);

    if (sdp > st * areaPercent || areaPercent === 0) {
      st = sdp;
      els = [];

      dpss.forEach((item) => {
        els = els.concat(item.els);
      });
    }

    return {
      dpss,
      st,
      els,
    };
  }

  /**
   * 是否取消监听
   */
  checkCanCal(start) {
    let ti = Date.now() - start;
    return !!(
      ti > LIMIT ||
      ti -
        ((this.statusCollector &&
          this.statusCollector.length &&
          this.statusCollector[this.statusCollector.length - 1].t) ||
          0) >
        1000
    );
  }

  /**
   * 计算元素在可视区域的占比
   * @param {*} node
   * @returns
   */
  calAreaPercent(node) {
    let { left, right, top, bottom, width, height } =
      node.getBoundingClientRect();
    let wl = 0;
    let wt = 0;
    let wr = WW;
    let wb = WH;

    // right - left 是元素的宽度
    let overlapX =
      right - left + (wr - wl) - (Math.max(right, wr) - Math.min(left, wl));
    if (overlapX <= 0) {
      //x 轴无交点
      return 0;
    }

    let overlapY =
      bottom - top + (wb - wt) - (Math.max(bottom, wb) - Math.min(top, wt));
    if (overlapY <= 0) {
      return 0;
    }

    return (overlapX * overlapY) / (width * height);
  }
}

new FMPTiming();
