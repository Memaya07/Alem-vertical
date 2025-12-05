/**
 * ALEM COMPANIES WEBSITE - CLEAN JS
 */

/* HERO SLIDES CONFIG */
const HERO_SLIDES = [
  {
    badge: "Trusted Agency Since 2002",
    title1: "Your Life,",
    titleAccent: "Protected",
    title2: "Our Promise",
    description: "Comprehensive insurance solutions tailored to your needs.",
    imageIndex: 0,
  },
  {
    badge: "Expert Financial Guidance",
    title1: "Build Your",
    titleAccent: "Future",
    title2: "With Confidence",
    description: "Professional accounting and investment services.",
    imageIndex: 1,
  },
  {
    badge: "Premium Real Estate",
    title1: "Find Your",
    titleAccent: "Dream Home",
    title2: "Today",
    description: "Exceptional real estate opportunities.",
    imageIndex: 2,
  },
];

const CONFIG = {
  slideInterval: 8000,
  heroHeight: 0.8,
};

let currentSlide = 0;
let slideInterval = null;

/* INIT AFTER DOM LOAD */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileMenu();
  initDesktopDropdown();
  initSmoothScroll();
  initScrollAnimations();
  updateYear();

  if (document.querySelector(".hero-section")) {
    initHeroSlider();
  }

  if (document.getElementById("contact-form")) {
    initContactForm();
  }
});

/* HEADER SCROLL BEHAVIOR */
function initHeader() {
  const header = document.getElementById("header");
  const logo = document.getElementById("main-logo");

  window.addEventListener("scroll", () => {
    const scrollThreshold = window.innerHeight * CONFIG.heroHeight;
    const isScrolled = window.scrollY > scrollThreshold - 20;

    header.classList.toggle("scrolled", isScrolled);

    if (isScrolled) {
      logo.src = "assets/Logo.svg";
    } else {
      logo.src = "assets/Logo White.svg";
    }
  });
}

/* MOBILE MENU */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");
  const companiesBtn = document.getElementById("mobile-companies-btn");
  const companiesMenu = document.getElementById("mobile-companies-menu");
  const chevron = document.getElementById("mobile-chevron-icon");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const isActive = menu.classList.toggle("active");

    if (isActive) {
      menu.classList.remove("hidden");
      menuIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    } else {
      setTimeout(() => menu.classList.add("hidden"), 300);
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  });

  if (companiesBtn) {
    companiesBtn.addEventListener("click", () => {
      const isHidden = companiesMenu.classList.toggle("hidden");
      chevron.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
    });
  }

  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  menu.classList.remove("active");
  setTimeout(() => menu.classList.add("hidden"), 300);
  menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
}

/* DESKTOP DROPDOWN */
function initDesktopDropdown() {
  const dropdown = document.getElementById("companies-dropdown");
  const menu = document.getElementById("companies-menu");

  if (!dropdown) return;

  let hideTimeout;

  function showMenu() {
    clearTimeout(hideTimeout);
    menu.classList.remove("hidden");
    menu.classList.add("active");
    dropdown.classList.add("active");
  }

  function hideMenu() {
    hideTimeout = setTimeout(() => {
      menu.classList.remove("active");
      dropdown.classList.remove("active");
      setTimeout(() => {
        if (!menu.classList.contains("active")) {
          menu.classList.add("hidden");
        }
      }, 200);
    }, 100);
  }

  dropdown.addEventListener("mouseenter", showMenu);
  dropdown.addEventListener("mouseleave", hideMenu);
  menu.addEventListener("mouseenter", showMenu);
  menu.addEventListener("mouseleave", hideMenu);
}

/* HERO SLIDER */
function initHeroSlider() {
  const heroContent = document.getElementById("hero-content");
  const bgImages = document.querySelectorAll(".hero-bg-image");
  const indicators = document.querySelectorAll(".slide-indicator");

  if (!heroContent) return;

  heroContent.style.transition = "opacity 0.5s ease, transform 0.5s ease";

  startSlideShow();

  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      currentSlide = i;
      updateSlide();
      resetSlideInterval();
    });
  });

  function startSlideShow() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % HERO_SLIDES.length;
      updateSlide();
    }, CONFIG.slideInterval);
  }

  function updateSlide() {
    const slide = HERO_SLIDES[currentSlide];

    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(20px)";

    bgImages.forEach((img, index) => {
      img.classList.toggle("active", index === slide.imageIndex);
    });

    setTimeout(() => {
      document.getElementById("hero-badge").textContent = slide.badge;
      document.getElementById("hero-title-1").textContent = slide.title1;
      document.getElementById("hero-title-accent").textContent =
        slide.titleAccent;
      document.getElementById("hero-title-2").textContent = slide.title2;
      document.getElementById("hero-description").textContent =
        slide.description;

      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 250);

    updateIndicators();
  }

  function updateIndicators() {
    indicators.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideShow();
  }
}

/* CONTACT FORM */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message");
    form.reset();
  });
}

/* SMOOTH SCROLL */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerHeight = document.getElementById("header").offsetHeight;
      const offsetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });
}

/* SCROLL ANIMATIONS */
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".fade-in-section")
    .forEach((el) => observer.observe(el));
}

/* YEAR UPDATE */
function updateYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* HEADER */
fetch("./components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-placeholder").innerHTML = data;

    // Now reinitialize everything AFTER header loads
    if (typeof initHeader === "function") initHeader();
    if (typeof initMobileMenu === "function") initMobileMenu();
    if (typeof initDesktopDropdown === "function") initDesktopDropdown();
  });

fetch("./components/footer.html")
  .then((res) => res.text())
  .then(
    (html) => (document.getElementById("footer-placeholder").innerHTML = html)
  );
