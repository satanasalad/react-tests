# Онлайн тесты

React 19 + Vite 8. Приложение для прохождения и создания тестов.

**Сайт:** https://satanasalad.github.io/react-tests/  
**Репозиторий:** https://github.com/satanasalad/react-tests

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist
npm run preview  # предпросмотр сборки
```

## Деплой

При пуше в `main` workflow `.github/workflows/deploy.yml` собирает проект и
публикует `dist` на GitHub Pages. Источник Pages: **Settings → Pages →
GitHub Actions**.

- `base: './'` в `vite.config.js` — чтобы ассеты работали в подпапке
  `/react-tests/`;
- Node.js 22 — Vite 8 требует Node.js ≥ 20.19;
- деплой занимает 1–2 минуты, прогресс виден во вкладке **Actions**.

Обновление сайта: commit → push в `main`.

## Материалы

В `homework/`:

- `screenshots/` — скриншоты;
- `build.log` — вывод `npm run build`;
- `react-tests-github-pages.zip` — архив проекта без `node_modules` и `dist`.
