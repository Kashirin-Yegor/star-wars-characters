# 🌌 Star Wars Characters Database

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![MobX](https://img.shields.io/badge/MobX-6-EA6618?logo=mobx&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-enabled-4B32C3?logo=eslint&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-2ea44f)

База данных о персонажах вселенной **Star Wars**, созданная на **Next.js 15** с использованием **MobX** для управления состоянием.  
Архитектура проекта модульная и легко расширяемая.
---

## 🚀 Стек технологий
- ⚡ [Next.js 15](https://nextjs.org/) — современный React-фреймворк
- 🛡 [TypeScript](https://www.typescriptlang.org/) — строгая типизация
- 🔥 [MobX](https://mobx.js.org/README.html) — управление состоянием
- 🎨 [@radix-ui](https://www.radix-ui.com/) — UI-компоненты
- 🎭 [Lucide-react](https://lucide.dev/) — иконки
- ✅ [ESLint](https://eslint.org/) — контроль качества кода

---

## 📂 Архитектура проекта
```txt
star-wars-app/
├─ app/
│  ├─ (components)/ - компоненты для конкретной страницы
│  ├─ character/
│  │  ├─ [id]/ -новая страница
│  │  │  ├─ (components)/ компоненты для конкретной страницы
│  │  ├─ context.tsx - провайдер и хук для сторая
│  │  ├─ page.tsx - страница
│  │  └─ store.ts - Стор Mobx
│  ├─ context.tsx - провайдер и хук для сторая
│  ├─ layout.tsx - layout
│  └─ not-found.tsx - страница 404
├─ public/
├─ services/ - сервисы для всего приложения (Api,mocks)
├─ shared/ - Переиспользуеме компоненты
│  ├─ constants/ - константы
│  ├─ features/ - UI с конкрентой бизнес логикой которая переиспользуется
│  ├─ styles/ - глобальные стили
│  ├─ types/ - Бизнес сущности
│  ├─ ui/ - Примитивные UI компоненты (Button,Input)
│  └─ utils/ - функции helpers

```

---

## ⚡ Установка и запуск

```bash
# 1. Установка зависимостей
npm install

# 2. Запуск в режиме разработки
npm run dev

# 3. Сборка проекта
npm run build

# 4. Запуск production-сборки
npm run start

# 5. Линтинг кода
npm run lint

```
## 🌌 Функционал

📖 Просмотр списка персонажей Star Wars

🔎 Поиск и фильтрация

🧩 Динамические страницы персонажей (/character/[id])

⚡ Быстрый и удобный UI

📦 MobX store для глобального и локального состояния

## 📦 Планы по развитию

🌍 Добавить много карточек

🎨 Улучшить UI и добавить поддержку тем

## 🛡️ Лицензия

Этот проект распространяется под лицензией MIT.