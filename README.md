(За основу взят readme написанный Ириной Хрусталевой [ссылка на readme](https://github.com/RedFlagss/feature_flag_main))

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

Для микросервисов админ панели настроено хранение логов и сбор метрик: Grafana Alloy, Loki, Prometheus, Grafana

SDK для клиентских приложений: Java 17, Kafka
Frontend: TS, React, next.js, scss, casl, antd

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
    <img src="readme/interface/desktop/registration.jpg" alt="Registration desktop" style="height:360px;object-fit:contain;width:100%;display:block;">
    <img src="readme/interface/desktop/auth.jpg" alt="Auth desktop" style="height:360px;object-fit:contain;width:100%;display:block;">
    <img src="readme/interface/desktop/registrationUser.jpg" alt="Auth desktop" style="height:360px;object-fit:contain;width:100%;display:block;">
  </div>
<strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/registration.jpg" alt="Registration mobile" style="height:360px;object-fit:contain;width:240px;display:block;">
    <img src="readme/interface/mobile/auth.jpg" alt="Auth mobile" style="height:360px;object-fit:contain;width:240px;display:block">
    <img src="readme/interface/mobile/registrationUser.jpg" alt="Auth desktop" style="height:360px;object-fit:contain;width:240px;display:block">
  </div>
</div>

### Меню профиля

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/profile.jpg" alt="Profile desktop" style="height:360px;object-fit:contain;width:100%;display:block">
    <img src="readme/interface/desktop/changeProfile.jpg" alt="Profile menu desktop" style="height:360px;object-fit:contain;width:100%;display:block">
  </div>
  <strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/profile.jpg" alt="Profile mobile" style="height:360px;object-fit:contain;width:240px;display:block">
    <img src="readme/interface/mobile/changeProfile.jpg" alt="Profile menu mobile" style="height:360px;object-fit:contain;width:240px;display:block">
  </div>
  <p style="margin-top:8px">Интерфейс профиля: быстрый доступ к настройкам, переключение аккаунтов и управление уведомлениями.</p>
</div>

### Организация

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/structure.jpg" alt="Organization desktop" style="height:360px;object-fit:contain;width:100%;display:block">
    <img src="readme/interface/desktop/structureAddUser.jpg" alt="Organization structure desktop" style="height:360px;object-fit:contain;width:100%;display:block">
  </div>
  <strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/structureDeps.jpg" alt="Organization mobile" style="height:360px;object-fit:contain;width:240px;display:block">
    <img src="readme/interface/mobile/structureUsers.jpg" alt="Organization structure mobile" style="height:360px;object-fit:contain;width:240px;display:block">
    <img src="readme/interface/mobile/structureAddUser.jpg" alt="Organization structure mobile" style="height:360px;object-fit:contain;width:240px;display:block">
    <img src="readme/interface/mobile/structureAddService.jpg" alt="Organization structure mobile" style="height:360px;object-fit:contain;width:240px;display:block">
  </div>
  <p style="margin-top:8px">Управление организацией: создание отделов\сервисов, создание пользователей, назначение ролей и просмотр структуры.</p>
</div>

### Меню фич флагов

<div>
  <strong>Десктоп</strong>
  <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;margin-top:8px">
    <img src="readme/interface/desktop/ffmenu.jpg" alt="Features desktop" style="height:360px;object-fit:contain;width:100%;">
  </div>
  <strong style="display:block;margin-top:16px">Мобильная</strong>

  <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
    <img src="readme/interface/mobile/ffmenuFF.jpg" alt="Features mobile" style="height:360px;object-fit:contain;width:240px;display:block">
    <img src="readme/interface/mobile/ffmenuDeps.jpg" alt="Features table mobile" style="height:360px;object-fit:contain;width:240px;display:block">
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
