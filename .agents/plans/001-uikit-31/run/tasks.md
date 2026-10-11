## T1 — версия 31.20.0 и сборка

Критерий: по плану, T1, пункты 1–3 · словесный: нет
Файлы: `package.json`, `package-lock.json`, `src/stories/catalog/Help.stories.tsx`
Риск: high · пишет в боевую систему: нет · приёмка: отдельно
Круг: 1
Заглушка: п.1 падает (28.1.0) — ок; п.2 и types/build — регрессионные
Исполнитель: haiku (псевдоним) (high) · запуск 2026-10-12 04:09
Верификатор: sonnet (псевдоним) · вызов V1, отдельно · вердикт 2026-10-12 04:10 — passed · отчёт `journal/T1.accept-1.md`
Итог: исполнитель done — версия, lock, Help без icon; tsc и сборка 0 (по отчёту)
Журнал: `journal/T1.md`

## T2 — скрипт check-stories и базовый прогон

Критерий: по плану, T2, пункты 1–4; плюс флаг `--dir` и случайный порт (decisions.md) · словесный: нет
Файлы: `scripts/check-stories.mjs`, `package.json`, `package-lock.json`, `.agents/plans/001-uikit-31/runtime-baseline.md`
Риск: normal · пишет в боевую систему: нет · приёмка: отдельно (потребители — весь этап 2 и 3)
Круг: 1
Заглушка: скрипта нет — п.1–3 падают
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:10
Верификатор: haiku (псевдоним) · вызов V2, отдельно · вердикт 2026-10-12 04:17 — passed · отчёт `journal/T2.accept-1.md`
Итог: исполнитель done — скрипт, флаги --dir/--ids/--interact, база 65 историй без падений (по отчёту)
Журнал: `journal/T2.md`

## T3a — сводка API, часть A (23 изменённых, data-grid, устаревшее, Info)

Критерий: по плану, T3, для своей части · словесный: частично
Файлы: `.agents/plans/001-uikit-31/api-changes.part-a.md`
Риск: normal · пишет в боевую систему: нет · приёмка: сводно — вместе с T3 после T3c
Круг: 1
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:10
Верификатор: sonnet (псевдоним) · вызов V3, сводно (T3 целиком) · вердикт 2026-10-12 04:26 — passed · отчёт `journal/T3.accept-1.md`
Итог: исполнитель done — 24 раздела + устаревшее + Info; Label целиком @deprecated, Info — нет (по отчёту)
Журнал: `journal/T3a.md`

## T3b — сводка API, часть B (12 новых, только подпуть, токены)

Критерий: по плану, T3, для своей части · словесный: частично
Файлы: `.agents/plans/001-uikit-31/api-changes.part-b.md`
Риск: normal · пишет в боевую систему: нет · приёмка: сводно — вместе с T3 после T3c
Круг: 1
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:10
Верификатор: sonnet (псевдоним) · вызов V3, сводно (T3 целиком) · вердикт 2026-10-12 04:26 — passed · отчёт `journal/T3.accept-1.md`
Итог: исполнитель done — 12 новых, 9 подпуть-only, токены −1/+23; 115 ссылок проверены скриптом (по отчёту)
Журнал: `journal/T3b.md`

## T3c — склейка в api-changes.md

Критерий: файл `api-changes.md` содержит обе части без потерь, единая схема ссылок, части удалены · словесный: нет
Файлы: `.agents/plans/001-uikit-31/api-changes.md`, удаление `api-changes.part-a.md`, `api-changes.part-b.md`
Риск: normal · пишет в боевую систему: нет · приёмка: отдельно — T3 целиком
Круг: 1
Исполнитель: haiku (псевдоним) (high) · запуск 2026-10-12 04:18
Верификатор: sonnet (псевдоним) · вызов V3, отдельно (T3 целиком) · вердикт 2026-10-12 04:26 — passed · отчёт `journal/T3.accept-1.md`
Итог: исполнитель done — api-changes.md: 36+4 раздела, 412 ссылок разрешаются, части удалены (по отчёту)
Журнал: `journal/T3c.md`

## E1 — поля ввода

Критерий: по плану, этап 2, «Критерий» · словесный: частично (пункты «показать: да»)
Файлы: `src/stories/catalog/<Name>.stories.tsx` — Textfield, Input, InputUnit, MentionsTextfield, EditableTitle
Риск: normal · пишет в боевую систему: нет · приёмка: волной (пачка C1: E1, E2, E4)
Круг: 1
Заглушка: types/build/runtime — регрессионные; утверждающие пункты словесные, на заглушке не проверялись
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:26
Верификатор: sonnet (псевдоним) · вызов V4, волной · вердикт 2026-10-12 04:30 — passed · отчёт `journal/E1.accept-1.md`
Итог: исполнитель done — 5 историй дополнены (размеры, help, кнопки, resize, prefix); runtime 5 ok, 0 ошибок (по отчёту)
Журнал: `journal/E1.md`

