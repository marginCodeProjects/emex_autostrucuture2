# Этап 1: Сборка приложения
FROM node:18-slim AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Сборка приложения
RUN npm run build

# Этап 2: Сборка финального образа
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа в директорию Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80 для доступа
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]