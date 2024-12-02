// js로 html을 변경시킴
// alert("hi");
document.title ="❤️SHULLY❤️";

// const player = {
//     name: "coco",
//     points: 10,
//     fat: true,
// };
// console.log(player); //{name: 'coco', points: 10, fat: true}
// player.name = "koko";
// player.points= player.points +15;
// player.lastName = "popo";
// console.log(player);//{name: 'koko', points: 25, fat: true, lastName: 'popo'}
// console.log(player.name);//koko


function sayHello(name,age) {
    console.log("hello "+ name+ " and I'm "+ age);
}
sayHello("coco", 10); //= alret() 과 같은 역할을 함
sayHello("coco", 14); 
sayHello("coco", 16); 

const player = {
    name: "coco",
    sayHello: function(nn){
        console.log("hello!"+ nn);
    },
};
player.name="k";// 객체 값 변경도 가능
player.s ="soon";// 객체 값 추가도 가능.
console.log(player)
// console.log(player.name);
// player.sayHello("dd");
function minus(pp) {// {}안에 들어 간 내용을 body 라고 한다.
    console.log(pp - 5);
}

minus(10,10,30,450);//5
const calcul = {
    add: function(a,b) {
        return a= 2, b=3,
                console.log(a,b),
                console.log("Times: "+ a*b),
                alert("power: "+ a**b);
    },
};// ; 와 , 를 빼먹지 않도록 주의할 것.
//calcul.add();

const Rㅣ = calcul.add(4,5);
//console.log(R);

//const age = prompt("HOW"); //alret 와같이 팝업창이 뜨는데 그 아래 입력칸도 생김.
// const age1 = prompt("14");
// console.log(age);
// console.log(isNaN(age));
// console.log(typeOf(age1), persint(age1));

const age22 = parseInt(prompt("HOW")); // parseInt 철자와 대소문자 구별에 주의!
if (isNaN(age22) || age < 0) {
    console.log("정상적인 나이를 나타내는 숫자를 입력하셍."); 
} else if (age22 <18) { 
    console.log("미성년자임");
} else {// 언제나 사용해야하는 건 아님.
    console.log("성인임");
}
document.title ="바뀐다." // html에 정의되었더라고 하더라도. 여기에 입력한 값으로 바뀜. 