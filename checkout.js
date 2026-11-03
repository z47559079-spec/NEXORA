const products = [
  { id: 1, name: "ساعت هوشمند Nova X", price: 4890000, image: "images/smartwatch-nova.jpg" },
  { id: 2, name: "هدفون بی‌سیم Pulse Pro", price: 2350000, image: "images/earbuds-pulse.jpg" },
  { id: 3, name: "عینک هوشمند Vision Air", price: 6250000, image: "images/smart-glasses-vision.jpg" },
  { id: 4, name: "اسپیکر Echo Mini", price: 1790000, image: "images/speaker-echo.jpg" },
  { id: 5, name: "شارژر بی‌سیم MagDock", price: 990000, image: "images/wireless-charger.jpg" },
  { id: 6, name: "ردیاب هوشمند FindMe", price: 790000, image: "images/smart-tracker.jpg" },
  { id: 7, name: "ساعت ورزشی Active S", price: 3590000, image: "images/sport-watch.jpg" },
  { id: 8, name: "هدفون Studio Max", price: 4190000, image: "images/headphones-studio.jpg" }
];

const cart = JSON.parse(localStorage.getItem("nexoraCart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

function formatPrice(price) {
  return price.toLocaleString("fa-IR") + " تومان";
}

function renderCheckout() {
  let total = 0;

  const items = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    const subtotal = product.price * item.quantity;
    total += subtotal;

    return `
      <div class="checkout-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <strong>${product.name}</strong>
          <p>تعداد: ${item.quantity}</p>
          <span>${formatPrice(subtotal)}</span>
        </div>
      </div>
    `;
  }).join("");

  checkoutItems.innerHTML = items || "<p>سبد خرید شما خالی است.</p>";

  updateTotal(total);
}

function updateTotal(productTotal) {
  const shipping = document.querySelector('input[name="shipping"]:checked').value === "express"
    ? 150000
    : 0;

  checkoutTotal.innerHTML = `
    <p>جمع محصولات: ${formatPrice(productTotal)}</p>
    <p>هزینه ارسال: ${formatPrice(shipping)}</p>
    <h3>مبلغ نهایی: ${formatPrice(productTotal + shipping)}</h3>
  `;
}

document.querySelectorAll('input[name="shipping"]').forEach(input => {
  input.addEventListener("change", renderCheckout);
});

renderCheckout();// Final order submission
const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

checkoutForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (cart.length === 0) {
    checkoutMessage.textContent = "سبد خرید شما خالی است!";
    return;
  }

  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const postalCode = document.getElementById("postalCode").value;

  const shipping = document.querySelector('input[name="shipping"]:checked').value;

  const order = {
    orderNumber: Date.now(),
    customer: fullName,
    phone: phone,
    address: address,
    postalCode: postalCode,
    shipping: shipping,
    products: cart,
    date: new Date().toLocaleString("fa-IR")
  };

  localStorage.setItem("nexoraLastOrder", JSON.stringify(order));

  localStorage.removeItem("nexoraCart");

  checkoutForm.style.display = "none";

  checkoutMessage.innerHTML = `
    <h2>🎉 سفارش شما با موفقیت ثبت شد!</h2>
    <p>از خرید شما از NEXORA سپاسگزاریم.</p>
    <p>شماره سفارش: ${order.orderNumber}</p>
    <a href="index.html" class="main-button">
      بازگشت به فروشگاه
    </a>
  `;

  checkoutItems.innerHTML = "";
  checkoutTotal.innerHTML = "";
});
