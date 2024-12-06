import './styles.css';

const hello = document.querySelector('.hello div');//=#hello, #='id'or 'class'를 의미함.

const heightChange = window.innerHeight;
const widthChange = window.innerWidth;
/*참고
console.log(parent.innerWidth);// 가장 가까운 프레임셋의 뷰포트의 너비를 기록합니다.
console.log(top.innerWidth);// 가장 먼 프레임셋의 뷰포트의 너비를 기록합니다.
onresized
onload

*/
console.log(window.frames);
console.log(window);
const superHadeler = {
  resizedCalcul: function(e) {
    e.preventDefault();
    if (heightChange==window.outerHeight){
      document.body.style.backgroundColor = 'purple';
    }

  },
  windowResized: function(){
    document.body.style.backgroundColor = 'tomato';
    
  } 
}

console.log(window.frames.innerHeight, window.frames.innerWidth);
window.addEventListener('load', superHadeler.resizedCalcul);
window.addEventListener('resize', superHadeler.windowResized);