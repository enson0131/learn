function loader(source) {
  console.log("post1");
  return source + "//post1";
}

loader.pitch = function () {
  console.log(`post1 pitch`);
};
module.exports = loader;
