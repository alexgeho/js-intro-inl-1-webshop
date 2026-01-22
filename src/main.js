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
