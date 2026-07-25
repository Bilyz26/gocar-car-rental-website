document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Hamburger Menu Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // 2. Sticky Header Background on Scroll
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 3. Highlight Current Active Page Link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 4. Car Filtering & Budget Search System
  const filterBtns = document.querySelectorAll(".filter-btn");
  const carCards = document.querySelectorAll(".car-card");
  const searchInput = document.querySelector("#budgetInput");
  const searchBtn = document.querySelector("#searchBtn");

  function filterCars() {
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    const maxBudget = searchInput && searchInput.value ? parseFloat(searchInput.value) : Infinity;

    carCards.forEach((card) => {
      const marque = card.getAttribute("data-marque") || "";
      const status = card.getAttribute("data-status") || "";
      const price = parseFloat(card.getAttribute("data-price") || "0");

      let categoryMatch = false;
      if (activeCategory === "all") {
        categoryMatch = true;
      } else if (activeCategory === "avbl") {
        categoryMatch = status.toLowerCase() === "available";
      } else {
        categoryMatch = marque.toLowerCase() === activeCategory.toLowerCase();
      }

      let budgetMatch = isNaN(maxBudget) || price <= maxBudget;

      if (categoryMatch && budgetMatch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filterCars();
      });
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      filterCars();
    });

    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        filterCars();
      }
    });
  }

  // 5. Reservation Modal Dialog Logic
  const modalBackdrop = document.querySelector("#reserveModal");
  const modalCloseBtn = document.querySelector(".modal-close");
  const modalCarName = document.querySelector("#modalCarName");
  const reserveButtons = document.querySelectorAll(".reserve-btn");
  const reservationForm = document.querySelector("#reservationForm");

  if (modalBackdrop) {
    reserveButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const carCard = this.closest(".car-card");
        const carName = carCard ? carCard.querySelector("h3").innerText : "Selected Vehicle";
        
        if (modalCarName) {
          modalCarName.innerText = `Reserve: ${carName}`;
        }
        
        modalBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    function closeModal() {
      modalBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }

    if (reservationForm) {
      reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        closeModal();
        showToast("Reservation Request Submitted Successfully!");
        reservationForm.reset();
      });
    }
  }

  // 6. Contact Form Submission Toast
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }

  // Helper Function: Toast Notification
  function showToast(message) {
    let toast = document.querySelector("#toastMsg");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toastMsg";
      toast.className = "toast-msg";
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }
});
