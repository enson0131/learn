import "./App.css";
import Case1 from "./基础篇/case1_pro";
import Programmer from "./基础篇/component/index";
import Index from "./基础篇/state/useEffect_case";

function App() {
  return (
    <div className="App">
      <Case1 />
      <Programmer />
      <Index />
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
    </div>
  );
}

export default App;
