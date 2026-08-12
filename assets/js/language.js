(function () {
  var storageKey = "homepage-language-v2";
  var selector = document.querySelector("[data-language-selector]");

  function setLanguage(language) {
    var selected = language === "en" ? "en" : "zh";
    document.documentElement.lang = selected;

    if (selector) {
      selector.value = selected;
    }

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

  setLanguage(savedLanguage || "en");

  if (selector) {
    selector.addEventListener("change", function () {
      setLanguage(selector.value);
    });
  }
})();
