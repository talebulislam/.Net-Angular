const API_BASE_URL = window.APP_CONFIG?.apiBaseUrl || "";

function getApiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error(
      "The production API URL is not configured. Set productionApiUrl in js/config.js.",
    );
  }
  return `${API_BASE_URL}/api${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(getApiUrl(path), {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
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
