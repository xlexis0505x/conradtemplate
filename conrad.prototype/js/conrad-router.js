/**
 * Conrad Prototype — Central SPA Route Coordinator
 * Synchronizes route changes, mounts/unmounts custom sections, and handles header state.
 */

(function() {
  var lastObservedPath = null;
  var isRouteSyncing = false;

  function syncAllRoutes() {
    if (isRouteSyncing) return;
    isRouteSyncing = true;
    try {
      var p = window.location.pathname.replace(/\/$/, "") || "/";
      var routeChanged = (p !== lastObservedPath);
      if (routeChanged) {
        lastObservedPath = p;
        updateNav(p);
      }

      var isHome = (p === "" || p === "/" || p === "/index.html");
      var isTech = (p === "/technology" || p.startsWith("/technology/"));
      var isBiz = (p === "/business" || p.startsWith("/business/"));
      var isAbout = (p === "/about" || p.startsWith("/about/"));

      // 1. Home Route Sync (Radiant Nuclear 3D reactor)
      var homeTrack = document.getElementById("conrad-radiant-janus-track");
      var ensureHome = (window.Conrad && window.Conrad.ensureHomeJanus) || window.ensureHomeJanus;
      if (isHome) {
        if (!homeTrack && typeof ensureHome === "function") {
          ensureHome();
        }
      } else if (homeTrack && typeof ensureHome === "function") {
        ensureHome();
      }

      // 2. Technology Route Sync (3D Submarine, Spec Matrix & Comparison)
      var techSpec = document.getElementById("conrad-tech-spec-matrix");
      var ensureTech = (window.Conrad && window.Conrad.ensureTechSections) || window.ensureTechSections;
      if (isTech) {
        if (!techSpec && typeof ensureTech === "function") {
          ensureTech();
        }
      } else if (techSpec && typeof ensureTech === "function") {
        ensureTech();
      }

      // 3. Business Route Sync (Doctrine, Unit Economics, Factory Cells, Roadmap, Diligence)
      var bizDoctrine = document.getElementById("conrad-biz-doctrine");
      var ensureBiz = (window.Conrad && window.Conrad.ensureBizTrack) || window.ensureBizTrack;
      if (isBiz) {
        if (!bizDoctrine && typeof ensureBiz === "function") {
          ensureBiz();
        }
      } else if (bizDoctrine && typeof ensureBiz === "function") {
        ensureBiz();
      }

      // 4. About Route Sync (Walk Alone conveyor & Contact Us block)
      var aboutTrack = document.getElementById("conrad-walkalone-track");
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
    var links = document.querySelectorAll(".center-wrapper .HeaderLink");
    links.forEach(function(l) {
      var href = l.getAttribute("href") ? l.getAttribute("href").replace(/\/$/, "") || "/" : "";
      var isCurrent = (href === p) || (href !== "/" && p.startsWith(href));
      if (isCurrent) {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });
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
