# Apex — Deployment Playbook (Ubuntu + Nginx + PM2)

This repo uses `@lovable.dev/vite-tanstack-config`. Set production `base` by extending `defineConfig` with a `vite` block:

```typescript
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Public URL path (trailing slash). Must match Nginx `location` and `PREVIEW_URL` in preview.html. */
const PRODUCTION_BASE = "/apex/";

export default defineConfig({
  cloudflare: false,
  vite: {
    // Subpath must match Nginx and preview.html; use this for dev/preview/build so PM2 `vite preview` matches assets.
    base: PRODUCTION_BASE,
    // Allow the domain to access the preview server (if needed for SSR testing)
    server: {
      allowedHosts: [
        "demo.sourapps.com",
        "localhost",
        "127.0.0.1",
      ],
    },
    preview: {
      allowedHosts: [
        "demo.sourapps.com",
        "localhost",
        "127.0.0.1",
      ],
    },
  },
});
```

### 1.5 `preview.html`

In repo-root `preview.html`, set the iframe target to the same public path:

```javascript
const PREVIEW_URL = "https://demo.sourapps.com/apex/";
```

---

## Step 2 — VPS deployment (copy/paste)

SSH into your Ubuntu server and run (adjust port if needed). Use a **personal access token or SSH key** for GitHub; do **not** embed tokens in shell history or docs.

```bash
# 1. Web root
cd /var/www

# 2. Clone the repository
git clone https://github.com/SH-FSP/Apex.git apex
cd /var/www/apex

# 3. Install dependencies
npm install

# 4. Production build (ensure vite.config.ts includes cloudflare: false for Node preview)
npm run build

# 5. Production preview (must run from project root — where package.json and vite.config.ts live)
pm2 start "npx vite preview --host 0.0.0.0 --port 50001" --name apex
pm2 save
```

---

## Step 3 — Nginx configuration

1. Edit your site config, for example:

   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. Inside the correct `server { ... }` block (HTTPS server for `demo.sourapps.com`), add:

```nginx
# Apex

location /apex/ {
    proxy_pass http://127.0.0.1:50001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

# Phone-frame preview (repo root — not inside dist/)
location = /apex/preview.html {
    alias /var/www/apex/preview.html;
}
```

3. Test and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Step 4 — Verification

| Preview frame | https://demo.sourapps.com/apex/preview.html |
| ------------- | ------------------------------------------- |

## Port registry (example)

| App               | Port   |
| ----------------- | ------ |
| UnStruck          | 9004   |
| ClayMaster Elite  | 9008   |
| Horizon Journey   | 1005   |
| Premium Ride      | 1006   |
| **Apex**          | **50001** |

---

## Redeploy / update

After pushing new code:

```bash
cd /var/www/apex
git pull
npm install
npm run build
pm2 restart apex
```
