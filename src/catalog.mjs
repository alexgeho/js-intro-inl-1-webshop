export function initCatalog(products) {


    /* START - catalog filter SORT */

    const productsListing = document.querySelector('#productsList');
    const filter = document.querySelector('#categoryFilter');
    const sortByNameBtn = document.querySelector('#sortByNameBtn')
    const sortByPriceBtn = document.querySelector('#sortByPriceBtn')
    const sortByRatingBtn = document.querySelector('#sortByRatingBtn')

    let filteredProducts = products;

    filter.addEventListener('change', onFilterChange);
    productsListing.addEventListener('click', onDotClick);

    sortByNameBtn.addEventListener('click', sortByName)
    sortByPriceBtn.addEventListener('click', sortByPrice)
    sortByRatingBtn.addEventListener('click', sortByRating)

    function sortByRating() {
        filteredProducts.sort((a, b) => b.rating - a.rating);
        printProducts(filter.value);
    }
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

    /* TOGGLE IMG */
    function onDotClick(e) {
        if (!e.target.classList.contains('dot')) return;

        const dotsWrap = e.target.parentElement;
        const dots = [...dotsWrap.children];
        const index = dots.indexOf(e.target);

        const img = dotsWrap.previousElementSibling;
        const images = JSON.parse(img.dataset.images);

        img.src = `img/${images[index]}`;
        img.dataset.index = index;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    /* PRINT PRODUCTS */
    function printProducts() {

        productsListing.innerHTML = '';

        let html = '';

        for (let i = 0; i < filteredProducts.length; i++) {
            const currentProduct = filteredProducts[i];

            html += `
    <article>
    <h3>${currentProduct.name}</h3>
    <p>ID: ${currentProduct.id}</p>
       <div class="img-wrap">

        <img
          src="img/${currentProduct.images[0]}"
           data-images='${JSON.stringify(currentProduct.images)}'
            data-index="0" class="product-img" 
          >

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

    <div class="buy-row">
    <div class="amount-row">
      <button class="decrease" min="0" data-id="${currentProduct.id}">-</button>
      <input id="amount-${currentProduct.id}" type="number" min="0" disabled>
      <button class="increase" data-id="${currentProduct.id}">+</button>
    </div>
      <button class="buy" data-id="${currentProduct.id}">Köp</button>
    </div>
    
    </article> 
    `
        }
        productsListing.innerHTML = html;



        /* INCREASE BTN */

        const increaseBtns = document.querySelectorAll('#productsList button.increase')

        increaseBtns.forEach((btn) => {
            btn.addEventListener('click', increaseProductCount);
        });




        /* DECREASE BTN */

        const decreaseBtns = document.querySelectorAll('#productsList button.decrease')

        decreaseBtns.forEach((btn) => {
            btn.addEventListener('click', decreaseProductCount);
        });



        /* BUY BTN */

        const buyButtons = document.querySelectorAll('#productsList button.buy')



    }



    /* INCREASE PRODUCT COUNT */

    function increaseProductCount(e) {
        const clickedBtnId = e.target.dataset.id;
        const input = document.querySelector(`#amount-${clickedBtnId}`)
        input.value = Number(input.value) + 1;
    }

    /* DECREASE PRODUCT COUNT */

    function decreaseProductCount(e) {
        const clickedBtnId = e.target.dataset.id;
        const input = document.querySelector(`#amount-${clickedBtnId}`)

        let amount = Number(input.value) - 1;

        if (amount < 0) {
            amount = 0;
        }
        input.value = amount
    }

    printProducts();

}

