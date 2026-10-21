/**
 * Conrad Prototype — China Content Dictionary
 * Serves as the China (Poseidon) edition content dictionary.
 * Currently matches Global English content with Poseidon company branding.
 * Any keys added here will override window.Conrad.CONTENT_GLOBAL.
 */

window.Conrad = window.Conrad || {};

window.Conrad.CONTENT_CHINA = {
  edition: "china",
  companyName: "Poseidon",
  brandName: "Poseidon",
  metaTitle: "Transforming Maritime Capabilities with Advanced Technology | Poseidon"
  
  // Future China-specific content overrides (narrative, metrics, contacts) can be placed here.
  // Any keys omitted automatically fall back to window.Conrad.CONTENT_GLOBAL.
};
