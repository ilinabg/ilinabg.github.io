/*
 * IPA cursor trail.
 * Emits floating International Phonetic Alphabet symbols from the pointer as it moves.
 * Respects prefers-reduced-motion and only runs for fine pointers (mouse/trackpad).
 */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer =
    window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  if (reduceMotion || !finePointer) return;

  // A grab-bag of IPA symbols: vowels, consonants, diacritics, suprasegmentals.
  var SYMBOLS = [
    "ɑ", "æ", "ʌ", "ə", "ɛ", "ɪ", "ʊ", "ɔ", "œ", "ø", "ɒ", "ɤ", "ɯ", "y",
    "θ", "ð", "ʃ", "ʒ", "ŋ", "ʔ", "ʕ", "ħ", "ɣ", "χ", "ʁ", "ɸ", "β",
    "ɾ", "ɹ", "ɻ", "ʀ", "ʎ", "ɲ", "ɳ", "ʈ", "ɖ", "ɟ", "ɡ", "ɢ",
    "ɕ", "ʑ", "ɬ", "ɮ", "ʍ", "ɥ", "ʙ", "ⱱ", "ꞎ",
    "ˈ", "ˌ", "ː", "˞", "̃", "ʰ", "ʲ", "ʷ"
  ];

  var container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
  document.body.appendChild(container);

  var lastSpawn = 0;
  var MIN_INTERVAL = 45; // ms between symbols, keeps the trail from overwhelming

  function spawn(x, y) {
    var now = Date.now();
    if (now - lastSpawn < MIN_INTERVAL) return;
    lastSpawn = now;

    var el = document.createElement("span");
    el.textContent = SYMBOLS[(Math.random() * SYMBOLS.length) | 0];

    var size = 14 + Math.random() * 16; // 14–30px
    var driftX = (Math.random() - 0.5) * 60; // horizontal wander
    var driftY = -(40 + Math.random() * 70); // float upward
    var rot = (Math.random() - 0.5) * 60; // degrees

    el.style.cssText =
      "position:absolute;left:" + x + "px;top:" + y + "px;" +
      "font-size:" + size + "px;line-height:1;font-weight:600;" +
      "color:#000;" +
      "will-change:transform,opacity;transform:translate(-50%,-50%);" +
      "user-select:none;";

    container.appendChild(el);

    var anim = el.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
        {
          transform:
            "translate(calc(-50% + " + driftX + "px), calc(-50% + " + driftY + "px)) rotate(" + rot + "deg)",
          opacity: 0
        }
      ],
      { duration: 1300 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.3,1)" }
    );
    anim.onfinish = function () {
      el.remove();
    };
  }

  window.addEventListener(
    "pointermove",
    function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      spawn(e.clientX, e.clientY);
    },
    { passive: true }
  );
})();
