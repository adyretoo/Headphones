# Headphones Shop

Веб-приложение для продажи наушников, построенное на связке Django (Backend) и React (Frontend).

## Технологии

Backend:
- Python
- Django
- Django REST Framework

Frontend:
- React
- Vite
- Tailwind CSS
- Embla Carousel

## Установка и запуск

### 1. Клонирование репозитория

Сначала скачайте проект к себе на компьютер:

git clone <ссылка_на_ваш_репозиторий>
cd headphones-shop

### 2. Настройка Backend (Django)

Откройте терминал в главной папке проекта (где лежит файл manage.py).

Создайте виртуальное окружение:
python -m venv .venv

Активируйте виртуальное окружение:
- Windows: .venv\Scripts\activate
- macOS/Linux: source .venv/bin/activate

Установите необходимые библиотеки:
pip install django djangorestframework django-cors-headers

Запустите сервер:
python manage.py runserver

Сервер будет доступен по адресу: http://127.0.0.1:8000

### 3. Настройка Frontend (React)

Откройте второй терминал и перейдите в папку frontend:
cd frontend

Установите зависимости:
npm install

Запустите проект:
npm run dev

Сайт откроется по адресу: http://localhost:5173

## Структура проекта

- core/ - Настройки Django проекта и API (views.py).
- frontend/ - Исходный код React приложения.
- manage.py - Утилита управления Django.

## Функционал

- Карусель товаров: Просмотр различных моделей наушников с анимацией.
- Динамический контент: Информация о товаре (цена, описание, характеристики) меняется при переключении слайда.
- Корзина: Добавление товаров, сохранение состояния корзины в браузере.
- Адаптивность: Верстка корректно отображается на мобильных устройствах и ПК.
