FROM nginx:alpine
COPY mediaclub_frontend/build /usr/share/nginx/html
COPY mediaclub_laravel/public /usr/share/nginx/laravel_public
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
