import { useState } from "react";
import "./App.css";
import SrtParser2 from "srt-parser-2";
import vtt from "vtt.js";

const WebVTT = vtt.WebVTT;
const parser = new SrtParser2();

function App() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.name.endsWith(".srt")) {
      await parserSrt(file);
    } else if (file.name.endsWith(".vtt")) {
      await parserVtt(file);
    }
  };

  const parserSrt = async (file: File) => {
    // 1. 先把 File 读成文本
    const text = await file?.text();

    // 2. 用 srt-parser-2 解析
    const result = parser.fromSrt(text || "");

    console.log(result);

    // 转换为 SRT 字符串
    const srtContent = parser.toSrt(result);

    // 方法 2：生成一个下载链接
    const blob = new Blob([srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "output.vtt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const parserVtt = async (file: File) => {
    const text = await file?.text();
    const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
    const cues: any[] = [];

    parser.oncue = function (cue: any) {
      cues.push(cue.toJSON());
    };

    parser.parse(text);
    parser.flush();

    console.log("解析到的 cues:", cues);
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
    </>
  );
}

export default App;
