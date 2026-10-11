## Внешние системы
## Код и контракты
- распакованный 28.1.0: `/tmp/orch-001/T3b/old/package`, `/tmp/orch-001/T3a/old/package` (живёт до конца сессии) → journal/T3b.md
- check-stories: id историй с кириллицей (`компоненты-overlays-modal--overview`); полный прогон ~70 с; HTTP ≥400 идёт в колонку ошибок консоли; ожидания 900/700 мс зашиты → journal/T2.md
- базовый прогон на 31.20.0: 65 историй + 1 docs, падений 0; оверлеи проверены только закрытыми → ../runtime-baseline.md
- плавающая 404 в «токены-цвета--семантические» была один раз, не повторилась, источник неизвестен → journal/T2.md
## План и требования: расхождения
- 00-context: «новые @deprecated у Chip, Checkbox, AutoComplete» не подтверждается; новые — Textfield help/actionsBar/onClear, Input/InputUnit helpComponent, Label целиком, LabelValue needShowLabelTooltip, data-grid → journal/T3a.md
- 00-context неверен: `DateRange` есть в главном входе (`dist/index.d.ts:21`), а главный вход по-прежнему реэкспортирует hooks/icon/utils (`:82-84`); подпуть-only новых — два (FieldLabel, Panel). Не меняет объём: вход берётся из api-changes → journal/T3b.md
- HANDOFF говорит «68 историй», индекс 31.20.0 даёт 65 story — учесть в D1/HANDOFF → journal/T2.md
## Процесс: уроки и промахи
