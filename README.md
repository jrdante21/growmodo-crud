## Setup
Generate app key using cmd for security
```bash
php artisan key:generate
```

Set up your .env file for the domain and database.
```bash
APP_URL=<YOUR_APP_URL>

DB_CONNECTION=mysql
DB_HOST=<YOUR_DATABASE_HOST>
DB_PORT=<YOUR_DATABASE_PORT>
DB_DATABASE=<YOUR_DATABASE>
DB_USERNAME=<YOUR_DATABASE_USERNAME>
DB_PASSWORD=<YOUR_DATABASE_PASSWORD>

SANCTUM_STATEFUL_DOMAINS=<YOUR_DOMAIN_HOST>
```

## Installation

Once the domain and database are setup. Run this command into your hosting console to create database table and admin credentials.
```bash
php artisan migrate --seed
```

## Usage
Login using admin credentials username: admin and password: admin.