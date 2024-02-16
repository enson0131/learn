function loader(source) {
  console.log("inline1");
  return source + "//inline1";
}
module.exports = loader;
