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
npm test         # тесты (Vitest)
```

## Тесты

Vitest + jsdom + React Testing Library. Тесты лежат рядом с компонентами
(`src/components/*.test.jsx`, `src/App.test.jsx`), настройка — в
`vite.config.js` (`test`) и `src/test/setup.js`.

```bash
npm test           # один прогон
npm run test:watch # режим наблюдения
```

## CI

- `.github/workflows/ci.yml` — при каждом push и pull request запускает
  `npm ci`, `npm run lint` и `npm test`;
- `.github/workflows/deploy.yml` — при push в `main` собирает и публикует
  `dist` на GitHub Pages (источник Pages: **Settings → Pages → GitHub Actions**).

Node.js 24: Vite 8 и jsdom 31 не поддерживают Node.js 18 из примера задания.
`base: './'` в `vite.config.js` нужен, чтобы ассеты работали в подпапке
`/react-tests/`.

## Материалы

В `homework/`:

- `screenshots/` — скриншоты сайта и CI;
- `build.log` — вывод `npm run build`;
- `test.log` — вывод `npm test`;
- `lint.log` — вывод `npm run lint`;
- `actions.log` — лог деплоя GitHub Actions;
- `ci-success.log`, `ci-fail-lint.log`, `ci-fail-test.log` — логи CI;
- `ci.md` — ссылки на запуски CI;
- `react-tests-github-pages.zip` — архив проекта без `node_modules` и `dist`.
