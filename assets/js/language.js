(function () {
  var storageKey = "homepage-language";
  var toggle = document.querySelector("[data-language-toggle]");

  function setLanguage(language) {
    var selected = language === "en" ? "en" : "zh";
    document.documentElement.lang = selected;

    if (toggle) {
      var nextLanguage = selected === "zh" ? "en" : "zh";
      toggle.textContent = nextLanguage === "en" ? "EN" : "中";
      toggle.setAttribute("href", "?lang=" + nextLanguage);
      toggle.setAttribute("data-next-language", nextLanguage);
      toggle.setAttribute(
        "aria-label",
        nextLanguage === "en" ? "Switch to English" : "切换到中文"
      );
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

  setLanguage(savedLanguage || "zh");

  if (toggle) {
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      setLanguage(toggle.getAttribute("data-next-language"));
    });
  }
})();
