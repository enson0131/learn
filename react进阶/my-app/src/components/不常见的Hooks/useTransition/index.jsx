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

const DemoUseTransition = () => {
  const [active, setActive] = useState("tab1"); // 需要立即响应的任务
  const [renderData, setRenderData] = useState(tab[active]);
  const [isPending, startTransition] = React.useTransition();

  const handleChangeTab = (active) => {
    setActive(active);
    startTransition(() => {
      setRenderData(tab[active]);
    });
  };

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
        {isPending ? (
          <p>loading...</p>
        ) : (
          renderData.map((item) => <li key={item}>{item}</li>)
        )}
      </ul>
    </div>
  );
};

export default DemoUseTransition;
