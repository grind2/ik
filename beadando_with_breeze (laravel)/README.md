# Fighting Game Backend

A Laravel-based fighting game application with authentication, character and arena management, persistent match state, and server-side combat simulation.

## Features

* User authentication with Laravel Breeze
* Character creation and management with configurable combat stats
* Arena management
* Match creation and persistent match state
* Turn-based combat with melee, ranged, and special attacks
* Server-side damage calculation and combat logic
* Database persistence using Eloquent ORM
* Input validation and authorization

## Tech Stack

* **PHP 8.2+**
* **Laravel 11**
* **Laravel Breeze**
* **Eloquent ORM**
* **SQLite**
* **Blade**
* **Tailwind CSS**
* **Vite**
* **Pest**

## Project Structure

The application follows Laravel's MVC architecture, using controllers for request handling, Eloquent models for domain entities and relationships, Blade for server-rendered views, and migrations/seeders for database management.

Main entities include:

* `User`
* `Character`
* `Contest`
* `Place`

## Running Locally

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm run build
php artisan serve
```

The application demonstrates practical Laravel development, relational data modeling, authentication, validation, and implementation of stateful server-side business logic.
