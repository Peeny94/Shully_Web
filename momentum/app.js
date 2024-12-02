
// <div class ="hello1" id="title">
// <h1>중간</h1>
// </div> 
/*HTML상/ 하기코드로 js, null 오류가 뜸. */

const title = document.querySelector(".hello1:first-child h1");
const title2 = document.querySelector("div.hello1:first-child h1");
title2.innerText ="CSS는 어려워";
console.log(title2);