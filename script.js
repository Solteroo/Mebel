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
/* ================= SEND ORDER ================= */
function sendOrder() {
  const btn = document.querySelector(".send-btn");
  if (!btn) return;

  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const message = document.getElementById("comment")?.value.trim();

  if (!name || !phone) {
    alert("Enter name and phone!");
    return;
  }

  btn.innerText = "Sending...";

  const text = `
🆕 New order
👤 Name: ${name}
📞 Phone: ${phone}
📝 Message: ${message || "-"}
`;

  fetch("https://api.telegram.org/bot8656722392:AAH8VPMWxKs5S9z1VD00m_3Mp-SHVUu3EQ8/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: "8779954504",
      text
    })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    btn.innerText = "Sent ✅";
  })
  .catch(() => {
    btn.innerText = "Error ❌";
  });
}

// MENU
const menu = document.querySelector(".menu");
const burger = document.querySelector(".burger");

function toggleMenu() {
  menu.classList.toggle("active");
}

window.toggleMenu = toggleMenu;

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove("active");
  }
});

window.addEventListener("scroll", () => {
  document.querySelector("nav")?.classList.toggle("scrolled", window.scrollY > 50);
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
