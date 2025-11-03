document.addEventListener("DOMContentLoaded", () => {
  // -------------------
  // Mobile menu toggle
  // -------------------
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
  });

  // -------------------
  // Search bar toggle & redirect
  // -------------------
  const navSearch = document.getElementById("nav-search");
  const searchInput = navSearch.querySelector("input");
  const searchIcon = navSearch.querySelector("span");
  const productCards = document.querySelectorAll(".product__card");

  // Toggle search input on icon click
  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    navSearch.classList.toggle("open");
    if (navSearch.classList.contains("open")) searchInput.focus();
  });

  // Stop closing when clicking input
  searchInput.addEventListener("click", (e) => e.stopPropagation());

  // Close search if clicking outside
  document.addEventListener("click", () => navSearch.classList.remove("open"));

  // Search functionality: Enter key redirects to first matching product
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      // Find first matching product
      let found = false;
      productCards.forEach((card) => {
        const productName = card.getAttribute("data-product").toLowerCase();
        if (!found && productName.includes(query)) {
          found = true;
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          // optional: highlight the card briefly
          card.style.transition = "0.3s";
          card.style.transform = "scale(1.05)";
          setTimeout(() => (card.style.transform = "scale(1)"), 300);
        }
      });

      if (!found) alert("No product found!");
    }
  });

  // -------------------
  // WhatsApp dynamic buttons
  // -------------------
  productCards.forEach((card) => {
    const product = card.getAttribute("data-product");
    const whatsappBtn = card.querySelector(".btn.whatsapp");

    if (whatsappBtn) {
      whatsappBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const message = encodeURIComponent(
          `Thanks for contacting Shintech! I'm interested in the ${product}.`
        );
        const phone = "918977022778"; // Your WhatsApp number
        const url = `https://wa.me/${phone}?text=${message}`;
        window.open(url, "_blank");
      });
    }
  });

  // -------------------
  // ScrollReveal animations
  // -------------------
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
  ScrollReveal().reveal(".header__content div", { duration: 1000, delay: 500 });
  ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 1500 });
  ScrollReveal().reveal(".deals__card", { ...scrollRevealOption, interval: 500 });
  ScrollReveal().reveal(".about__image img", { ...scrollRevealOption, origin: "right" });
  ScrollReveal().reveal(".about__card", { duration: 1000, interval: 500, delay: 500 });

  // -------------------
  // Swiper slider
  // -------------------
  const swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  });
});
