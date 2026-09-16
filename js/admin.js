const API_BASE_URL = window.APP_CONFIG?.apiBaseUrl || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
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
