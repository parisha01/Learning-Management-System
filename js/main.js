// Northlight LMS — main.js
// Handles the mobile navigation toggle and animates the progress ledger bars.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    animateLedgerBars();
    setActiveYear();
  });

  // ---- Mobile navigation toggle -------------------------------------
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu when a link is chosen (better mobile UX)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Animate the "progress ledger" bars on load --------------------
  // Bars start at 0 width and grow to their data-value percentage;
  // this brings the signature ledger widget to life without being
  // distracting, and is skipped entirely for reduced-motion users.
  function animateLedgerBars() {
    var bars = document.querySelectorAll(".bar-fill[data-value]");
    if (!bars.length) return;

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    bars.forEach(function (bar) {
      var target = bar.getAttribute("data-value") + "%";
      if (prefersReduced) {
        bar.style.width = target;
        return;
      }
      bar.style.width = "0%";
      requestAnimationFrame(function () {
        setTimeout(function () {
          bar.style.width = target;
        }, 150);
      });
    });
  }

  // ---- Footer year ----------------------------------------------------
  function setActiveYear() {
    var el = document.getElementById("current-year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
