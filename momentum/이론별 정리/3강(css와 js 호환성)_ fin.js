//style.css
    // body{
    //     background-color: beige;
    // }

    // h1 {
    //     color: cornflowerblue;
    // }
    // /* class name을 정의한 것이므로 js에서 해당 css효과를 쓸 때는 정확한 철자로 입력해야 한다. */
    // .clicked {
    // color: pink;
    // /* 효과가 나타날 때 천천히 발현된다. 개 cool */
    // transition: color .5s ease-in-out;
    // }

    // .cutie-font {
    //     font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    // }

/*------------------------------------------------------------------------------------------*/
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
