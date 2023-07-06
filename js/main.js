!(function () {
  "use strict";
  function t(t, n) {
    let e;
    return (...o) => {
      clearTimeout(e),
        (e = setTimeout(() => {
          t(...o);
        }, n));
    };
  }
  class n {
    constructor() {
      (this.callbacks = []),
        window.addEventListener("DOMContentLoaded", () =>
          this.onDOMContentLoaded()
        );
    }
    onDOMContentLoaded() {
      this.callbacks
        .sort((t, n) => t.priority - n.priority)
        .forEach(({ callback: t }) => t());
    }
    runOnLoad(t) {
      "loading" === document.readyState ? this.callbacks.push(t) : t.callback();
    }
  }
  function e(t, e = Number.MAX_VALUE) {
    var o;
    (window.canva_scriptExecutor =
      null !== (o = window.canva_scriptExecutor) && void 0 !== o
        ? o
        : new n()).runOnLoad({ callback: t, priority: e });
  }
  class o {
    constructor(t) {
      (this.items = []),
        (this.previousWidth = document.documentElement.clientWidth),
        (this.previousHeight = window.innerHeight);
      const n = t(() => this.onWindowResize(), 100);
      window.addEventListener("resize", n);
    }
    onWindowResize() {
      const t = document.documentElement.clientWidth,
        n = window.innerHeight,
        e = this.previousWidth !== t,
        o = this.previousHeight !== n;
      this.items.forEach((t) => {
        const n = () => {
          t.callback(), (t.executed = !0);
        };
        (!t.executed ||
          (e && t.options.runOnWidthChange) ||
          (o && t.options.runOnHeightChange)) &&
          n();
      }),
        (this.previousWidth = t),
        (this.previousHeight = n);
    }
    runOnResize(t, n) {
      this.items.push({ callback: t, options: n, executed: n.runOnLoad }),
        this.items.sort((t, n) => t.options.priority - n.options.priority),
        n.runOnLoad && e(t, n.priority);
    }
  }
  function i(n, e, i = t) {
    var r;
    (window.canva_debounceResize =
      null !== (r = window.canva_debounceResize) && void 0 !== r
        ? r
        : new o(i)).runOnResize(n, {
      runOnLoad: !1,
      runOnWidthChange: !0,
      runOnHeightChange: !1,
      priority: Number.MAX_VALUE,
      ...e,
    });
  }
  function r(t, n, e = 0.001) {
    return Math.abs(t - n) < e;
  }
  function c(t, n) {
    return window.getComputedStyle(t).getPropertyValue(n);
  }
  function u(t, n, e) {
    t.style.setProperty(n, e);
  }
  function s(t, n) {
    const e = document.createElement("div");
    e.style.setProperty(t, n), document.body.append(e);
    const o = c(e, t);
    return e.remove(), o;
  }
  function a() {
    const t = (function () {
        const t = parseFloat(s("font-size", "0.1px"));
        return t > 1 ? t : 0;
      })(),
      n = (function (t) {
        const n = 2 * Math.max(t, 1);
        return n / parseFloat(s("font-size", `${n}px`));
      })(t);
    if (
      ((function (t) {
        if (0 === t) return;
        u(document.documentElement, "--minfs", `${t}px`),
          i(
            () => {
              const n = 100 * t,
                { clientWidth: e } = document.documentElement;
              u(
                document.documentElement,
                "--rzf",
                n > e ? (e / n).toPrecision(4) : null
              );
            },
            { runOnLoad: !0 }
          );
      })(t * Math.max(1, n)),
      r(n, 1))
    )
      return;
    const e = r(
      parseFloat(c(document.documentElement, "font-size")),
      parseFloat(s("grid-template-columns", "1rem"))
    );
    u(document.documentElement, e ? "--rfso" : "--bfso", n.toPrecision(4));
  }
  function d() {
    document
      .querySelectorAll("img, image, video, svg")
      .forEach((t) =>
        t.addEventListener("contextmenu", (t) => t.preventDefault())
      );
  }
  const l = "--sbw",
    m = "--inner1Vh";
  function f(t, n, e) {
    t.style.setProperty(n, e);
  }
  function h() {
    f(document.documentElement, m, window.innerHeight / 100 + "px"),
      (function () {
        const t = window.innerWidth - document.documentElement.clientWidth;
        f(document.documentElement, l, t >= 0 ? `${t}px` : null);
      })();
  }
  var p;
  const w =
    "undefined" != typeof window
      ? null === (p = window.navigator) || void 0 === p
        ? void 0
        : p.userAgent
      : void 0;
  const g = !(
    !w ||
    ((v = w),
    !v.match(/AppleWebKit\//) || v.match(/Chrome\//) || v.match(/Chromium\//))
  );
  var v;
  function y() {
    document
      .querySelectorAll("svg")
      .forEach((t) => (t.style.background = "url('')"));
  }
  let b;
  function E() {
    b ||
      (b = Array.from(document.querySelectorAll("foreignObject")).filter(
        (t) => 0 === t.getBoundingClientRect().width
      ));
    const t = (function () {
      const t = document.createElement("div");
      (t.style.fontSize = "100vw"), document.body.append(t);
      const n = parseFloat(window.getComputedStyle(t).fontSize);
      return t.remove(), n / window.innerWidth;
    })();
    Array.from(b).forEach((n) =>
      (function (t, n) {
        const e = Array.from(t.children);
        e.forEach((t, n) => {
          if (t.hasAttribute("data-foreign-object-container"))
            (t.style.transformOrigin = ""), (t.style.transform = "");
          else {
            const o = document.createElement("div");
            o.setAttribute("data-foreign-object-container", ""),
              t.insertAdjacentElement("beforebegin", o),
              t.remove(),
              o.append(t),
              (e[n] = o);
          }
        });
        const o = t.getScreenCTM();
        if (!o) return;
        const { a: i, b: r, c: c, d: u } = o.scale(n);
        e.forEach((t) => {
          if (!t.hasAttribute("data-foreign-object-container")) return;
          const { style: n } = t;
          (n.transformOrigin = "0px 0px"),
            (n.transform = `matrix(${i}, ${r}, ${c}, ${u}, 0, 0)`);
        });
      })(n, t)
    );
  }
  [
    function () {
      e(a);
    },
    function () {
      i(h, { runOnLoad: !0, runOnHeightChange: !0, priority: 1 });
    },
    function () {
      g && i(E, { runOnLoad: !0 });
    },
    function () {
      g && e(y);
    },
    function () {
      e(d);
    },
  ].forEach((t) => t());
})();
window.C_CAPTCHA_IMPLEMENTATION = "RECAPTCHA";
window.C_CAPTCHA_KEY = "6Ldk59waAAAAAMPqkICbJjfMivZLCGtTpa6Wn6zO";
