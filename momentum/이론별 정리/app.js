const loginForm =document.querySelector("#login-form");
const loginInput =document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");


//const link = document.querySelector("a");

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

//1. form이 제출되는 걸 막아줌
//2. form className을 추가함. -> form이 실행됨 -> form이 사라짐.
//3. h1 태그의 className을 바꿔줌
const HIDDEN_CLASSNAME = "hidden"; //하나의 관습으로 중요하지 않은 정보지만 중복사용되기 때문에 대문자로 변수값을 지정.

const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);//className 중 .hidden 기능의 css적용 추가함.
    const username = loginInput.value; 
    localStorage.setItem(USERNAME_KEY, username);
    // console.log(username);
    //`${변수명}` : 문자열 안에 변수값을 넣을 수 있게 쌍따옴표 대신 백틱을 사용하는 게 깔끔할 수도 있다.
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText =`Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME); //= "Hello " + username; 
}
const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername == null){
    //show the Form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}else {
    //show the Greeting
    paintGreetings(savedUsername);
}