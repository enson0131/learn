function loader(source) {
  console.log("post1");
  return source + "//post1";
}
module.exports = loader;
