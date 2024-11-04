import { memo, useEffect, useState } from "react";

/**
 * 这个demo 可以验证，当 blur 事件处理程序中导致 DOM 结构变化或状态变更，
 * @returns
 */

const Comp1 = () => (
  console.log("创建子组件"),
  (
    <button
      id="btn"
      onClick={(e) => {
        console.log("触发点击事件handleClick");
        e.preventDefault();
      }}
      onPointerDown={() => console.log(`onPointerDown`)}
      onPointerUp={() => console.log(`onPointerUp`)}
    >
      点击事件
    </button>
  )
);

const Home = () => {
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("触发了～～～");
  //     const btn = document.getElementById("btn");
  //     btn?.click();
  //   }, 5000);
  // }, []);

  return (
    <>
      <div>主页</div>
      <div>失焦次数：{value}</div>
      <input
        onChange={(e) => {
          console.log(`e`, e);
        }}
        onBlur={() => {
          // setTimeout(() => {
          console.log("1");
          setValue(value + 1);
          // }, 1000);
        }}
      />
      {value && <div>{value}</div>}
      <Comp1 />
    </>
  );
};

export default Home;
