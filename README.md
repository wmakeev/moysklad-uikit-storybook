# moysklad-uikit-storybook

[![Витрина Storybook](https://img.shields.io/badge/Storybook-витрина-ff4785?logo=storybook&logoColor=white)](https://wmakeev.github.io/moysklad-uikit-storybook/)
[![Deploy](https://github.com/wmakeev/moysklad-uikit-storybook/actions/workflows/deploy.yml/badge.svg)](https://github.com/wmakeev/moysklad-uikit-storybook/actions/workflows/deploy.yml)

Визуальная витрина компонентов дизайн-системы [`@moysklad/uikit`](https://www.npmjs.com/package/@moysklad/uikit) на Storybook.

**🔗 Живая витрина: <https://wmakeev.github.io/moysklad-uikit-storybook/>**

Покомпонентный каталог (57 компонентов), страницы токенов (цвета, типографика, иконки)
и демо-сборки экранов.

## Стек

Storybook 8.6 · Vite 5 · React 18.3 · TypeScript 5.6 · `@moysklad/uikit` v28.1.0

## Запуск

```sh
npm install
npm run storybook        # dev-сервер на localhost:6006
npm run build-storybook  # статическая сборка в storybook-static/
```

## Публикация

Витрина автоматически собирается и публикуется на GitHub Pages при каждом push в `main`
(workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

## Документация

- [`CLAUDE.md`](CLAUDE.md) — навигация по репозиторию для агента.
- [`HANDOFF.md`](HANDOFF.md) — контекст, API-нюансы компонентов, методология.
- [`stack.md`](stack.md) — как поднять продакшн-приложение на `@moysklad/uikit`.
