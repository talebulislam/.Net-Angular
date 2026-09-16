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
    throw new Error(body.error || "The request could not be completed.");
  return body;
}

export async function getUsers() {
  const { users } = await request("/admin/users");
  return users;
}

export async function setApproval(userId, approved) {
  const { user } = await request(`/admin/users/${encodeURIComponent(userId)}`, {
    method: "PATCH",
    body: JSON.stringify({ approved }),
  });
  return user;
}

export async function deleteUser(userId) {
  await request(`/admin/users/${encodeURIComponent(userId)}`, {
    method: "DELETE",
  });
}
