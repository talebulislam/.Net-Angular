async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(body.error || "The request could not be completed.");
  return body;
}

export async function signIn(email, password) {
  const { user } = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return user;
}

export async function register(name, email, password) {
  const { user } = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return user;
}

export async function signOut() {
  await request("/auth/logout", { method: "POST" });
}

export async function changePassword(currentPassword, newPassword) {
  const { user } = await request("/auth/password", {
    method: "PATCH",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return user;
}

export async function getCurrentUser() {
  try {
    const { user } = await request("/auth/session");
    return user;
  } catch {
    return null;
  }
}
