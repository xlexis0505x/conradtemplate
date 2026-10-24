/**
 * Conrad Prototype — Central SPA Route Coordinator
 * Synchronizes route changes, mounts/unmounts custom sections, and handles header state.
 */

(function() {
  var lastObservedPath = null;
  var isRouteSyncing = false;
  var navHydrated = false;

  // Element caches to prevent repeated expensive DOM queries
  var cachedHomeTrack = null;
  var cachedTechSpec = null;
  var cachedBizDoctrine = null;
  var cachedAboutTrack = null;

  function syncAllRoutes() {
    if (isRouteSyncing) return;
    isRouteSyncing = true;
    try {
      var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
      if (p === "/index.html") p = "/";
      var routeChanged = (p !== lastObservedPath);
      if (routeChanged) {
        lastObservedPath = p;
        navHydrated = false;
      }
      if (routeChanged || !navHydrated) {
        updateNav(p);
      }

      var isHome = (p === "" || p === "/" || p === "/index.html");
      var isTech = (p === "/technology" || p.startsWith("/technology/"));
      var isBiz = (p === "/business" || p.startsWith("/business/"));
      var isAbout = (p === "/about" || p.startsWith("/about/"));

      // 1. Home Route Sync (Radiant Nuclear 3D reactor)
      var homeTrack = (cachedHomeTrack && cachedHomeTrack.isConnected) ? cachedHomeTrack : (cachedHomeTrack = document.getElementById("conrad-radiant-janus-track"));
      var ensureHome = (window.Conrad && window.Conrad.ensureHomeJanus) || window.ensureHomeJanus;
      if (isHome) {
        if (!homeTrack && typeof ensureHome === "function") {
          ensureHome();
        }
      } else if (homeTrack && typeof ensureHome === "function") {
        ensureHome();
      }

      // 2. Technology Route Sync (3D Submarine, Spec Matrix & Comparison)
      var techSpec = (cachedTechSpec && cachedTechSpec.isConnected) ? cachedTechSpec : (cachedTechSpec = document.getElementById("conrad-tech-spec-matrix"));
      var ensureTech = (window.Conrad && window.Conrad.ensureTechSections) || window.ensureTechSections;
      if (isTech) {
        if (!techSpec && typeof ensureTech === "function") {
          ensureTech();
        }
      } else if (techSpec && typeof ensureTech === "function") {
        ensureTech();
      }

      // 3. Business Route Sync (Doctrine, Unit Economics, Factory Cells, Roadmap, Diligence)
      var bizDoctrine = (cachedBizDoctrine && cachedBizDoctrine.isConnected) ? cachedBizDoctrine : (cachedBizDoctrine = document.getElementById("conrad-biz-doctrine"));
      var ensureBiz = (window.Conrad && window.Conrad.ensureBizTrack) || window.ensureBizTrack;
      if (isBiz) {
        if (!bizDoctrine && typeof ensureBiz === "function") {
          ensureBiz();
        }
      } else if (bizDoctrine && typeof ensureBiz === "function") {
        ensureBiz();
      }

      // 4. About Route Sync (Walk Alone conveyor & Contact Us block)
      var aboutTrack = (cachedAboutTrack && cachedAboutTrack.isConnected) ? cachedAboutTrack : (cachedAboutTrack = document.getElementById("conrad-walkalone-track"));
      var ensureAbout = (window.Conrad && window.Conrad.ensureAboutTrack) || window.ensureAboutTrack;
      if (isAbout) {
        if (!aboutTrack && typeof ensureAbout === "function") {
          ensureAbout();
        }
      } else if (aboutTrack && typeof ensureAbout === "function") {
        ensureAbout();
      }
    } finally {
      isRouteSyncing = false;
    }
  }

  function updateNav(p) {
    p = p || (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    if (p === "/index.html") p = "/";
    var links = document.querySelectorAll(".center-wrapper .HeaderLink");
    if (!links || links.length === 0) return false;
    var foundActive = false;
    links.forEach(function(l) {
      var rawHref = l.getAttribute("href") || "";
      var href = (window.getAppPath ? window.getAppPath(rawHref) : rawHref.replace(/\/$/, "")) || "/";
      if (href === "/index.html") href = "/";
      var isCurrent = false;
      if (href === "/") {
        isCurrent = (p === "" || p === "/");
      } else {
        isCurrent = (p === href || p.startsWith(href + "/"));
      }
      if (isCurrent) {
        l.classList.add("active");
        foundActive = true;
      } else {
        l.classList.remove("active");
      }
    });
    if (foundActive) {
      navHydrated = true;
    }
    return foundActive;
  }

  // 3D Modal state watcher for smooth header slide
  function sync3DModal() {
    var dialog = document.querySelector('.Product3DSlice dialog');
    var isOpen = !!(dialog && (dialog.open || dialog.hasAttribute('open')));
    if (document.body.classList.contains('modal-3d-open') !== isOpen) {
      document.body.classList.toggle('modal-3d-open', isOpen);
    }
  }
  setInterval(sync3DModal, 50);

  window.syncAllRoutes = syncAllRoutes;
  if (window.Conrad) window.Conrad.syncAllRoutes = syncAllRoutes;

  window.addEventListener("conrad-locationchange", syncAllRoutes);
  window.addEventListener("popstate", syncAllRoutes);
  setInterval(syncAllRoutes, 100);

  if (window.Conrad && Conrad.onReady) {
    Conrad.onReady(syncAllRoutes);
  } else {
    document.addEventListener("DOMContentLoaded", syncAllRoutes);
  }
})();
