import products from './products.mjs';


/* START - catalog filter */

const list = document.querySelector('#productsList');
const filter = document.querySelector('#categoryFilter');
const sortByNameBtn = document.querySelector('#sortByNameBtn')
const sortByPriceBtn = document.querySelector('#sortByPriceBtn')

filter.addEventListener('change', onFilterChange);
list.addEventListener('click', onDotClick);

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






sortByNameBtn.addEventListener('click', sortByName)
sortByPriceBtn.addEventListener('click', sortByPrice)

function sortByName() {
  products.sort((a, b) => a.name.localeCompare(b.name));
  renderProducts(filter.value);
}

function onFilterChange() {
  renderProducts(filter.value);
}

function sortByPrice() {
  products.sort((a, b) => b.price - a.price);
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
      `;
      list.appendChild(li);
    });
}



renderProducts();
