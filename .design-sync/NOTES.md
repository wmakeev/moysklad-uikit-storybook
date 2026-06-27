# design-sync NOTES — @moysklad/uikit

## Тип репозитория (важно!)
Это репозиторий-**витрина** (Storybook), а НЕ исходники uikit. Реальные компоненты — готовый
`node_modules/@moysklad/uikit/dist`. Поэтому:
- `buildCmd` пустой (пакет уже собран, ничего не пересобираем).
- Конвертер запускается с `--entry ./node_modules/@moysklad/uikit/dist/index.js` и
  `--node-modules ./node_modules` (react/react-dom в корневом node_modules).
- Шейп: storybook. Глобал бандла: `window.MoyskladUikit`.

## Команды (из корня репо)
```sh
# 1) при изменении историй/DS — пересобрать референс:
npx storybook build -c .storybook -o "$PWD/.design-sync/sb-reference"
# 2) конвертер:
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./node_modules/@moysklad/uikit/dist/index.js --out ./ds-bundle
# 3) валидатор:
node .ds-sync/package-validate.mjs ./ds-bundle
# 4) сверка превью с референсом (scoped):
node .ds-sync/storybook/compare.mjs --out ./ds-bundle --storybook-static .design-sync/sb-reference --components A,B,C
# драйвер-рецепт (финальный прогон; первый синк — без --remote):
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./node_modules/@moysklad/uikit/dist/index.js --out ./ds-bundle
```

