import "./App.css";
// import Case1 from "./基础篇/case1_pro";
// import Programmer from "./基础篇/component/index";
// import Index from "./基础篇/state/useEffect_case";
// import Test from "./HOC/控制渲染/节流渲染/节流原理";
// import Index from "./HOC/赋能组件/ 劫持原型链-劫持生命周期-事件函数";
// import Hoc2 from "./HOC/赋能组件/组件内的事件监听";
import AnimationUpload from "./components/云盘动画";
// import AnimationUpload2 from "./components/云盘转动";
import DemoUseReducer from "./components/不常见的Hooks/useReducer";
import DemoUseSyncExternalStore from "./components/不常见的Hooks/useSyncExternalStore";
import DemoUseTransition from "./components/不常见的Hooks/useTransition";
import DemoUseDeferredValue from "./components/不常见的Hooks/useDeferredValue";

function App() {
  return (
    <div className="App">
      {/* <Case1 />
      <Programmer />
      <Index /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Test /> */}
      {/* <Index /> */}
      {/* {<Hoc2 />} */}
      {/* <AnimationUpload /> */}
      {/* <DemoUseReducer /> */}
      {/* <DemoUseSyncExternalStore /> */}
      {/* <DemoUseTransition /> */}
      <DemoUseDeferredValue />
    </div>
  );
}

export default App;
