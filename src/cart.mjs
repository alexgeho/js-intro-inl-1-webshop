
const cart = [];


export function initCart(products) {

    const cartSection = document.querySelector('#cart');
    const cartTotalElement = document.querySelector('#cartTotal')

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

    /* CLICK ON BUY BUTTON */
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy')) {
            addProductToCard(e);
        }
    });

}