// Windscreen catalogue data + rendering.
// To update stock or prices, edit CATALOGUE below — no other code changes needed.
//   price: number in USD (fitted at centre), or null to show "Price on request"
//   stock: "in" (In stock) or "24h" (Ready in 24h)

var VEHICLES_SMALL = [
  ["Toyota", "Corolla"], ["Toyota", "Hilux"], ["Toyota", "Fortuner"], ["Toyota", "Aqua"],
  ["Toyota", "Vitz"], ["Mazda", "Demio"], ["Mazda", "Axela"], ["Mazda", "BT-50"],
  ["Isuzu", "D-Max"], ["Isuzu", "KB"], ["Mercedes", "C-Class"], ["Mercedes", "E-Class"],
  ["BMW", "3 Series"], ["BMW", "X5"], ["Honda", "Fit"], ["Honda", "CR-V"],
];

// Front windscreen prices and stock, as shown in the approved design.
var FRONT = {
  "Corolla": [105, "in"], "Hilux": [105, "in"], "Fortuner": [110, "in"], "Aqua": [105, "in"],
  "Vitz": [110, "in"], "Demio": [125, "in"], "Axela": [105, "in"], "BT-50": [95, "24h"],
  "D-Max": [95, "24h"], "KB": [125, "in"], "C-Class": [120, "24h"], "E-Class": [120, "24h"],
  "3 Series": [105, "in"], "X5": [125, "in"], "Fit": [125, "in"], "CR-V": [105, "in"],
};

function buildList(kind, priced) {
  return VEHICLES_SMALL.map(function (v) {
    var p = priced ? priced[v[1]] : null;
    return { make: v[0], model: v[1], kind: kind, price: p ? p[0] : null, stock: p ? p[1] : "in" };
  });
}

// TODO: add real prices for rear, door/quarter and panels; and the trucks & buses range.
var CATALOGUE = {
  small: {
    front: buildList("Front windscreen", FRONT),
    rear: buildList("Rear windscreen", null),
    door: buildList("Door & quarter glass", null),
    panels: buildList("Panel / frame", null),
  },
  trucks: { front: [], rear: [], door: [], panels: [] },
};

(function () {
  var root = document.getElementById("catalogue");
  if (!root) return;

  var state = { size: "small", make: "All makes", type: "front" };
  var grid = root.querySelector("[data-grid]");
  var chipsWrap = root.querySelector("[data-makes]");

  var glass =
    '<svg viewBox="0 0 160 76" aria-hidden="true"><defs><linearGradient id="g" x1="0" x2="1">' +
    '<stop offset="0" stop-color="#9cc9ec"/><stop offset="1" stop-color="#2f78b5"/></linearGradient></defs>' +
    '<path d="M24 2h112l22 72H2z" fill="url(#g)"/><path d="M78 2h9L58 74h-9z" fill="#fff" opacity=".55"/>' +
    '<path d="M92 2h4L67 74h-4z" fill="#fff" opacity=".35"/></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function renderMakes() {
    var makes = ["All makes"];
    VEHICLES_SMALL.forEach(function (v) { if (makes.indexOf(v[0]) < 0) makes.push(v[0]); });
    chipsWrap.innerHTML = makes.map(function (m) {
      return '<button type="button" class="chip" aria-pressed="' + (m === state.make) + '" data-make="' + esc(m) + '">' + esc(m) + "</button>";
    }).join("");
  }

  function renderCounts() {
    root.querySelectorAll("[data-type]").forEach(function (tab) {
      var list = CATALOGUE[state.size][tab.getAttribute("data-type")];
      tab.querySelector("[data-count]").textContent = list.length + " vehicles";
      tab.setAttribute("aria-selected", String(tab.getAttribute("data-type") === state.type));
    });
  }

  function renderGrid() {
    var list = CATALOGUE[state.size][state.type].filter(function (it) {
      return state.make === "All makes" || it.make === state.make;
    });
    if (!list.length) {
      grid.innerHTML = '<div class="empty"><strong>Send us your vehicle details.</strong><br>' +
        'We fit glass for trucks and buses too. WhatsApp a photo with the make and model and we\'ll confirm the price.<br><br>' +
        '<a class="btn btn-red" href="' + window.waLink("Hi Clear Visions, I need glass for a truck/bus: ") + '" target="_blank" rel="noopener">WhatsApp us</a></div>';
      return;
    }
    grid.innerHTML = list.map(function (it) {
      var badge = it.stock === "24h" ? '<span class="badge soon">Ready in 24h</span>' : '<span class="badge in">In stock</span>';
      var price = it.price != null
        ? '<div class="price">$' + it.price + "<small>fitted at centre</small></div>"
        : '<div class="price" style="font-size:15px">Price on request<small>we reply within the hour</small></div>';
      var msg = "Hi Clear Visions, I'd like to order: " + it.make + " " + it.model + " – " + it.kind + (it.price != null ? " ($" + it.price + ")" : "");
      return '<article class="item"><div class="thumb">' + badge + glass + "</div>" +
        '<p class="make">' + esc(it.make) + "</p><h3>" + esc(it.model) + '</h3><p class="kind">' + esc(it.kind) + "</p>" +
        '<div class="foot">' + price + '<a class="btn btn-dark" href="' + window.waLink(msg) + '" target="_blank" rel="noopener">' +
        (it.price != null ? "Order" : "Quote") + "</a></div></article>";
    }).join("");
  }

  function renderAll() { renderMakes(); renderCounts(); renderGrid(); }

  root.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.make) state.make = b.dataset.make;
    else if (b.dataset.type) state.type = b.dataset.type;
    else if (b.dataset.size) {
      state.size = b.dataset.size;
      root.querySelectorAll("[data-size]").forEach(function (s) { s.setAttribute("aria-pressed", String(s === b)); });
    } else return;
    renderAll();
  });

  renderAll();
})();
