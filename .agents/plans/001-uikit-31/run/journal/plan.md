# Приёмка плана 001-uikit-31 (этапы 1-4)

ИТОГ: passed

| Проверка | Итог | Результат |
|---|---|---|
| npx tsc --noEmit | код 0 | прошла |
| npm run build-storybook -o /tmp/orch-001/V10/sb | built, код 0 | прошла |
| npm run check-stories (все) | Историй: 93, упало: 0, с ошибками консоли: 0 | прошла |
| --interact Modal (text=Открыть модальное окно), DateRange [aria-haspopup], StatusBadge button:has-text("Статус"), Select input, Datepicker input | ok, консоль 0 | прошла |
| --interact Dropdown селектор `button` / `button >> nth=0` | таймаут клика (селектор попадал в нерабочую кнопку); `text=Меню действий` - ok, консоль 0 | прошла (ошибка селектора пробы) |
| ls src/stories/catalog | 68 файлов .stories.tsx, все 12 новых на месте | прошла |
| rg импортов Label/Switch/Header/Typography и устаревших пропов по src и .storybook | пусто (совпадения isArchived - TextCell/данные Select, iconPosition - EditableDate, не устаревшее) | прошла |
| extra-exports.ts vs подпуть-импорты в src | FieldLabel, FieldRow, ImagePreview, Indicator, Info, LabelValue, Panel - все реэкспортированы | прошла |
| Документы | 31.20.0 и 68 согласованы в CLAUDE.md, README.md, Introduction.mdx, HANDOFF.md, stack.md; HANDOFF говорит, что этап 5 не сделан | прошла |

Замечания
- 00-context.md называет DateRange подпуть-only, но он есть в главном входе (dist/index.d.ts:21); в extra-exports его нет, и это верно.
- Layout.stories.tsx импортирует Panel и LabelValue через подпуть; оба в extra-exports.
- stack.md говорит о 9 подпуть-only (включая Label, InputClear), extra-exports содержит 7 - InputClear и Label историй не имеют, расхождения нет.

## Разбор

- plan.з1 — наблюдение: 00-context неверно про DateRange — уже в knowledge и HANDOFF
- plan.з2 — наблюдение: 9 подпуть-only против 7 реэкспортов — норма (у InputClear и Label нет историй)
