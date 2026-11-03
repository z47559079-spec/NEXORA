const favoriteProducts = [
  { id: 1, name: "ساعت هوشمند Nova X", price: "4,890,000 تومان", image: "images/smartwatch-nova.jpg" },
  { id: 2, name: "هدفون بی‌سیم Pulse Pro", price: "2,350,000 تومان", image: "images/earbuds-pulse.jpg" },
  { id: 3, name: "عینک هوشمند Vision Air", price: "6,250,000 تومان", image: "images/smart-glasses-vision.jpg" },
  { id: 4, name: "اسپیکر Echo Mini", price: "1,790,000 تومان", image: "images/speaker-echo.jpg" },
  { id: 5, name: "شارژر بی‌سیم MagDock", price: "990,000 تومان", image: "images/wireless-charger.jpg" },
  { id: 6, name: "ردیاب هوشمند FindMe", price: "790,000 تومان", image: "images/smart-tracker.jpg" },
  { id: 7, name: "ساعت ورزشی Active S", price: "3,590,000 تومان", image: "images/sport-watch.jpg" },
  { id: 8, name: "هدفون Studio Max", price: "4,190,000 تومان", image: "images/headphones-studio.jpg" }
];

const favoritesGrid = document.getElementById("favoritesGrid");

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("nexoraFavorites")) || [];

  const selectedProducts = favoriteProducts.filter(product =>
    favorites.includes(product.id)
  );

  if (selectedProducts.length === 0) {
    favoritesGrid.innerHTML = `
      <p class="empty-favorites">
        هنوز محصولی به علاقه‌مندی‌ها اضافه نکردی ❤️
      </p>
    `;
    return;
  }

  favoritesGrid.innerHTML = selectedProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="product-price">${product.price}</span>
          <button class="favorite-button active" data-remove="${product.id}">
            ♥
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

favoritesGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");

  if (!button) return;

  const id = Number(button.dataset.remove);

  let favorites = JSON.parse(localStorage.getItem("nexoraFavorites")) || [];

  favorites = favorites.filter(item => item !== id);

  localStorage.setItem("nexoraFavorites", JSON.stringify(favorites));

  renderFavorites();
});

renderFavorites();
