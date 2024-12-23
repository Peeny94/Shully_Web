// <⚠️ DONT DELETE THIS ⚠️>
//import './styles.css';

const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f39c12', '#e74c3c'];
// <⚠️ /DONT DELETE THIS ⚠️>

const title = document.querySelector('h2');

const superEventHandler = {
  Mouseover: function () {
    title.innerText = 'Mouse In';
    title.style.color = colors[3];
  },
  Mouseout: function () {
    title.innerText = 'Mouse Out';
    title.style.color = colors[2];
  },
  resized: function () {
    title.innerText = 'Resized';
    title.style.color = colors[1];
  },
  MouseRightclicked: function (event) {
    title.innerText = 'Mouse Right Clicked';
    title.style.color = colors[0];
  },
};

title.addEventListener('mouseenter', superEventHandler.Mouseover);
title.addEventListener('mouseleave', superEventHandler.Mouseout);
window.addEventListener('resize', superEventHandler.resized);
window.addEventListener('contextmenu', superEventHandler.MouseRightclicked);
