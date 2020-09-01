# Israel
---
## Проект - посадочная страница компании, которая возит студентов на стажировки в Израиль.
---

В проекте реализованы:

1. Разметка и стилизация, включая адаптив согласно макету. Верстка Pixel Perfect.
2. Плавный скролл страницы по кнопке в титульном разделе.
3. Два модальных окна: форма отправки и сообщение об успешной отправке.
4. Валидация всех форм, как модального окна так и страничных форм.
5. Маска для проверки корректного формата телефона в формах.
6. Отправка данных в LocalStorage и парсинг данных обратно на сайт при их наличии в LS.
7. Табы.
8. Два слайдера. Подключены с помощью стронней библиотеки Swiper. 
9. Список-аккордеон.
10. Поддержка устаревшего браузера IE11.

## Краткая инструкция по работе
Для начала работы у вас должент быть установлен **Node.js**

### Основные команды для работы
- Установка - `npm i`
- Запуск локального сервера - `npm start`
- Сборка проекта без запуска локального сервера - `npm run build`
- Запуск тестирования на соответствия код-гайдам - `npm test`
- Создание webp изображений в директории source - `npm run webp`
- Оптимизация изображений в директории build - `npm run imagemin`

### Вся разработка ведётся в директории `source`
### Итоговый код попадает в директорию `build`
