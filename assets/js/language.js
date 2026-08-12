(function () {
  var storageKey = "homepage-language-v3";
  var menu = document.querySelector("[data-language-menu]");
  var trigger = document.querySelector("[data-language-trigger]");
  var dropdown = document.querySelector("[data-language-dropdown]");
  var badge = document.querySelector("[data-language-badge]");
  var currentLabel = document.querySelector("[data-language-current]");
  var options = document.querySelectorAll("[data-language-option]");

  function setMenuOpen(open) {
    if (!trigger || !dropdown) return;
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    dropdown.hidden = !open;
  }

  function setLanguage(language) {
    var selected = language === "en" ? "en" : "zh";
    document.documentElement.lang = selected;

    if (badge) badge.textContent = selected === "en" ? "EN" : "中";
    if (currentLabel) currentLabel.textContent = selected === "en" ? "English" : "中文";

    Array.prototype.forEach.call(options, function (option) {
      option.setAttribute(
        "aria-selected",
        option.getAttribute("data-language-option") === selected ? "true" : "false"
      );
    });

    try {
      window.localStorage.setItem(storageKey, selected);
    } catch (error) {
      // The language menu still works when storage is unavailable.
    }

    if (window.jQuery) {
      window.setTimeout(function () {
        window.jQuery(window).trigger("resize");
      }, 0);
    }
  }

  var savedLanguage;
  try {
    savedLanguage = window.localStorage.getItem(storageKey);
  } catch (error) {
    savedLanguage = null;
  }

  setLanguage(savedLanguage || "en");

  if (trigger) {
    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setMenuOpen(true);
        var selectedOption = document.querySelector('[data-language-option][aria-selected="true"]');
        if (selectedOption) selectedOption.focus();
      }
    });
  }

  Array.prototype.forEach.call(options, function (option, index) {
    option.addEventListener("click", function () {
      setLanguage(option.getAttribute("data-language-option"));
      setMenuOpen(false);
      if (trigger) trigger.focus();
    });

    option.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        if (trigger) trigger.focus();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        var step = event.key === "ArrowDown" ? 1 : -1;
        var nextIndex = (index + step + options.length) % options.length;
        options[nextIndex].focus();
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (menu && !menu.contains(event.target)) setMenuOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && trigger && trigger.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      trigger.focus();
    }
  });
})();
