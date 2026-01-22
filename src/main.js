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
    <button>Köp</button>
    </article> 
    `
  }
productsListing.innerHTML = html;

}
printProducts();






/* function renderProducts(category = '', min = 0, max = Infinity) {
  list.innerHTML = '';

  const result = products

    .filter(product =>
      (!category || product.category === category)
    )

    .forEach(product => {
      const li = document.createElement('li');

      li.innerHTML = `
        <h4>${product.name}</h4>
    <div class="img-wrap">
        <img
          src="./src/img/${product.images[0]}"
           data-images='${JSON.stringify(product.images)}'
            data-index="0" class="product-img" >

          <div class="img-dots">
           ${product.images.map((_, i) =>
            `<span class="dot ${i === 0 ? 'active' : ''}"></span>`
            ).join('')}
          </div>
     </div>

        <p>${product.price} kr</p>
        <p>Rating: ${product.rating}</p>
        <p>Categori: ${product.category}</p>
        <button>Köp</button>

      `;



      list.appendChild(li);
    });
} */



// renderProducts();

/* 
      const buyButtons = document.querySelectorAll('#productsList button')
      console.log('buyButtons::::', buyButtons); */