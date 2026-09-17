const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT) || 8000;
const ROOT = __dirname;
const USERS_FILE = path.join(ROOT, "data", "users.json");
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:8000";
if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET)
  throw new Error("SESSION_SECRET must be configured in production.");
const SESSION_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const SESSION_MAX_AGE = 86400;
const COOKIE_ATTRIBUTES =
  process.env.NODE_ENV === "production"
    ? `HttpOnly; SameSite=None; Secure; Path=/; Max-Age=${SESSION_MAX_AGE}`
    : `HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE}`;
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
};

function readDatabase() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function writeDatabase(database) {
  const temporaryFile = `${USERS_FILE}.tmp`;
  fs.writeFileSync(
    temporaryFile,
    `${JSON.stringify(database, null, 2)}\n`,
    "utf8",
  );
  fs.renameSync(temporaryFile, USERS_FILE);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  return { salt, hash: crypto.scryptSync(password, salt, 64).toString("hex") };
}

function verifyPassword(password, user) {
  const actual = Buffer.from(
    hashPassword(password, user.passwordSalt).hash,
    "hex",
  );
  const expected = Buffer.from(user.passwordHash, "hex");
  return (
    actual.length === expected.length &&
    crypto.timingSafeEqual(actual, expected)
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
    approved: user.approved !== false,
  };
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.cookie || "")
      .split(";")
      .filter(Boolean)
      .map((cookie) => {
        const [key, ...value] = cookie.trim().split("=");
        return [key, decodeURIComponent(value.join("="))];
      }),
  );
}

function signSession(userId) {
  const payload = Buffer.from(
    JSON.stringify({ userId, expiresAt: Date.now() + SESSION_MAX_AGE * 1000 }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function getSessionUserId(session) {
  const [payload, signature] = String(session || "").split(".");
  if (!payload || !signature) return null;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (
    actual.length !== expected.length ||
    !crypto.timingSafeEqual(actual, expected)
  )
    return null;
  try {
    const { userId, expiresAt } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    return expiresAt > Date.now() ? userId : null;
  } catch {
    return null;
  }
}

function getUser(request) {
  const userId = getSessionUserId(parseCookies(request).session);
  if (!userId) return null;
  return readDatabase().users.find((user) => user.id === userId) || null;
}

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    ...headers,
  });
  response.end(JSON.stringify(body));
}

function applyCors(request, response) {
  const origin = request.headers.origin;
  if (origin && (origin === FRONTEND_ORIGIN || FRONTEND_ORIGIN === "*")) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Vary", "Origin");
  }
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  );
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10000) reject(new Error("Request is too large."));
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });
    request.on("error", reject);
  });
}

function validateCredentials(name, email, password) {
  if (
    name !== undefined &&
    (!name || name.trim().length < 2 || name.trim().length > 80)
  )
    return "Name must be between 2 and 80 characters.";
  if (!/^\S+@\S+\.\S+$/.test(email || ""))
    return "Enter a valid email address.";
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  )
    return "Password must be between 8 and 128 characters.";
  return null;
}

function requireUser(request, response) {
  const user = getUser(request);
  if (!user) {
    sendJson(response, 401, { error: "Not authenticated." });
    return null;
  }
  return user;
}

function requireAdmin(request, response) {
  const user = requireUser(request, response);
  if (!user) return null;
  if (user.role !== "admin") {
    sendJson(response, 403, { error: "Administrator access is required." });
    return null;
  }
  return user;
}

