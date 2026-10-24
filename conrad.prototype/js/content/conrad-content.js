/**
 * Conrad Prototype — Content Manager & Dual-Edition Resolver
 * Resolves active edition (Global vs China) and handles fallback property lookups.
 */

window.Conrad = window.Conrad || {};

(function() {
  var EMBLEM_SVG_PATH = "M19.5266 12.1163C19.2633 11.9798 19.0165 11.8432 18.7862 11.6897C17.9635 11.1948 17.2067 10.5975 16.5156 9.93195C16.2853 9.7101 16.0385 9.47118 15.8246 9.21521C13.8337 6.9626 12.6491 4.07858 12.4681 1.02391L12.4352 0.221848V0.153586C12.4352 0.0682598 12.3858 0 12.3036 0H7.23594C7.15367 0 7.10431 0.0682598 7.10431 0.153586V0.221848L7.0714 1.02391C6.89042 4.02739 5.73868 6.89434 3.78073 9.12988C3.56684 9.38586 3.32004 9.62477 3.08969 9.86369C2.39865 10.5463 1.64179 11.1436 0.819125 11.6555C0.572324 11.8091 0.325524 11.9456 0.0787231 12.0822C0.0129097 12.1163 -0.0199973 12.2016 0.0129094 12.2699C0.128083 12.5429 0.243256 12.7989 0.35843 13.0378C0.802671 13.9252 1.36209 14.7443 2.02022 15.4781C2.21766 15.7 2.43155 15.9048 2.62899 16.1096C6.67652 19.9492 12.8794 19.9663 16.9434 16.1437C17.1573 15.9389 17.3712 15.7171 17.5522 15.5123C18.2103 14.7785 18.7697 13.9593 19.2304 13.0719C19.3621 12.816 19.4772 12.56 19.576 12.304C19.6253 12.2187 19.5924 12.1334 19.5266 12.1163ZM4.25788 15.6829C4.25788 15.8024 4.1427 15.8706 4.04398 15.8024C3.87945 15.6829 3.73137 15.5464 3.58329 15.4099C3.35294 15.2051 3.1555 15.0003 2.97451 14.8126C2.38219 14.1812 1.87214 13.4644 1.46081 12.6794C1.4279 12.6112 1.44435 12.5429 1.51017 12.4917C2.23411 12.031 2.92515 11.5019 3.56684 10.9047C3.79718 10.6999 4.02753 10.461 4.24142 10.2391C5.96903 8.41314 7.18658 6.14347 7.76244 3.66902C7.76244 3.4813 8.0257 3.4813 8.0257 3.66902C8.2725 4.94891 8.63447 6.21173 9.14453 7.4063C9.16098 7.44043 9.16098 7.49162 9.14453 7.52575C8.28895 9.38586 7.12076 11.0753 5.67287 12.5088C5.45897 12.7136 5.24508 12.9184 5.06409 13.1402C4.66921 13.618 4.40596 14.1982 4.29078 14.8297C4.25788 15.0344 4.24142 15.2392 4.24142 15.444L4.25788 15.6829ZM12.8301 13.0378C12.8959 13.1061 12.8794 13.2085 12.7972 13.2597C11.9087 13.8057 10.8721 14.0959 9.83557 14.1129H9.80266C8.73319 14.1129 7.68018 13.8057 6.75879 13.2255C6.69298 13.1743 6.67652 13.0719 6.72588 13.0207C6.98913 12.7477 7.25239 12.4576 7.49919 12.1675C8.32186 11.1948 9.04581 10.1367 9.65458 8.99336C9.70394 8.90803 9.83557 8.90803 9.88493 8.99336C10.6747 10.461 11.6619 11.8262 12.8301 13.0378ZM5.73868 14.0788C5.77159 14.0105 5.87031 13.9935 5.91967 14.0447C7.0714 14.8467 8.42058 15.2734 9.80266 15.2734L10.1153 15.2563C10.395 15.2392 10.6747 15.2051 10.9379 15.171C11.9251 15.0003 12.863 14.6078 13.7021 14.0447C13.7515 14.0105 13.8173 14.0105 13.8666 14.0617C14.4425 14.5737 15.0677 15.0515 15.7094 15.4781C15.7917 15.5293 15.7917 15.6488 15.7094 15.7C14.0476 17.0652 12.0074 17.8161 9.90138 17.8331H9.81911C9.39133 17.8331 8.94709 17.799 8.5193 17.7478C7.58146 17.6113 6.67652 17.3382 5.82095 16.9287C5.80449 16.9116 5.78804 16.8945 5.77159 16.8775C5.19572 16.0413 5.17926 14.915 5.73868 14.0788ZM14.5248 13.1573L13.8831 12.56C12.4023 11.0924 11.1847 9.35173 10.3127 7.42336C10.1482 7.06499 10.0001 6.70662 9.86847 6.34825C9.27615 4.74412 8.91418 3.03761 8.81546 1.33109C8.79901 1.24576 8.86482 1.1775 8.94709 1.1775H11.2341C11.2999 1.1775 11.3657 1.22869 11.3822 1.31402L11.448 2.08195C11.8429 5.20489 13.2085 8.10597 15.3474 10.3415C15.5613 10.5634 15.7917 10.7852 16.022 11.0071C16.6637 11.6043 17.3548 12.1163 18.0787 12.5771C18.1445 12.6112 18.161 12.6965 18.1281 12.7648C17.7496 13.4644 17.2889 14.13 16.7624 14.7273C16.7131 14.7785 16.6473 14.7955 16.5979 14.7614C15.874 14.2494 15.1829 13.7375 14.5248 13.1573Z";

  // 1. Resolve Active Edition
  function resolveEdition() {
    // Priority A: Explicit URL query param
    try {
      var params = new URLSearchParams(window.location.search);
      var q = params.get("edition") || params.get("region") || params.get("ver");
      if (q) {
        q = q.toLowerCase();
        if (q === "china" || q === "cn" || q === "poseidon") return "china";
        if (q === "global" || q === "drunkeast" || q === "en") return "global";
      }
    } catch (e) {}

    // Priority B: Domain / hostname detection (for production multi-domain deployments)
    try {
      var host = (window.location.hostname || "").toLowerCase();
      if (host.includes("poseidon") || host.includes(".cn") || host.includes("china")) {
        return "china";
      }
    } catch (e) {}

    // Priority C: Injected global configuration variable
    if (window.CONRAD_EDITION) {
      return String(window.CONRAD_EDITION).toLowerCase() === "china" ? "china" : "global";
    }

    // Priority D: Pathname check (e.g. /cn/ or /conradtemplate/cn/)
    try {
      var p = (window.location.pathname || "").toLowerCase();
      if (p.includes("/cn/") || p.endsWith("/cn")) {
        return "china";
      }
    } catch (e) {}

    // Priority E: Session / localStorage persistence across route navigation
    try {
      var saved = localStorage.getItem("conrad_edition");
      if (saved === "china" || saved === "global") return saved;
    } catch (e) {}

    // Priority F: Default to global
    return "global";
  }

  var activeEdition = resolveEdition();

  // If set via URL query or pathname, persist to localStorage so route clicks in the SPA preserve active edition
  try {
    var params = new URLSearchParams(window.location.search);
    var q = params.get("edition") || params.get("region");
    var isCnPath = (window.location.pathname || "").toLowerCase().includes("/cn");
    if (q || isCnPath) {
      localStorage.setItem("conrad_edition", activeEdition);
    }
  } catch (e) {}

  function deepGet(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.split(".");
    var curr = obj;
    for (var i = 0; i < parts.length; i++) {
      if (curr === undefined || curr === null) return undefined;
      curr = curr[parts[i]];
    }
    return curr;
  }

  function deepMerge(target, source) {
    if (!source || typeof source !== "object" || Array.isArray(source)) return source !== undefined ? source : target;
    if (!target || typeof target !== "object" || Array.isArray(target)) return source;
    var output = Object.assign({}, target);
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        var sVal = source[key];
        var tVal = target[key];
        if (sVal !== null && typeof sVal === "object" && !Array.isArray(sVal) &&
            tVal !== null && typeof tVal === "object" && !Array.isArray(tVal)) {
          output[key] = deepMerge(tVal, sVal);
        } else if (sVal !== undefined && sVal !== null) {
          output[key] = sVal;
        }
      }
    }
    return output;
  }

  // Content Store Object
  Conrad.edition = activeEdition;
  Conrad.isChina = (activeEdition === "china");
  Conrad.isGlobal = (activeEdition === "global");

  Conrad.content = {
    edition: activeEdition,
    get: function(path, defaultValue) {
      var globalDict = window.Conrad.CONTENT_GLOBAL || {};
      var chinaDict = window.Conrad.CONTENT_CHINA || {};
      var isCn = (Conrad.edition === "china");

      var globalVal = deepGet(globalDict, path);
      if (isCn) {
        var chinaVal = deepGet(chinaDict, path);
        if (chinaVal !== undefined && chinaVal !== null) {
          if (typeof chinaVal === "object" && !Array.isArray(chinaVal) &&
              typeof globalVal === "object" && !Array.isArray(globalVal)) {
            return deepMerge(globalVal, chinaVal);
          }
          return chinaVal;
        }
        if (globalVal !== undefined && globalVal !== null) return globalVal;
      } else {
        if (globalVal !== undefined && globalVal !== null) return globalVal;
      }

      return defaultValue !== undefined ? defaultValue : "";
    },
    getAll: function() {
      var globalDict = window.Conrad.CONTENT_GLOBAL || {};
      var chinaDict = window.Conrad.CONTENT_CHINA || {};
      return deepMerge(globalDict, (Conrad.edition === "china") ? chinaDict : {});
    }
  };

  // Synchronize company brand name in top-left header & document title
  function applyBrand() {
    var isCn = (Conrad.edition === "china");
    var companyName = Conrad.content.get("companyName", isCn ? "Poseidon" : "DrunkEast");
    var metaTitle = Conrad.content.get("metaTitle");

    if (metaTitle && (!document.title || document.title.includes("Anduril") || !document.title.includes(companyName))) {
      document.title = metaTitle;
    }

    var rawEmblem = isCn ? "/assets/images/brand/poseidon-trident.png" : "/assets/images/brand/drunkeast-swirl.png";
    var emblemSrc = (typeof window.qualifyUrl === "function") ? window.qualifyUrl(rawEmblem) : rawEmblem;

    var homeLinks = document.querySelectorAll(".left-wrapper .home, .HeaderDesktop .home, .HeaderMobile .home, .top-nav .home, .nav-bg .home, a.home");
    homeLinks.forEach(function(link) {
      var lockup = link.querySelector(".conrad-brand-lockup");
      var currentBrand = link.getAttribute("data-branded");
      if (!lockup || currentBrand !== companyName) {
        link.setAttribute("data-branded", companyName);
        link.setAttribute("aria-label", companyName + " Homepage");
        link.innerHTML = "";

        var lockupDiv = document.createElement("div");
        lockupDiv.className = "conrad-brand-lockup";
        lockupDiv.setAttribute("style", "display:inline-flex!important;align-items:center!important;gap:8px!important;opacity:1!important;visibility:visible!important;");

        var emblemImg = document.createElement("img");
        emblemImg.className = "conrad-brand-emblem";
        emblemImg.setAttribute("src", emblemSrc);
        emblemImg.setAttribute("alt", companyName + " Logo");
        emblemImg.setAttribute("style", "height:24px!important;width:auto!important;max-width:32px!important;object-fit:contain!important;display:inline-block!important;opacity:1!important;visibility:visible!important;");

        var brandNameSpan = document.createElement("span");
        brandNameSpan.className = "conrad-brand-name";
        brandNameSpan.setAttribute("style", "font-size:1.15rem!important;font-weight:700!important;letter-spacing:0.04em!important;text-transform:uppercase!important;color:#ffffff!important;line-height:1!important;display:inline-block!important;opacity:1!important;visibility:visible!important;");
        brandNameSpan.textContent = companyName;

        lockupDiv.appendChild(emblemImg);
        lockupDiv.appendChild(brandNameSpan);
        link.appendChild(lockupDiv);
      }
    });
  }

  function cleanUiArtifacts() {
    // 1. Remove Search link / button
    var searchLinks = document.querySelectorAll(".searchLink, .search-button, .SearchDomainWrapper, .Header [aria-label*='Search' i]");
    searchLinks.forEach(function(el) {
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
      el.style.setProperty("opacity", "0", "important");
      el.style.setProperty("pointer-events", "none", "important");
    });

    // 2. Remove Anduril logo in Footer
    var footerLogos = document.querySelectorAll(".Footer .logo, .Footer svg[aria-label*='Anduril' i]");
    footerLogos.forEach(function(el) {
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
    });

    // 3. Remove terms of service, anti-slavery, and other filler links below copyright
    var fillerLinks = document.querySelectorAll(
      ".Footer .small-links a[href*='terms-of-use'], " +
      ".Footer .small-links a[href*='modern-anti-slavery'], " +
      ".Footer .small-links a[href*='investor-relations'], " +
      ".Footer .small-links a[href*='supplier-relations'], " +
      ".Footer .small-links a[href*='uk-carbon-reduction'], " +
      ".FooterListSmallLink[data-path='terms-of-use'], " +
      ".FooterListSmallLink[data-path='modern-anti-slavery-policy'], " +
      ".FooterListSmallLink[data-path='investor-relations'], " +
      ".FooterListSmallLink[data-path='supplier-relations'], " +
      ".FooterListSmallLink[data-path='uk-carbon-reduction-plan'], " +
      ".FooterListSmallLink[data-path='privacy-policy']"
    );
    fillerLinks.forEach(function(el) {
      el.remove();
    });

    var copyright = document.querySelector(".Footer .copyright");
    if (copyright) {
      var brandName = (Conrad && Conrad.isChina) ? "POSEIDON" : "DRUNKEAST";
      copyright.textContent = "COPYRIGHT © 2026 " + brandName;
    }

    // 4. Handle 404 / 400 error page background animation
    var fourOhFour = document.querySelector(".FourOhFourSlice");
    var canvas = document.querySelector(".Container > canvas");
    if (fourOhFour) {
      document.body.classList.add("has-404");
      fourOhFour.style.setProperty("background-image", "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7)), url('/assets/images/subsea/error-404-subsea-bg.jpg')", "important");
      fourOhFour.style.setProperty("background-size", "cover", "important");
      fourOhFour.style.setProperty("background-position", "center", "important");
      fourOhFour.style.setProperty("background-repeat", "no-repeat", "important");
      fourOhFour.style.setProperty("background-attachment", "fixed", "important");
      if (canvas) {
        canvas.style.setProperty("display", "none", "important");
        canvas.style.setProperty("opacity", "0", "important");
      }
    } else {
      if (document.body.classList.contains("has-404")) {
        document.body.classList.remove("has-404");
        if (canvas) {
          canvas.style.removeProperty("display");
          canvas.style.removeProperty("opacity");
        }
      }
    }
  }

  function syncEdition() {
    var resolved = resolveEdition();
    if (resolved !== Conrad.edition) {
      Conrad.edition = resolved;
      Conrad.isChina = (resolved === "china");
      Conrad.isGlobal = (resolved === "global");
      if (Conrad.content) Conrad.content.edition = resolved;
      try {
        localStorage.setItem("conrad_edition", resolved);
      } catch (e) {}
      applyBrand();
      cleanUiArtifacts();
      if (window.syncAllRoutes) window.syncAllRoutes();
    } else {
      applyBrand();
      cleanUiArtifacts();
    }
    return resolved;
  }

  Conrad.resolveEdition = resolveEdition;
  Conrad.syncEdition = syncEdition;
  Conrad.applyBrand = applyBrand;
  applyBrand();

  window.addEventListener("conrad-locationchange", syncEdition);
  window.addEventListener("popstate", syncEdition);
  setInterval(syncEdition, 100);

  if (window.Conrad && Conrad.onReady) {
    Conrad.onReady(applyBrand);
  } else {
    document.addEventListener("DOMContentLoaded", applyBrand);
  }
})();
