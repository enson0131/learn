/**
 * 支持字符串的添加和搜索
 * 
 * void addWord(word)
   bool search(word)
   search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
   . 可以表示任何一个字母。

   示例:
    addWord("bad")
    addWord("dad")
    addWord("mad")
    search("pad") -> false
    search("bad") -> true
    search(".ad") -> true
    search("b..") -> true
 */
class TsWord {
    constructor() {
        this.word = {}; // 对存储的word的长度进行分类，提高性能
    }
    addWord(word) {
        const len = word.length;
        if (!this.word[len]) {
            this.word[len] = [word];
        } else {
            this.word[len].push(word);
        }
    }
    search(key) {
        const keyLen = key.length;
        const cacheArr = this.word[keyLen];
        if (!cacheArr) return false;

        if (key.indexOf('.') < 0) { // 不存在正则
            return cacheArr.includes(key);
        }
        
        const reg = new RegExp(key);

        return cacheArr.some(value => {
            return reg.test(value)
        })
    }
}

const tsWork = new TsWord();

tsWork.addWord("bad")
tsWork.addWord("dad")
tsWork.addWord("mad")
console.log(tsWork.search("pad"))
console.log(tsWork.search("bad"))
console.log(tsWork.search(".ad"))
console.log(tsWork.search("b.."))