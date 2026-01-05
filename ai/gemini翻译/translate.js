const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. 初始化 API (替换为你的 API Key)
const genAI = new GoogleGenerativeAI("xxx");

async function translateText() {
  // 2. 选择模型 (推荐 gemini-1.5-pro-latest，性价比最高)
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    // 设定系统指令，让翻译更专业
    systemInstruction:
      "你是一位精通中英文的翻译官，请将输入的内容翻译为地道的简体中文。",
  });

  const textToTranslate =
    "Generative AI is changing the way we build software.";

  try {
    // 3. 生成内容
    const result = await model.generateContent(textToTranslate);
    const response = await result.response;
    const translatedText = response.text();

    console.log("原文:", textToTranslate);
    console.log("翻译:", translatedText);
  } catch (error) {
    console.error("翻译出错:", error);
  }
}

translateText();
