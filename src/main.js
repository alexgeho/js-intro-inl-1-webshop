import products from './products.mjs';

/* START - BURGER MENU */

const openCloseNavMenu = document.querySelector('#openCloseNavMenu')
const navBugerJs = document.querySelector('#navBugerJs')

openCloseNavMenu.addEventListener('click', toggleMenuOpenState)
navBugerJs.addEventListener('click', toggleMenuOpenState)

function toggleMenuOpenState() {
  openCloseNavMenu.classList.toggle('open')
  navBugerJs.classList.toggle('open')
}

/* END - BURGER MENU */


const cart = [];


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

  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductToCard);
  });


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


/* ADD PRODUCT TO CARD */

function addProductToCard(e) {
  const clickedBtnId = Number(e.target.dataset.id);
  const product = products.find(product => product.id === clickedBtnId);

  if (product === undefined) return;

  const input = document.querySelector(`#amount-${clickedBtnId}`)
  const amount = Number(input.value)

  const finalAmount = amount > 0 ? amount : 1;

  const index = cart.findIndex(product => product.id === clickedBtnId);

  if (index === -1) {
    cart.push({
      ...product,
      amount: finalAmount
    });
  } else {
    cart[index].amount += finalAmount;
  }

  updateCartTotals();

  printCart();

}

const cartTotalElement = document.querySelector('#cartTotal')

function updateCartTotals() {


  /* METHOD 2 for count cart's total */

  const cartTotal = cart.reduce((partialSum, product) => {
    return partialSum + (product.price * product.amount);
  }, 0);

  cartTotalElement.textContent = `Totalt: ${cartTotal} kr`;

  highlightCartTotalChange();
}

function highlightCartTotalChange() {
  cartTotalElement.classList.add('highlight-price');

  setTimeout(removeHighlightCartTotalChange, 1000 * 1.5);
}

function removeHighlightCartTotalChange() {
  cartTotalElement.classList.remove('highlight-price')
}



const cartSection = document.querySelector('#cart');

cartSection.addEventListener('click', (e) => {

  /* DECREASE */
  if (e.target.classList.contains('decrease-cart-product')) {
    const index = Number(e.target.dataset.id);

    if (cart[index].amount > 1) {
      cart[index].amount -= 1;
    } else {
      cart.splice(index, 1);
    }

    updateCartTotals();
    printCart();
    return;
  }

  /* INCREASE */
  if (e.target.classList.contains('increase-cart-product')) {
    const index = Number(e.target.dataset.id);
    cart[index].amount += 1;

    updateCartTotals();
    printCart();
    return;
  }

  /* DELETE */
  if (e.target.classList.contains('delete-product')) {
    const index = Number(e.target.dataset.id);
    cart.splice(index, 1);

    updateCartTotals();
    printCart();
    return;
  }
});



/* START - PRINT CART */
function printCart() {
  cartSection.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {

    cartSection.innerHTML += `
    <article>
      ${cart[i].name}:
      <button data-id="${i}" class="decrease-cart-product">-</button>
      ${cart[i].amount} st
      <button data-id="${i}" class="increase-cart-product">+</button>
      <button data-id="${i}" class="delete-product">Radera</button>
    </article> 
    `;
  }

  cartSection.innerHTML += `
  <div class="cartOrder">
    <button class="orderCartBtn" type="button">Beställ</button>
    <button class="closeCheckoutBtn" type="button">X</button>
  </div>
`;

}

/* BESTÄLL BTN */
const checkoutForm = document.querySelector('#checkoutForm');

/* SUBMIT BTN */
const submitBtn = document.querySelector('#submitBtn');

checkoutForm.addEventListener('input', validateForm);
checkoutForm.addEventListener('change', validateForm);

function validateForm() {
  // 1. базовая HTML-валидация
  let isValid = checkoutForm.checkValidity();

  // 2. payment logic
  const selectedPayment = checkoutForm.querySelector('input[name="payment"]:checked');

  if (!selectedPayment) {
    isValid = false;
  }

  // 3. faktura → personnummer

  const PERSONNUMMER_REGEX = /^(\d{10}|\d{12}|\d{6}[- ]\d{4}|\d{8}[- ]\d{4})$/;

  function isValidSwedishPersonnummer(value) {
    return PERSONNUMMER_REGEX.test(value.trim());
  }

  if (selectedPayment?.value === 'invoice') {
    if (!isValidSwedishPersonnummer(personnummerInput.value)) {
      isValid = false;
      personnummerInput.setCustomValidity('Ogiltigt personnummer');
    } else {
      personnummerInput.setCustomValidity('');
    }
  }

  // 4. btn
  submitBtn.disabled = !isValid;
}

/* blocking send if errors */
checkoutForm.addEventListener('submit', (e) => {
  if (!checkoutForm.checkValidity()) {
    e.preventDefault();
    checkoutForm.reportValidity();
    return;
  }

  console.log('BESTÄLLNING OK');
});


/* OPEN CART */

cartSection.addEventListener('click', (e) => {


  if (e.target.closest('.orderCartBtn')) {
    checkoutForm.style.display =
      checkoutForm.style.display === 'block' ? 'none' : 'block';
    return;
  }

  // CLOSE (X) 

  if (e.target.closest('.closeCheckoutBtn')) {


    checkoutForm.style.display = 'none';
    return;
  }

});

document.querySelector('#closeCheckoutBtn')
  .addEventListener('click', () => {

    checkoutForm.style.display = 'none';;
  });



/* Betalsätt START */

const paymentRadios = document.querySelectorAll('input[name="payment"]');
const invoiceFields = document.querySelector('#invoiceFields');
const cardFields = document.querySelector('#cardFields');

const cardInputs = cardFields.querySelectorAll('input');
const personnummerInput = document.querySelector('#personnummer');

paymentRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const isCard = radio.value === 'card';
    const isInvoice = radio.value === 'invoice';

    // show / hide
    cardFields.hidden = !isCard;
    invoiceFields.hidden = !isInvoice;

    // required handling
    cardInputs.forEach(input => {
      input.required = isCard;
    });

    personnummerInput.required = isInvoice;
  });
});

/* Betalsätt END */


printProducts();
