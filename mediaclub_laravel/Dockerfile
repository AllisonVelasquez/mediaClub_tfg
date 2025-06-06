# Dockerfile

FROM php:8.2-fpm

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    git curl zip unzip libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Crea directorio del proyecto
WORKDIR /var/www

# Copia todo el proyecto Laravel
COPY . .

# Instala dependencias
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Da permisos
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

EXPOSE 9000
CMD ["php-fpm"]

