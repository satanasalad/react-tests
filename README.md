# Онлайн тесты — React + Vite

Учебный SPA-проект: приложение для прохождения и создания тестов.
Собран с помощью Vite, опубликован на GitHub Pages через GitHub Actions.

## Возможности

- список готовых тестов;
- прохождение теста: вопросы с выбором варианта, «правда/ложь» и вводом ответа;
- три «жизни» за неверные ответы;
- подсчёт результата в процентах;
- создание собственного теста через форму;
- адаптивная вёрстка (проверено на ширине 390 px).

## Локальный запуск

```bash
npm install
npm run dev      # dev-сервер: http://localhost:5173
npm run build    # production-сборка в папку dist
npm run preview  # предпросмотр собранной версии
```

## Публикация на GitHub Pages

Проект уже подготовлен к публикации:

- в `vite.config.js` задано `base: './'` — ассеты загружаются по относительным
  путям, поэтому сборка работает и в подпапке `https://<username>.github.io/<repo>/`;
- добавлен workflow `.github/workflows/deploy.yml`: при каждом пуше в `main`
  GitHub Actions сам выполняет `npm ci`, `npm run build`, загружает `dist`
  как артефакт Pages и публикует его официальными экшенами
  `actions/upload-pages-artifact` + `actions/deploy-pages` (отдельная ветка
  `gh-pages` не создаётся);
- в workflow указан Node.js 22, потому что Vite 8 требует Node.js ≥ 20.19
  (пример из задания с Node 18 для этой версии Vite не подойдёт).

### Что осталось сделать вручную (нужен аккаунт GitHub)

1. Создать **публичный** репозиторий, например `react-tests`
   (github.com → New repository).
2. Привязать remote и запушить ветку `main`:

   ```bash
   git remote add origin https://github.com/<username>/react-tests.git
   git push -u origin main
   ```

3. Открыть репозиторий → **Settings → Pages**.
4. В разделе **Build and deployment** выбрать источник **GitHub Actions**
   (не «Deploy from a branch»: сборка и публикация выполняются workflow).
5. Дождаться зелёной галочки во вкладке **Actions** (1–2 минуты).
6. Сайт будет доступен по адресу:

   ```
   https://<username>.github.io/react-tests/
   ```

7. При следующих изменениях достаточно сделать commit и push в `main` —
   сайт пересоберётся автоматически.

> Если первый запуск workflow произошёл **до** включения Pages и упал на шаге
> `Deploy to GitHub Pages`, это нормально: включите Pages (шаги 3–4) и
> перезапустите workflow — вкладка **Actions** → нужный запуск →
> **Re-run all jobs**. Повторный деплой пройдёт успешно.

> В шаблоне задания используется `peaceiris/actions-gh-pages`. Этот экшен
> публикует готовые файлы в ветку `gh-pages`, поэтому для него источник Pages
> должен быть **Deploy from a branch → `gh-pages`**. В этом проекте выбран
> официальный вариант с `actions/deploy-pages`, так как он соответствует
> источнику **GitHub Actions** из задания и не требует отдельной ветки.

### Если репозиторий назван `<username>.github.io`

Тогда сайт откроется по адресу `https://<username>.github.io/` — настройки
проекта менять не нужно, относительные пути работают и в корне домена.

## Структура проекта

```
.
├── .github/workflows/deploy.yml   # автодеплой на GitHub Pages
├── public/favicon.svg
├── src/
│   ├── components/                # TestList, Quiz, QuestionCard, Result, CreateTestForm
│   ├── App.jsx
│   ├── data.js                    # стартовые тесты
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── homework/                      # материалы для сдачи
│   ├── screenshots/               # скриншоты работающего приложения
│   ├── build.log                  # вывод npm run build
│   └── react-tests-github-pages.zip
├── index.html
├── vite.config.js
└── package.json
```

## Материалы

В папке `homework/`:

- `screenshots/` — PNG-скриншоты;
- `build.log` — вывод `npm run build`;
- `react-tests-github-pages.zip` — архив проекта (без `node_modules` и `dist`).
