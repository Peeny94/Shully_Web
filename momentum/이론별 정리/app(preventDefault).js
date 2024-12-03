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
    event.preventDefault();// 함수가 실행되는 걸 막아줌. property가 사라지지 않게 됨으로써 리셋되는 걸 방지함.
    //const tomato = loginInput.value;
    console.log(loginInput.value);// tomato argument에 포함된 정보들로 여러 기능 활용할 수 있다.
}

function handleLinkClick(event){
    event.preventDefault();
    console.dir(event);
    // alert의 특이한 기능으로 모든 기능의 앞에 나타나게 된다. 그래서 잘 사용되지 않음.
    //alert("clicked");// 1. 팝업창이 먼저 실행된 후,-> 2.link의 기본 웹브라우저 기능이 실행된다.
}
// () 를 붙이면 함수가 바로 실행됨. 붙이지 않아야 이벤트가 지정된 순간 발생할 때만 함수가 실행되어질 수 있다.
loginForm.addEventListener("submit", onLoginSubmit) 
link.addEventListener("click",handleLinkClick);

/* .HTML 파일
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <mata name="viewport" contnet ="width=device-width", initial-scale="1.0"/>
        <link rel="stylesheet" href="style.css"/>
        <title>Hello!HTML!</title>
    </head>
    <body>
<!-- div 태그가 아닌 form 을 이용한 property의 유효성 검증에 용이하다고 함. 잘은 모름. enter기능으로 버튼클릭 효과가 나타남 
            form의 기본동작은 submit임을 기억해 두기.-->
        <form id="login-form" > 
            <input required maxlength="15" type="text" placeholder="What is your name?"/>
            <!-- <button>Log In</button>은 하기 input태그와 같은 효과로 버튼 값을 클릭하면 property가 제출되어진다. -->
             <input type="submit" value="Log In"/>
        </form>
<!-- 링크의 기본 동작은 다른 페이지로의 이동임을 명심하기.
         -->
        <a href="">Go to Pages</a>
        <script src="app.js"></script>
    </body>
</html>
*/