## Решения в config.json и ПОЧЕМУ
- **Истории**: переделаны из тематических в покомпонентные (`src/stories/catalog/<Name>.stories.tsx`,
  `title: 'Компоненты/<Group>/<Name>'`). Конвертер мапит ПОСЛЕДНИЙ сегмент title на имя экспорта;
  группа берётся из сегмента ПЕРЕД именем и ДОЛЖНА быть латиницей (кириллица → слаг пустой → `misc`).
  Старые тематические истории (`src/stories/components/*`) удалены. Оставлены: tokens/*, Introduction.mdx, demos/*.
- **extraEntries: `../../../.design-sync/extra-exports.ts`** — path-form шим, реэкспортит 6 subpath-only
  компонентов (FieldRow, ImagePreview, Indicator, Info, Label, LabelValue), которых нет в главном входе
  `dist/index.js`. Без него они (а) не на `window.MoyskladUikit` для рендера и (б) не распознаются как
  компоненты (гейт экспортов сканит `export { X } from` в path-form, а bare-спецификатор
  `@moysklad/uikit/components/X` он не резолвит — там нет директории `node_modules/.../components/X`).
  ⚠️ Путь `../../../` package-relative от PKG_DIR (`node_modules/@moysklad/uikit`) — завязан на глубину scope.
- **tokensPkg/tokensGlob** → копирует `dist/colorVariables.css` в `tokens/`, и `styles.css` его @import-ит.
  Без этого `[TOKENS_MISSING]`: семантические токены (`--text-*`, `--bgd-*` и т.д.) не определены в выгрузке
  и компоненты были бы без фирменных цветов. Токены под `@layer lognex → theme → {basic, ms, status}`.
- **titleMap (null)** — гасит [TITLE_UNMAPPED] для не-компонентных страниц: Цвета, Типографика, Иконки,
  DataGrid(таблица), Карточкатовара, Списоктоваров (ключи — с убранными пробелами).
- **overrides.EmptyStateLarge.cardMode: "column"** — история шире ячейки сетки ([GRID_OVERFLOW]).
- **readmeHeader: .design-sync/conventions.md** — conventions-заголовок (идиома токенов, провайдеры, шрифт).

## Re-sync risks / на что смотреть
- **[FONT_MISSING] «ALS Hauss»** — ПРИНЯТО. Шрифт проприетарный, в пакете нет woff2. Референс и превью
  оба рендерят системным фолбэком → сверка корректна. Реальный шрифт указан в conventions.md для дизайн-агента.
- **Оверлеи (Modal/Sidepage/BottomSheet/Dropdown/Tooltip/Hint/Help/Snackbar/OverlayActions/Datepicker/
  Select/Multiselect/AutoComplete)** [GENERAL]: каждая «Обзор»-история открывает оверлей ТОЛЬКО по
  интеракции (useState по onClick, либо hover/portal). На момент capture оверлей ЗАКРЫТ → и превью, и
  storybook показывают триггер/закрытый контрол → НИ ОДИН не требует `cfg.overrides.<Name>.cardMode:"single"`.
  Грейдятся как match по триггеру (прецедент Modal). ⚠️ Если в будущем появится история с initial open=true —
  ТОТ компонент потребует `cardMode:"single"`. Усиление (всегда-открытая история + single) опционально.
- **Картинки через `data:image/svg+xml`** [GENERAL]: истории EmptyState/EmptyStateLarge/ImagePreview/
  FileUploader/Carousel строят изображения inline data-URI, НЕ удалёнными URL → нет риска `[ASSETS_BLOCKED]`.
  Однотонный цветной прямоугольник на ОБЕИХ панелях — это и есть нужный SVG, не битый ассет. Канарейка
  `[ASSETS_BLOCKED]` — только одинаково-битая картинка по http(s)-src.
- **DataGrid** (`@moysklad/uikit/data-grid`) НЕ закартирован — отдельный модуль, не на главном глобале,
  требует @tanstack/react-table + LocaleContextProvider. Демо осталось как локальная история (titleMap null).
- **306 иконок** и токен-страницы (Цвета/Иконки) не имеют карточек (нет экспорта-компонента на каждую).
  Иконки доступны как `@moysklad/uikit/icon`; в бандл главного глобала не входят.
- **Не git-репозиторий** → коммитов нет. Durable-состояние живёт в `.design-sync/` (config.json, NOTES.md,
  conventions.md, extra-exports.ts, .cache/compare/*.grade.json на этой же машине).

## Состояние грейдинга
- **ВСЕ 57 компонентов оценены `match`** (2026-06-24). Вердикты в `.design-sync/.cache/compare/<Name>.grade.json`.
  Ни одного mismatch/close/blocked; ни одного owned-превью не понадобилось; ни одной новой config-правки.
  Глобальных проблем рендера нет (токены применяются, цвета и шкала верны, шрифт — принятый фолбэк).
- Каждый компонент — одна история «Обзор», module-mode generated preview. Грейд сделан §4c fan-out
  (2 волны: B1–B4 = 31 комп., B5–B7 = 22 комп.) поверх solo-фазы (Button/Badge/Text/Modal).

## Состояние выгрузки
- **АКТИВНЫЙ проект Claude Design: `60c8aa90-acf4-42c8-a017-03288eda7056` («moysklad uikit»)** — запинен в config.json.
  URL: https://claude.ai/design/p/60c8aa90-acf4-42c8-a017-03288eda7056
- **ВЫГРУЖЕНО ПОЛНОСТЬЮ (2026-06-25)**: все 57 компонентов (× .d.ts/.html/.jsx/.prompt.md) + 57 `_preview/*.js`
  + бандл + styles.css + tokens/ + _vendor/ + README. `_ds_sync.json` ЗАЛИТ последним → ANCHORED.
  **Подтверждено визуально в браузере**: галерея компонентов и README рендерятся, app показал «Compiling your
  design system…» и построил `_ds_manifest.json`. Удалений не было (проект создавался пустым).
- App-генерируемые `_adherence.oxlintrc.json` и `_ds_manifest.json` — НЕ наши, не трогаем.

### ⚠️ КРИТИЧНО: режим проекта (почему сменили проект)
- Первый проект **b8937eea-acb1-4ab3-aa64-9e7e589c2d9d** («Design System») был **переиспользован/начат в UI** и
  застрял в режиме **«generate a design system»** (онбординг-мастер «Set up your design system» с шагом Generate).
  Загрузка файлов через API его НЕ переключает в режим галереи: файлы и манифест корректны, но UI всё равно
  показывал мастер настройки. Переключателя режима в API НЕТ.
- **Лечится только свежим `DesignSync(create_project)`** — API-созданный проект сразу открывается в режиме
  «Design system» (плашка Publish + «No cards yet — add @dsCard…») и наполняется карточками после выгрузки.
- **ПРАВИЛО на будущее: целевой проект всегда создавать через `create_project`, НЕ переиспользовать
  существующий/созданный-в-UI** (это прямо требование базового скилла §1). Старый b8937eea на 2026-06-25 ещё
  существует, помечен на удаление (в API метода delete_project нет → удалять в UI). `previousProjectId` в config.json.
- Чекбокс **Published** в проекте (снят) — публикует ДС для новых проектов команды; включать по решению пользователя.
