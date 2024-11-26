const startTime = Date.now();
fetch("http://localhost:3000/slow").then((res) => {
  console.log("slow耗时：", Date.now() - startTime);
});

fetch("http://localhost:3000/fast").then((res) => {
  console.log("fast耗时：", Date.now() - startTime);
});
