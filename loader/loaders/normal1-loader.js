function loader(source) {
  console.log("normal1");
  return source + "//normal1";
}

loader.pitch = function () {
  console.log(`normal1 pitch`);
};
module.exports = loader;
