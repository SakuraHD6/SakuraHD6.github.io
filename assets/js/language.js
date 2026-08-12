(function () {
  var storageKey = "homepage-language";
  var buttons = document.querySelectorAll("[data-set-language]");

  function setLanguage(language) {
    var selected = language === "en" ? "en" : "zh";
    document.documentElement.lang = selected;

    Array.prototype.forEach.call(buttons, function (button) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-set-language") === selected ? "true" : "false"
      );
    });

    try {
      window.localStorage.setItem(storageKey, selected);
    } catch (error) {
      // The language switch still works when storage is unavailable.
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

  setLanguage(savedLanguage || "zh");

  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      setLanguage(button.getAttribute("data-set-language"));
    });
  });
})();
