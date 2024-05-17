import { useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styles from "./App.module.css";

function App() {
  const [touchType, setTouchType] = useState<string>("");

  const handleTouchType = useCallback((event: TouchEvent) => {
    console.log(`event---->`, event);
  }, []);

  return (
    <>
      <div className={styles["wrapper"]} onTouchStart={handleTouchType}>
        当前的触控类型是: {touchType}
      </div>
    </>
  );
}

export default App;
