Primero instalar xampp para windows en el C: solo con php y mysql phpmyadmin

Modificar el directorio xampp -> apache -> conf -> extra -> httpd.vhost. Añadir esto
```
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/mediaclub_laravel/public"
    ServerName laravel.local
    <Directory "C:/xampp/htdocs/mediaclub_laravel/public">
        Options Indexes FollowSymLinks
	    AllowOverride All
	    Require all granted
    </Directory>	
</VirtualHost>
```
y en conf -> httpd.conf revisar que este activo 
```
DocumentRoot "C:/xampp/htdocs"
<Directory "C:/xampp/htdocs">
...
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```
y por ultimo en Windows -> System32 -> drivers -> etc -> host añadir
```
127.0.0.1       localhost
127.0.0.1       laravel.local
```
