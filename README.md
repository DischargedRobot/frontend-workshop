(Это форк основго приложения и за основу взят readme написанный Ириной Хрусталевой [ссылка на readme](https://github.com/RedFlagss/feature_flag_main))

# RED FLAGS

RedFlags — это SaaS-платформа для централизованного управления включением
и отключением функций в приложениях во время его работы (система управления фича-флагами).

Система включает в себя:

- Админ панель, для настройки структуры организации, создания и выдачи
  доступа сотрудникам, переключения фича-флагов (расположена в этом репозитории)
- SDK для клиентских приложений (хранится по [ссылке](https://github.com/RedFlagss/feature_flag_client))

Frontend хранится по [ссылке](https://github.com/RedFlagss/frontend-workshop)

# Стек технологий

Админ панель состоит из 2 микросервисов:

- Сервис авторизации: Java 21, Micronaut, PostgreSQL, Redis, Kafka
- Основной сервис: Java 21, Micronaut, Kafka, PostgreSQL

- Для микросервисов админ панели настроено хранение логов и сбор метрик: Grafana Alloy, Loki, Prometheus, Grafana

- SDK для клиентских приложений: Java 17, Kafka
- Frontend: TS, React, next.js, scss, casl, antd

# Мой вклад

- Создание макета приложения
- Написание графических компонентов
- Вёртска приложения с использованием antd
- Интеграция фронтенда с бекендом (основного сервиса и атуентификация)
- Настройка ролей и прав доступа
- Синхронизация данных при отличии в версиях
- Докер файл и имедж для сборки проекта с использование докер композера


## Используемые технологии

<div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap; margin: 24px 0;">
  <div style="display: flex; flex-direction: column; align-items: center; width: 90px;">
    <img src="readme/stack/ts.png" alt="TypeScript" width="48" height="48" />
    <span style="margin-top: 8px; font-size: 14px;">TypeScript</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90px;">
    <img src="readme/stack/react.png" alt="React" width="48" height="48" />
    <span style="margin-top: 8px; font-size: 14px;">React</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90px;">
    <img src="readme/stack/nextjs.png" alt="Next.js" width="90" height="48" />
    <span style="margin-top: 8px; font-size: 14px;">Next.js</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90px;">
    <img src="readme/stack/scss.png" alt="SCSS" width="48" height="48" />
    <span style="margin-top: 8px; font-size: 14px;">SCSS</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90px;">
    <img src="readme/stack/antd.png" alt="Ant Design" width="48" height="48" />
    <span style="margin-top: 8px; font-size: 14px;">Ant Design</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90px;">
    <img src="readme/stack/casl.png" alt="CASL" width="48" height="48" />
    <span style="margin-top: 8px; font-size: 14px;">CASL</span>
  </div>
</div>

# Документация

## Архитектура

<img src="readme/architecture.png">

Микросервисы админ панели:

- Auth service - сервис авторизации. Работает с сессиями для ui пользователей,
  с jwt токенами для клиентов-сервисов; выдает доступы к kafka
- Feature-flag service - основной сервис. Сервис отвечает за работу с
  фича-флагами, организациями и звеньями организации.
  Звенья образуют древовидную структуру организации, которая хранится как ltree дерево

SDK для клиентских приложений:

SDK отвечает за интеграцию фича-флагов в клиентский сервис,
автоматическое получение актуальных значений флагов и синхронизацию
изменений в реальном времени через Kafka.

## UseCase - диаграмма

<img src="readme/useCase.png">

## Интерфейс

### Страница регистрации(организации/пользователя)/авторизации

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/registration.jpg" alt="Registration desktop" >
    <img src="readme/interface/desktop/auth.jpg" alt="Auth desktop">
    <img src="readme/interface/desktop/registrationUser.jpg" alt="Auth desktop">
  </div>
<strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/registration.jpg" alt="Registration mobile" width="240">
    <img src="readme/interface/mobile/auth.jpg" alt="Auth mobile" width="240">
    <img src="readme/interface/mobile/registrationUser.jpg" alt="Auth desktop" width="240">
  </div>
</div>

### Меню профиля

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/profile.jpg" alt="Profile desktop">
    <img src="readme/interface/desktop/changeProfile.jpg" alt="Profile menu desktop" >
  </div>
  <strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/profile.jpg" alt="Profile mobile" width="240">
    <img src="readme/interface/mobile/changeProfile.jpg" alt="Profile menu mobile" width="240">
  </div>
  <p style="margin-top:8px">Интерфейс профиля: быстрый доступ к настройкам, переключение аккаунтов и управление уведомлениями.</p>
</div>

### Организация

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/structure.jpg" alt="Organization desktop">
    <img src="readme/interface/desktop/structureAddUser.jpg" alt="Organization structure desktop">
  </div>
  <strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/structureDeps.jpg" alt="Organization mobile" width="240">
    <img src="readme/interface/mobile/structureUsers.jpg" alt="Organization structure mobile" width="240">
    <img src="readme/interface/mobile/structureAddUser.jpg" alt="Organization structure mobile" width="240">
  </div>
  <p style="margin-top:8px">Управление организацией: создание отделов\сервисов, создание пользователей, назначение ролей и просмотр структуры.</p>
</div>

### Меню фич флагов

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/ffmenu.jpg" alt="Features desktop" >
  </div>
  <strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/ffmenuFF.jpg" alt="Features mobile" width="240">
    <img src="readme/interface/mobile/ffmenuDeps.jpg" alt="Features table mobile" width="240">
  </div>
  <p style="margin-top:8px">Меню фич флагов: список фич флагов, быстрое переключение, добавление и фильтрация по названию и отделам.</p>
</div>

# Развертывание

Для запуска админ панели необходимо запустить контейнеры docker через
docker-compose.

Логи и метрики не собраны в image docker, поэтому для запуска с ними
необходимо собрать микросервисы локально, изменив docker-compose из
ветки master. Настроенный docker-compose для сборки микросервисов
с логами и метриками находится в ветке logi. Перед его сборкой необходимо
собрать микросервисы через gradle.

SDK запускается отдельным проектом

# Работяги:

[Лиза Антипатрова](https://github.com/LizaAntipatrova) - java-developer, devOps engineer

[Семен Муравьев](https://github.com/SemionMur) - java-developer

[Ирина Хрусталева](https://github.com/rubberPlant256) - java-developer

[Кирилл Авдеев(Я)](https://github.com/DischargedRobot) - frontend-developer

[Дима Бряков](https://github.com/razondark) - Mentor

Т-банк зимняя проектная мастерская, март-апрель 2026
