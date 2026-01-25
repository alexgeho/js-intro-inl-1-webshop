import products from './products.mjs';
import '../scss/index.scss';
import prettyDate from './helpers.mjs';
import { initHeader } from './header.mjs';
import { initCart } from './cart.mjs';
import { initCatalog } from './catalog.mjs';
import { initCheckout } from './checkout.mjs';



/* Date */
const today = new Date()
document.querySelector('#today').innerHTML = prettyDate(today);

initHeader();
initCart(products);
initCatalog(products);
initCheckout();



