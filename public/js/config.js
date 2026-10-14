// Business details used across the site. Edit these in one place.
// TODO: replace the phone/WhatsApp number — +263 77 123 4567 is the placeholder from the design.
window.SITE = {
  name: "Clear Visions Windscreens",
  phoneDisplay: "+263 77 123 4567",
  phoneTel: "+263771234567",
  whatsapp: "263771234567", // digits only, country code first, no + or spaces
};

window.waLink = function (message) {
  return "https://wa.me/" + window.SITE.whatsapp + (message ? "?text=" + encodeURIComponent(message) : "");
};

// Wire up every phone and WhatsApp link on the page from the config above.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = window.waLink(a.getAttribute("data-wa") || "Hi Clear Visions, I'd like a quote.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-tel]").forEach(function (a) {
    a.href = "tel:" + window.SITE.phoneTel;
    if (!a.textContent.trim()) a.textContent = window.SITE.phoneDisplay;
  });
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
