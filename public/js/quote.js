// Quote form: there is no server, so the form opens WhatsApp with the details filled in.
(function () {
  var form = document.getElementById("quote-form");
  if (!form) return;
  var status = form.querySelector("[data-status]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var name = (d.get("name") || "").trim();
    var phone = (d.get("phone") || "").trim();
    if (!name || !phone) {
      status.textContent = "Please add your name and phone number so we can reply.";
      return;
    }
    var lines = [
      "Hi Clear Visions, I'd like a quote.",
      "Name: " + name,
      "Phone: " + phone,
      d.get("vehicle") ? "Vehicle: " + d.get("vehicle") : "",
      d.get("need") ? "Need: " + d.get("need") : "",
      "Where: " + (d.get("where") === "mobile" ? "Come to me (mobile)" : "At your centre"),
      d.get("details") ? "Details: " + d.get("details") : "",
    ].filter(Boolean);
    window.open(window.waLink(lines.join("\n")), "_blank", "noopener");
    status.textContent = "Opening WhatsApp… send the message there and we'll reply shortly.";
  });
})();
