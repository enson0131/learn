import { useEffect, useState } from "react";
import * as Y from "yjs";
// import * as Y from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";

const ydoc = new Y.Doc();

// You can define a Y.Text as a top-level type or a nested type

// Method 1: Define a top-level type
const ytext = ydoc.getText("my text type");
// Method 2: Define Y.Text that can be included into the Yjs document
// const ytextNested = new Y.Text();

// Nested types can be included as content into any other shared type
// ydoc.getMap("another shared structure").set("my nested text", ytextNested);

// Common methods
// ytext.insert(0, "abc"); // insert three elements
// ytext.format(1, 2, { bold: true }); // delete second element
// ytext.toString(); // => 'abc'
// ytext.delete(0, 1);
// ytext.insert(0, "enson");
// ytext.toDelta(); // => [{ insert: 'a' }, { insert: 'bc', attributes: { bold: true }}]

// console.log(ytext.toDelta());

const wsProvider = new WebsocketProvider(
  "ws://localhost:1234",
  "yjs-doc", // 房间名
  ydoc
);

const name = "帅气的 enson_" + Math.random().toString(36).substring(7); // 随机生成一个用户名
const icon = `https://robohash.org/${name}?set=set1&size=100x100`; // 随机生成一个图标

wsProvider.awareness.setLocalStateField("user", {
  name,
  icon, // 随机生成一个图标
});

export default function CollaborativeDoc() {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    ytext.delete(0, ytext.length);
    ytext.insert(0, e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    const persistence = new IndexeddbPersistence("yjs-doc", ydoc);

    persistence.whenSynced.then(() => {
      console.log("同步完成");
      setValue(ytext.toString());
    });

    wsProvider.awareness.setLocalStateField("user", { name, icon });

    wsProvider.awareness.on("change", (updates: any) => {
      console.log("用户状态更新", updates);

      console.log(wsProvider.awareness.getStates());
    });
  }, []);

  useEffect(() => {
    ydoc.on("update", () => {
      console.log("文档更新");
      setValue(ytext.toString());
    });

    // return () => {
    //   ydoc.off("update", () => {
    //     console.log("文档更新");
    //     setValue(ytext.toString());
    //   });
    // };
  }, []);

  return (
    <>
      <div>协同文档</div>
      <div>
        <p>
          用户名：
          <img
            src={wsProvider.awareness.getLocalState()?.user?.icon}
            alt="用户图标"
            width={24}
            height={24}
          />{" "}
          {wsProvider.awareness.getLocalState()?.user?.name}
        </p>
      </div>
      <textarea value={value} rows={30} onChange={handleChange}></textarea>
    </>
  );
}
