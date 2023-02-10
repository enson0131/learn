
export const forEach = (obj = {}, fn) => {
  Object.keys(obj).forEach((key, index) => {
    fn(obj[key], key)
  })
}