//("div.hello:first-child h1");
//(".hello:first-child h1"); 아건 안됨.
const h1 = document.querySelector(".hello h1");
h1.innerText ="CSS는 어려워";

console.log(h1);
console.dir(h1);

console.log(h1.style.color);
h1.style.color ="blue";
console.log(h1.style.color);
//event함수 만들기. 1.틀릭 이벤트
function handleh1Click(){
    console.log("제목이 클릭되었다.");
    //h1.style.color ="red";
    const currentColor =h1.style.color;
    let newColor;
    if(currentColor=="blue") {
        newColor ="tomato";
        } else {
        newColor = "blue"; 
        }
        h1.style.color= newColor;
}
h1.addEventListener("click",handleh1Click);//= h1.onclick = handleh1Click;

//HTMLHeadingElement : 누군가 하는 행동을 감지할 수 있음.
function handleMouseEnter(){
    console.log("마우스가 여깄다.");
    //h1.style.color ="grey";
    h1.innerText ="CSS는 마우스 위";
}
function handleMouseLeave(){
    console.log("마우스가 여깄다.");
    h1.innerText ="CSS는 마우스 떠남";
    //h1.style.color ="black";
}
h1.addEventListener("mouseenter",handleMouseEnter);//= h1.onmouseenter = handleMouseEnter;
h1.addEventListener("mouseleave",handleMouseLeave);

    //window창 크기를 바꿀 경우 그 행위를 감지
function handleWindowResize(){
    document.body.style.backgroundColor ="tomato";
}

function handleWindowCopy(){
    alert("copy!");
}
function handleWindowOffline(){
    alert("Off!");
}
function handleWindowOnline(){
    alert("On!");
}
window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);
//wife on/off를 감지함 핵신기.
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);
//event함수 만들기. 2.@@ 이벤트