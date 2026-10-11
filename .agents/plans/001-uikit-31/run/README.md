# Прогон плана 001-uikit-31

План: `../01-plan.md` · контекст: `../00-context.md`
Старт: 2026-10-12 04:08 · сессия: 1
Статус: идёт
Безопасная пауза: после волны B (T2, T3), дальше E1, E2, E4; E3, E5, N5 ждут решения по Label
Приёмка: plan-verifier
Для владельца: `STATUS.md` · решения: `decisions.md` · знание: `knowledge.md`

## Решения при старте

- параллель: 3
- модели: по умолчанию — sonnet (псевдоним); haiku (псевдоним, effort high) — T1, T3c, N5; верификатор: haiku для механики, sonnet для T3, N4, D1 и смысловых сверок
- коммит после волны: да, локально, без push
- словесные критерии: T3 (частично, выборка), E1–E5 и N1–N4 (пункт «показаны варианты»), D1 (пункт про stack.md)
- внешнее ревью: нет
- этап 5 (выгрузка в Claude Design) — вне прогона, остановка перед ним

## Реестр

| id | задача | deps | риск | приёмка | статус |
|---|---|---|---|---|---|
| T1 | версия 31.20.0 и сборка | — | high | отдельно | ✓ принята |
| T2 | скрипт check-stories и базовый прогон | T1 | normal | отдельно | ✓ принята |
| T3a | сводка API: 23 изменённых + data-grid + устаревшее + Info | T1 | normal | сводно с T3 | ✓ принята |
| T3b | сводка API: 12 новых + только подпуть + токены | T1 | normal | сводно с T3 | ✓ принята |
| T3c | склейка в api-changes.md | T3a, T3b | normal | отдельно (T3 целиком) | ✓ принята |
| E1 | поля ввода | T2, T3c | normal | волной | ждёт |
| E2 | выбор и даты | T2, T3c | normal | волной | ждёт |
| E3 | Label-Value и подписи | T2, T3c | normal | волной | ждёт |
| E4 | действия, навигация, подсказки | T2, T3c | normal | волной | ждёт |
| E5 | токены, демо, остальное, Info | T2, T3c | normal | волной | ждёт |
| N1 | Layout, Panel, BentoBlock | T2, T3c | normal | волной | ждёт |
| N2 | Informer, StatusBadge, ViewersStack | T2, T3c | normal | волной | ждёт |
| N3 | LabelValueCheckbox/File/Link, FieldLabel | T2, T3c | normal | волной | ждёт |
| N4 | DateRange, EditableDate | T2, T3c | normal | отдельно | ждёт |
| N5 | extra-exports | N1, N3, N4, E5 | normal | сводно с последней пачкой | ждёт |
| D1 | документы витрины | все E, N | normal | отдельно | ждёт |

## Открытые края

- Label целиком @deprecated в 31.20.0 — убрать историю как Switch или оставить; меняет итоговое число историй → решение владельца, journal/T3.accept-1.md (а)

## Передачи

- верификаторы E/N/D1: скрипт не роняет выход на HTTP 404 и console.error — колонку «ошибки консоли» = 0 проверять отдельно по отчёту → journal/T2.accept-1.md, T2.з1
- N1: Layout `min-width:1200px`, `min-height:100dvh` — нужен fullscreen или обёртка → journal/T3b.md
- N3: LabelValueFile требует `useFileUploader()`; N4: EditableDate обязательные `selectedDate`, `localeFormat`, `lang`, `onDateChanged` → api-changes
- N5: в extra-exports не хватает FieldLabel, Panel; InputClear без истории — не добавлять → journal/T3b.md
- E2, E4 и все с оверлеями: `--interact <id>:<css>` обязателен; рабочий селектор Modal — `text=Открыть модальное окно` (клик по `button` не прошёл) → journal/T2.md
- E5: упавших вне E1–E4 в базе нет — E5 сводится к токенам, демо, Info и устаревшему вне E1–E4 → ../runtime-baseline.md
- все задачи со сборкой: собирать Storybook в свою папку вне дерева (`npm run build-storybook -- -o /tmp/orch-001/<id>/sb`), check-stories — с флагом каталога сборки (вводит T2) → decisions.md