## E2 — выбор и даты

Критерий: по плану, этап 2, «Критерий» · словесный: частично (пункты «показать: да»)
Файлы: `src/stories/catalog/<Name>.stories.tsx` — Select, Multiselect, AutoComplete, Dropdown, Datepicker
Риск: normal · пишет в боевую систему: нет · приёмка: волной (пачка C1: E1, E2, E4)
Круг: 1
Заглушка: types/build/runtime — регрессионные; утверждающие пункты словесные, на заглушке не проверялись
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:26
Верификатор: sonnet (псевдоним) · вызов V4, волной · вердикт 2026-10-12 04:30 — passed · отчёт `journal/E2.accept-1.md`
Итог: исполнитель done — 5 историй дополнены (showArchived, «Выбраны все», dropdown actions, maxHeight, showTime); runtime с interact 5 ok (по отчёту)
Журнал: `journal/E2.md`

## E4 — действия, навигация, подсказки

Критерий: по плану, этап 2, «Критерий» · словесный: частично (пункты «показать: да»)
Файлы: `src/stories/catalog/<Name>.stories.tsx` — Help, Tooltip, Breadcrumbs, Link, Button, Chip, FileUploader, EmptyState
Риск: normal · пишет в боевую систему: нет · приёмка: волной (пачка C1: E1, E2, E4)
Круг: 1
Заглушка: types/build/runtime — регрессионные; утверждающие пункты словесные, на заглушке не проверялись
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:26
Верификатор: sonnet (псевдоним) · вызов V4, волной · вердикт 2026-10-12 04:30 — passed · отчёт `journal/E4.accept-1.md`
Итог: исполнитель done — 6 историй дополнены (Help размеры, Tooltip dark, Breadcrumbs обрезка, as у Button/Link, Chip labelColorToken); runtime 8 ok (по отчёту)
Журнал: `journal/E4.md`

## N1 — каркас страницы (Layout, Panel, BentoBlock)

Критерий: по плану, этап 3, «Критерий» · словесный: частично (варианты)
Файлы: `src/stories/catalog/{Layout,Panel,BentoBlock}.stories.tsx` (новые)
Риск: normal · пишет в боевую систему: нет · приёмка: волной (пачка C2)
Круг: 1
Заглушка: файлов нет — п.«файл есть» падает
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:28
Верификатор: sonnet (псевдоним) · вызов V5, волной · вердикт 2026-10-12 04:33 — passed · отчёт `journal/N1.accept-1.md`
Итог: исполнитель done — 3 истории Containers (Layout — 6 историй fullscreen); runtime 8 ok (по отчёту)
Журнал: `journal/N1.md`

## N2 — статусы (Informer, StatusBadge, ViewersStack)

Критерий: по плану, этап 3, «Критерий» · словесный: частично (варианты)
Файлы: `src/stories/catalog/{Informer,StatusBadge,ViewersStack}.stories.tsx` (новые)
Риск: normal · пишет в боевую систему: нет · приёмка: волной (пачка C2)
Круг: 1
Заглушка: файлов нет — п.«файл есть» падает
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:28
Верификатор: sonnet (псевдоним) · вызов V5, волной · вердикт 2026-10-12 04:33 — passed · отчёт `journal/N2.accept-1.md`
Итог: исполнитель done — 3 истории Status; runtime 3 ok, interact StatusBadge (по отчёту)
Журнал: `journal/N2.md`

## N3 — поля (LabelValueCheckbox, LabelValueFile, LabelValueLink, FieldLabel)

Критерий: по плану, этап 3, «Критерий» · словесный: частично (варианты)
Файлы: `src/stories/catalog/{LabelValueCheckbox,LabelValueFile,LabelValueLink,FieldLabel}.stories.tsx` (новые)
Риск: normal · пишет в боевую систему: нет · приёмка: волной (пачка C2)
Круг: 1
Заглушка: файлов нет — п.«файл есть» падает
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:28
Верификатор: sonnet (псевдоним) · вызов V7, волной · вердикт 2026-10-12 04:35 — partial · отчёт `journal/N3.accept-1.md`
Круг 2: доработка — LabelValueLink: показать `error` вместе с `info` (api-changes); исполнитель тот же sonnet через SendMessage · запуск 2026-10-12 04:35; приёмка круга 2 — отдельно
Исполнитель круг 2: sonnet (псевдоним) — done
Верификатор круг 2: sonnet (псевдоним) · вызов V8, отдельно · вердикт 2026-10-12 04:37 — passed · отчёт `journal/N3.accept-2.md`
Итог: исполнитель done — 4 истории (3 Fields, FieldLabel — Forms), runtime с interact ok (по отчёту)
Журнал: `journal/N3.md`

