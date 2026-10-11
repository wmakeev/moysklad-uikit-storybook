# Сводка изменений API 28.1.0 → 31.20.0

Что это: сводка изменений публичного API `@moysklad/uikit` между версиями 28.1.0 и 31.20.0 для витрины Storybook и выгрузки в Claude Design. Источник — `.d.ts` обеих версий; там, где `.d.ts` не показывает поведения, добавлен `.js`.

**Версии.** Старая 28.1.0, новая 31.20.0.

**Легенда путей.** Новая версия: `node_modules/@moysklad/uikit/dist/<путь>:<строка>`, путь от корня проекта. Старая версия: `uikit-28/package/dist/<путь>:<строка>`, путь от `/tmp/orch-001/`. `uikit-28` — распакованный `npm pack @moysklad/uikit@28.1.0`; на время прогона лежит в `/tmp/orch-001/uikit-28`. Файл `package.json` пакета: `node_modules/@moysklad/uikit/package.json`. Пути `src/…` без префикса — файлы витрины, от корня проекта.

Условные обозначения: «показать в истории: да» — меняет внешний вид или поведение; «нет» — внутренняя перестройка типов или изменение, невидимое пользователю.

Поправка к `00-context.md`: контекст говорит о «новых пометках `@deprecated` (Chip, Checkbox, AutoComplete)». Сравнение множеств `@deprecated` по всем `.d.ts` двух версий это не подтверждает: у Chip (`uikit-28/package/dist/components/Chip/Chip.types.d.ts:122-164` против `node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:125-167`), Checkbox (`uikit-28/package/dist/components/Checkbox/Checkbox.types.d.ts:10,13,21` против `node_modules/@moysklad/uikit/dist/components/Checkbox/Checkbox.types.d.ts:10,13,21`) и AutoComplete (`uikit-28/package/dist/components/AutoComplete/AutoComplete.d.ts:6,8` против `node_modules/@moysklad/uikit/dist/components/AutoComplete/AutoComplete.d.ts:6,8`) набор пометок тот же, только сдвинулись строки. Реально новые `@deprecated` по 23 компонентам: `Textfield` (`help`, `actionsBar`, `onClear`), `Input.helpComponent`, `InputUnit.helpComponent`, `Label` целиком, `ValueBlockProps.needShowLabelTooltip` у `LabelValue` (`node_modules/@moysklad/uikit/dist/components/LabelValue/types.d.ts:19-22`; в 28.1.0 поле было без пометки: `uikit-28/package/dist/components/LabelValue/ValueBlock/index.d.ts:18`) — подробности в разделах ниже.

**Оглавление.**

- Изменённые компоненты (24): Textfield, Multiselect, Select, Chip, LabelValue, Help, Breadcrumbs, Link, Input, Tooltip, EditableTitle, InputUnit, Button, LabelValueSelect, AutoComplete, Dropdown, Datepicker, MentionsTextfield, LabelValueInput, FileUploader, EmptyState, Checkbox, Label, data-grid
- Новые компоненты (12): BentoBlock, EditableDate, Informer, Layout, LabelValueCheckbox, LabelValueFile, LabelValueLink, StatusBadge, ViewersStack, DateRange, FieldLabel, Panel
- Витрина использует устаревшее
- Info и Informer
- Только через подпуть
- Токены

## Изменённые компоненты


### Textfield

- Удалено без пометки: `clearable` (`uikit-28/package/dist/components/Textfield/Textfield.d.ts:12`; в новом `.d.ts` и `.js` его нет, `node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.js:14` не деструктурирует его). Показать в истории: нет — удалённый проп не показывают; история его не использует (см. «Витрина использует устаревшее»).
- Новые пометки `@deprecated`: `actionsBar` → `onMainBtnClick`/`onEmojiBtnClick`/`isFileBtnVisible` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:32-35`, было `uikit-28/package/dist/components/Textfield/Textfield.d.ts:19` без пометки), `onClear` «более не поддерживается» (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:36-39`, было `uikit-28/package/dist/components/Textfield/Textfield.d.ts:23`), `help` → `helpProps` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:40-43`, было `uikit-28/package/dist/components/Textfield/Textfield.d.ts:9`). Показать в истории: нет, истории не должны их использовать.
- Новый проп `size?: 'm' | 'l'` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:22`, тип `TextfieldSizeValue` — `node_modules/@moysklad/uikit/dist/components/Textfield/types/index.d.ts:3-7`; константа `TextfieldSize` из главного входа не экспортируется, наружу только тип: `node_modules/@moysklad/uikit/dist/index.d.ts:73`; по умолчанию `m` — `node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.js:14`). Минимальная высота зависит от размера: M 96, L 146 (`node_modules/@moysklad/uikit/dist/components/Textfield/consts/index.d.ts:1-2`, `node_modules/@moysklad/uikit/dist/components/Textfield/utils/index.d.ts:3`); раньше был фиксированный `minHeight = 92` (`uikit-28/package/dist/components/Textfield/Textfield.js:11`). Показать в истории: да, меняет внешний вид (два размера).
- Новые кнопки действий внутри поля: `onMainBtnClick`, `onEmojiBtnClick`, `isFileBtnVisible`, `mainBtnIcon`, `emojiBtnIcon`, `fileBtnIcon` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:23-28`). Панель появляется, только если задан хотя бы один из `onMainBtnClick`, `onEmojiBtnClick`, `isFileBtnVisible` (`node_modules/@moysklad/uikit/dist/components/Textfield/components/InputContainer/InputContainer.js:11-12`). Показать в истории: да (новый видимый элемент).
- `fileUploaderProps` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:29`): тип `ITextfieldFileUploaderProps` с обязательными `handleOpen`, `getInputProps` (`node_modules/@moysklad/uikit/dist/components/Textfield/types/index.d.ts:9-12`) — нужен при `isFileBtnVisible`, иначе кнопка файла нерабочая. Показать в истории: да, одним примером вместе с `isFileBtnVisible`, если получится собрать из `useFileUploader`; иначе без файла.
- Ручное изменение высоты: `resizeTop`, `resizeBottom` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:30-31`, ручки — `node_modules/@moysklad/uikit/dist/components/Textfield/components/ResizeHandle/ResizeHandle.d.ts:2-9`). При включении `resize` CSS отключается (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.js:91`). Показать в истории: да.
- Новый проп `helpProps?: Omit<HelpProps, 'testId'>` вместо `help` (`node_modules/@moysklad/uikit/dist/components/Textfield/Textfield.d.ts:44`). Показать в истории: да, если в истории нужна подсказка у поля — использовать его, а не `help`.
- Остальные пропы (`limit`, `showCounterLimit`, `autoVerticalResize`, …) не менялись: `diff` `.d.ts` их не показывает.

### Multiselect

- Новое: `allSelectedChipTextVariant?: 'full' | 'short'` и `getAllSelectedChipText?: (itemsCount: number) => string` (`node_modules/@moysklad/uikit/dist/components/Multiselect/Multiselect.d.ts:33-34`, типы `node_modules/@moysklad/uikit/dist/components/Multiselect/types.d.ts:12-13`, реэкспорт из главного входа `node_modules/@moysklad/uikit/dist/index.d.ts:52`). Если выбраны все элементы при `showSelectAllCheckbox`, вместо чипов показывается неинтерактивный чип «Выбраны все N» (`full`) или «Выбраны все» (`short`) (`node_modules/@moysklad/uikit/dist/components/Multiselect/lib/helpers.js:11-14`, чип — `node_modules/@moysklad/uikit/dist/components/Multiselect/AllSelectedChip/AllSelectedChip.js:5-12`, использование `node_modules/@moysklad/uikit/dist/components/Multiselect/Input/Input.js:102-103`). Показать в истории: да (новый видимый режим; нужен `showSelectAllCheckbox`, а `values` содержит все `items`).
- Текст «выбрать все» по умолчанию изменён: было «Все элементы», стало «Выбрать все» (`uikit-28/package/dist/components/Multiselect/lib/consts.d.ts:3` → `node_modules/@moysklad/uikit/dist/components/Multiselect/lib/consts.d.ts:3`; в `.d.ts` значение записано юникод-эскейпами). Показать в истории: да, меняет видимую подпись (поправить, если в историях или документах упомянут старый текст).
- `onSearch` поднят в `SharedProps` (`node_modules/@moysklad/uikit/dist/components/Multiselect/Multiselect.d.ts:27-30`) — в 28.1.0 он уже был в `MultiselectDropdownContentProps` (`uikit-28/package/dist/components/Multiselect/DropdownContent/MultiselectDropdownContent.d.ts:56`), то есть для пользователя не новый. Показать в истории: нет.
- `getOtherText` теперь продублирован в `MultiselectDropdownContentProps` (`node_modules/@moysklad/uikit/dist/components/Multiselect/DropdownContent/MultiselectDropdownContent.d.ts:23-31`) — раньше брался из `InputProps` (`Pick`, `node_modules/@moysklad/uikit/dist/components/Multiselect/Multiselect.d.ts:6`); для пользователя то же. Показать в истории: нет.
- Остальное (`Input`, `MultiselectTextField`: `canShowAllSelectedChip`, `isAllSelected` — `node_modules/@moysklad/uikit/dist/components/Multiselect/Input/Input.d.ts:26-27`, `node_modules/@moysklad/uikit/dist/components/Multiselect/TextField/MultiselectTextField.d.ts:16-18`) — внутренние пропы. Показать в истории: нет.

### Select

