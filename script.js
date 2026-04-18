// LOADER
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transform = "scale(1.2)";

      setTimeout(() => loader.remove(), 500);
    }, 800);
  }
});


// AOS SAFE INIT
if (window.AOS) {
  AOS.init({ duration: 1000 });
}


// TELEGRAM FORM
function sendTG(e) {
  e.preventDefault();

  const name = document.getElementById("name")?.value || "";
  const phone = document.getElementById("phone")?.value || "";

  const text = `Salom ismim ${name}, telefon: ${phone}`;

  window.open(
    `https://t.me/aiwebuz?start=${encodeURIComponent(text)}`
  );
}
window.sendTG = sendTG;


// MENU
function toggleMenu() {
  document.querySelector(".menu")?.classList.toggle("active");
}
window.toggleMenu = toggleMenu;


// OUTSIDE CLICK
document.addEventListener("click", (e) => {
  const menu = document.querySelector(".menu");
  const burger = document.querySelector(".burger");

  if (!menu || !burger) return;

  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove("active");
  }
});


// NAV SCROLL
window.addEventListener("scroll", () => {
  document.querySelector("nav")
    ?.classList.toggle("scrolled", window.scrollY > 50);
});


// MODAL
function openImage(el) {
  const img = el.querySelector("img")?.src;
  if (!img) return;

  const modal = document.createElement("div");

  modal.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.95);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
    cursor:pointer;
  `;

  modal.innerHTML = `<img src="${img}" style="max-width:90%;border-radius:10px;">`;

  modal.onclick = () => modal.remove();

  document.body.appendChild(modal);
}
window.openImage = openImage;


// BEFORE AFTER
document.querySelectorAll(".before-after").forEach(container => {
  const overlay = container.querySelector(".overlay");

  if (!overlay) return;

  function move(x) {
    const rect = container.getBoundingClientRect();

    let percent = ((x - rect.left) / rect.width) * 100;

    overlay.style.width = Math.min(100, Math.max(0, percent)) + "%";
  }

  container.addEventListener("mousemove", e => move(e.clientX));
  container.addEventListener("touchmove", e => move(e.touches[0].clientX));
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // button bosilganda
  document.getElementById('installBtn').onclick = () => {
    deferredPrompt.prompt();
  };
});

// SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .catch(err => console.log("SW error:", err));
}