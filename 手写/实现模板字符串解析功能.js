
// (\w+) - 分组匹配 字母数组下划线
function replaceModel(str, data) {
    return str.replace(/\{\{(\w+)\}\}/g, function(match, key) {
        return data[key];
    });
}