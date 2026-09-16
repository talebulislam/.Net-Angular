async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
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
