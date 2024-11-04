import { memo, useEffect, useState } from "react";

/**
 * 这个demo 可以验证，当 blur 事件处理程序中导致 DOM 结构变化或状态变更，导致组件重新渲染导致 DOM 改变（如隐藏或禁用按钮）时，React 会在视图更新后移除按钮，导致 click 事件目标发生变化。这可能使得 click 事件没有机会在原定的元素上触发。
 * @returns
 */
const Home = () => {
  const [value, setValue] = useState(0);

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

  const a = <Comp1 />;
  console.log("2", a);

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
      {a}
    </>
  );
};

export default Home;
