// Northlight LMS — contact-form.js
// Client-side validation for the Contact page. This is a static prototype
// (no server-side scripting per the assignment brief) so submission simply
// validates the data and shows success feedback — no data is stored or sent.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var status = document.getElementById("form-status");
    var messageField = document.getElementById("message");
    var charCount = document.getElementById("char-count");

    var validators = {
      name: function (v) {
        if (!v.trim()) return "Please enter your name.";
        if (v.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      },
      email: function (v) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!v.trim()) return "Please enter your email address.";
        if (!pattern.test(v.trim())) return "Enter a valid email address, e.g. name@example.com.";
        return "";
      },
      topic: function (v) {
        if (!v) return "Please choose a topic.";
        return "";
      },
      message: function (v) {
        if (!v.trim()) return "Please write a message.";
        if (v.trim().length < 10) return "Message should be at least 10 characters so we can help properly.";
        if (v.trim().length > 600) return "Message is too long — please keep it under 600 characters.";
        return "";
      }
    };

    // live character counter for the message field
    if (messageField && charCount) {
      messageField.addEventListener("input", function () {
        charCount.textContent = messageField.value.length + " / 600";
      });
    }

    // validate a single field and toggle its error state
    function validateField(field) {
      var name = field.name;
      if (!validators[name]) return true;

      var errorEl = document.getElementById(name + "-error");
      var msg = validators[name](field.value);
      var wrapper = field.closest(".field");

      if (msg) {
        wrapper.classList.add("has-error");
        if (errorEl) {
          errorEl.textContent = msg;
          errorEl.classList.add("show");
        }
        field.setAttribute("aria-invalid", "true");
        return false;
      } else {
        wrapper.classList.remove("has-error");
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.classList.remove("show");
        }
        field.setAttribute("aria-invalid", "false");
        return true;
      }
    }

    // validate on blur for immediate feedback
    Object.keys(validators).forEach(function (name) {
      var field = form.elements[name];
      if (field) {
        field.addEventListener("blur", function () { validateField(field); });
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var allValid = true;
      Object.keys(validators).forEach(function (name) {
        var field = form.elements[name];
        if (field && !validateField(field)) allValid = false;
      });

      status.classList.remove("show", "success", "error");

      if (!allValid) {
        status.textContent = "Please fix the highlighted fields before sending your message.";
        status.classList.add("show", "error");
        status.setAttribute("role", "alert");
        var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      var nameVal = form.elements["name"].value.trim();
      status.textContent = "Thanks, " + nameVal + " — your message has been prepared. In this static prototype no data is actually sent, but a live site would email your enquiry to our team within one business day.";
      status.classList.add("show", "success");
      status.setAttribute("role", "status");
      form.reset();
      if (charCount) charCount.textContent = "0 / 600";
    });
  });
})();
