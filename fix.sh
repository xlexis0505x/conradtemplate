# 1. Router
sed -i 's/setInterval(sync3DModal, 50);/var observer = new MutationObserver(sync3DModal); document.addEventListener("DOMContentLoaded", function() { observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open"] }); }); window.sync3DModal = sync3DModal;/' conrad.prototype/js/conrad-router.js
sed -i 's/window.syncAllRoutes = syncAllRoutes;/window.Conrad = window.Conrad || {}; window.Conrad.syncAllRoutes = syncAllRoutes;/' conrad.prototype/js/conrad-router.js
sed -i 's/window.addEventListener("conrad-locationchange", syncAllRoutes);/var _pushState = history.pushState; history.pushState = function(state, title, url) { _pushState.apply(this, arguments); window.dispatchEvent(new Event("conrad-routechange")); }; var _replaceState = history.replaceState; history.replaceState = function(state, title, url) { _replaceState.apply(this, arguments); window.dispatchEvent(new Event("conrad-routechange")); }; window.addEventListener("conrad-locationchange", syncAllRoutes);/' conrad.prototype/js/conrad-router.js
sed -i 's/setInterval(syncAllRoutes, 100);/window.addEventListener("conrad-routechange", syncAllRoutes);/' conrad.prototype/js/conrad-router.js

# 2. Content
sed -i 's/if (q || isCnPath)/if (q)/' conrad.prototype/js/content/conrad-content.js
sed -i 's/setInterval(applyBrand, 200);/window.addEventListener("conrad-locationchange", applyBrand); window.addEventListener("conrad-routechange", applyBrand); window.addEventListener("popstate", applyBrand);/' conrad.prototype/js/content/conrad-content.js

cat << 'INNEREOF' >> conrad.prototype/js/content/conrad-content.js

