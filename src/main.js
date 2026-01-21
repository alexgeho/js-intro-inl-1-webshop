// const msgDiv = document.querySelector('#msg');

// const munkarDbTest4 = [

//   {
//     name: 'honey munk 3',
//     count: 0,
//   },

//   {
//     name: 'vanila munk 2',
//     count: 0,
//   },

//   {
//     name: 'blueberry munk 2',
//     count: 0,
//   },
// ];

// const coffeeDb = [

//   {
//     name: 'Americano',
//     count: 0,
//   },

//   {
//     name: 'Latte',
//     count: 0,
//   },

//   {
//     name: 'Espresso',
//     count: 0,
//   },
// ];

const products = [
  // MUNKAR – CLASSIC
  { name: 'Honey Munk', price: 25, rating: 4.2, category: 'munk-classic', images: ['munk1.png', 'munk2.png'] },
  { name: 'Vanilla Munk', price: 22, rating: 3.8, category: 'munk-classic', images: ['munk3.png', 'munk4.png'] },
  { name: 'Chocolate Munk', price: 28, rating: 4.7, category: 'munk-classic', images: [] },

  // MUNKAR – VEGAN
  { name: 'Vegan Berry Munk', price: 30, rating: 4.3, category: 'munk-vegan', images: [] },
  { name: 'Vegan Lemon Munk', price: 29, rating: 4.1, category: 'munk-vegan', images: [] },
  { name: 'Vegan Cocoa Munk', price: 31, rating: 4.5, category: 'munk-vegan', images: [] },

  // MUNKAR – PROTEIN
  { name: 'Protein Peanut Munk', price: 35, rating: 4.8, category: 'munk-protein', images: [] },
  { name: 'Protein Banana Munk', price: 34, rating: 4.4, category: 'munk-protein', images: [] },
  { name: 'Protein Almond Munk', price: 36, rating: 4.9, category: 'munk-protein', images: [] },
  { name: 'Protein Cocoa Munk', price: 37, rating: 4.6, category: 'munk-protein', images: [] },

  // DRINKS
  { name: 'Americano', price: 30, rating: 4.0, category: 'drink', images: [] },
  { name: 'Latte', price: 32, rating: 4.4, category: 'drink', images: [] },
  { name: 'Orange Juice', price: 25, rating: 4.1, category: 'drink', images: [] },
  { name: 'Mineral Water', price: 20, rating: 3.9, category: 'drink', images: [] },
];


/* START - catalog filter */

const list = document.querySelector('#productsList');
const filter = document.querySelector('#categoryFilter');
const sortByNameBtn = document.querySelector('#sortByNameBtn')
const sortByPriceBtn = document.querySelector('#sortByPriceBtn')

filter.addEventListener('change', () => {
  renderProducts(filter.value);
});

list.addEventListener('click', (e) => {
  if (!e.target.classList.contains('product-img')) return;

  const img = e.target;

  const images = JSON.parse(img.dataset.images);
  let index = Number(img.dataset.index);

  index = (index + 1) % images.length;

  img.src = `./src/img/${images[index]}`;
  img.dataset.index = index;
});

sortByNameBtn.addEventListener('click', sortByName)


function sortByName() {
  products.sort((a, b) => a.name.localeCompare(b.name));
  renderProducts(filter.value);
}


