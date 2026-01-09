import './style.css';

const clickMeBtn = document.querySelector('#clickMe');
clickMeBtn.addEventListener('click', helloWorld);

function helloWorld() {
  alert('Hej Världen!');
}
