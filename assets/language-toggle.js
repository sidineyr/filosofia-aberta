(function () {
  window.googleTranslateElementInit = function () {
    if (window.google && google.translate && !document.querySelector('#google_translate_element select')) {
      new google.translate.TranslateElement({ pageLanguage: 'pt', includedLanguages: 'pt,en', autoDisplay: false }, 'google_translate_element');
    }
  };
  var script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
})();