- Переименовано (поломка): `isArchived` → `showArchived` (`uikit-28/package/dist/components/Select/Select.d.ts:41` → `node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:45`; в JS `node_modules/@moysklad/uikit/dist/components/Select/Select.js:23`, значение по умолчанию `false`). Показать в истории: да, если история показывает архивное значение; сейчас такого нет (`rg` по `src/` не находит `isArchived` у Select).
- Новое: `inputHintText?: string` — текст подсказки у архивного значения (`node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:24`, по умолчанию `'В архиве'` — `node_modules/@moysklad/uikit/dist/components/Select/ArchivedInputValue/ArchivedInputValue.js:8`). Показать в истории: да, вместе с `showArchived`.
- Новое для варианта `short`: `shortVariantTextClassName`, `shortVariantContainerClassName`, `shortVariantIsVisibleFocusOutline` (`node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:32-34`, `node_modules/@moysklad/uikit/dist/components/Select/ShortVariant/ShortVariant.d.ts:7-10`). Это классы и видимость фокуса. Показать в истории: нет (стилизация).
- Новое поведение: `skipSelectOnTab` (`node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:31`; в старом файле был ниже, `uikit-28/package/dist/components/Select/Select.d.ts:44`, — то есть не новый, только перенесён), события `onFocus`, `onBlur`, `onKeyDown` (`node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:51,52,54`). Показать в истории: нет (события).
- Удалена статика `Select.ArchivedInputValue` из интерфейса `ISelectComponent` (`uikit-28/package/dist/components/Select/Select.d.ts:65`; в новом `node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:62-66` её нет). Показать в истории: нет.
- Новые внутренние файлы `DropdownActionsContainer`, `useDropdownPadding` (`node_modules/@moysklad/uikit/dist/components/Select/DropdownActionsContainer/DropdownActionsContainer.d.ts:1`, `node_modules/@moysklad/uikit/dist/components/Select/useDropdownPadding.d.ts`) — отступы под область действий в выпадающем списке, наружу не торчат. Показать в истории: нет.
- `isDropdownOpen: boolean` добавлено в аргумент `renderDropdownContent` (`IRenderDropdownContentOptions`, `node_modules/@moysklad/uikit/dist/components/Select/types.d.ts:35,53`). Показать в истории: нет.

### Chip

- Все пометки `@deprecated` (`isActive`, `onClick`, `children`, `overrideActiveClass`, `isTextEllipsis`, `icon`, `iconPosition`, `bodyTextClassName`, `small`) уже были в 28.1.0 (`uikit-28/package/dist/components/Chip/Chip.types.d.ts:122-164` → `node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:125-167`) — не новые.
- Новое в новом API (`selected`/`label`): `labelColorToken?: TextColorToken` (цвет подписи; тип из `node_modules/@moysklad/uikit/dist/components/Text/Text.d.ts:13`), `className?: string` (`node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:81-82`, в runtime применяется к корню и контейнеру — `node_modules/@moysklad/uikit/dist/components/Chip/Chip.js:166-167,226-227`), `tabIndex?: number` (`node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:79`, передаётся на кнопку — `node_modules/@moysklad/uikit/dist/components/Chip/Chip.js:183,238`). В legacy-режиме запрещены (`labelColorToken?: never`, `node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:175`). Показать в истории: да для `labelColorToken` (меняет цвет подписи); `className` и `tabIndex` — нет.
- `onSelectedChange` стал необязательным (`uikit-28/package/dist/components/Chip/Chip.types.d.ts:76` → `node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:77`; вызов с `?.` — `node_modules/@moysklad/uikit/dist/components/Chip/Chip.helpers.js:163`). Показать в истории: нет (но неинтерактивный чип можно показать без обработчика).

### LabelValue

- Новое: `valueVariant?: 'default' | 'link'` — вариант значения в виде ссылки (`node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts:19-23,33`, классы `node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.js:15-18`). Константа `LabelValueVariant` из главного входа не экспортируется (`node_modules/@moysklad/uikit/dist/index.d.ts:40-46` её не перечисляет), в историю — строкой `'link'`. Показать в истории: да.
- Новое: `iconFollowsValueHover?: boolean` (`node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts:43`, по умолчанию `true` — `node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.js:20`) — иконка подсвечивается вместе со значением. Показать в истории: нет (тонкая подсветка).
- Новое: `renderCustomValueBlock` (`node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts:40-42`) и `labelRef` (`node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts:15`). Показать в истории: нет (точка расширения).
- `ValueBlockContentArgs` вынесен в `node_modules/@moysklad/uikit/dist/components/LabelValue/types.d.ts:2-11`, добавлено поле `getIsLabelOverflow: () => boolean` (`node_modules/@moysklad/uikit/dist/components/LabelValue/types.d.ts:10`); `ValueBlockProps` (`node_modules/@moysklad/uikit/dist/components/LabelValue/types.d.ts:12-34`) содержит `needShowLabelTooltip` с пометкой `@deprecated use isNeedShowLabelTooltip` (`node_modules/@moysklad/uikit/dist/components/LabelValue/types.d.ts:19-22`) и новый `isNeedShowLabelTooltip?: () => boolean` (`node_modules/@moysklad/uikit/dist/components/LabelValue/types.d.ts:23`). Показать в истории: нет.
- Удалены внутренние `HelpButton`, `ValueBlock/index`, `hooks/useTooltip` (`uikit-28/package/dist/components/LabelValue/HelpButton/index.d.ts`, `uikit-28/package/dist/components/LabelValue/ValueBlock/index.d.ts`, `uikit-28/package/dist/components/LabelValue/hooks/useTooltip.d.ts`; замены — `node_modules/@moysklad/uikit/dist/components/LabelValue/ValueBlock/ValueBlock.d.ts`, `node_modules/@moysklad/uikit/dist/components/LabelValue/hooks/useValueBlock.d.ts`). Показать в истории: нет.

### Help

- Удалено (поломка): `icon?: ReactNode` (`uikit-28/package/dist/components/Help/Help.d.ts:11`; в `node_modules/@moysklad/uikit/dist/components/Help/Help.d.ts:11-21` его нет). Это единственная ошибка `tsc` из разведки; сейчас в `src/stories/catalog/Help.stories.tsx:18` проп уже не передаётся (`<Help popup=… />`). Показать в истории: нет.
- Новое: `size?: 'S' | 'M' | 'L'` как значения `'s' | 'm' | 'l'`, константа `HelpSize` и тип `HelpSizeValue` (`node_modules/@moysklad/uikit/dist/components/Help/Help.d.ts:5-10,13`, экспорт из главного входа `node_modules/@moysklad/uikit/dist/index.d.ts:34`; по умолчанию `HelpSize.L` — `node_modules/@moysklad/uikit/dist/components/Help/Help.js:17`; иконки 12/16/20 px — `node_modules/@moysklad/uikit/dist/components/Help/Help.js:4`). Показать в истории: да (три размера).
- Новое: `disabled?: boolean`, `tabIndex?: number` (`node_modules/@moysklad/uikit/dist/components/Help/Help.d.ts:14-15`). Показать в истории: да для `disabled` (видимое состояние), для `tabIndex` — нет.

### Breadcrumbs

- Новое: `charLimitThreshold?: number` (по умолчанию 40) и `hintZIndex?: number` (по умолчанию 1) у `Breadcrumbs` (`node_modules/@moysklad/uikit/dist/components/Breadcrumbs/Breadcrumbs.d.ts:4-7`, значения — `node_modules/@moysklad/uikit/dist/components/Breadcrumbs/Breadcrumbs.js:7,22`) и у `BreadcrumbItem` (`node_modules/@moysklad/uikit/dist/components/Breadcrumbs/BreadcrumbItem.d.ts:3-7`). Длинный текст элемента обрезается до порога и получает `...`, полный текст — в подсказке (`node_modules/@moysklad/uikit/dist/components/Breadcrumbs/BreadcrumbItem.js:15-17`). Показать в истории: да (один элемент с длинным названием).
- `BreadcrumbItemProps` теперь экспортируется как тип (`node_modules/@moysklad/uikit/dist/components/Breadcrumbs/BreadcrumbItem.d.ts:3`). Показать в истории: нет.

### Link

- Стал полиморфным: проп `as?: 'a' | 'button'` и типы `LinkOwnProps`, `LinkProps<As>` (`node_modules/@moysklad/uikit/dist/components/Link/Link.d.ts:3-7`, механизм — `node_modules/@moysklad/uikit/dist/components/_shared/utils/polymorphicClickableTypes.d.ts:3-16`; в runtime `as` по умолчанию `a`, при `disabled` у ссылки гасится `href` — `node_modules/@moysklad/uikit/dist/components/Link/Link.js:21-23`). В 28.1.0 этого не было: `uikit-28/package/dist/components/Link/Link.d.ts` описывал только `AnchorHTMLAttributes`, а `as` внутри был тегом `Text` (`uikit-28/package/dist/components/Link/Link.js:18`). Показать в истории: да (`as="button"`, `disabled`).

### Input

- Новые кнопки действий: `textActionIcon` + `onTextActionClick` (текстовая кнопка), `trailingActionIcon` + `onTrailingActionClick` (иконка справа) (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:15-18`). Показать в истории: да.
- Новое: `helpProps?: Omit<HelpProps, 'testId'>` вместо `helpComponent` (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:19-21`). `helpComponent` получил `@deprecated` (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:20`, в старой версии пометки не было — `uikit-28/package/dist/components/Input/Input.d.ts` без неё). Показать в истории: да для `helpProps`; `helpComponent` — не использовать.
- Новое: `inputSize?: 'M' | 'L'` (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:22`), `showCounterLimit?: boolean` (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:23`), `isInfoEllipsis?: boolean` (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:24`; новый внутренний `node_modules/@moysklad/uikit/dist/components/Input/components/InfoBlock.d.ts`). Показать в истории: да для `inputSize` и `showCounterLimit`, для `isInfoEllipsis` — нет (редкая обрезка подписи).
- Остальные пропы не менялись: `diff` `.d.ts` показывает только добавления.

### Tooltip

