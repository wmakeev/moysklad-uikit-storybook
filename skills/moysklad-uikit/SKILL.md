---
name: moysklad-uikit
description: React-интерфейс на @moysklad/uikit (UI-кит МойСклад) — каркас нового приложения, экран или форма из его компонентов, импорт и пропы компонента, провайдеры, токены и иконки, таблицы data-grid, рантайм-ошибка или «молча не работает» у компонента uikit. Используй, когда пишешь или чинишь код, который импортирует @moysklad/uikit, или выбираешь для него стек.
---

# @moysklad/uikit в приложении

`@moysklad/uikit` — React-библиотека компонентов дизайн-системы МойСклад, публичный npm-пакет. Знания ниже сверены с версией **31.20.0**.

Истина об API — типы в установленном пакете. Этот навык — кэш того, чего типы не говорят: ловушки рантайма, неочевидные контракты, порядок проверки. Расходится навык с `dist` — прав `dist`.

## Порядок работы

1. **Узнать версию.** `node_modules/@moysklad/uikit/package.json` → `version`. Мажор выше 31 — пропы из справочника перепроверять по `dist` каждый раз, а не только при сомнении.
2. **Новое приложение** — собрать каркас по `references/setup.md`: стек, `package.json`, `tsconfig`, токены, провайдеры на корне, рабочий пример. Готово, когда `npx tsc --noEmit` и `vite build` проходят и пример открывается в браузере.
3. **Каждый компонент** перед использованием:
   - пропы — из `node_modules/@moysklad/uikit/dist/components/<Name>/<Name>.d.ts`; у Checkbox, Radiobutton, Toggle, Chip они лежат в `<Name>.types.d.ts`;
   - вход — есть ли имя в `dist/index.d.ts`; нет — импорт через подпуть `@moysklad/uikit/components/<Name>`;
   - нюансы и ловушки — раздел компонента в `references/components.md`.
4. **Таблица** — `references/data-grid.md`.
5. **Проверка.** `npx tsc --noEmit` → сборка → **открыть в браузере** каждый интерактивный компонент (оверлеи, Datepicker, DateRange, AutoComplete, StatusBadge, data-grid) и раскрыть его. Готово, когда каждый открыт, консоль без ошибок, а в полях нет посторонних строк вроде «undefined».

## Правила, которые нарушаются чаще всего

- **Рантайм прячет ошибки от tsc.** Неверное значение пропа, нет провайдера, не привязан якорь — типы и сборка проходят, а компонент падает или молча пуст. Шаг 5 обязателен.
- **Почти всё controlled.** Состояние держит вызывающий: `value` + `onChange` через `useState`. Неуправляемый `Textfield` без `value` рисует строку «undefined». `Toggle.onChange` обязателен.
- **Провайдеры на корне:** `<Snackbar>` для `useSnackbar`, `<BottomSheetContextProvider>` для `BottomSheet` (без него шторка не открывается и ошибки нет), `LocaleContextProvider` для data-grid.
- **Девять компонентов только через подпуть:** FieldLabel, FieldRow, ImagePreview, Indicator, Info, InputClear, Label, LabelValue, Panel.
- **Канон вместо deprecated:** `Switch` → `SegmentButton`, `Header` и `Typography` → `Text`, `Label` → `FieldLabel`, legacy-API `Chip` → новое (`label`, `selected`). Пропы с `@deprecated` в `.d.ts` заменять тем, что указано в пометке.
- **Имена иконок сверять** по `dist/icon/components/`: `Info16Icon` не существует, есть `InformationCircle16Icon`.
- **Цвета — семантические токены** `var(--text-primary)`, `var(--bgd-white)` и подобные из `colorVariables.css`; сырая палитра и выдуманные цвета ломают тему.

## Живые примеры

Каждый компонент показан в витрине со всеми вариантами, рабочий код историй сверен с 31.20.0:

- витрина: <https://wmakeev.github.io/moysklad-uikit-storybook/>
- код историй: <https://github.com/wmakeev/moysklad-uikit-storybook/tree/main/src/stories/catalog> (`<Name>.stories.tsx`), сборки экранов — `src/stories/demos/`.

Обвязка `Row`, `Col`, `Section` в историях — из `src/shared/Showcase.tsx` витрины, в пакет не входит.
