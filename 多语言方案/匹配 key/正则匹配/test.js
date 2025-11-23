const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "index-normal.tsx");

const content = fs.readFileSync(filePath, "utf-8");

/**
 * 正则提取 t('key') 中的 key
 * @param {*} I18N
 * @param {*} code
 * @returns
 */
function getRegexMatches(code) {
  const lines = code.split("\n");
  const positions = [];
  const reg = /t\(['"`]([^'"`]*)['"`]\)/g;

  console.log(`长度: ${lines.length}`);
  const start = new Date().getTime();
  (lines || []).map((line, index) => {
    let match;

    // 使用 while 循环来匹配一行中的所有匹配项
    while ((match = reg.exec(line)) !== null) {
      const key = match[1];
      if (key) {
        positions.push(key);
      }
    }
  });
  const end = new Date().getTime();
  console.log(`时间: ${end - start}ms`);
  return positions;
}

// console.log(
//   getRegexMatches(
//     `{t('languagesPlatform.addCorpus')}', {t("languagesPlatform.addCorpus1")}', {t("languagesPlatform.addCorpus2")}'` +
//       "{t(`languagesPlatform.addCorpus3`)}"
//   )
// );

// getRegexMatches(content);

// let longContent = content.repeat(10); // 800 * 100 = 8000
// getRegexMatches(longContent);

// let longContent2 = content.repeat(100); // 800 * 100 = 80000
// getRegexMatches(longContent2);

/**
 * 从当前文件中提取所有的语料 key，支持自定义语料函数名
 * @param editor 编辑器实例
 * @param functionName 语料函数名，默认为 't'，支持 'i18n.t', '$t' 等
 * @returns 语料 key 列表
 */
function extractCorpusKeyFromCurrentFile(code, functionName = "i18n.t") {
  const lines = code.split("\n"); // 获取每一行的代码
  const positions = [];
  const reg = new RegExp(
    `\\b${functionName}\\s*\\(\\s*['"\`]([^'"\`]+)['"\`]` // 优化正则，移除结尾的\\s*\\)，支持提取带参数的语料函数
  );

  console.log(`reg: ${reg}`);
  (lines || []).map((line, index) => {
    const match = reg.exec(line);

    if (match) {
      const key = match[1];
      if (key) {
        positions.push(key);
      }
    }
  });

  return positions;
}

console.log(extractCorpusKeyFromCurrentFile(content));
