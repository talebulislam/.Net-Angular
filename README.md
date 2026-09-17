# 60-Day .NET & Angular Roadmap

A browser-based learning workspace with a modular client architecture.

## Run locally

Start the Node API and static file server:

```powershell
node server.js
```

Open `http://localhost:8000` and sign in with:

- Email: `demo@example.com`
- Password: `demo1234`

## Deploy with GitHub Pages and CORS Configuration

GitHub Pages hosts the static HTML/CSS/JavaScript only. It cannot run `server.js`, so `/api/auth/login` will return `405 Method Not Allowed` when the frontend is deployed there by itself.

1. Deploy this repository to a Node host such as Render, Railway, or Fly.io.
2. Set the backend start command to `node server.js`.
3. Set these backend environment variables:

```text
NODE_ENV=production
FRONTEND_ORIGIN=https://talebulislam.github.io
SESSION_SECRET=use-a-long-random-secret-value
```

Set `SESSION_SECRET` to a long random value in Render and keep it unchanged. Production sessions are signed cookies, so users do not lose their login when the Render service restarts.

4. Set the public Render URL in `js/config.js` as `PRODUCTION_API_URL`. This URL is not a secret and is required by the frontend.

5. Configure GitHub Pages to use **GitHub Actions** as its deployment source.

6. Commit and push the change so GitHub Pages rebuilds the frontend.

The production server uses credentialed CORS and `SameSite=None; Secure` HTTP-only session cookies. Do not use `FRONTEND_ORIGIN=*` with credentials in a real deployment.

This repository is published at `https://talebulislam.github.io/.Net-Angular/`. The backend CORS value remains `https://talebulislam.github.io` because the browser sends the site origin without the repository path.

New registrations start as **Pending**. Sign in as the administrator, open the access management dashboard, and approve the account before the user can access the roadmap.

Administrators have a full application tour from the top navigation:

- **Access control**: review accounts, approval status, roles, and progress; approve or suspend regular users.
- **Roadmap**: use the same complete 60-day roadmap and progress tools available to users.
- **Change password**: rotate the administrator password through the authenticated security dialog.

Regular users can change their own password from the same **Change password** action. The server verifies the current password and stores a new salted `scrypt` hash; no role can change another user password through the client.

## Structure

- `data/users.json`: hashed JSON user database and user-owned progress.
- `server.js`: secure API, scrypt password hashing, HTTP-only sessions, and authorization.
- `js/auth.js`: browser authentication API client.
- `js/storage.js`: authorized per-user progress API client.
- `js/admin.js`: admin user-management API client.
- `js/components.js`: roadmap rendering components.
- `js/app.js`: application orchestration and UI events.
- `script.js`: roadmap data exported for the application.

The server hashes passwords with `scrypt`, never returns password fields, and authorizes progress changes from the authenticated session user rather than a browser-supplied user id. It uses an HTTP-only cookie when supported and a signed bearer token for the cross-site GitHub Pages client. For production, use HTTPS, a persistent session store, a secret-managed database, CSRF protection, and a reverse proxy with security headers.
