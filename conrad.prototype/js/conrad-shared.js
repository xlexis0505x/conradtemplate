/**
 * Conrad Prototype — Shared Utilities & Global Namespace
 */

window.Conrad = window.Conrad || {};

// ── Base & Route Path Normalizer ───────────────────────────
window.getAppPath = function(pathname) {
  var p = (pathname !== undefined ? pathname : window.location.pathname).replace(/\/$/, "") || "/";
  if (p === "/index.html") return "/";
  var base = window.CONRAD_BASE_PATH || "";
  if (base && base !== "/") {
    var cleanBase = base.replace(/\/$/, "");
    if (p.startsWith(cleanBase)) {
      p = p.substring(cleanBase.length);
      if (!p.startsWith("/")) p = "/" + p;
    }
  } else {
    p = p.replace(/^\/[^\/]+(?=(?:\/technology|\/business|\/about|\/cn|\/index\.html|\/?$))/, "");
  }
  p = p.replace(/^\/cn(?=\/|$)/, "");
  p = p.replace(/\/index\.html$/, "");
  return p.replace(/\/$/, "") || "/";
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
