# Static site served by nginx
FROM nginx:alpine

# Replace default site config with one that serves clean URLs (.html optional)
RUN printf '%s\n' \
  'server {' \
  '    listen 80;' \
  '    listen [::]:80;' \
  '    server_name _;' \
  '    root /usr/share/nginx/html;' \
  '    index index.html;' \
  '' \
  '    # Try clean URL first, then with .html suffix' \
  '    location / {' \
  '        try_files $uri $uri/ $uri.html =404;' \
  '    }' \
  '' \
  '    # Long cache for static assets' \
  '    location /assets/ {' \
  '        expires 30d;' \
  '        add_header Cache-Control "public, immutable";' \
  '    }' \
  '' \
  '    # Health check endpoint' \
  '    location = /healthz { return 200 "ok\n"; add_header Content-Type text/plain; }' \
  '' \
  '    error_page 404 /index.html;' \
  '}' \
  > /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html/

# Drop files that have no business being served
RUN cd /usr/share/nginx/html \
 && rm -f Dockerfile .dockerignore .gitattributes .gitignore README.md \
 && rm -rf .github .git

EXPOSE 80