- Новое: `colorToken?: 'light' | 'dark'` (`node_modules/@moysklad/uikit/dist/components/Tooltip/Tooltip.d.ts:27`, значения `node_modules/@moysklad/uikit/dist/components/Tooltip/constants/TooltipBodyColor.d.ts:1-4`, по умолчанию `'light'` — `node_modules/@moysklad/uikit/dist/components/Tooltip/Tooltip.js:40`) и `arrowClassName?: string` (`node_modules/@moysklad/uikit/dist/components/Tooltip/Tooltip.d.ts:26`). В `uikit-28/package/dist/components/Tooltip/Tooltip.js` `colorToken` отсутствует (0 вхождений). Показать в истории: да для `colorToken` (тёмный тултип), для `arrowClassName` — нет.
- Константы вынесены: `uikit-28/package/dist/components/Tooltip/consts.d.ts` удалён, вместо него `node_modules/@moysklad/uikit/dist/components/Tooltip/constants/ArrowAlign.d.ts`, `node_modules/@moysklad/uikit/dist/components/Tooltip/constants/TooltipBodyColor.d.ts`, `node_modules/@moysklad/uikit/dist/components/Tooltip/constants/index.d.ts` и `node_modules/@moysklad/uikit/dist/components/Tooltip/types.d.ts:3-4`; `ArrowAlignValue` → `TArrowAlignValue` (`node_modules/@moysklad/uikit/dist/components/Tooltip/hooks.d.ts:2,11`). Из главного входа по-прежнему только `Placement`, `Tooltip`, `TooltipProps` (`node_modules/@moysklad/uikit/dist/index.d.ts:75`). Показать в истории: нет.

### EditableTitle

- Тип компонента теперь `memo(forwardRef<HTMLDivElement>)` (`node_modules/@moysklad/uikit/dist/components/EditableTitle/EditableTitle.d.ts:25`), ранее `FC` (`uikit-28/package/dist/components/EditableTitle/EditableTitle.d.ts:20`) — можно передавать `ref`. Показать в истории: нет.
- Новые пропы: `onToggle?: (isEdit: boolean) => void` (`node_modules/@moysklad/uikit/dist/components/EditableTitle/EditableTitle.d.ts:11`), `prefix?: string` — текст-префикс перед заголовком (`node_modules/@moysklad/uikit/dist/components/EditableTitle/EditableTitle.d.ts:20`, отрисовка — `node_modules/@moysklad/uikit/dist/components/EditableTitle/EditableTitle.js:113,133`), `titleClassName`, `inputWrapperClassName` (`node_modules/@moysklad/uikit/dist/components/EditableTitle/EditableTitle.d.ts:21-22`), `hintZIndex` (`node_modules/@moysklad/uikit/dist/components/EditableTitle/EditableTitle.d.ts:23`). Показать в истории: да для `prefix` (видимый элемент); остальное — нет.
- Удалён внутренний `HintWithSkip` из компонента (`uikit-28/package/dist/components/EditableTitle/HintWithSkip.d.ts`; в новом он лежит в `node_modules/@moysklad/uikit/dist/components/_shared/HintWithSkip/`). Показать в истории: нет.

### InputUnit

- Новое: `helpProps` вместо `helpComponent`; `helpComponent` получил `@deprecated` (`node_modules/@moysklad/uikit/dist/components/InputUnit/InputUnit.d.ts:31-32`; в `uikit-28/package/dist/components/InputUnit/InputUnit.d.ts` пометки нет). Показать в истории: да для `helpProps` (если у InputUnit в истории появится подсказка).
- `SelectUnit` и `SelectUnitVisible` получили внутренний `isOpen` (`node_modules/@moysklad/uikit/dist/components/InputUnit/SelectUnit/type.d.ts:6`, `node_modules/@moysklad/uikit/dist/components/InputUnit/SelectUnit/SelectUnitVisible.js:7`, использование — `node_modules/@moysklad/uikit/dist/components/InputUnit/InputUnit.js:190`): клавиши ↑/↓ открытого списка. Тип возврата `SelectUnit` перестал включать `null` (`node_modules/@moysklad/uikit/dist/components/InputUnit/SelectUnit/SelectUnit.d.ts:2`). Показать в истории: нет.

### Button

- Стал полиморфным: `as?: 'a' | 'button'`; для `a` передаются `href` и `aria-disabled`, у `button` — `type`, `disabled` (`node_modules/@moysklad/uikit/dist/components/Button/Button.js:39,51-58`). Типы: `ButtonOwnProps`, `IButtonProps` (`node_modules/@moysklad/uikit/dist/components/Button/Button.d.ts:23-36`); в `uikit-28/package/dist/components/Button/Button.js` `as` нет (0 совпадений). Показать в истории: да (кнопка-ссылка).
- Новый проп `noPadding?: boolean` (`node_modules/@moysklad/uikit/dist/components/Button/Button.d.ts:32`): действует только на `variant="frameless"` (`node_modules/@moysklad/uikit/dist/components/Button/Button.js:43`). Показать в истории: да.
- `disabled` теперь явно в `ButtonOwnProps` (`node_modules/@moysklad/uikit/dist/components/Button/Button.d.ts:27`); поведение прежнее. Показать в истории: нет.
- `EmptyState.Button` теперь полиморфный (`uikit-28/package/dist/components/EmptyState/EmptyState.d.ts:33` → `node_modules/@moysklad/uikit/dist/components/EmptyState/EmptyState.d.ts:33`) — изменён только тип.

### LabelValueSelect

- Для пользователя без изменений: `isArchived` убран из `Pick<SelectProps, …>` (`uikit-28/package/dist/components/LabelValueSelect/LabelValueSelect.d.ts:8` → `node_modules/@moysklad/uikit/dist/components/LabelValueSelect/LabelValueSelect.d.ts:9`) и объявлен собственным полем (`node_modules/@moysklad/uikit/dist/components/LabelValueSelect/LabelValueSelect.d.ts:17`), так как у `Select` проп теперь называется `showArchived`. У `LabelValueSelect` проп остался `isArchived` (`node_modules/@moysklad/uikit/dist/components/LabelValueSelect/LabelValueSelect.js:12`). Показать в истории: нет.
- `ValueBlockContentArgs` импортируется из `LabelValue/types` (`node_modules/@moysklad/uikit/dist/components/LabelValueSelect/LabelValueSelect.d.ts:4`) — отсюда в нём теперь `getIsLabelOverflow` (см. LabelValue). Показать в истории: нет.

### AutoComplete

- Новое: `renderDropdownActions?: (options: IRenderActionsOptions) => ReactNode` — область действий под списком (`node_modules/@moysklad/uikit/dist/components/AutoComplete/AutoComplete.d.ts:28`), `maxDropdownHeight?: number` (`node_modules/@moysklad/uikit/dist/components/AutoComplete/AutoComplete.d.ts:29`, применяется как `maxHeight` у `Dropdown` — `node_modules/@moysklad/uikit/dist/components/AutoComplete/AutoComplete.js:120`). Показать в истории: да для `renderDropdownActions` (видимая кнопка внизу списка); `maxDropdownHeight` — нет.
- Пометки `@deprecated` (`name`, `value`) не новые: `uikit-28/package/dist/components/AutoComplete/AutoComplete.d.ts:6,8` = `node_modules/@moysklad/uikit/dist/components/AutoComplete/AutoComplete.d.ts:6,8`. Показать в истории: нет (история их не использует).

### Dropdown

- Новое: `shouldIgnoreOutsideInteraction?: (target: Node) => boolean` (`node_modules/@moysklad/uikit/dist/components/Dropdown/Dropdown.d.ts:24`) — клики/нажатия по заданным целям не закрывают список (`node_modules/@moysklad/uikit/dist/components/Dropdown/Dropdown.js:15,34,43`); `maxHeight?: number` (`node_modules/@moysklad/uikit/dist/components/Dropdown/Dropdown.d.ts:25`, до этого был константой `MAX_HEIGHT` — `uikit-28/package/dist/components/Dropdown/hooks/usePosition.js:45`; хук получил `maxHeightValue`, `node_modules/@moysklad/uikit/dist/components/Dropdown/hooks/usePosition.d.ts:11`). Показать в истории: да для `maxHeight` (список ограниченной высоты), `shouldIgnoreOutsideInteraction` — нет.

### Datepicker

- Новое: `nullableValueWhenTimeIncomplete?: boolean` (`node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.d.ts:53`): при включённом вводе времени и незаполненном времени `onDateChanged` отдаёт `null` (`node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.js:133-134`; по умолчанию `false`, `node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.js:35`). Показать в истории: да, если в истории есть `showTime` (иначе — нет; сейчас `showTime` в истории нет, `src/stories/catalog/Datepicker.stories.tsx:20-30`).
- Новое: `onInputKeyDown?: KeyboardEventHandler<HTMLInputElement>` (`node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.d.ts:66`, вызов — `node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.js:260`). Показать в истории: нет (событие).

### MentionsTextfield

- Без собственных новых пропов в `MentionsTextfield.d.ts` (изменён только порядок `import` — `node_modules/@moysklad/uikit/dist/components/MentionsTextfield/MentionsTextfield.d.ts:2`), но тип наследует `Omit<TextfieldProps, …>` (`node_modules/@moysklad/uikit/dist/components/MentionsTextfield/MentionsTextfield.d.ts:5`), поэтому получает все изменения `Textfield`: `size`, `resizeTop`, `resizeBottom` реально поддержаны (`node_modules/@moysklad/uikit/dist/components/MentionsTextfield/MentionsTextfield.js:19-20,66,73`), а `clearable` и `onClear` убраны (в старой версии обрабатывались — `uikit-28/package/dist/components/MentionsTextfield/MentionsTextfield.js:16-27`). Показать в истории: да, одним примером с `size="l"` или `resizeBottom` (для остального — смотреть Textfield). `help`/`actionsBar` из Textfield в Mentions не использовать.

