const msgDiv = document.querySelector('#msg');

const munkarDbTest4 = [

  {
    name: 'honey munk 3',
    count: 0,
  },

  {
    name: 'vanila munk 2',
    count: 0,
  },

  {
    name: 'blueberry munk 2',
    count: 0,
  },
];

const coffeeDb = [

  {
    name: 'Americano',
    count: 0,
  },

  {
    name: 'Latte',
    count: 0,
  },

  {
    name: 'Espresso',
    count: 0,
  },
];

const shelf = document.querySelector('#munkarTest4')
const shelfCoffee = document.querySelector('#coffee')

const addMunkBtn = document.querySelector('#addMunkBtn')

const newMunkName = document.querySelector('#newMunkField')

const munkText = newMunkName.value;

const index = munkarDbTest4.findIndex(singleMunkObject => singleMunkObject.name === munkText)



const ticker = setInterval(printConsoleMsg, 2000);
let intervalCounter = 0;

function printConsoleMsg() {
console.log('tick:::::', intervalCounter);
intervalCounter++;

if (intervalCounter > 10) {
  clearInterval(ticker)
}

}

function showAddedMessage() {
  msgDiv.innerHTML = 'Munk lades till';
  setTimeout(clearMessage, 2000)
}

function clearMessage(params) {
  msgDiv.innerHTML = '';
}


printMunkShelf();
printCoffeeShelf();


addMunkBtn.addEventListener('click', addNewMunk)

function addNewMunk() {
  const munkText = newMunkName.value.trim();

  if (!munkText) return;

  const index = munkarDbTest4.findIndex(
    munk => munk.name === munkText
  );

  if (index === -1) {
    munkarDbTest4.push({ name: munkText, count: 1 });
    showAddedMessage();
  } else {
    munkarDbTest4[index].count++;
    showAddedMessage();
  }

  printMunkShelf();
  showAddedMessage();
}

/* 
Prins <li> elements of the donuts
*/

function printMunkShelf() {

  shelf.innerHTML = '';

  for (let i = 0; i < munkarDbTest4.length; i++) {

    const _munkName = munkarDbTest4[i].name;
    const _munkCount = munkarDbTest4[i].count;

    const munkName = _munkName + ' ( ' + _munkCount + ' )';

    const munk1Node = document.createElement('li');
    const munk1TextNode = document.createTextNode(munkName);

    // Trash icon
    const trashIcon = document.createElement('button');
    trashIcon.setAttribute('data-name', _munkName);
    trashIcon.classList.add('material-symbols-outlined');
    const trashIconText = document.createTextNode('delete');
    trashIcon.appendChild(trashIconText);


    munk1Node.appendChild(munk1TextNode);
    munk1Node.appendChild(trashIcon);

    shelf.appendChild(munk1Node)
  }

  const munks = Array.from(document.querySelectorAll('li button'))

  munks.forEach((item) => {
    item.addEventListener('click', removeMunk)
  })
}


/* 
Remove munks
*/

function removeMunk(event) {

  const clickedMunk = event.target.dataset.name;


  const index = munkarDbTest4.findIndex(singleMunkObject => singleMunkObject.name === clickedMunk)
  if (index > -1) {
    munkarDbTest4.splice(index, 1);
    printMunkShelf();
  }
}

/* 
Prins <li> elements of the coffee
*/

function printCoffeeShelf() {

  shelfCoffee.innerHTML = '';

  for (let i = 0; i < coffeeDb.length; i++) {

    const _coffeeName = coffeeDb[i].name;
    const _coffeeCount = coffeeDb[i].count;

    const coffeeName = _coffeeName + ' ( ' + _coffeeCount + ' )';

    const coffeeNode = document.createElement('li');
    const coffeeTextNode = document.createTextNode(coffeeName);

    // Trash icon
    const trashIcon = document.createElement('button');
    trashIcon.setAttribute('data-name', _coffeeName);
    trashIcon.classList.add('material-symbols-outlined');
    const trashIconText = document.createTextNode('delete');
    trashIcon.appendChild(trashIconText);


    coffeeNode.appendChild(coffeeTextNode);
    coffeeNode.appendChild(trashIcon);

    shelfCoffee.appendChild(coffeeNode)
  }

  const coffee = Array.from(document.querySelectorAll('li button'))

  coffee.forEach((item) => {
    item.addEventListener('click', removeCoffee)
  })
}

/* 
Remove munks
*/

function removeCoffee(event) {

  const clickedCoffee = event.target.dataset.name;

  const index = coffeeDb.findIndex(singleCoffeeObject => singleCoffeeObject.name === clickedCoffee)
  if (index > -1) {
    coffeeDb.splice(index, 1);
    printCoffeeShelf();
  }
}

///// BURGER - 15_-_meny-knapp_med_javascript///
const openCloseNavMenu = document.querySelector('#openCloseNavMenu')
const navBugerJs = document.querySelector('#navBugerJs')
const menuLinks = document.querySelectorAll('#menuLinks a').forEach(a => a.textContent = a.textContent.toUpperCase())



openCloseNavMenu.addEventListener('click', toggleMenuOpenState)
navBugerJs.addEventListener('click', toggleMenuOpenState)

function toggleMenuOpenState() {
  openCloseNavMenu.classList.toggle('open')
  navBugerJs.classList.toggle('open')
}
/* for buttons */

const main = document.querySelector('main');

/////// Munkar Button

const btn = document.querySelector('#btnCategories')
const list = document.querySelector('#munkarTest4')


btn.addEventListener('click', () => {
  const isOpen = list.classList.toggle('open')
  main.classList.toggle('categories-open', isOpen)

  btn.textContent = isOpen ? 'Hide munkar' : 'Munkar'
})

/////// Coffee Button

const btnCoffee = document.querySelector('#btnCategoriesCoffee')
const listCoffee = document.querySelector('#coffee')


btnCoffee.addEventListener('click', () => {
  const isOpen = listCoffee.classList.toggle('open')
  main.classList.toggle('categories-open', isOpen)

  btnCoffee.textContent = isOpen ? 'Hide coffee' : 'Coffee'
})

