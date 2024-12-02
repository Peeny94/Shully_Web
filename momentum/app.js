const h1 = document.querySelector("div.hello h1");
console.log(h1);
//className 을 태그에서 지정해 줄 수 있다.*주의* HTML에서 class로 지정한 것을 js에서 className으로 불러온다.
function handleTitleClick() {
    //console.log(h1.className);//  <h1 className="tagging"> Me.</h1>
    /*
    1.변수값에 사용할 class name을 저장하는 것은 코드에러를 막아줄 수 있다.
    2.class name을 추가할 땐, 띄어쓰기 후 추가해 주면 효과가 적용된다. 개꿀.
    3.classList 
    4. toggle
    */
    const clickedClass ="clicked";
    /* 1. 기본형
    if(h1.className == clickedClass) {
         h1.className ="";
    } else {
         h1.className= clickedClass;
    }
    */
    /*2. classList형
    if(h1.classList.contains(clickedClass)) {
        h1.classList.remove(clickedClass);//=h1.className ="";
        
    } else {
        h1.classList.add(clickedClass);//=h1.className= clickedClass;
    }
    */
   /*
   3. toggle형 classList의 remove,add 기능을 한 번에 실현.
    */
  h1.classList.toggle("clicked");

}

h1.addEventListener("click", handleTitleClick);
