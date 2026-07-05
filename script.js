/* ============================================================
   Wedding Site — script.js
   Nav behavior, mobile menu, scroll reveals, countdown.
   ============================================================ */

(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  /* ---- Nav background on scroll ---- */
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  function closeMenu() {
    navLinks.classList.remove("is-open");
    nav.classList.remove("nav--open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("is-open");
    nav.classList.toggle("nav--open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Countdown ---- */
  var cd = document.getElementById("countdown");
  if (cd) {
    var target = new Date(cd.getAttribute("data-date")).getTime();
    var elDays = cd.querySelector("[data-days]");
    var elHours = cd.querySelector("[data-hours]");
    var elMins = cd.querySelector("[data-mins]");
    var elSecs = cd.querySelector("[data-secs]");

    function pad(n) { return n < 10 ? "0" + n : String(n); }

    function tick() {
      var diff = target - Date.now();
      if (isNaN(target)) return;
      if (diff <= 0) {
        elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = "00";
        clearInterval(timer);
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      elDays.textContent = d;
      elHours.textContent = pad(h);
      elMins.textContent = pad(m);
      elSecs.textContent = pad(s);
    }
    tick();
    var timer = setInterval(tick, 1000);
  }
})();
