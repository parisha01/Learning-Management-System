// Northlight LMS — gallery.js
// Powers the click-to-enlarge lightbox on the Media page.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll(".gallery-item");
    var lightbox = document.getElementById("lightbox");
    if (!items.length || !lightbox) return;

    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxTitle = document.getElementById("lightbox-title");
    var lightboxDesc = document.getElementById("lightbox-desc");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var lastFocused = null;

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        openLightbox(item);
      });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });

    function openLightbox(item) {
      var full = item.getAttribute("data-full") || item.querySelector("img").src;
      var title = item.getAttribute("data-title") || "";
      var desc = item.getAttribute("data-desc") || "";

      lightboxImg.src = full;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lastFocused = document.activeElement;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }
  });
})();
