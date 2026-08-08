AOS.init({
    duration: 900,
    once: true
});

// Movimiento sutil de la tarjeta destacada en escritorio.
const heroCard = document.querySelector(".hero-card");

if (heroCard) {
    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;

        heroCard.style.transform = `rotate(${x}deg) translateY(${y}px)`;
    });
}

// Menú móvil.
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("menu-activo");
        menuToggle.textContent = menu.classList.contains("menu-activo") ? "✕" : "☰";
    });

    document.querySelectorAll(".menu a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("menu-activo");
            menuToggle.textContent = "☰";
        });
    });
}
