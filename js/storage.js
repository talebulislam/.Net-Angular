const API_BASE_URL = window.APP_CONFIG?.apiBaseUrl || "";
import { authenticatedHeaders } from "./session.js";

function getApiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error(
      "The production API URL is not configured. Set PRODUCTION_API_URL in js/config.js.",
    );
  }
  if (API_BASE_URL.includes("talebulislam.github.io")) {
    throw new Error(
      "GitHub Pages hosts the frontend only. Configure PRODUCTION_API_URL with your deployed Node API URL.",
    );
  }
  return `${API_BASE_URL}/api${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(getApiUrl(path), {
    ...options,
    credentials: "include",
    headers: authenticatedHeaders({
      "Content-Type": "application/json",
      ...(options.headers || {}),
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(body.error || "Progress could not be saved.");
  return body;
}

export async function getCompletedDays() {
  const { completedDays } = await request("/progress");
  return completedDays;
}

export async function saveCompletedDays(days) {
  const { completedDays } = await request("/progress", {
    method: "PUT",
    body: JSON.stringify({
      completedDays: [...new Set(days)].sort((a, b) => a - b),
    }),
  });
  return completedDays;
}
