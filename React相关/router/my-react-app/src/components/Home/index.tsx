import { memo, useState } from "react";

const Home = () => {
  const [value, setValue] = useState(0);

  const Comp1 = () => (
    console.log("创建子组件"),
    (
      <button
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

  console.log("2");

  return (
    <>
      <div>主页</div>
      <div>失焦次数：{value}</div>
      <input
        onBlur={() => {
          // setTimeout(() => {
          console.log("1");
          setValue(value + 1);
          // }, 1000);
        }}
      />
      <Comp1 />
    </>
  );
};

export default Home;
