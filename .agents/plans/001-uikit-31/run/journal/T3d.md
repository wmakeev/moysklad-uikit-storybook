# T3d — журнал

## Сверка брифа с файлом

- Бриф: в разделе `### LabelValueLink` строка «Показать в истории» скопирована из DateRange (шесть `type`, `minDate`, `quickFilter`, `renderInput`).
- Факт: `git status` по `.agents/plans/001-uikit-31/api-changes.md` чист, HEAD совпадает с рабочим деревом. Строка в разделе LabelValueLink (стр. 246) сейчас: «Показать в истории: да. Варианты: пустое, со схемой и без неё, `disabled`, `error` (с `info`), `required`.»
- Строки с шестью `type` / `quickFilter` / `renderInput` в разделе LabelValueLink нет. Эти слова есть только в разделе DateRange (стр. 280), где они корректны (DateRange действительно имеет `type` из шести значений, `minDate`, `quickFilter`, `renderInput`, см. `node_modules/@moysklad/uikit/dist/components/DateRange/props.d.ts:6-27`).
- Варианты в строке 246 соответствуют пропам: `LabelValueInputProps` (`node_modules/@moysklad/uikit/dist/components/LabelValueInput/LabelValueInput.d.ts`) содержит `info`, `value`, `name`, `emptyText`; `error` и `required` из `LabelValue.d.ts:8-9`.
- Отличие от требования брифа: в строке 246 нет ссылок `node_modules/...:<строка>` на каждый вариант (бриф требует ссылку на каждый вариант). Это не ошибка копирования, это отсутствие ссылок.

## Решение

- Строку не меняю: её содержимое не то, что описано в брифе (расхождение плана с реальностью, правило 7). Подгонять «похожее» не стал.
- `api-changes.md` не правлен.
- Владельцу: бриф, видимо, составлен по старой версии файла. Нужно решить, добавлять ли в строку 246 ссылки на варианты (отдельная правка, вне этого брифа).
