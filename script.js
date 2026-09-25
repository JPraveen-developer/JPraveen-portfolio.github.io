/* =========================================================
   PRAVEEN J — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const revealElements = document.querySelectorAll(".reveal");
  const year = document.getElementById("year");

  // Keep the footer year current without hard-coding it.
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Add a subtle shadow after the user starts scrolling.
  const handleScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 15);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Responsive mobile navigation.
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  // Close mobile navigation after selecting a section.
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Reveal sections/cards as they enter the viewport.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  // Prevent placeholder social links from jumping to the top.
  document.querySelectorAll(".placeholder-link").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
});
