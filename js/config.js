// Local uses the same-origin Node server. Hosted builds use the deployed API.
const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

// Replace this with the public URL from Render, Railway, Fly.io, etc.
const productionApiUrl = "";

window.APP_CONFIG = {
  environment: isLocal ? "local" : "production",
  productionApiUrl,
  apiBaseUrl: isLocal ? window.location.origin : productionApiUrl,
};
