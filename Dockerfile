# Сборка
FROM node:alpine AS build
WORKDIR /application

# Переменные для сборки
ARG NEXT_PUBLIC_AUTH_SERVICE_URL_V1
ARG NEXT_PUBLIC_AUTH_URL_V1
ARG NEXT_PUBLIC_CLIENT_URL_V1
ARG NEXT_PUBLIC_API_URL_V1
ARG NEXT_PUBLIC_API_ORGANISATIONS_URL_V1

ENV NEXT_PUBLIC_AUTH_SERVICE_URL_V1=$NEXT_PUBLIC_AUTH_SERVICE_URL_V1
ENV NEXT_PUBLIC_AUTH_URL_V1=$NEXT_PUBLIC_AUTH_URL_V1
ENV NEXT_PUBLIC_CLIENT_URL_V1=$NEXT_PUBLIC_CLIENT_URL_V1
ENV NEXT_PUBLIC_API_URL_V1=$NEXT_PUBLIC_API_URL_V1
ENV NEXT_PUBLIC_API_ORGANISATIONS_URL_V1=$NEXT_PUBLIC_API_ORGANISATIONS_URL_V1

# Копируем только package.json для кэширования зависимостей
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Копируем исходный код
COPY . .

# Переустанавливаем dev зависимости для сборки
RUN npm ci

RUN npm run build

# Запуск
FROM node:alpine AS runner
WORKDIR /application

ENV NODE_ENV=production
ENV PORT=3000

# для сервера - мидлеваре
ARG API_AUT_SERVICE_URL_V1

ENV API_AUT_SERVICE_URL_V1=$API_AUT_SERVICE_URL_V1

# можно и без, но так безопасней
RUN addgroup -g 1001 -S mygroup
RUN adduser -S nextjs -u 1001

COPY --from=build /application/public ./public
COPY --from=build --chown=nextjs:mygroup /application/.next/standalone ./
COPY --from=build --chown=nextjs:mygroup /application/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