function renderProducts(category = '', min = 0, max = Infinity) {
  list.innerHTML = '';

  const result = products
    .filter(product =>
      (!category || product.category === category)
    )
    .forEach(product => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h4>${product.name}</h4>    
         <img 
          src="./src/img/${product.images[0]}"
          data-images='${JSON.stringify(product.images)}'
          data-index="0"
          class="product-img"
          alt="${product.name}"
        >    
        <p>${product.price} kr</p>
        <p>Rating: ${product.rating}</p>
        <p>Categori: ${product.category}</p>
      `;
      list.appendChild(li);
    });
}



renderProducts();




/* END - catalog */


// const shelf = document.querySelector('#munkarTest4')
// const shelfCoffee = document.querySelector('#coffee')

// const addMunkBtn = document.querySelector('#addMunkBtn')

// const newMunkName = document.querySelector('#newMunkField')

// const munkText = newMunkName.value;

// const index = munkarDbTest4.findIndex(singleMunkObject => singleMunkObject.name === munkText)



// const ticker = setInterval(printConsoleMsg, 2000);
// let intervalCounter = 0;

// function printConsoleMsg() {
// console.log('tick:::::', intervalCounter);
// intervalCounter++;

// if (intervalCounter > 10) {
//   clearInterval(ticker)
// }

// }

// function showAddedMessage() {
//   msgDiv.innerHTML = 'Munk lades till';
//   setTimeout(clearMessage, 2000)
// }

// function clearMessage(params) {
//   msgDiv.innerHTML = '';
// }


// printMunkShelf();
// printCoffeeShelf();


// addMunkBtn.addEventListener('click', addNewMunk)

// function addNewMunk() {
//   const munkText = newMunkName.value.trim();

//   if (!munkText) return;

//   const index = munkarDbTest4.findIndex(
//     munk => munk.name === munkText
//   );

//   if (index === -1) {
//     munkarDbTest4.push({ name: munkText, count: 1 });
//     showAddedMessage();
//   } else {
//     munkarDbTest4[index].count++;
//     showAddedMessage();
//   }

//   printMunkShelf();
//   showAddedMessage();
// }

// /* 
// Prins <li> elements of the donuts
// */

// function printMunkShelf() {

//   shelf.innerHTML = '';

//   for (let i = 0; i < munkarDbTest4.length; i++) {

//     const _munkName = munkarDbTest4[i].name;
//     const _munkCount = munkarDbTest4[i].count;

//     const munkName = _munkName + ' ( ' + _munkCount + ' )';

//     const munk1Node = document.createElement('li');
//     const munk1TextNode = document.createTextNode(munkName);

//     // Trash icon
//     const trashIcon = document.createElement('button');
//     trashIcon.setAttribute('data-name', _munkName);
//     trashIcon.classList.add('material-symbols-outlined');
//     const trashIconText = document.createTextNode('delete');
//     trashIcon.appendChild(trashIconText);


//     munk1Node.appendChild(munk1TextNode);
//     munk1Node.appendChild(trashIcon);

//     shelf.appendChild(munk1Node)
//   }

//   const munks = Array.from(document.querySelectorAll('li button'))

//   munks.forEach((item) => {
//     item.addEventListener('click', removeMunk)
//   })
// }


// /* 
// Remove munks
// */

// function removeMunk(event) {

//   const clickedMunk = event.target.dataset.name;


//   const index = munkarDbTest4.findIndex(singleMunkObject => singleMunkObject.name === clickedMunk)
//   if (index > -1) {
//     munkarDbTest4.splice(index, 1);
//     printMunkShelf();
//   }
// }

// /* 
// Prins <li> elements of the coffee
// */

// function printCoffeeShelf() {

//   shelfCoffee.innerHTML = '';

//   for (let i = 0; i < coffeeDb.length; i++) {

//     const _coffeeName = coffeeDb[i].name;
//     const _coffeeCount = coffeeDb[i].count;

//     const coffeeName = _coffeeName + ' ( ' + _coffeeCount + ' )';

//     const coffeeNode = document.createElement('li');
//     const coffeeTextNode = document.createTextNode(coffeeName);

//     // Trash icon
//     const trashIcon = document.createElement('button');
//     trashIcon.setAttribute('data-name', _coffeeName);
//     trashIcon.classList.add('material-symbols-outlined');
//     const trashIconText = document.createTextNode('delete');
//     trashIcon.appendChild(trashIconText);


//     coffeeNode.appendChild(coffeeTextNode);
//     coffeeNode.appendChild(trashIcon);

//     shelfCoffee.appendChild(coffeeNode)
//   }

//   const coffee = Array.from(document.querySelectorAll('li button'))

//   coffee.forEach((item) => {
//     item.addEventListener('click', removeCoffee)
//   })
// }

// /* 
// Remove munks
// */

// function removeCoffee(event) {

//   const clickedCoffee = event.target.dataset.name;

//   const index = coffeeDb.findIndex(singleCoffeeObject => singleCoffeeObject.name === clickedCoffee)
//   if (index > -1) {
//     coffeeDb.splice(index, 1);
//     printCoffeeShelf();
//   }
// }


/* START - BURGER MENU */

const openCloseNavMenu = document.querySelector('#openCloseNavMenu')
const navBugerJs = document.querySelector('#navBugerJs')
const menuLinks = document.querySelectorAll('#menuLinks a').forEach(a => a.textContent = a.textContent.toUpperCase())

openCloseNavMenu.addEventListener('click', toggleMenuOpenState)
navBugerJs.addEventListener('click', toggleMenuOpenState)

function toggleMenuOpenState() {
  openCloseNavMenu.classList.toggle('open')
  navBugerJs.classList.toggle('open')
}

/* END - BURGER MENU */


// /* for buttons */

// const main = document.querySelector('main');

// /////// Munkar Button

// const btn = document.querySelector('#btnCategories')
// const list = document.querySelector('#munkarTest4')


// btn.addEventListener('click', () => {
//   const isOpen = list.classList.toggle('open')
//   main.classList.toggle('categories-open', isOpen)

//   btn.textContent = isOpen ? 'Hide munkar' : 'Munkar'
// })

// /////// Coffee Button

// const btnCoffee = document.querySelector('#btnCategoriesCoffee')
// const listCoffee = document.querySelector('#coffee')


// btnCoffee.addEventListener('click', () => {
//   const isOpen = listCoffee.classList.toggle('open')
//   main.classList.toggle('categories-open', isOpen)

//   btnCoffee.textContent = isOpen ? 'Hide coffee' : 'Coffee'
// })

