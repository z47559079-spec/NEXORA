
const products = [
  {
    id: 1,
    nameFa: "ساعت هوشمند Nova X",
    nameEn: "Nova X Smartwatch",
    category: "wearable",
    categoryFa: "گجت پوشیدنی",
    categoryEn: "Wearables",
    price: 4890000,
    priceEn: 149,
    image: "images/smartwatch-nova.jpg",
  },
  {
    id: 2,
    nameFa: "هدفون بی‌سیم Pulse Pro",
    nameEn: "Pulse Pro Earbuds",
    category: "audio",
    categoryFa: "صوتی",
    categoryEn: "Audio",
    price: 2350000,
    priceEn: 79,
    image: "images/earbuds-pulse.jpg",
  },
  {
    id: 3,
    nameFa: "عینک هوشمند Vision Air",
    nameEn: "Vision Air Smart Glasses",
    category: "wearable",
    categoryFa: "گجت پوشیدنی",
    categoryEn: "Wearables",
    price: 6250000,
    priceEn: 189,
    image: "images/smart-glasses-vision.jpg",
  },
  {
    id: 4,
    nameFa: "اسپیکر Echo Mini",
    nameEn: "Echo Mini Speaker",
    category: "audio",
    categoryFa: "صوتی",
    categoryEn: "Audio",
    price: 1790000,
    priceEn: 59,
    image: "images/speaker-echo.jpg",
  },
  {
    id: 5,
    nameFa: "شارژر بی‌سیم MagDock",
    nameEn: "MagDock Wireless Charger",
    category: "accessory",
    categoryFa: "لوازم جانبی",
    categoryEn: "Accessories",
    price: 990000,
    priceEn: 35,
    image: "	images/wireless-charger.jpg",
  },
  {
    id: 6,
    nameFa: "ردیاب هوشمند FindMe",
    nameEn: "FindMe Smart Tracker",
    category: "accessory",
    categoryFa: "لوازم جانبی",
    categoryEn: "Accessories",
    price: 790000,
    priceEn: 25,
    image: "images/smart-tracker.jpg",
  },
  {
    id: 7,
    nameFa: "ساعت ورزشی Active S",
    nameEn: "Active S Sport Watch",
    category: "wearable",
    categoryFa: "گجت پوشیدنی",
    categoryEn: "Wearables",
    price: 3590000,
    priceEn: 119,
    image: "	images/sport-watch.jpg",
  },
  {
    id: 8,
    nameFa: "هدفون Studio Max",
    nameEn: "Studio Max Headphones",
    category: "audio",
    categoryFa: "صوتی",
    categoryEn: "Audio",
    price: 4190000,
    priceEn: 129,
    image: "images/headphones-studio.jpg",
  }
];

let language = "fa";
let cart = [];
// Favorites system
let cart = JSON.parse(localStorage.getItem("nexoraCart")) || [];
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("nexoraFavorites", JSON.stringify(favorites));
  renderProducts();
}
const $ = selector => document.querySelector(selector);

function money(amount) {
  if (language === "fa") {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  }

  return "$" + amount.toLocaleString("en-US");
}

let activeProductId = null;

function openProductDetails(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  activeProductId = id;

  const name = language === "fa"
    ? product.nameFa
    : product.nameEn;

  const category = language === "fa"
    ? product.categoryFa
    : product.categoryEn;

  const descriptions = {
    wearable: {
      fa: "این گجت پوشیدنی با طراحی مدرن و امکانات هوشمند، همراهی مناسب برای زندگی روزمره شماست.",
      en: "A modern wearable gadget designed to make your everyday life smarter."
    },
    audio: {
      fa: "با این محصول صوتی از تجربه شنیداری جذاب و طراحی کاربردی لذت ببرید.",
      en: "Enjoy an immersive listening experience with modern design."
    },
    accessory: {
      fa: "یک وسیله کاربردی و مدرن برای کامل‌تر کردن تجربه استفاده از گجت‌های هوشمند.",
      en: "A modern and practical accessory for your smart gadgets."
    }
  };

  $("#modalImage").src = product.image;
  $("#modalImage").alt = name;
  $("#modalName").textContent = name;
  $("#modalCategory").textContent = category;
  $("#modalDescription").textContent =
    descriptions[product.category][language];

  $("#modalPrice").textContent = money(
    language === "fa" ? product.price : product.priceEn
  );

  $("#modalAdd").textContent =
    language === "fa"
      ? "افزودن به سبد خرید"
      : "Add to Cart";

  $("#productModal").classList.add("active");
}

function closeProductDetails() {
  $("#productModal").classList.remove("active");
  activeProductId = null;
}

