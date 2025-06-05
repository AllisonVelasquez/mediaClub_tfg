FROM php:8.3.6-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip curl libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:2.7.1 /usr/bin/composer /usr/bin/composer

# Crear directorio de la app
WORKDIR /var/www

# Copiar archivos
COPY . .

# Instalar dependencias PHP
RUN composer install

# Permisos
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]

