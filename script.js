
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
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
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
    image: "images/earbuds-pulse.jpg"/photo-1606220945770-b5b6c2c55bf1?w=700"
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
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700"
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
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700"
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
    image: "https://images.unsplash.com/photo-1591290619762-c588b7c5e3a4?w=700"
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
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=700"
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
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700"
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
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=700"
  }
];

let language = "fa";
let cart = [];

const $ = selector => document.querySelector(selector);

function money(amount) {
  if (language === "fa") {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  }

  return "$" + amount.toLocaleString("en-US");
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

            <button class="add-button" data-add="${product.id}">+</button>
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

// Add products to cart
$("#productGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(Number(button.dataset.add));
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