### LabelValueInput

- Публичный `LabelValueInput.d.ts` не менялся (`node_modules/@moysklad/uikit/dist/components/LabelValueInput/LabelValueInput.d.ts:5-15`). Изменён только внутренний `DropdownContentProps`: добавлены `clearable` и `isSelectInputValueAfterOpen` (`node_modules/@moysklad/uikit/dist/components/LabelValueInput/DropdownConnent/DropdownContent.d.ts:14,19`), используются в `node_modules/@moysklad/uikit/dist/components/LabelValueInput/DropdownConnent/DropdownContent.js:10,39`. Из `LabelValueInput` они не пробрасываются (в `LabelValueInput.js` нет вхождений). Показать в истории: нет.

### FileUploader

- Новое: `loadingText?: string` — подпись плейсхолдера загрузки (`node_modules/@moysklad/uikit/dist/components/FileUploader/FileUploader.types.d.ts:45`, передаётся в превью — `node_modules/@moysklad/uikit/dist/components/FileUploader/FileUploader.js:74,120`). Показать в истории: да, если история показывает `loadingFiles`/`loadingCount`; сейчас `src/stories/catalog/FileUploader.stories.tsx:33-38` их не использует, значит — нет.
- Превью теперь определяет расширение у имён с query-строкой (`file.name.split('?')[0]`) и использует `isImageByExt` (`node_modules/@moysklad/uikit/dist/components/FileUploader/components/FileUploaderPreview/FileUploaderPreview.js:12-13`; хелпер — `node_modules/@moysklad/uikit/dist/components/FileUploader/FileUploader.helpers.d.ts:59`). Показать в истории: нет.
- `@deprecated` у `onDelete` (`node_modules/@moysklad/uikit/dist/components/FileUploader/FileUploader.types.d.ts:47-48`) не новое (в старой версии он был в том же виде). Витрина использует `onDeleteFile` (`src/stories/catalog/FileUploader.stories.tsx:37`).

### EmptyState

- Изменился только тип статического `EmptyState.Button`: теперь полиморфный (`node_modules/@moysklad/uikit/dist/components/EmptyState/EmptyState.d.ts:33`, было `uikit-28/package/dist/components/EmptyState/EmptyState.d.ts:33`). Рендер не изменился (`diff` `.js` пуст). Показать в истории: нет.

### Checkbox

- В `.d.ts` меняется только порядок ключей в `Omit<…>` (`uikit-28/package/dist/components/Checkbox/Checkbox.d.ts:2` → `node_modules/@moysklad/uikit/dist/components/Checkbox/Checkbox.d.ts:2`); в `.js` — только новый путь импорта `Info` из `_shared` (`node_modules/@moysklad/uikit/dist/components/Checkbox/Checkbox.js:5`). Пометки `@deprecated` (`children`, `help`, `disableRemoveAllSelectionRanges`) не новые: `uikit-28/package/dist/components/Checkbox/Checkbox.types.d.ts:10,13,21` = `node_modules/@moysklad/uikit/dist/components/Checkbox/Checkbox.types.d.ts:10,13,21`. Показать в истории: нет.

### Label

- Весь компонент помечен `@deprecated Используйте FieldLabel` (`node_modules/@moysklad/uikit/dist/components/Label/Label.d.ts:9`); API прежний (`label`, `required`, `htmlFor`, `onMouseDown`, `testId`, `node_modules/@moysklad/uikit/dist/components/Label/Label.d.ts:3-8`). `.js` не менялся. Заменитель `FieldLabel` лежит в `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.d.ts:5-18` (подпуть `@moysklad/uikit/components/FieldLabel`; пропсы: `label?: string`, `required`, `helpProps`, `helpSize`, `variant`, `colorToken`, `testId`, `onOverflowChange`). Из старого `Label` в `FieldLabel` не переходит только то, что у `Label` `label` был `ReactNode` — у `FieldLabel` строка. Показать в истории: да — историю `Label` перевести на `FieldLabel` (решает E-задача этапа 2, подробности — раздел «Витрина использует устаревшее»).

### data-grid

Подпуть `@moysklad/uikit/data-grid` (`node_modules/@moysklad/uikit/dist/data-grid/index.d.ts`). Демо витрины использует `Table`, `NameCell`, `TextCell`, `CheckboxCell`, `CheckboxHeader`, `Pagination` (`src/stories/demos/DataGridTable.stories.tsx:9-17`). Ни одно из изменений ниже демо не ломает: удалённые пропы `Table` в нём не передаются (`rowSelection` — это состояние `useReactTable`, `src/stories/demos/DataGridTable.stories.tsx:64,106`, а не проп `Table`). По решению плана демо не расширяется, поэтому везде ниже «показать в истории: нет».

- Корневой `index.d.ts` убрал дубликаты `export * from './base'`/`cells`/`headers`/`hooks` (`uikit-28/package/dist/data-grid/index.d.ts:1-10` → `node_modules/@moysklad/uikit/dist/data-grid/index.d.ts:1-14`); состав публичных экспортов тот же. Показать в истории: нет.
- Удалены (поломка для пользователей, не для витрины) устаревшие пропы `Table`: `rowSelection`, `columnVisibility` («Используется table.getState()…», `uikit-28/package/dist/data-grid/Table/Table.d.ts:17-24`) и `fillContainerSpace` (`uikit-28/package/dist/data-grid/Table/Table.d.ts:31-34`). `fullWidth` остался, но пометку `@deprecated` потерял (`uikit-28/package/dist/data-grid/Table/Table.d.ts:35-38` → `node_modules/@moysklad/uikit/dist/data-grid/Table/Table.d.ts:23`). Показать в истории: нет.
- Новые пропы `Table`: `rowClickCallOrder?: 'default' | 'reverse'` (`node_modules/@moysklad/uikit/dist/data-grid/Table/Table.d.ts:29`, тип `node_modules/@moysklad/uikit/dist/data-grid/Table/types.d.ts:16-20`; констант `RowClickCallOrder` из корня `data-grid` не экспортируется — `node_modules/@moysklad/uikit/dist/data-grid/Table/index.d.ts:4`), виртуализация: `isVirtualization`, `overscan`, `rangeChanged` (`node_modules/@moysklad/uikit/dist/data-grid/Table/Table.d.ts:34-39`; внутри — `VirtualTable`, `node_modules/@moysklad/uikit/dist/data-grid/Table/components/VirtualTable/VirtualTable.d.ts`; зависимость от `react-virtuoso`, `node_modules/@moysklad/uikit/dist/data-grid/Table/Table.d.ts:2`). Показать в истории: нет (демо не расширяется; кандидаты в будущую расширенную демо).
- `DnDConfig.onDragEnd` получил третий аргумент `rowId: string` (`uikit-28/package/dist/data-grid/Table/types.d.ts:4` → `node_modules/@moysklad/uikit/dist/data-grid/Table/types.d.ts:5`). Тип `HighlightedRowColor = 'orange' | 'red' | 'green' | 'blue'` вынесен в `types` и экспортируется из `Table` (`node_modules/@moysklad/uikit/dist/data-grid/Table/types.d.ts:21`, `node_modules/@moysklad/uikit/dist/data-grid/Table/index.d.ts:4`). Показать в истории: нет.
- Новые ячейки и меню: `EditableCellWrapper` (`node_modules/@moysklad/uikit/dist/data-grid/cells/components/EditableCellWrapper/EditableCellWrapper.d.ts:1-3`, экспорт `node_modules/@moysklad/uikit/dist/data-grid/cells/index.d.ts:4`), `RowActionsMenu.disabled` (`node_modules/@moysklad/uikit/dist/data-grid/cells/components/RowActionsMenu/RowActionsMenu.d.ts:20`), `TableNumberInput` теперь `memo(forwardRef)` с необязательным `onChange` и новыми `onBlur(e, value)`, `allowBlurWhenValueNotChange` (`node_modules/@moysklad/uikit/dist/data-grid/cells/components/TableNumberInput/TableNumberInput.d.ts:7-8,16,18`), `TableSelect`: ref теперь `SelectRef<T>`, `inputProps` принимает `ref`, `onFocus`/`onBlur`, `customOnArrowBtnClick` (`node_modules/@moysklad/uikit/dist/data-grid/cells/components/TableSelect/TableSelect.d.ts:8-20`), `ImageCell.onCloseCarousel` (`node_modules/@moysklad/uikit/dist/data-grid/cells/ImageCell/ImageCell.d.ts:11`), `IndexCheckboxDndCell` — второй дженерик `K` и `data?: K[]` (`node_modules/@moysklad/uikit/dist/data-grid/cells/IndexCheckboxDndCell/IndexCheckboxDndCell.d.ts:3,9`). Показать в истории: нет.
- `HeaderBuilder`: тип `HeaderBuilderProps` теперь экспортируется (`node_modules/@moysklad/uikit/dist/data-grid/headers/components/HeaderBuilder/HeaderBuilder.d.ts:8`, `node_modules/@moysklad/uikit/dist/data-grid/headers/index.d.ts:4`); новые `renderDropdownContent`, `customOnClick` (`node_modules/@moysklad/uikit/dist/data-grid/headers/components/HeaderBuilder/HeaderBuilder.d.ts:26-27`); `isScrollToDropdownDisabled` с пометкой `@deprecated удалён т.к. функционал не работал` (`node_modules/@moysklad/uikit/dist/data-grid/headers/components/HeaderBuilder/HeaderBuilder.d.ts:23-24`, сам проп — `node_modules/@moysklad/uikit/dist/data-grid/headers/components/HeaderBuilder/HeaderBuilder.d.ts:24`). Устаревший `Dropdown` из `headers` помечен `@deprecated Use { Dropdown } from @lognex/uikit instead` (`node_modules/@moysklad/uikit/dist/data-grid/headers/components/Dropdown/Dropdown.d.ts:2-4`); `Option.onSelect` принимает необязательное значение (`node_modules/@moysklad/uikit/dist/data-grid/headers/components/Dropdown/Option/Option.d.ts:4`). Показать в истории: нет.
- Локаль `DateRangeFilterLocale` перестроена: строки перенесены в `translate`, форматы — в `format` (`uikit-28/package/dist/data-grid/Filters/DateRangeFilter/types.d.ts:32-95` → `node_modules/@moysklad/uikit/dist/data-grid/Filters/DateRangeFilter/types.d.ts:32-108`). Для тех, кто подставляет свою локаль, — поломка; встроенные локали пакета обновлены вместе с типом. `useLocale(componentName, getBy?)` получил второй аргумент и константу `LocaleKey` (`node_modules/@moysklad/uikit/dist/data-grid/locale/useLocale.d.ts:4-8`). Показать в истории: нет.
- Внутренние перестройки без публичного эффекта: замена `Header`/`Footer` на `HeaderContent`/`FooterContent` (`uikit-28/package/dist/data-grid/Table/components/Header/Header.d.ts`, `uikit-28/package/dist/data-grid/Table/components/Footer/Footer.d.ts` удалены; `node_modules/@moysklad/uikit/dist/data-grid/Table/components/Header/HeaderContent.d.ts`, `node_modules/@moysklad/uikit/dist/data-grid/Table/components/Footer/FooterContent.d.ts` добавлены), `Body`, `TableRow`, `SubRows`, `TableDragOverlay` (новые дженерики `WithRowClickLink`), `TableContextProvider` (`rowSize`, `className`, `isLoading`, `headerStyle`), константы `ROW_HEIGHT_COMPACT = 28`, `ROW_HEIGHT_COMFORT = 32` (`node_modules/@moysklad/uikit/dist/data-grid/Table/constants.d.ts:2-3`), `TableRowSizeValue` (`node_modules/@moysklad/uikit/dist/data-grid/types/index.d.ts:47`). Показать в истории: нет.