// 6. Visual Edition Switcher
(function() {
  function createSwitcher() {
    if (document.getElementById('conrad-edition-switcher')) return;

    var rightWrapper = document.querySelector('.right-wrapper');
    if (!rightWrapper) {
      setTimeout(createSwitcher, 100);
      return;
    }

    var switcher = document.createElement('div');
    switcher.id = 'conrad-edition-switcher';
    switcher.className = 'edition-switcher';

    var globalPill = document.createElement('div');
    globalPill.className = 'edition-pill ' + (Conrad.isGlobal ? 'active' : '');
    globalPill.textContent = 'GLOBAL';
    globalPill.onclick = function() {
      localStorage.setItem('conrad_edition', 'global');
      window.location.search = '?edition=global';
    };

    var cnPill = document.createElement('div');
    cnPill.className = 'edition-pill ' + (Conrad.isChina ? 'active' : '');
    cnPill.textContent = 'CN';
    cnPill.onclick = function() {
      localStorage.setItem('conrad_edition', 'china');
      window.location.search = '?edition=china';
    };

    switcher.appendChild(globalPill);
    switcher.appendChild(cnPill);

    if (rightWrapper.firstChild) {
      rightWrapper.insertBefore(switcher, rightWrapper.firstChild);
    } else {
      rightWrapper.appendChild(switcher);
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createSwitcher();
  } else {
    document.addEventListener('DOMContentLoaded', createSwitcher);
  }
})();
INNEREOF

# 3. CSS
cat << 'INNEREOF' >> conrad.prototype/css/nav.css

/* 5. Edition Switcher */
.edition-switcher {
  display: inline-flex;
  align-items: center;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 4px;
  margin-left: auto;
  margin-right: 16px;
  cursor: pointer;
  pointer-events: auto;
}

.edition-pill {
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  border-radius: 8px;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.edition-pill.active {
  background: #01B1C7;
  color: #fff;
}
INNEREOF

# 4. Biz
sed -i 's/window.ensureBizTrack = ensureBizTrack;/window.Conrad = window.Conrad || {}; window.Conrad.ensureBizTrack = ensureBizTrack;/' conrad.prototype/js/conrad-biz.js
sed -i 's/window.addEventListener("popstate", ensureBizTrack);/window.addEventListener("popstate", ensureBizTrack); window.addEventListener("conrad-routechange", ensureBizTrack); window.addEventListener("conrad-routechange", checkBizRoute); window.addEventListener("popstate", checkBizRoute); window.addEventListener("conrad-locationchange", checkBizRoute);/' conrad.prototype/js/conrad-biz.js
sed -i 's/setInterval(checkBizRoute, 150);/\/\/ setInterval(checkBizRoute, 150);/' conrad.prototype/js/conrad-biz.js

# 5. About
sed -i 's/window.generateContactHTML = function(kicker, leadText)/window.Conrad = window.Conrad || {}; window.Conrad.content = window.Conrad.content || {}; window.Conrad.content.generateContactHTML = function(kicker, leadText)/' conrad.prototype/js/conrad-about.js
sed -i 's/typeof window.generateContactHTML/typeof (window.Conrad\&\&window.Conrad.content\&\&window.Conrad.content.generateContactHTML)/g' conrad.prototype/js/conrad-about.js
sed -i 's/window.generateContactHTML("02/window.Conrad.content.generateContactHTML("02/' conrad.prototype/js/conrad-about.js
sed -i 's/window.ensureAboutTrack = ensureAboutTrack;/window.Conrad = window.Conrad || {}; window.Conrad.ensureAboutTrack = ensureAboutTrack;/' conrad.prototype/js/conrad-about.js
sed -i 's/window.goToWalkStep = goToWalkStep;/window.Conrad = window.Conrad || {}; window.Conrad.goToWalkStep = goToWalkStep;/' conrad.prototype/js/conrad-about.js
sed -i 's/window.addEventListener("conrad-locationchange", ensureAboutTrack);/window.addEventListener("conrad-locationchange", ensureAboutTrack); window.addEventListener("conrad-routechange", ensureAboutTrack); window.addEventListener("popstate", ensureAboutTrack); window.addEventListener("conrad-routechange", checkAboutRoute); window.addEventListener("conrad-locationchange", checkAboutRoute);/' conrad.prototype/js/conrad-about.js
sed -i 's/setInterval(checkAboutRoute, 150);/\/\/ setInterval(checkAboutRoute, 150);/' conrad.prototype/js/conrad-about.js

# 6. Tech
sed -i 's/window.ensureTechSections = ensureTechSections;/window.Conrad = window.Conrad || {}; window.Conrad.ensureTechSections = ensureTechSections;/' conrad.prototype/js/conrad-tech.js
sed -i 's/window.addEventListener("popstate", ensureTechSections);/window.addEventListener("popstate", ensureTechSections); window.addEventListener("conrad-routechange", ensureTechSections);/' conrad.prototype/js/conrad-tech.js

# 7. Janus
sed -i 's/window.ensureHomeJanus = ensureHomeJanus;/window.Conrad = window.Conrad || {}; window.Conrad.ensureHomeJanus = ensureHomeJanus;/' conrad.prototype/js/conrad-janus.js
sed -i 's/window.addEventListener("popstate", ensureHomeJanus);/window.addEventListener("popstate", ensureHomeJanus); window.addEventListener("conrad-routechange", ensureHomeJanus);/' conrad.prototype/js/conrad-janus.js

# 8. Home
sed -i 's/window.__dismissPrepaint/window.Conrad = window.Conrad || {}; window.Conrad.ui = window.Conrad.ui || {}; if (window.Conrad.ui.__dismissPrepaint) window.Conrad.ui.__dismissPrepaint/g' conrad.prototype/js/conrad-home.js
sed -i 's/setInterval(attachCardListeners, 250);/window.addEventListener("conrad-locationchange", attachCardListeners); window.addEventListener("conrad-routechange", attachCardListeners); window.addEventListener("popstate", attachCardListeners);/' conrad.prototype/js/conrad-home.js

# 9. Index
sed -i 's/window.__dismissPrepaint = dismissPrepaint;/window.Conrad = window.Conrad || {}; window.Conrad.ui = window.Conrad.ui || {}; window.Conrad.ui.__dismissPrepaint = dismissPrepaint;/' conrad.prototype/index.html
sed -i '322s/.*/<script>window.ssgSiteSettings = {"title":"Conrad Challenge SPA","metaTitle":"Conrad Challenge","metaSiteName":"Conrad Challenge","orgName":"Conrad Challenge"};<\/script>/' conrad.prototype/index.html
sed -i '396s/.*/window._CONFIG_.ASSETS_MANIFEST = {};/' conrad.prototype/index.html

# 10. Server.py
sed -i 's/from http.server import HTTPServer as ServerClass/from http.server import ThreadingHTTPServer as ServerClass/g' conrad.prototype/server.py
sed -i 's/Development Server for anduril.com/Development Server for Conrad Challenge/g' conrad.prototype/server.py
sed -i 's/anduril.com running at/Conrad Challenge running at/g' conrad.prototype/server.py
sed -i 's/import urllib.request/import urllib.request, ssl/g' conrad.prototype/server.py
sed -i 's/urlopen(req, timeout=5)/urlopen(req, timeout=5, context=ssl._create_unverified_context())/g' conrad.prototype/server.py
sed -i 's/urlopen(req, timeout=8)/urlopen(req, timeout=8, context=ssl._create_unverified_context())/g' conrad.prototype/server.py
sed -i 's/https:\/\/www.anduril.com/https:\/\/www.anduril.com/g' conrad.prototype/server.py
