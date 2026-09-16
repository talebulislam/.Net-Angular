// Hard-coded API endpoints by environment.
const LOCAL_API_URL = "http://localhost:8000";

// This must be the public URL of the deployed Node server, not the GitHub Pages URL.
// Example: "https://net-angular-api.onrender.com"
const PRODUCTION_API_URL = "https://talebulislam.github.io/.Net-Angular/";

const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const apiBaseUrl = isLocal ? LOCAL_API_URL : PRODUCTION_API_URL;

window.APP_CONFIG = {
  environment: isLocal ? "local" : "production",
  apiBaseUrl,
};
