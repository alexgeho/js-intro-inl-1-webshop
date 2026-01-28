
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


    const cartMessagesElement = document.querySelector('#cartMessages');
/* FOR TESTS::: '2026-01-31T09:00:00' */
    function updateCartTotals(now = new Date()) {

        let total = cart.reduce((sum, product) => {
            return sum + product.price * product.amount;
        }, 0);

        const messages = [];

        // --- MONDAY DISCOUNT ---
        const isMonday = now.getDay() === 1;
        const beforeTen = now.getHours() < 10;

        if (isMonday && beforeTen) {
            const discount = total * 0.10;
            total -= discount;
            messages.push('Måndagsrabatt: −10 %');
        }


        // --- WEEKEND SURCHARGE (15%) ---
        const day = now.getDay();
        const hour = now.getHours();
        const isFridayAfter15 = day === 5 && hour >= 15;
        const isSaturday = day === 6;
        const isSunday = day === 0;
        const isMondayBefore3 = day === 1 && hour < 3;

        const isWeekendSurcharge =
            isFridayAfter15 || isSaturday || isSunday || isMondayBefore3;

        if (isWeekendSurcharge) {
            const surcharge = total * 0.15;
            total += surcharge;
        }


        // --- BULK DISCOUNT ---
        cart.forEach(product => {
            if (product.amount >= 10) {
                const discount = product.price * product.amount * 0.10;
                total -= discount;
                messages.push(`Mängdrabatt: −10 % på ${product.name}`);
            }
        });

        // --- SHIPPING ---
        const totalItems = cart.reduce((sum, p) => sum + p.amount, 0);

        if (totalItems <= 15 && total > 0) {
            const shipping = 25 + total * 0.10;
            total += shipping;
            messages.push(`Frakt: ${Math.round(shipping)} kr`);
        } else {
            messages.push('Fri frakt');
        }

        // --- RENDER ---
        cartTotalElement.textContent = `Totalt: ${Math.round(total)} kr`;

        cartMessagesElement.innerHTML = messages
            .map(msg => `<p>${msg}</p>`)
            .join('');

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

    /* DECREASE, INCREASE, DELETE in cart */
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


    /* OPEN/CLOSE Checkout */

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

}