function renderProducts() {
  const query = $("#searchInput").value.toLowerCase();
  const category = $("#categoryFilter").value;

  const filtered = products.filter(product => {
    const name = language === "fa"
      ? product.nameFa
      : product.nameEn;

    const categoryMatch =
      category === "all" || product.category === category;

    return categoryMatch &&
      name.toLowerCase().includes(query);
  });

  $("#productGrid").innerHTML = filtered.length
    ? filtered.map(product => `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${language === "fa" ? product.nameFa : product.nameEn}">
        </div>

        <div class="product-info">
          <span class="product-category">
            ${language === "fa" ? product.categoryFa : product.categoryEn}
          </span>

          <h3>
            ${language === "fa" ? product.nameFa : product.nameEn}
          </h3>

          <div class="product-bottom">
            <span class="product-price">
              ${money(language === "fa" ? product.price : product.priceEn)}
            </span>

<div class="product-actions">
<button class="favorite-button" data-favorite="${product.id}" aria-label="Add to favorites">
  ♡
</button>

  <button class="detail-button" data-details="${product.id}">
    ${language === "fa" ? "مشاهده جزئیات" : "View Details"}
  </button>

  <button class="add-button" data-add="${product.id}">+</button>
</div>

          </div>
        </div>
      </article>
    `).join("")
    : `<p class="no-results">${language === "fa" ? "محصولی پیدا نشد." : "No products found."}</p>`;
}

function setLanguage(nextLanguage) {
  language = nextLanguage;

  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "fa" ? "rtl" : "ltr";

  document.body.classList.toggle(
    "lang-en",
    language === "en"
  );

  document.querySelectorAll("[data-fa][data-en]")
    .forEach(element => {
      element.innerHTML = element.dataset[language];
    });

  document.querySelectorAll(
    "[data-placeholder-fa][data-placeholder-en]"
  ).forEach(element => {
    element.placeholder = element.dataset[
      language === "fa" ? "placeholderFa" : "placeholderEn"
    ];
  });

  $("#languageToggle").textContent =
    language === "fa" ? "EN" : "FA";

  renderProducts();
    localStorage.setItem("nexoraCart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1
    });
  }

  renderCart();

  showToast(
    language === "fa"
      ? "محصول به سبد خرید اضافه شد"
      : "Product added to cart"
  );
}
  localStorage.setItem("nexoraCart", JSON.stringify(cart));
function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  renderCart();
}

function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  $("#cartCount").textContent = count;

  $("#cartItems").innerHTML = cart.length
    ? cart.map(item => {
        const product = products.find(
          p => p.id === item.id
        );

        const name = language === "fa"
          ? product.nameFa
          : product.nameEn;

        const price = language === "fa"
          ? product.price
          : product.priceEn;

        return `
          <div class="cart-item">
            <img src="${product.image}" alt="">

            <div class="cart-item-info">
              <strong>${name}</strong>
              <small>${money(price)}</small>

              <div class="quantity-controls">
                <button data-quantity="${item.id}" data-change="-1">−</button>
                <span>${item.quantity}</span>
                <button data-quantity="${item.id}" data-change="1">+</button>
              </div>
            </div>
          </div>
        `;
      }).join("")
    : `<p class="empty-cart">${language === "fa" ? "سبد خرید خالی است." : "Your cart is empty."}</p>`;

  const total = cart.reduce((sum, item) => {
    const product = products.find(
      p => p.id === item.id
    );

    const price = language === "fa"
      ? product.price
      : product.priceEn;

    return sum + price * item.quantity;
  }, 0);

  $("#cartTotal").textContent = money(total);
}

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openCart() {
  document.body.classList.add("cart-open");
}

function closeCart() {
  document.body.classList.remove("cart-open");
}

// Change language
$("#languageToggle").addEventListener("click", () => {
  setLanguage(language === "fa" ? "en" : "fa");
});

// Search products
$("#searchInput").addEventListener("input", renderProducts);

// Filter products
$("#categoryFilter").addEventListener("change", renderProducts);

// Product details, favorites and add to cart
$("#productGrid").addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const detailButton = event.target.closest("[data-details]");
  const addButton = event.target.closest("[data-add]");

  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
  }

  if (detailButton) {
    openProductDetails(Number(detailButton.dataset.details));
  }

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
  }
});

// Modal controls
$("#modalClose").addEventListener("click", closeProductDetails);

$("#productModal").addEventListener("click", event => {
  if (event.target.id === "productModal") {
    closeProductDetails();
  }
});

// Add from product details
$("#modalAdd").addEventListener("click", () => {
  if (activeProductId !== null) {
    addToCart(activeProductId);
    closeProductDetails();
  }
});


// Change cart quantity
$("#cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-quantity]");

  if (button) {
    changeQuantity(
      Number(button.dataset.quantity),
      Number(button.dataset.change)
    );
  }
});

// Cart controls
$("#cartToggle").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#cartBackdrop").addEventListener("click", closeCart);

// Demo checkout
$("#checkoutButton").addEventListener("click", () => {
  showToast(
    language === "fa"
      ? "پرداخت واقعی در این نسخه فعال نیست."
      : "Real payment is not enabled in this demo."
  );
});

// Initial render
renderProducts();
renderCart();
