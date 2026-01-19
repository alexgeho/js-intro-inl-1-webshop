/// Loopar with munkar

const munkarDbTest4 = ['honey  munk', 'vanilla munk', 'blueberry munk', 'cinnamon munk', 'stawberry munk', 'mango munk', 'banana munk'];

const shelf = document.querySelector('#munkarTest4')

printMunkShelf();

const addMunkBtn = document.querySelector('#addMunkBtn')

addMunkBtn.addEventListener('click', addNewMunk)

const newMunkName = document.querySelector('#newMunkField')

function addNewMunk() {

  if (newMunkName.value.length === 0) {
    return;
  }

  if (munkarDbTest4.indexOf(newMunkName.value) === -1) {
    munkarDbTest4.push(newMunkName.value)
    printMunkShelf();
  }
}



function printMunkShelf() {

  shelf.innerHTML = '';

  for (let i = 0; i < munkarDbTest4.length; i++) {
    const munkName = munkarDbTest4[i];
    const munk1Node = document.createElement('li');
    const munk1TextNode = document.createTextNode(munkName);
    munk1Node.appendChild(munk1TextNode);

    shelf.appendChild(munk1Node)
  }

  const munks = Array.from(document.querySelectorAll('li'))

  munks.forEach((item) => {
    item.addEventListener('click', removeMunk)
  })


}



function removeMunk(event) {

  const index = munkarDbTest4.indexOf(event.target.innerHTML)
  if (index > -1) {
    munkarDbTest4.splice(index, 1);
    printMunkShelf();
  }
}





// const munk1Name = munkarDbTest4[0];
// const munk1Node = document.createElement('li')
// const munk1TextNode = document.createTextNode(munk1Name);

// munk1Node.appendChild(munk1TextNode);

// shelf.appendChild(munk1Node);

// console.log('munk1Name:::::', munk1Name);




/// ARRAY with munkar

const munkarDb = ['honey', 'vanilla', 'blueberry', 'cinnamon', 'stawberry', 'mango', 'banana'];

// console.log('munkar before splice', munkarDb);

munkarDb.splice(4, 2)

// console.log('munkar after splice', munkarDb);

munkarDb.sort()

// console.log('sort:::::', munkarDb);

const hasHoney = munkarDb.indexOf('honey')

// console.log('hasHoney:', hasHoney);

const munkar = document.querySelector('#munkar')

munkar.innerHTML = munkarDb.join(' ')




///// 15_-_meny-knapp_med_javascript + BURGER ///
const openCloseNavMenu = document.querySelector('#openCloseNavMenu')
const navBugerJs = document.querySelector('#navBugerJs')
const menuLinks = document.querySelectorAll('#menuLinks a').forEach(a => a.textContent = a.textContent.toUpperCase())



openCloseNavMenu.addEventListener('click', toggleMenuOpenState)
navBugerJs.addEventListener('click', toggleMenuOpenState)

function toggleMenuOpenState() {
  openCloseNavMenu.classList.toggle('open')
  navBugerJs.classList.toggle('open')
}




///// toDo - chaining for menu links to upper case
/////
/////

const products = [
  { id: 1, name: 'Chokladmunk', price: 25, category: 'Choklad' },
  { id: 2, name: 'Vaniljmunk', price: 22, category: 'Vanilj' }
];

const productsHiden = [
  { id: 1, name: 'Choklad', price: 25, category: 'Choklad-hiden' },
  { id: 2, name: 'Vanilj', price: 22, category: 'Vanilj-hiden' }
];

// TESTS
const productsHidenObject = {
  name: 'silk',
  price: 250000,
  category: 'hiden',
}

const hidenProd = document.querySelector('.products-hide')

hidenProd.innerHTML =
  `<p>${productsHidenObject.name}</p>
<p>${productsHidenObject.price}</p>`


function showHiden() {
  document.querySelector('.products-hide').style.display = 'block'
}

const btn1 = document.querySelector('#clickMe')

btn1.addEventListener('click', showHiden)


////////////////////////////// MY TESTS /////////

const minus = document.querySelector('#subtract');
const plus = document.querySelector('#add');
const currentCount = document.querySelector('#currentCount');

// console.log(minus, plus, currentCount);

minus.addEventListener('click', subtract)

function subtract() {
  console.log(currentCount.value - 1);
  currentCount.value -= 1;
}

function add() {
  currentCount.value = Number(currentCount.value) + 1;
}

plus.addEventListener('click', add)



///////

const btn = document.querySelector('#btnCategories')
const list = document.querySelector('.list')
const main = document.querySelector('main')

btn.addEventListener('click', () => {
  const isOpen = list.classList.toggle('open')
  main.classList.toggle('categories-open', isOpen)

  btn.textContent = isOpen ? 'Hide categories' : 'Show categories'
})



const btnBackground = document.querySelector('#btnBackground')

btnBackground.addEventListener('click', changBackground)

function changBackground() {
  document.body.style.backgroundColor = 'green';
}


// //NEXT STEP
// function renderProducts(list) {
//   const container = document.querySelector('.products');
//   container.innerHTML = '';

//   list.forEach(product => {
//     const div = document.createElement('div');
//     div.textContent = `${product.name} – ${product.price} kr`;
//     container.appendChild(div);
//   });
// }

// document.querySelector('#clickMe').addEventListener('click', () => {
//   renderProducts(products);
//   alert('Hej Världen!');
// });

// // Datum
// console.log(new Date().toLocaleDateString());

// // Timer
// setTimeout(() => {
//   console.log('Webshop ready');
// }, 2000);
