const title =document.getElementById("title");
console.dir(title);//element 요소를 좀 더 자세히 보여줌 , "" 문자 표시를 넣으면 안됨! 하나의 id값을 검색하는 것이기 때문에!!
title.innerText ="js에 의해 HTML에 정의된 내용에 영향이 감을 알 수 있지."
console.log(title.id);
console.log(title.className);