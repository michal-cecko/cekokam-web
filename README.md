# Cekokam — Static Site

Plain HTML + CSS + JS marketing site for Cekokam s.r.o. No PHP, no build step.

## Structure

```
.
├── index.html              # Domov (home)
├── kamerove-systemy.html
├── zabezpecovacie-systemy.html
├── satelitna-technika.html
├── dalsie-sluzby.html
├── onas.html               # O nás
├── onas-galeria.html       # Gallery (auto-rendered from JS list)
├── kontakt.html            # Contact form (EmailJS)
├── legislativa.html
├── oou.html                # Privacy
└── assets/
    ├── fonts/
    ├── icons/
    ├── image/
    │   └── galeria/        # All gallery images live here
    ├── js/
    └── style/              # Pre-compiled .min.css files
```

## Local preview

Just open `index.html` in a browser, or serve the folder with any static server:

```sh
python3 -m http.server 8000
# or
npx serve .
```

## Contact form (EmailJS)

The contact form posts via [EmailJS](https://www.emailjs.com/) — no backend.

To make it work:

1. Create a free account at https://www.emailjs.com.
2. Add an Email Service (Gmail, Outlook, etc.).
3. Create an Email Template with these template variables: `meno`, `cislo`, `email`, `predmet`, `sprava`.
4. Open `assets/js/kontakt.js` and replace the three placeholders at the top:

   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

Until those are filled in, submitting the form shows a "not configured" warning.

## Gallery

Images live in `assets/image/galeria/`. The list of files rendered on the page
is defined at the top of `assets/js/galeria.js`. To add a new image, drop it
into the folder and append its filename to `GALLERY_IMAGES`.

## Deployment (Dokploy)

You **don't need a Dockerfile** — Dokploy supports static apps directly:

1. Push this repo to GitHub/GitLab/Bitbucket (or use Dokploy's Git integration).
2. In Dokploy, create a new application and choose **Static** as the build type.
3. Point the source to the repo / branch. No build command, no install command.
4. Set the publish directory to `.` (the repo root) or leave it default if Dokploy auto-detects.
5. Add your domain, let Dokploy provision SSL, done.

Dokploy serves the files via its built-in nginx/Traefik, with HTTPS handled automatically.

If you ever do want a containerised version (e.g. to drop in elsewhere), this works:

```Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```
