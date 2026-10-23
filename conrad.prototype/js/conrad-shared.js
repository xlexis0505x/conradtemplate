/**
 * Conrad Prototype — Shared Utilities & Global Namespace
 */

window.Conrad = window.Conrad || {};

// ── Base & Route Path Normalizer ───────────────────────────
window.getAppPath = function(pathname) {
  var p = (pathname !== undefined ? pathname : window.location.pathname).split('?')[0].split('#')[0].replace(/\/$/, "") || "/";
  if (p === "/index.html") return "/";
  if (p.startsWith("/conradtemplate")) {
    p = p.substring(15);
  }
  if (p.startsWith("/cn")) {
    p = p.substring(3);
  }
  p = p.replace(/\/$/, "");
  if (!p.startsWith("/")) p = "/" + p;
  if (p === "/index.html" || p === "") return "/";
  return p;
};

// ── Route helpers ──────────────────────────────────────────
Conrad.route = {
  current: function() {
    return window.getAppPath();
  },
  is: function(path) {
    return this.current() === path;
  },
  isHome: function() {
    return this.is("/");
  },
  isTech: function() {
    return this.is("/technology");
  },
  isBiz: function() {
    return this.is("/business");
  },
  isAbout: function() {
    return this.is("/about");
  }
};

// ── DOMReady helper ────────────────────────────────────────
Conrad.onReady = function(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

// ── Shared resize manager ──────────────────────────────────
Conrad.resize = {
  _callbacks: [],
  add: function(fn) {
    if (typeof fn === "function") {
      this._callbacks.push(fn);
    }
  },
  _fire: function() {
    for (var i = 0; i < this._callbacks.length; i++) {
      try {
        this._callbacks[i]();
      } catch (e) {
        console.error("[Conrad.resize] callback error:", e);
      }
    }
  },
  init: function() {
    var self = this;
    window.addEventListener("resize", function() {
      self._fire();
    });
  }
};

Conrad.resize.init();