async function handleApi(request, response, url) {
  if (request.method === "POST" && url.pathname === "/api/auth/login") {
    const { email, password } = await readBody(request);
    const user = readDatabase().users.find(
      (candidate) =>
        candidate.email ===
        String(email || "")
          .trim()
          .toLowerCase(),
    );
    if (!user || !verifyPassword(String(password || ""), user))
      return sendJson(response, 401, {
        error: "That email or password is incorrect.",
      });
    if (user.approved === false)
      return sendJson(response, 403, {
        error: "Your account is waiting for administrator approval.",
      });
    return sendJson(
      response,
      200,
      { user: publicUser(user) },
      {
        "Set-Cookie": `session=${signSession(user.id)}; ${COOKIE_ATTRIBUTES}`,
      },
    );
  }

  if (request.method === "POST" && url.pathname === "/api/auth/register") {
    const { name, email, password } = await readBody(request);
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const validationError = validateCredentials(
      name,
      normalizedEmail,
      password,
    );
    if (validationError)
      return sendJson(response, 400, { error: validationError });
    const database = readDatabase();
    if (database.users.some((user) => user.email === normalizedEmail))
      return sendJson(response, 409, {
        error: "An account with that email already exists.",
      });
    const credentials = hashPassword(password);
    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: credentials.hash,
      passwordSalt: credentials.salt,
      role: "user",
      approved: false,
      completedDays: [],
    };
    database.users.push(user);
    writeDatabase(database);
    return sendJson(
      response,
      201,
      { user: publicUser(user) },
      {
        "Set-Cookie": `session=${signSession(user.id)}; ${COOKIE_ATTRIBUTES}`,
      },
    );
  }

  if (request.method === "POST" && url.pathname === "/api/auth/logout") {
    return sendJson(
      response,
      200,
      { ok: true },
      {
        "Set-Cookie": `session=; ${COOKIE_ATTRIBUTES.replace("Max-Age=86400", "Max-Age=0")}`,
      },
    );
  }

  if (request.method === "GET" && url.pathname === "/api/auth/session") {
    const user = requireUser(request, response);
    if (!user) return;
    if (user.approved === false)
      return sendJson(response, 403, {
        error: "Your account is waiting for administrator approval.",
      });
    return sendJson(response, 200, { user: publicUser(user) });
  }

  if (request.method === "PATCH" && url.pathname === "/api/auth/password") {
    const user = requireUser(request, response);
    if (!user) return;
    if (user.approved === false)
      return sendJson(response, 403, {
        error: "Your account is waiting for administrator approval.",
      });
    const { currentPassword, newPassword } = await readBody(request);
    if (!verifyPassword(String(currentPassword || ""), user))
      return sendJson(response, 401, {
        error: "Your current password is incorrect.",
      });
    const validationError = validateCredentials(
      undefined,
      user.email,
      newPassword,
    );
    if (validationError)
      return sendJson(response, 400, { error: validationError });
    const database = readDatabase();
    const databaseUser = database.users.find(
      (candidate) => candidate.id === user.id,
    );
    const credentials = hashPassword(newPassword);
    databaseUser.passwordHash = credentials.hash;
    databaseUser.passwordSalt = credentials.salt;
    writeDatabase(database);
    return sendJson(response, 200, { user: publicUser(databaseUser) });
  }

  if (request.method === "GET" && url.pathname === "/api/admin/users") {
    const admin = requireAdmin(request, response);
    if (!admin) return;
    const users = readDatabase().users.map((user) => ({
      ...publicUser(user),
      completedCount: (user.completedDays || []).length,
      completedDays: user.completedDays || [],
    }));
    return sendJson(response, 200, { users });
  }

  if (
    request.method === "PATCH" &&
    url.pathname.startsWith("/api/admin/users/")
  ) {
    const admin = requireAdmin(request, response);
    if (!admin) return;
    const userId = decodeURIComponent(url.pathname.split("/").pop());
    if (userId === admin.id)
      return sendJson(response, 400, {
        error: "The administrator account cannot be suspended.",
      });
    const { approved } = await readBody(request);
    if (typeof approved !== "boolean")
      return sendJson(response, 400, {
        error: "Approval must be true or false.",
      });
    const database = readDatabase();
    const user = database.users.find((candidate) => candidate.id === userId);
    if (!user) return sendJson(response, 404, { error: "User not found." });
    user.approved = approved;
    writeDatabase(database);
    return sendJson(response, 200, { user: publicUser(user) });
  }

  if (
    request.method === "DELETE" &&
    url.pathname.startsWith("/api/admin/users/")
  ) {
    const admin = requireAdmin(request, response);
    if (!admin) return;
    const userId = decodeURIComponent(url.pathname.split("/").pop());
    if (userId === admin.id)
      return sendJson(response, 400, {
        error: "The administrator account cannot be deleted.",
      });
    const database = readDatabase();
    const userIndex = database.users.findIndex(
      (candidate) => candidate.id === userId,
    );
    if (userIndex === -1)
      return sendJson(response, 404, { error: "User not found." });
    database.users.splice(userIndex, 1);
    writeDatabase(database);
    return sendJson(response, 200, { ok: true });
  }

  if (url.pathname === "/api/progress") {
    const user = requireUser(request, response);
    if (!user) return;
    if (user.approved === false)
      return sendJson(response, 403, {
        error: "Your account is waiting for administrator approval.",
      });
    if (request.method === "GET")
      return sendJson(response, 200, {
        completedDays: user.completedDays || [],
      });
    if (request.method === "PUT") {
      const { completedDays } = await readBody(request);
      if (
        !Array.isArray(completedDays) ||
        completedDays.some(
          (day) => !Number.isInteger(day) || day < 1 || day > 60,
        )
      )
        return sendJson(response, 400, {
          error: "Progress contains an invalid day.",
        });
      const database = readDatabase();
      const databaseUser = database.users.find(
        (candidate) => candidate.id === user.id,
      );
      databaseUser.completedDays = [...new Set(completedDays)].sort(
        (a, b) => a - b,
      );
      writeDatabase(database);
      return sendJson(response, 200, {
        completedDays: databaseUser.completedDays,
      });
    }
  }

  return sendJson(response, 404, { error: "Not found." });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(
    request.url,
    `http://${request.headers.host || "localhost"}`,
  );
  applyCors(request, response);
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    return response.end();
  }
  try {
    if (url.pathname.startsWith("/api/"))
      return await handleApi(request, response, url);
    const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = path.resolve(ROOT, `.${requestedPath}`);
    if (
      !filePath.startsWith(ROOT) ||
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).isDirectory()
    )
      return sendJson(response, 404, { error: "Not found." });
    response.writeHead(200, {
      "Content-Type":
        MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
    });
    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    sendJson(response, 500, { error: "Internal server error." });
    console.error(error);
  }
});

server.listen(PORT, () =>
  console.log(`Roadmap app running at http://localhost:${PORT}`),
);
