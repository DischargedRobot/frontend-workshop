# Сборка
FROM node:alpine AS build
WORKDIR /application

# Переменные для сборки
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_AUTH_SERVICE_URL_V1
ARG NEXT_PUBLIC_AUTH_URL_V1
ARG NEXT_PUBLIC_CLIENT_URL_V1
ARG NEXT_PUBLIC_API_FF_SERVICE_URL_V1
ARG NEXT_PUBLIC_API_ORGANIZATIONS_URL_V1
# для сервера - мидлеваре
ARG API_GATEWAY_URL
ARG API_FF_SERVICE_URL_V1
ARG API_FF_ORGANIZATIONS_URL_V1
ARG API_AUT_SERVICE_URL_V1
ARG API_AUT_CLIENT_URL_V1

# Переменные для сборки
ENV NEXT_PUBLIC_AUTH_SERVICE_URL_V1=$NEXT_PUBLIC_AUTH_SERVICE_URL_V1
ENV NEXT_PUBLIC_AUTH_URL_V1=$NEXT_PUBLIC_AUTH_URL_V1
ENV NEXT_PUBLIC_CLIENT_URL_V1=$NEXT_PUBLIC_CLIENT_URL_V1
ENV NEXT_PUBLIC_API_FF_SERVICE_URL_V1=$NEXT_PUBLIC_API_FF_SERVICE_URL_V1
ENV NEXT_PUBLIC_API_ORGANIZATIONS_URL_V1=$NEXT_PUBLIC_API_ORGANIZATIONS_URL_V1
# для сервера - мидлеваре
ENV API_FF_SERVICE_URL_V1=$API_FF_SERVICE_URL_V1
ENV API_FF_ORGANIZATIONS_URL_V1=$API_FF_ORGANIZATIONS_URL_V1
ENV API_AUT_SERVICE_URL_V1=$API_AUT_SERVICE_URL_V1
ENV API_AUT_CLIENT_URL_V1=$API_AUT_CLIENT_URL_V1
ENV API_GATEWAY_URL=$API_GATEWAY_URL

# Копируем только package.json для кеширования зависимостей
COPY package*.json ./

# Зависимости (без dev-зависимостей)
# Устанавливаем только production-зависимости, чтобы сборка проходила без dev-пакетов.
RUN npm ci --omit=dev && npm cache clean --force

# Копируем исходный код (исключая ненужные файлы)
COPY . .

# Собираем приложение
RUN npm run build

# dev-зависимости не устанавливаются, поэтому prune не нужен

# Запуск
FROM node:alpine AS runner
WORKDIR /application

# Получаем переменные из build args
ARG API_FF_SERVICE_URL_V1
ARG API_AUT_SERVICE_URL_V1
ARG API_AUT_CLIENT_URL_V1
ARG API_FF_ORGANIZATIONS_URL_V1
ARG API_GATEWAY_URL

ENV NODE_ENV=production
ENV PORT=3000

# Переменные для runtime (серверные функции)
ENV API_FF_SERVICE_URL_V1=$API_FF_SERVICE_URL_V1
ENV API_AUT_SERVICE_URL_V1=$API_AUT_SERVICE_URL_V1
ENV API_AUT_CLIENT_URL_V1=$API_AUT_CLIENT_URL_V1
ENV API_FF_ORGANIZATIONS_URL_V1=$API_FF_ORGANIZATIONS_URL_V1
ENV API_GATEWAY_URL=$API_GATEWAY_URL

# можно и без, но так безопасней
RUN addgroup -g 1001 -S mygroup
RUN adduser -S nextjs -u 1001

COPY --from=build /application/public ./public
COPY --from=build --chown=nextjs:mygroup /application/.next/standalone ./
COPY --from=build --chown=nextjs:mygroup /application/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
