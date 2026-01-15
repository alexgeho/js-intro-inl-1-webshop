const products = [
  { id: 1, name: 'Chokladmunk', price: 25, category: 'Choklad' },
  { id: 2, name: 'Vaniljmunk', price: 22, category: 'Vanilj' }
];

function renderProducts(list) {
  const container = document.querySelector('.products');
  container.innerHTML = '';

  list.forEach(product => {
    const div = document.createElement('div');
    div.textContent = `${product.name} – ${product.price} kr`;
    container.appendChild(div);
  });
}

document.querySelector('#clickMe').addEventListener('click', () => {
  renderProducts(products);
  alert('Hej Världen!');
});

// Datum
console.log(new Date().toLocaleDateString());

// Timer
setTimeout(() => {
  console.log('Webshop ready');
}, 2000);
