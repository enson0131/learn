import { useReducer } from "react";

/**
 * useReducer 是 react-hooks 提供的能够在无状态组件中运行的类似 redux 的功能 api
 * @returns
 */
const DemoUseReducer = () => {
  const [number, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return state + 1;
      case "reduce":
        return state - 1;
      default:
        return state;
    }
  }, 0);

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => dispatch({ type: "add" })}>+</button>
      <button onClick={() => dispatch({ type: "reduce" })}>-</button>
    </div>
  );
};

export default DemoUseReducer;
