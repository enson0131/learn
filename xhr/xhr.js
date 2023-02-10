const SERVER_URL = "https://stats.g.doubleclick.net/j/collect";
let xhr = new XMLHttpRequest();
xhr.open("POST", SERVER_URL, true);
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return;
  if (this.status === 200) {
    console.log("请求成功: - 200: ", this);
  } else {
    console.log(`请求成功 - ${this.status}: `, this);
  }
}

xhr.onerror = function () {
  console.log(`请求失败 - ${this.status}: `, this.statusText)
}

xhr.setRequestHeader("Accept", "*/*");
xhr.responseType = "json";
setTimeout(() => {
    xhr.send("t=dc&aip=1&_r=3&v=1&_v=j96&tid=UA-36116321-5&cid=830505092.1621180818&jid=1026285878&gjid=1584384230&_gid=2074967334.1638599963&_u=QACAAAAAAAAAAC~&z=847299491");
    xhr.abort();
}, 2000)




// var obj = {
//   a:1,
//   b:2,
//   c:3
// };

// obj[Symbol.iterator] = function(){
//   var keys = Object.keys(this);
//   var count = 0;
//   return {
//       next(){
//           if(count<keys.length){
//               return {value: obj[keys[count++]],done:false};
//           }else{
//               return {value:undefined,done:true};
//           }
//       }
//   }
// };

// for(var k of obj){
//   console.log(k);
// }

// const xhr = new XMLHttpRequest();

// xhr.open(`GET`, 'XXXX', true);


// xhr.onreadystatechange = function () {
//    if (this.readyState === 4 && this.status === 200) {

//    } 
// }

// xhr.send();
