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
*/

const START_TIME = performance.timing.fetchStart;
const IGNORE_TAG_SET = [];
const LIMIT = 8000; // 8s
const TAG_WEIGHT_MAP = {
  // 权重
  SVG: 2,
  IMG: 2,
  CANVAS: 4,
  OBJECT: 4,
  EMBED: 4,
  VIDEO: 4,
  // 其他的元素默认1
};
const WW = window.innerWidth; // 视口高度
const WH = window.innerHeight; // 视口高度

class FMP {
  constructor() {
    this.observer = null;
    this.statusCollector = [];
    this.callbackCount = 1;
  }

  initObserver() {
    this.firstSnapshot(); // 记录代码执行之前加载的元素的时间点

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
      // 监听document
      childList: true, // TODO
      subtree: true, // TODO
    });

    if (document.readyState === "complete") {
      this.calFinallScore(); // 计算最后的分数
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
   * 对元素进行打点
   */
  doTag(target, callbackCount) {
    let tagName = target.tagName;

    if (IGNORE_TAG_SET.indexOf(tagName) === -1) {
      let childrenLen = target.children ? target.children.length : 0;
      if (childrenLen > 0) {
        for (let childs = target.children, i = childrenLen - 1; i >= 0; i--) {
          if (childs[i].getAttribute("f_c") === null) {
            childs[i].setAttribute("f_c", callbackCount);
          }
          this.doTag(childs[i], callbackCount); // 深度打点
        }
      }
    }
  }

  /**
   * 检查是否满足停止监听的关键
   * 如果监听的时间超过LIMIT，或者发生回调的时间间隔已经超过1s中，我们认为页面已经稳定，停止dom元素加载的监听，开始进入计算过程
   * 如果是true则取消监听, false则继续监听
   */
  checkCanCal(start) {
    let ti = Date.now() - start;

    return !!(
      ti > LIMIT ||
      ti - this.statusCollector[this.statusCollector.length - 1].t > 1000
    );
  }

  /**
   * 使用深度优先遍历搜索，对每一个元素进行分数计算
   */
  calScore(node, dpss) {
    let { width, height, left, top, bottom, right } =
      node.getBoundingClientRect();

    let f = 1;

    if (WH < top || WW < left) {
      // 不在视口内
      f = 0;
    }

    let sdp = 0;
    // TODO
    dpss.forEach((item) => {
      sdp += item.st;
    });

    let weight = TAG_WEIGHT_MAP[node.tagName] || 1;

    if (
      weight === 1 &&
      node.style.backgroundImage &&
      node.style.backgroundImage !== "initial"
    ) {
      weight = TAG_WEIGHT_MAP["IMG"]; // 将有背景图片的元素，设置成和图片一样的权重
    }

    let st = width * height * weight * f; // 得分

    let els = [{ node, st, weight }];

    let areaPercent = this.calAreaPercent(node); // TODO

    // 将元素的子元素得分之和与其得分进行比较，去较大值，记录得分元素集
    if (sdp > st * areaPercent || areaPercent === 0) {
      st = sdp;
      els = [];
      dpss.forEach((item) => {
        els = els.concat(item.els);
      });
    }
  }

  /**
   * 获取到所有元素的最终得分后
   * 我们会对这个集合的得分取均值，然后过滤出在平均分之上的元素集合，然后进行时间计算
   *
   * 对于权重为1的元素，我们可以通过元素上的标记，查询之前保存的时间集合，得到这个元素的加载时间点
   * 对于权重不为1的元素，会存在资源加载情况，此时，我们可以通过performance.getEntries去获取对应的资源的加载时间，获取元素的加载速度
   * 最后获取所有元素最大的加载时间值，作为页面加载的FMP时间
   */
  calResult(resultSet) {
    let rt = 0;

    resultSet.forEach((item) => {
      let t = 0;
      if (item.weight === 1) {
        let index = +item.node.getAttribute("f_c") - 1;
        t = this.statusCollector[index].t;
      } else if (item.weight === 2) {
        if (item.node.tagName === "IMG") {
        }
      }
    });

    return rt;
  }
}
