import React, { useState } from "react";

const mockList1 = new Array(10000)
  .fill("tab1")
  .map((item, index) => item + "--" + index);

const mockList2 = new Array(10000)
  .fill("tab2")
  .map((item, index) => item + "--" + index);

const mockList3 = new Array(10000)
  .fill("tab3")
  .map((item, index) => item + "--" + index);

const tab = {
  tab1: mockList1,
  tab2: mockList2,
  tab3: mockList3,
};

/**
 * useDeferredValue 和 useTransition 内部都是标记成了过渡更新任务，而 useTransition 主要用来处理逻辑，useDeferredValue 主要是延迟返回值
 * @returns
 */
const DemoUseDeferredValue = () => {
  const [active, setActive] = useState("tab1"); // 需要立即响应的任务
  //   const [renderData, setRenderData] = useState(tab[active]);
  const deferredValue = React.useDeferredValue(active);

  const handleChangeTab = (active) => {
    setActive(active);
  };

  const renderData = tab[deferredValue];

  return (
    <div>
      <div className="tab">
        {Object.keys(tab).map((item) => (
          <button
            key={item}
            onClick={() => handleChangeTab(item)}
            className={active === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="content">
        {renderData.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemoUseDeferredValue;