## Новые компоненты

Группы `title` берутся только из существующих: Actions, Containers, Fields, Forms, Navigation, Overlays, Status, Typography.

Расхождения с `00-context.md`, найденные при сверке с `dist`: (1) `DateRange` экспортируется из главного входа (`node_modules/@moysklad/uikit/dist/index.d.ts:21`, `node_modules/@moysklad/uikit/dist/index.js:26`), хотя контекст относит его к подпутевым; подпуть `./components/DateRange` при этом тоже есть (`node_modules/@moysklad/uikit/package.json:122`). (2) Главный вход по-прежнему реэкспортирует `hooks`, `icon`, `utils` (`node_modules/@moysklad/uikit/dist/index.d.ts:82-84`, `node_modules/@moysklad/uikit/dist/index.js:4-6`), как и в 28.1.0 (`uikit-28/package/dist/index.d.ts`, строки `export * from './hooks'`, `'./icon'`, `'./utils'`). Подпутевых новых компонентов поэтому два (`FieldLabel`, `Panel`), а не три.


### BentoBlock

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:5`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:66`).
- Обязательные пропы: нет (`node_modules/@moysklad/uikit/dist/components/BentoBlock/BentoBlock.d.ts:6-11`, все необязательные). Расширяет `HTMLAttributes<HTMLDivElement>`.
- Пропы: `as` (тег из `BentoBlockTag`: div, section, article, aside, header, footer, nav; `node_modules/@moysklad/uikit/dist/components/BentoBlock/consts.d.ts:6-14`), `paddingVariant` (`p12|p16|p20`, по умолчанию `p20`; `node_modules/@moysklad/uikit/dist/components/BentoBlock/consts.d.ts:1-5`, `node_modules/@moysklad/uikit/dist/components/BentoBlock/BentoBlock.js:7`), `containerClassName`, `testId`. `className` и `style` уходят во внутренний scroll-контейнер, а не на внешнюю рамку (`node_modules/@moysklad/uikit/dist/components/BentoBlock/BentoBlock.js:12-14`).
- Controlled-пар нет. Провайдеры не нужны. Оверлей не открывает.
- Группа: Containers.
- Показать в истории: да. Варианты: три `paddingVariant`, разные `as`, содержимое выше контейнера со скроллом (`containerClassName`/`className` с фиксированной высотой), несколько блоков в сетке.

### EditableDate

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:24`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:134`).
- Обязательные пропы: наследуются от `DatepickerProps` за вычетом `omitedDatepickerProps` (`node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.d.ts:2-3`): `selectedDate: Date | string` (без `null`, `node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.d.ts:6`), `localeFormat: string` (BCP-47-локаль, не паттерн; `node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.d.ts:15`), `lang` (`node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.d.ts:16`), `onDateChanged: (date: Date | null, options) => void` (`node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.d.ts:59`).
- Controlled-пара: `selectedDate` + `onDateChanged` (`node_modules/@moysklad/uikit/dist/components/Datepicker/Datepicker.d.ts:18,59`). Дополнительно `onDayClick`: компонент перехватывает его и закрывает выпадашку (`node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.js:48-51,91`).
- Свои пропы: `prefix` (по умолчанию `'от'`, `node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.js:33`; `node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.d.ts:5`), `iconPosition` (по умолчанию `'end'`, `node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.js:33`).
- Принудительно выставляет `showTime`, `isTimeRequired`, `inline`, `frameless`, `fitInput`, `nullableValueWhenTimeIncomplete`, `blurInputOnEsc/Enter: false` (`node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.js:76-86`), поэтому эти пропы передать нельзя (убраны из типа, `node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.d.ts:2`).
- Провайдеры не нужны (`LocaleContext` имеет значение по умолчанию: `node_modules/@moysklad/uikit/dist/context/contexts/LocaleContext.js:4-7`). Оверлей: да, кнопка с текстом даты открывает `Dropdown` с календарём и полем ввода (`node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate.js:99,120`).
- Группа: Forms (рядом с `Datepicker`, `EditableTitle`).
- Показать в истории: да. Варианты: значение-`Date` и значение-строка, свой `prefix`, `iconPosition` start/end, `disabled`, `presets`, пара локалей (`ELanguages.RU`/`EN`, `node_modules/@moysklad/uikit/dist/context/constants/locale.d.ts:3-7`).

### Informer

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:37`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:206`).
- Обязательные пропы: `description: string` (`node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:32`).
- Остальное: `title`, `variant` (`blue` по умолчанию | `green` | `red`; `node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:3-7`, `node_modules/@moysklad/uikit/dist/components/Informer/Informer.js:16`), `renderTitle`, `className`, `testId`. Корневой элемент имеет `role="status"` (`node_modules/@moysklad/uikit/dist/components/Informer/Informer.js:20`). Неинтерактивный: без кнопок и закрытия (JSDoc `node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:13-29`). Есть `ref` на `div` (`node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:37`).
- Controlled-пар нет. Провайдеры не нужны. Оверлей не открывает.
- Группа: Status (по смыслу рядом с `Banner`, который закрываемый; `Info` лежит в Forms и относится к тексту под полем, см. часть A, раздел «Info и Informer»).
- Показать в истории: да. Варианты: три цвета, с заголовком и без, `renderTitle` с иконкой, длинное описание (в JSDoc предел 4 строки, `node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:22-23`).

### Layout

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:47`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:258`).
- Обязательные пропы: нет (`node_modules/@moysklad/uikit/dist/components/Layout/Layout.d.ts:3-12`). Слоты `header`, `contentHeader`, `aside`, `content` (`ReactNode`), флаги `fullWidth`, `stickyContentHeader`, `showLargePaddingBottom`, `bgColor?: 'white'`, `testId`.
- Подвох для витрины: контейнер имеет `min-width: 1200px` и `min-height: 100dvh` (`node_modules/@moysklad/uikit/dist/components/Layout/Layout_module.css:9-10`), то есть занимает весь экран. В истории нужна `layout: 'fullscreen'` либо обёртка с фиксированной высотой и `transform`/iframe-режим; иначе карточка выйдет из превью.
- `header` и `main` рендерятся всегда, `contentHeader` и `aside` только если переданы (`node_modules/@moysklad/uikit/dist/components/Layout/Layout.js:9,17`).
- Controlled-пар нет. Провайдеры не нужны. Оверлей не открывает.
- Группа: Containers.
- Показать в истории: да. Варианты: только `content`; с `aside`; с `contentHeader` и `stickyContentHeader`; `fullWidth`; `bgColor="white"`; `showLargePaddingBottom`. Это страничный каркас, история должна собирать его из готовых компонентов (`Text`, `Panel`, `BentoBlock`).

### LabelValueCheckbox

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:40`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:230`).
- Обязательные пропы: `label: string` (из `SharedLabelValueProps`, `node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts:6`). Типы: `node_modules/@moysklad/uikit/dist/components/LabelValueCheckbox/LabelValueCheckbox.d.ts:3-8`.
- Controlled-пара: `checked` + `onChange` (взяты из `CheckboxProps`, `node_modules/@moysklad/uikit/dist/components/LabelValueCheckbox/LabelValueCheckbox.d.ts:3`); неуправляемый вариант `defaultChecked`. Также `indeterminate`, `tabIndex`, `checkboxClassName`, `checkboxProps`. Из `LabelValue` убраны `error`, `valueBlockContent`, `onChange` (HTML), `dropdown*` (`node_modules/@moysklad/uikit/dist/components/LabelValueCheckbox/LabelValueCheckbox.d.ts:4`).
- Внутри `LabelValue` с `value=""` и `customDropdown`, чекбокс рендерится как содержимое значения (`node_modules/@moysklad/uikit/dist/components/LabelValueCheckbox/LabelValueCheckbox.js:8,12-20`).
- Провайдеры не нужны. Оверлей не открывает.
- Группа: Fields (рядом с остальными `LabelValue*`).
- Показать в истории: да. Варианты: unchecked/checked/indeterminate, `disabled`, `required`, `helpPopupContent`, длинная подпись.

