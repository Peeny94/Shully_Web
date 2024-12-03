const loginForm =document.querySelector("#login-form");
const loginInput =document.querySelector("#login-form input");

const link = document.querySelector("a");

// function onLoginBtnClick() {
//     console.dir(loginInput);// 해당 변수에 사용되는 함수들의 목록을 볼 수 있음.
//     alert("hello, " + loginInput.value + " Welcome");// 입력값을 가져옴=property
//     console.log("click");
// }
/*
*function onLoginSubmit(event)) {//1 argument= tomato(=>event)를 받고있다.
*    tomato.preventDefault();
*    //const tomato = loginInput.value;
*    console.log(event));// tomato argument에 포함된 정보들로 여러 기능 활용할 수 있다.
*}
*/

function onLoginSubmit(event) {
    event.preventDefault();
    const ursename = loginInput.value;
    loginForm.classList.add("hiddin");
}


loginForm.addEventListener("submit", onLoginSubmit) 
