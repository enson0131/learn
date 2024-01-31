const SyncHook = require("./SyncHook");

const hooks = new SyncHook(["arg1", "arg2"]);

hooks.tap("1", (arg1, arg2) => {
  console.log("hello", arg1, arg2);
});

hooks.tap("2", (arg1, arg2) => {
  console.log("hello2", arg1, arg2);
});

hooks.call("enson", "test");

hooks.tap("3", (arg1, arg2) => {
  console.log("hello3", arg1, arg2);
});
console.log("------");
hooks.call("enson1", "test1");
