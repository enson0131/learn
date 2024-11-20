import { useSyncExternalStore } from "react";

/**
 * 订阅外部数据，数据更新时能触发组件更新
 */
const useStorage = (key, defaultValue) => {
  const subscribe = (callback) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  };

  const getSnapshot = () => {
    return localStorage.getItem(key) || defaultValue;
  };

  const setSnapshot = (value) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("storage")); // 手动触发storage事件，触发订阅
  };

  const res = useSyncExternalStore(subscribe, getSnapshot);

  return [res, setSnapshot];
};

const DemoUseSyncExternalStore = () => {
  const [name, setName] = useStorage("name", "enson");

  return (
    <>
      <h1>{name}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </>
  );
};

export default DemoUseSyncExternalStore;
