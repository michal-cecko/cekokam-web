# Static site served by nginx. Built + pushed by GitHub Actions, pulled by Dokploy.
FROM nginx:alpine

# Serve the site on :80 and answer the Dokploy healthcheck at /healthz.
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location = /healthz { return 200 "ok\\n"; add_header Content-Type text/plain; }\n\
    location / { try_files $uri $uri/ =404; }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html

EXPOSE 80