### LabelValueFile

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:42`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:238`).
- Обязательные пропы: `label: string` и `fileUploader: IUseFileUploaderResult` (`node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.d.ts:3-6`). Объект получают из хука `useFileUploader(options)`, он по-прежнему в главном входе (`node_modules/@moysklad/uikit/dist/index.d.ts:28`; тип результата `node_modules/@moysklad/uikit/dist/components/FileUploader/FileUploader.types.d.ts:76-83`).
- Controlled-пара: состояние живёт в хуке (`files`, `setFiles`, `removeFile`, `open`, `getInputProps`); отдельных `value/onChange` нет. Показывается только первый файл (`node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.js:9`), `multiple` принудительно `false` (`node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.js:27`).
- Прочие пропы: `emptyText` (по умолчанию `'Загрузить'`, `node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.js:8`), `disabled`, `error`, `required`, `helpPopupContent`, `testId`. Клик по пустому полю открывает диалог выбора (`node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.js:13,16`), по заполненному скачивает (`node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.js:17`).
- Для файла нужны поля `IFile`: `id`, `preview`, опционально `tinyImage` (`node_modules/@moysklad/uikit/dist/components/FileUploader/FileUploader.types.d.ts:5-11`); `preview` выводится как значение (`node_modules/@moysklad/uikit/dist/components/LabelValueFile/LabelValueFile.js:23`). Для демонстрации заполненного состояния файл нужно положить через `setFiles`.
- Провайдеры не нужны. Оверлей не открывает (тултип подписи только при переполнении).
- Группа: Fields.
- Показать в истории: да. Варианты: пустое (`emptyText`), с файлом-картинкой и с файлом другого типа, `disabled`, `error`. Первая загрузка в браузере идёт через системный диалог, в автоматической проверке через `setFiles`.

### LabelValueLink

- Вход: главный, но только значение (`export { LabelValueLink }` без типа пропов; `node_modules/@moysklad/uikit/dist/index.d.ts:44`). Тип пропов не экспортируется; он совпадает с `LabelValueInputProps` (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.d.ts:1-2`). Подпуть есть (`node_modules/@moysklad/uikit/package.json:246`).
- Обязательные пропы: `label: string`, `name: string` (`node_modules/@moysklad/uikit/dist/components/LabelValueInput/LabelValueInput.d.ts:5-9`, `node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts:6`).
- Controlled-пара: `value?: string` + `onChange?: ChangeEventHandler<HTMLInputElement>` (`node_modules/@moysklad/uikit/dist/components/LabelValueInput/LabelValueInput.d.ts:6,14`). `forwardRef` на `div` (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.d.ts:2`).
- Поведение: значение показывается как ссылка; если нет протокола `http://`/`https://`, подставляется `https://` (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/normalizeLinkValue.js:1-8`, `node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.js:22`). Пустое: `emptyText` по умолчанию `'Не указано'` (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.js:13`). Кнопка-карандаш скрыта при `disabled`, пустом значении или `error` (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.js:29`). Редактирование идёт в выпадашке с полем и кнопкой очистки (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.js:52-72`), нормализация при закрытии (`node_modules/@moysklad/uikit/dist/components/LabelValueLink/LabelValueLink.js:46`).
- Провайдеры не нужны. Оверлей: да, выпадашка с полем ввода.
- Группа: Fields.
- Показать в истории: да. Варианты: пустое, со схемой и без неё, `disabled`, `error` (с `info`), `required`.

### StatusBadge

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:68`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:346`).
- Обязательные пропы: `title: string`, `availableStatuses: StatusBadgeOption[]` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.d.ts:14,21`). `StatusBadgeOption` = `{ label, value, dto?, color }` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.d.ts:10-12`).
- Controlled-пара: `value?: StatusBadgeOption` + `onSelect?: (option) => void` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.d.ts:15,24`). `onSelect` отдаёт опцию с нормализованным `color` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:50-57`).
- Цвета: `StatusColor` (17 значений: `empty`, `grey`, `red`, `orange`, `brown`, `yellow-green`, `lime-green`, `mint-green`, `green`, `sky-blue`, `blue`, `dusty-blue`, `dark-blue`, `pink`, `violet`, `dark-red`, `black`; `node_modules/@moysklad/uikit/dist/components/StatusBadge/utils/StatusBadgeColor.d.ts:2-20`). Без `value` цвет `empty` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:20`). Рисуются токенами слоя `gwt-status` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge_module.css:3`, раздел «Токены» ниже).
- Размеры: `StatusBadgeSize.Comfortable` (по умолчанию) и `Compact` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.d.ts:5-9`, `node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:21,101`).
- Прочее: `dropdownButtonText` (по умолчанию `'Настроить статусы'`, `node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:19`), `onDropdownButtonClick`, `dropdownZIndex`, `disabled` (стрелка скрыта, `node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:108`), `testId`; остальное из `ButtonHTMLAttributes`. Дженерик по `dto`.
- Провайдеры не нужны. Оверлей: да, `Dropdown` со списком статусов и кнопкой настройки (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:113-165`). Подсказка при переполнении заголовка (`node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:88-98`).
- Группа: Status.
- Показать в истории: да. Варианты: все 17 цветов, два размера, `disabled`, длинный заголовок, открытие выпадашки, пустой `availableStatuses` (без разделителя и со списком только из кнопки, `node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge.js:146`).

