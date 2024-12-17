//import './styles.css';// html에 직접 입력함.

const hello = document.querySelector('body');//=#hello, #='id'or 'class'를 의미함.

let widthChange = window.innerWidth;
/*참고
console.log(parent.innerWidth);// 가장 가까운 프레임셋의 뷰포트의 너비를 기록합니다.
console.log(top.innerWidth);// 가장 먼 프레임셋의 뷰포트의 너비를 기록합니다.
onresized
onload

*/
// console.log(window.frames);
// console.log(window);
// const superHadeler = {
//   windowResized: function (e) {
//     //e.preventDefault();
//     if (widthChange > 800) {
//       e.preventDefault();
//       hello.classList.toggle('windowLarge'); //puple
//     } else if (500 <= widthChange && widthChange <= 800) {
//       hello.classList.toggle('windowMiddle'); //yellow
//     } else if (widthChange < 500) {
//       hello.classList.toggle('windowSmall'); //red
//     }
//   },
// };
// console.dir(hello);
// console.log(window.frames.innerHeight, window.frames.innerWidth);
// window.addEventListener('resize', superHadeler.windowResized);


// const hello = document.querySelector('body'); // body 요소 선택

//import './styles.css';


const superHadeler = {
  windowResized: function () {
    let widthChange = window.innerWidth;

    if (widthChange > 800) {
      hello.classList.toggle('windowLarge'); //puple
    } else if (500 <= widthChange && widthChange <= 800) {
      hello.classList.toggle('windowMiddle'); //yellow
    } else if (widthChange < 500) {
      hello.classList.toggle('windowSmall'); //red
    }
  },
};
console.log(document.getElementsByClassName(".click"))
superHadeler.windowResized();
window.addEventListener('resize', superHadeler.windowResized);

