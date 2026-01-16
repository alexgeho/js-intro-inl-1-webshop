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

hidenProd.innerHTML += productsHidenObject;
hidenProd.innerHTML += productsHidenObject.name;
hidenProd.innerHTML += productsHidenObject.price;

function showHiden(){
  document.querySelector('.products-hide').style.display = 'block';
}

const btn = document.querySelector('#clickMe')

btn.addEventListener('click', showHiden)




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