### ViewersStack

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:78`). Подпуть тоже есть (`node_modules/@moysklad/uikit/package.json:382`).
- Обязательные пропы: `viewers: Viewer[]`, где `Viewer = { id: string; label: string; image?: string }` (`node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.d.ts:4`, `node_modules/@moysklad/uikit/dist/components/ViewersStack/types.d.ts:15-19`). Пустой массив даёт `null` (`node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.js:33`).
- Прочее: `maxVisibleCount` (по умолчанию 3, `node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.js:10,13`), `label` (текст рядом), `animated` (по умолчанию `true`, `node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.js:13`), `tooltipZIndex` (по умолчанию 10, минимум 2; `node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.js:11-12,16`), `testId`.
- При переполнении показывается `maxVisibleCount - 1` аватар и счётчик остальных (`node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.js:22-23,58-67`). Цвет аватара без картинки выбирается по `id` из четырёх (`green|yellow|pink|violet`; `node_modules/@moysklad/uikit/dist/components/ViewersStack/types.d.ts:7-14`, `node_modules/@moysklad/uikit/dist/components/ViewersStack/ViewersStack.js:20`), токены `--viewers-stack-*`.
- Controlled-пар нет (только отображение). Провайдеры не нужны. Оверлей: тултипы с именами по наведению на аватар и счётчик (`node_modules/@moysklad/uikit/dist/components/ViewersStack/components/ViewersTooltip/ViewersTooltip.js:20`); открываются hover, не клик.
- Группа: Status.
- Показать в истории: да. Варианты: 1, 2, 3 зрителя; больше `maxVisibleCount` (счётчик); с `image` и без; с `label`; `animated={false}`.

### DateRange

- Вход: главный (`node_modules/@moysklad/uikit/dist/index.d.ts:21`) и подпуть (`node_modules/@moysklad/uikit/package.json:122`). Типы значений и хелперы периодов тоже экспортируются из главного входа (`node_modules/@moysklad/uikit/dist/index.d.ts:21`: `DateRangeValue`, `getPeriodValue`, `getRangeDates`, `isRangeValue` и др.).
- Обязательные пропы: нет формально. Но у триггера `label: string` по типу обязателен, а в `DateRangeProps` он переопределён как необязательный (`node_modules/@moysklad/uikit/dist/components/DateRange/props.d.ts:24-25`). Рекомендуется всегда задавать `label`.
- Controlled-пара: `value?: DateRangeValue` + `onChange?: (value: DateRangeValue) => void` (`node_modules/@moysklad/uikit/dist/components/DateRange/props.d.ts:28-29`). `DateRangeValue = { type: DateSelectVariant; value: Date | [Date|null|undefined, Date|null|undefined] | null }`, `type` из `period|day|week|month|anyDate|noDate` (`node_modules/@moysklad/uikit/dist/components/DateRange/types.d.ts:1,5-8`). Типизированные формы: `DateRangeRangeValue`, `DateRangeDayValue`, `DateRangeWeekValue`, `DateRangeMonthValue`, `DateRangeAnyDateValue`, `DateRangeNoDateValue` (`node_modules/@moysklad/uikit/dist/components/DateRange/types.d.ts:9-32`).
- Флаги возможностей, все по умолчанию `true` (`node_modules/@moysklad/uikit/dist/components/DateRange/types.d.ts:112-124`): `withPeriod`, `withAnyDate`, `withNoDate`, `withTimeSelection`, `withClearButton`; `quickFilter` по умолчанию `['yesterday','today']` (`node_modules/@moysklad/uikit/dist/components/DateRange/types.d.ts:3,123`). Ограничения: `minDate`, `maxDate`, `requiredDate` (`node_modules/@moysklad/uikit/dist/components/DateRange/props.d.ts:26-27,36`).
- Внешний вид: `renderInput` заменяет поле своим элементом (`node_modules/@moysklad/uikit/dist/components/DateRange/props.d.ts:6-22,31`), `dropdownZIndex`, `hintZIndex` (по умолчанию 3, `node_modules/@moysklad/uikit/dist/components/DateRange/props.d.ts:32-35`). Остальное из пропов триггера: `error`, `disabled`, `name`, `actions`, `staticActions` (`node_modules/@moysklad/uikit/dist/components/DateRange/DateRangeDefaultTrigger/DateRangeDefaultTrigger.d.ts:14-28`).
- Локаль: берётся из `LocaleContext` (`lang`/`locale`), по умолчанию русская; провайдер не обязателен, но им можно переключить на `en-US` и переопределить тексты (`node_modules/@moysklad/uikit/dist/components/DateRange/locale/useLocale.js:11-29`, `node_modules/@moysklad/uikit/dist/context/contexts/LocaleContext.js:4-8`).
- Оверлей: да, `Dropdown` со списком вариантов периода и календарями (`node_modules/@moysklad/uikit/dist/components/DateRange/DateRange.js:14-42`).
- Группа: Forms (рядом с `Datepicker`).
- Показать в истории: да. Варианты: каждый из шести `type` как начальное значение; ограниченные `minDate`/`maxDate`; выключенные флаги (`withPeriod={false}` и др.); `quickFilter`; английская локаль через `LocaleContextProvider`; `error`; `disabled`; кастомный `renderInput`. Крупный интерактивный компонент, нужен браузерный прогон на открытие выпадашки.

### FieldLabel

- Вход: только подпуть `@moysklad/uikit/components/FieldLabel` (`node_modules/@moysklad/uikit/package.json:150-153` → `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.d.ts`). В главном входе отсутствует (`node_modules/@moysklad/uikit/dist/index.d.ts`, нет строк про FieldLabel).
- Обязательные пропы: нет формально, но без `label` компонент возвращает `null` (`node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.js:25`; типы `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.d.ts:5-14`).
- Пропы: `label`, `required` (звёздочка, `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.js:61-67`), `variant` и `colorToken` (из `TextProps`; по умолчанию `body` и `primary`; `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.js:13`), `helpProps` (`popup` включает кнопку помощи; `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.js:70-78`), `helpSize` (по умолчанию `HelpSize.M`), `htmlFor` (переключает тег на `label`, иначе `span`; `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.js:49`), `labelRef`, `onOverflowChange`, `className`, `helpButtonClassName`, `testId`.
- При переполнении текста показывается подсказка с полным текстом (`node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.js:26-29,37-46`).
- Controlled-пар нет. Провайдеры не нужны. Оверлей: подсказка (`Hint`) при переполнении и поповер `Help` по кнопке.
- Группа: Forms (рядом с `Label` и `FieldRow`). Требуется реэкспорт в `.design-sync/extra-exports.ts`.
- Показать в истории: да. Варианты: обычный, `required`, с `helpProps`, узкий контейнер с обрезкой и подсказкой, разные `variant`/`colorToken`, `helpSize`, `htmlFor` с полем.

### Panel

- Вход: только подпуть `@moysklad/uikit/components/Panel` (`node_modules/@moysklad/uikit/package.json:290-293` → `node_modules/@moysklad/uikit/dist/components/Panel/Panel.d.ts`). В главном входе отсутствует.
- Обязательные пропы: `items: PanelItem[]`, где `PanelItem = { id: Key; element: ReactNode; width: number }` (`node_modules/@moysklad/uikit/dist/components/Panel/Panel.d.ts:3-9`). `width` указывается в колонках сетки, округляется и обрезается до `columnsCount` (`node_modules/@moysklad/uikit/dist/components/Panel/Panel.js:13-15`).
- Прочее: `columnsCount` (по умолчанию 6, максимум 40; `node_modules/@moysklad/uikit/dist/components/Panel/Panel.d.ts:10-15`, `node_modules/@moysklad/uikit/dist/components/Panel/Panel.js:5-6`), `rowGap` (12), `columnGap` (20), `minRowHeight` (38) (`node_modules/@moysklad/uikit/dist/components/Panel/Panel.d.ts:16-27`, `node_modules/@moysklad/uikit/dist/components/Panel/Panel.js:5`). Расширяет `HTMLAttributes<HTMLDivElement>`, `forwardRef` на `div`.
- Статический член `Panel.EmptyItem` для пустых ячеек (`node_modules/@moysklad/uikit/dist/components/Panel/Panel.d.ts:30-33`, `node_modules/@moysklad/uikit/dist/components/Panel/Panel.js:34-38`).
- Реализация: CSS-grid, `grid-template-columns: repeat(N, minmax(50px, 1fr))` (`node_modules/@moysklad/uikit/dist/components/Panel/Panel_module.css:6`), ячейка `overflow: hidden` (`node_modules/@moysklad/uikit/dist/components/Panel/Panel_module.css:12-16`).
- Controlled-пар нет. Провайдеры не нужны. Оверлей не открывает.
- Группа: Containers. Требуется реэкспорт в `.design-sync/extra-exports.ts`.
- Показать в истории: да. Варианты: сетка из `LabelValue*` разной ширины (`width` 1, 2, 3), смена `columnsCount` (например 3 и 6), `rowGap`/`columnGap`, `Panel.EmptyItem`, `width` больше `columnsCount` (обрезается). Хорошо сочетается с `BentoBlock` и `Layout`.

## Витрина использует устаревшее

Метод: из `node_modules/@moysklad/uikit/dist/**/*.d.ts` собран полный список `@deprecated` (54 строки; сравнён с 49 строками в `uikit-28/package/dist/`), затем `rg` по `src/` (catalog, demos, tokens, `*.mdx` и `.storybook/`) по именам компонентов и пропов. Полный список — в журнале `run/journal/T3a.md`.

Находки:

| Где в витрине | Что устарело | Чем заменить |
|---|---|---|
| `src/stories/catalog/Label.stories.tsx:4,21,25` | компонент `Label` из `@moysklad/uikit/components/Label` (`node_modules/@moysklad/uikit/dist/components/Label/Label.d.ts:9`) | `FieldLabel` из `@moysklad/uikit/components/FieldLabel` (`node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.d.ts:15`); пропсы `label`, `required` совместимы |
| `src/stories/catalog/FieldRow.stories.tsx:4,21,25` | то же, `Label` внутри демонстрации `FieldRow` | то же, `FieldLabel` |

Ничего больше не найдено. Проверено, что в `src/` нет:

- импортов и использований устаревших компонентов `Switch`, `Header`, `Typography`, `BodyL`, `BodyText`, `BodyTextStrong`, `BodyXL`, `Caption`, `H1`…`H4` (`rg -n "\b(Switch|Header|Typography|BodyL|BodyTextStrong|BodyText|BodyXL|Caption|H1|H2|H3|H4)\b"` по импортам — пусто);
- устаревших пропов Textfield (`help`, `actionsBar`, `onClear`), Input/InputUnit (`helpComponent`), Multiselect/Select (`helperText`), Chip (`isActive`, `onClick`, `children`, `icon`, `iconPosition`, `small`, `isTextEllipsis`, `bodyTextClassName`, `overrideActiveClass`), Checkbox/Radiobutton/Toggle (`help`, `children`, `disableRemoveAllSelectionRanges`), AutoComplete (`name`, `value` на самом компоненте — в `src/stories/catalog/AutoComplete.stories.tsx:32-52` они стоят на `Input` внутри `renderInput`), FileUploader (`onDelete`), `LabelValue` (`needShowLabelTooltip`), `data-grid` (`initialFiltersDisplayState`, `isActive` у `DropdownArrowBtn`, `isScrollToDropdownDisabled`, `rowSelection`/`columnVisibility`/`fillContainerSpace` как пропы `Table`).

Совпадения `rg` по именам, которые не являются устаревшим использованием:

- `clearable`/`onClear` в `src/stories/catalog/Select.stories.tsx:33-34`, `src/stories/demos/ProductCard.stories.tsx:93-94` (у `Select`), `src/stories/catalog/Input.stories.tsx:27-28`, `src/stories/tokens/Icons.stories.tsx:30-32` (у `Input`), `src/stories/catalog/Chip.stories.tsx:45-46` (у `Chip` с новым API): у этих компонентов пропы не устарели (`node_modules/@moysklad/uikit/dist/components/Input/Input.d.ts:13-14`, `node_modules/@moysklad/uikit/dist/components/Select/Select.d.ts:39`, `node_modules/@moysklad/uikit/dist/components/Chip/Chip.types.d.ts:86-87`). Устарел только `onClear` у `Textfield`, а `Textfield` в витрине без него (`src/stories/catalog/Textfield.stories.tsx:18-25`, `src/stories/demos/ProductCard.stories.tsx:98`).
- `isArchived` в `src/stories/demos/DataGridTable.stories.tsx:84,97` — проп `TextCell` из `data-grid`, не `Select`.
- `fullWidth` в `src/stories/catalog/SearchInput.stories.tsx:21`, `src/stories/demos/ProductList.stories.tsx:71` — проп `SearchInput`, не `Table`.

Дополнительно по видимому (не `@deprecated`, но влияет на истории):

- `Select.isArchived` переименован в `showArchived` — в `src/` не используется.
- Текст по умолчанию «Все элементы» в Multiselect сменился на «Выбрать все» — в `src/` этот текст не встречается (проверено `rg -n "Все элементы" src` — пусто).

## Info и Informer

Вывод: `Info` не помечен `@deprecated`, поэтому по правилу из `00-context.md` оба компонента остаются.

- `Info` лежит в `node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.d.ts:3-12`; в `node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.d.ts` нет `@deprecated` (`rg deprecated` по этому файлу и по `node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts` пусто; в общем списке пометок `Info` тоже нет) и в `node_modules/@moysklad/uikit/dist/index.d.ts` он не экспортируется (подпуть `@moysklad/uikit/components/Info` ведёт на `_shared`: `node_modules/@moysklad/uikit/package.json:202-205`). Витрина импортирует его именно оттуда (`src/stories/catalog/Info.stories.tsx:2`) — путь продолжает работать.
- Изменения `Info`: новый проп `size?: 'm' | 'l'` (`node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.d.ts:10`, значения — `node_modules/@moysklad/uikit/dist/components/_shared/Info/types/index.d.ts:2-5`, по умолчанию `m`, `node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.js:9`; размер выбирает вариант текста: `m` — caption, `l` — body, `node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.js:20`); компонент стал `forwardRef<HTMLElement>` (`node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.d.ts:12`; в 28.1.0 — функция с `displayName`, `uikit-28/package/dist/components/Info/Info.d.ts:10-13`). Показать в истории: да — добавить в историю `Info` вариант `size="l"`.
- `Informer` — новый компонент, в главном входе (`node_modules/@moysklad/uikit/dist/index.d.ts:37`): информационный блок для контекста экрана, `description` обязателен, `title`, `variant: 'blue' | 'green' | 'red'`, `renderTitle`, `className` (`node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:30-36`, значения `node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:3-8`), без кнопок и закрытия (`node_modules/@moysklad/uikit/dist/components/Informer/Informer.d.ts:13-29`). Это разные компоненты: `Info` — подпись под полем, `Informer` — блок на экране. Подробности для истории `Informer` — в части B.
- Решение для витрины и выгрузки: оставить и `Info`, и `Informer`; не удалять историю `Info`. Если в версии новее `Info` получит `@deprecated`, правило из контекста — убрать его, как ранее `Switch`.

## Только через подпуть

Сверка: ключи `exports` вида `./components/<Name>` (84 штуки, `node_modules/@moysklad/uikit/package.json:54` и далее) минус компоненты, экспортируемые из `node_modules/@moysklad/uikit/dist/index.d.ts` (75 имён), дают 9 имён. Остальные `exports`-ключи: `.`, `./data-grid`, `./icon`, `./colorVariables.css` (`node_modules/@moysklad/uikit/package.json:39-53`). Каталог `node_modules/@moysklad/uikit/dist/components/_shared` содержит служебные папки (`FieldLabel`, `FieldRow`, `Info`, `InputClear` и др.), прямых подпутей к ним нет, кроме перечисленных.

| Компонент | Ключ в `exports` | Файл типов | Статус относительно 28.1.0 |
| --- | --- | --- | --- |
| FieldLabel | `node_modules/@moysklad/uikit/package.json:150` | `node_modules/@moysklad/uikit/dist/components/_shared/FieldLabel/FieldLabel.d.ts` | новый |
| FieldRow | `node_modules/@moysklad/uikit/package.json:154` | `node_modules/@moysklad/uikit/dist/components/_shared/FieldRow/FieldRow.d.ts` | был подпутевым, файл переехал в `_shared` |
| ImagePreview | `node_modules/@moysklad/uikit/package.json:194` | `node_modules/@moysklad/uikit/dist/components/ImagePreview/ImagePreview.d.ts` | без изменений |
| Indicator | `node_modules/@moysklad/uikit/package.json:198` | `node_modules/@moysklad/uikit/dist/components/Indicator/Indicator.d.ts` | без изменений |
| Info | `node_modules/@moysklad/uikit/package.json:202` | `node_modules/@moysklad/uikit/dist/components/_shared/Info/Info.d.ts` | был подпутевым, файл переехал в `_shared` |
| InputClear | `node_modules/@moysklad/uikit/package.json:214` | `node_modules/@moysklad/uikit/dist/components/_shared/InputClear/InputClear.d.ts` | был подпутевым, файл переехал в `_shared` |
| Label | `node_modules/@moysklad/uikit/package.json:222` | `node_modules/@moysklad/uikit/dist/components/Label/Label.d.ts` | без изменений |
| LabelValue | `node_modules/@moysklad/uikit/package.json:226` | `node_modules/@moysklad/uikit/dist/components/LabelValue/LabelValue.d.ts` | без изменений |
| Panel | `node_modules/@moysklad/uikit/package.json:290` | `node_modules/@moysklad/uikit/dist/components/Panel/Panel.d.ts` | новый |

Для N5 (`.design-sync/extra-exports.ts`):
- Сейчас там реэкспортированы шесть: FieldRow, ImagePreview, Indicator, Info, Label, LabelValue (`.design-sync/extra-exports.ts:6-11`). Не хватает `FieldLabel`, `Panel` (новые) и `InputClear` (подпутевой уже в 28.1.0, но в файле его не было; у `InputClear` нет истории, поэтому добавлять ли его, решает N5).
- В 28.1.0 подпутевых было семь: FieldRow, ImagePreview, Indicator, Info, InputClear, Label, LabelValue (сверка по `uikit-28/package/dist/index.d.ts` и `exports` старого `package.json`).
- `DateRange` в списке нет: он в главном входе (`node_modules/@moysklad/uikit/dist/index.d.ts:21`).
- Если `Info` будет убран из витрины (см. часть A, раздел «Info и Informer»), его строку в `extra-exports.ts` тоже надо убрать.

## Токены

Файл: `node_modules/@moysklad/uikit/dist/colorVariables.css` (207 строк, 178 переменных) против `uikit-28/package/dist/colorVariables.css` (175 строк, 156 переменных). Структура слоёв `@layer lognex > theme > …`: в 28.1.0 слоёв `basic`, `ms`, `status` (`uikit-28/package/dist/colorVariables.css:3,55,137`); в 31.20.0 к ним добавились `gwt-status` (`node_modules/@moysklad/uikit/dist/colorVariables.css:176`) и `viewers-stack` (`node_modules/@moysklad/uikit/dist/colorVariables.css:197`); начала старых слоёв `basic`, `ms`, `status` сместились на строки 3, 56, 139 (`node_modules/@moysklad/uikit/dist/colorVariables.css:3,56,139`). Значения всех общих переменных не изменились (сверено разбором обоих файлов: 0 изменённых, 1 удалена, 23 добавлено; 156 − 1 + 23 = 178).

Удалено (1):
- `--elements-disabled` (слой `ms`), значение было `var(--dark-grey-grey-500)` (`uikit-28/package/dist/colorVariables.css:86`). В 28.1.0 использовался только в data-grid с запасным значением: `var(--elements-disabled, #9fa7af)` (`uikit-28/package/dist/data-grid/cells/ImageCell/ImageMiniature/ImageMiniature_module.css:39`). В 31.20.0 ни один `.css` пакета на него не ссылается (поиск `grep -rn elements-disabled D --include=*.css` пуст). Витрина перечисляет его в `src/stories/tokens/Colors.stories.tsx:83` — строку надо убрать. Соседние `--elements-disable` и `--elements-inactive` остались (`uikit-28/package/dist/colorVariables.css:85,87`, в новом файле на тех же позициях со сдвигом).

Добавлено в существующие слои (3):
- `--light-blue-50: #dff0fe` (слой `basic`; `node_modules/@moysklad/uikit/dist/colorVariables.css:21`).
- `--bgd-accent: var(--light-blue-50)` (слой `ms`; `node_modules/@moysklad/uikit/dist/colorVariables.css:69`). В `.css` пакета не используется (только определение), то есть токен для потребителей.
- `--border-focused: var(--dark-grey-dark-900)` (слой `ms`; `node_modules/@moysklad/uikit/dist/colorVariables.css:82`). Используется как цвет рамки фокуса в Input, Textfield, Chip, EditableDate, DateRange (например `node_modules/@moysklad/uikit/dist/components/Input/Input_module.css:49`, `node_modules/@moysklad/uikit/dist/components/EditableDate/EditableDate_module.css:23`).

Добавлено в новый слой `gwt-status` (16, `node_modules/@moysklad/uikit/dist/colorVariables.css:176-195`; используются `StatusBadge`: `node_modules/@moysklad/uikit/dist/components/StatusBadge/StatusBadge_module.css:3`):
- `--gwt-statuses-grey: #999` (`:178`)
- `--gwt-statuses-red: #e92919` (`:179`)
- `--gwt-statuses-orange: #e68116` (`:180`)
- `--gwt-statuses-brown: #694b1e` (`:181`)
- `--gwt-statuses-yellow-green: #bdae00` (`:182`)
- `--gwt-statuses-lime-green: #a2c617` (`:183`)
- `--gwt-statuses-mint-green: #86aa60` (`:184`)
- `--gwt-statuses-green: #008739` (`:185`)
- `--gwt-statuses-sky-blue: #85c6de` (`:186`)
- `--gwt-statuses-blue: #009fe3` (`:187`)
- `--gwt-statuses-dusty-blue: #427081` (`:188`)
- `--gwt-statuses-dark-blue: #00499a` (`:189`)
- `--gwt-statuses-pink: #ec619f` (`:190`)
- `--gwt-statuses-violet: #a466bd` (`:191`)
- `--gwt-statuses-dark-red: #8d1430` (`:192`)
- `--gwt-statuses-black: #000` (`:193`)

Эти шестнадцать соответствуют цветам `StatusColor` кроме `empty` (`node_modules/@moysklad/uikit/dist/components/StatusBadge/utils/StatusBadgeColor.d.ts:2-20`); цвет `empty` токена не имеет.

Добавлено в новый слой `viewers-stack` (4, `node_modules/@moysklad/uikit/dist/colorVariables.css:197-`; используются аватаром `ViewersStack`: `node_modules/@moysklad/uikit/dist/components/ViewersStack/components/Avatar/Avatar_module.css:21,25,29`):
- `--viewers-stack-green: #bae86b` (`:199`)
- `--viewers-stack-yellow: #ffcc71` (`:200`)
- `--viewers-stack-pink: #ffcad0` (`:201`)
- `--viewers-stack-violet: #b9aaff` (`:202`)

Показать в истории токенов (`src/stories/tokens/Colors.stories.tsx`): да. Убрать `--elements-disabled`; добавить `--light-blue-50`, `--bgd-accent`, `--border-focused` в соответствующие группы; решить, показывать ли слои `gwt-status` и `viewers-stack` (цвета статусов нужны дизайн-агенту для `StatusBadge`, поэтому рекомендуется показать).
