/**
 * 思路:
 *
 * 1 通过闭包的形式，将 请求方法 fn 和 分割数量 limit 保存在内存中
 * 2 将一组请求参数分割成多个请求参数
 * 3 分别发送请求，最终聚合结果
 */
type Item = any;
function createAutoSplitRequest<Key, Item>(
  fn: (keys: Key[]) => Promise<Item[]>,
  limit: number
) {
  return async function (params: Key[]) {
    let groups: any = [];
    let res: Item[] = [];
    for (let i = 0; i < params.length; i += limit) {
      groups.push(params.slice(i, i + limit));
    }

    for (let group of groups) {
      const result = await fn(group);
      res = res.concat(result);
    }

    return res;
  };
}
