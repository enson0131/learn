function loader(source) {
  console.log("inline2");
  return source + "//inline2";
}
module.exports = loader;
