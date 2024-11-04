import { memo, useEffect, useState } from "react";

/**
 * 这个demo 可以验证，这是浏览器的行为。该按钮接收鼠标按下事件，但由于元素在鼠标按下事件后立即移动，因此鼠标按下事件发生在外部，并且不会注册单击。执行相同的操作，但首先将光标移回到按钮上，然后释放，现在您将获得预期的点击。
 * 相关 issue：https://github.com/facebook/react/issues/4210
 * @returns
 */

const Comp1 = () => (
  console.log("创建子组件"),
  (
    <button
      id="btn"
      onClick={() => {
        console.log("触发点击事件handleClick");
      }}
      onPointerDown={() => console.log(`onPointerDown`)}
      onPointerUp={() => console.log(`onPointerUp`)}
    >
      点击事件
    </button>
  )
);

const Blur2 = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <div>Blur2</div>
      <div>失焦次数：{value}</div>
      <input
        onBlur={() => {
          setValue(value + 1);
        }}
      />
      {!!value && <div>{value}</div>}
      <Comp1 />
    </>
  );
};

export default Blur2;
