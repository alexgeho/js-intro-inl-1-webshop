import products from './products.mjs';

const cart = [];


/* START - catalog filter */

const productsListing = document.querySelector('#productsList');
const filter = document.querySelector('#categoryFilter');
const sortByNameBtn = document.querySelector('#sortByNameBtn')
const sortByPriceBtn = document.querySelector('#sortByPriceBtn')

let filteredProducts = products;

filter.addEventListener('change', onFilterChange);
productsListing.addEventListener('click', onDotClick);

sortByNameBtn.addEventListener('click', sortByName)
sortByPriceBtn.addEventListener('click', sortByPrice)

function sortByName() {
  filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  printProducts();
}

function onFilterChange() {
  filteredProducts = products.filter(p =>
    !filter.value || p.category === filter.value
  );
  printProducts();
}

function sortByPrice() {
  filteredProducts.sort((a, b) => b.price - a.price);
  printProducts(filter.value);
}

function onDotClick(e) {
  if (!e.target.classList.contains('dot')) return;

  const dotsWrap = e.target.parentElement;
  const dots = [...dotsWrap.children];
  const index = dots.indexOf(e.target);

  const img = dotsWrap.previousElementSibling;
  const images = JSON.parse(img.dataset.images);

  img.src = `./src/img/${images[index]}`;
  img.dataset.index = index;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function printProducts() {

  productsListing.innerHTML = '';

  let html = '';

  for (let i = 0; i < filteredProducts.length; i++) {
    const currentProduct = filteredProducts[i];

    html += `
    <article>
    <h3>${currentProduct.name}</h3>
       <div class="img-wrap">
        <img
          src="./src/img/${currentProduct.images[0]}"
           data-images='${JSON.stringify(currentProduct.images)}'
            data-index="0" class="product-img" >

          <div class="img-dots">
           ${currentProduct.images.map((_, i) =>
      `<span class="dot ${i === 0 ? 'active' : ''}"></span>`
    ).join('')}
          </div>
     </div>
      <div class="metadata">
          <p>Pris: ${currentProduct.price} kr</p>
          <p>Betyg: ${currentProduct.rating}/5</p>
        </div>
    <p>Categori: ${currentProduct.category}</p>
    <button data-id="${currentProduct.name}">Köp</button>
    </article> 
    `
  }
  productsListing.innerHTML = html;

  const buyButtons = document.querySelectorAll('#productsList button')

  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductToCard);
  });
}
function addProductToCard(e) {
  const id = e.target.dataset.id;
  const product = products.find(p => p.name === id);
  cart.push(product);
  console.log('product::::::::>>>', product);

  console.log('Bitaw add ProductTo Card');
}

printProducts();