## E3 — Label-Value и подписи

Критерий: по плану, этап 2, «Критерий» + удалён Label.stories.tsx (решение владельца) · словесный: частично
Файлы: `src/stories/catalog/{LabelValue,LabelValueSelect,LabelValueInput,Checkbox}.stories.tsx`, удаление `Label.stories.tsx`
Риск: normal · пишет в боевую систему: нет · приёмка: волной
Круг: 1
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:29
Верификатор: sonnet (псевдоним) · вызов V5, волной · вердикт 2026-10-12 04:33 — passed · отчёт `journal/E3.accept-1.md`
Итог: исполнитель done — LabelValue valueVariant=link, Label.stories удалён; runtime 5 ok (по отчёту)
Журнал: `journal/E3.md`

## E5 — токены, демо, FieldRow

Критерий: по плану, этап 2, «Критерий» + доп. для E5 + FieldRow → FieldLabel (решение владельца) · словесный: частично
Файлы: `src/stories/tokens/Colors.stories.tsx`, `src/stories/demos/DataGridTable.stories.tsx` (только если сломано), `src/stories/catalog/FieldRow.stories.tsx`
Риск: normal · пишет в боевую систему: нет · приёмка: волной
Круг: 1
Заглушка: `--elements-disabled` есть в Colors (строка 83) — пункт падает как надо
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:29
Верификатор: sonnet (псевдоним) · вызов V5, волной · вердикт 2026-10-12 04:33 — passed · отчёт `journal/E5.accept-1.md`
Итог: исполнитель done — Colors −1/+23 токена, FieldRow → FieldLabel, DataGrid-демо не тронуто; runtime 4 ok (по отчёту)
Журнал: `journal/E5.md`

## N4 — даты (DateRange, EditableDate)

Критерий: по плану, этап 3, «Критерий» · словесный: частично (варианты)
Файлы: `src/stories/catalog/{DateRange,EditableDate}.stories.tsx` (новые)
Риск: normal · пишет в боевую систему: нет · приёмка: отдельно (по плану)
Круг: 1
Заглушка: файлов нет — п.«файл есть» падает
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:30
Верификатор: sonnet (псевдоним) · вызов V6, отдельно · вердикт 2026-10-12 04:35 — passed · отчёт `journal/N4.accept-1.md`
Итог: исполнитель done — DateRange 7 историй, EditableDate 6; runtime с interact 13 ok, оверлеи открываются (по отчёту)
Журнал: `journal/N4.md`

## T3d — исправить строку «показать» у LabelValueLink в api-changes.md

Критерий: строка «Показать в истории» раздела LabelValueLink описывает варианты LabelValueLink (не DateRange) со ссылками на dist; остальной файл не изменён (git diff) · словесный: частично
Файлы: `.agents/plans/001-uikit-31/api-changes.md`
Риск: normal · пишет в боевую систему: нет · приёмка: сводно, с N3/N5
Круг: 1
Исполнитель: haiku (псевдоним) (high) · запуск 2026-10-12 04:31
Верификатор: не нужен — файлы не менялись
Итог: снята — дефекта нет: строка 246 уже про LabelValueLink, N3 ошибся (спутал с DateRange, строка 280); исполнитель blocked без правок
Журнал: `journal/T3d.md`

## N5 — extra-exports

Критерий: по плану, N5, «Критерий» · словесный: нет
Файлы: `.design-sync/extra-exports.ts`
Риск: normal · пишет в боевую систему: нет · приёмка: сводно, вместе с N3
Круг: 1
Заглушка: в файле есть Label, нет FieldLabel/Panel — множества не равны, падает как надо
Исполнитель: haiku (псевдоним) (high) · запуск 2026-10-12 04:33
Верификатор: sonnet (псевдоним) · вызов V7, сводно · вердикт 2026-10-12 04:35 — passed · отчёт `journal/N5.accept-1.md`
Итог: исполнитель done — +FieldLabel, +Panel, −Label; 7 имён, все пути exports существуют (по отчёту)
Журнал: `journal/N5.md`

## D1 — документы витрины

Критерий: по плану, D1, «Критерий» · словесный: частично (stack.md)
Файлы: `src/stories/Introduction.mdx`, `CLAUDE.md`, `README.md`, `stack.md`
Риск: normal · пишет в боевую систему: нет · приёмка: отдельно (по плану)
Круг: 1
Заглушка: `28.1.0` есть в CLAUDE.md — rg-пункт падает как надо
Исполнитель: sonnet (псевдоним) · запуск 2026-10-12 04:37
Верификатор: —
Итог: —
Журнал: `journal/D1.md`
