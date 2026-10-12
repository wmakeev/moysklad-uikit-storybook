# Компоненты @moysklad/uikit: нюансы API

Сверено с 31.20.0. Здесь только то, что неочевидно из типов: обязательные связки пропов, ловушки рантайма, канонический вариант API. Полный список пропов — `dist/components/<Name>/<Name>.d.ts`. «Подпуть» — импорт из `@moysklad/uikit/components/<Name>`; без пометки компонент в главном входе.

Общее для всех: состояние controlled через `useState`; пропы с `@deprecated` заменять указанным в пометке; `helpProps` пришёл на смену `help` и `helpComponent` у полей ввода.

## Actions

- **Button** — `variant` (`primary | accent | additional | frameless | secondary | filled`), `size` (`m | l | xl`), `isIconButton`, `isLoading`, `stretch`. Полиморфный: `as="a"` с `href` даёт кнопку-ссылку. `noPadding` действует только с `variant="frameless"`.
- **Chip** — только новое API: `label`, `selected`, `onSelectedChange` (необязателен — тогда чип неинтерактивный), `variant` (`regular | warning | critical`), `clearable` + `onClear`, `labelColorToken` — цвет подписи. Legacy-набор (`isActive`, `onClick`, `children`) — `@deprecated`.
- **SegmentButton** — compound: `SegmentButton.Group` (`value`, `onChange`) + `SegmentButton` (`value`). Замена deprecated `Switch`.
- **Toggle** — `onChange` обязателен, неуправляемого режима нет.

## Containers

- **BentoBlock** — карточка-блок. `paddingVariant` (`p12 | p16 | p20`, по умолчанию `p20`), `as` (`div | section | article | aside | header | footer | nav`). `className` и `style` уходят во внутренний scroll-контейнер, не на рамку; рамку стилизует `containerClassName`.
- **Carousel** — полноэкранный просмотрщик: `sources: string[]`, `isVisible`, `onClose`.
- **HStack / VStack** — `size` от `s0` до `s40` (шаг 4px), полиморфные через `as`.
- **ImagePreview** — подпуть.
- **Layout** — каркас страницы со слотами `header`, `contentHeader`, `aside`, `content`; флаги `fullWidth`, `stickyContentHeader`, `showLargePaddingBottom`, `bgColor="white"`. Корень имеет `min-width: 1200px` и `min-height: 100dvh` — занимает весь экран; внутрь карточек и модалок не вкладывать. `contentHeader` и `aside` рендерятся, только если переданы.
- **Listing** — `current`, `total`, `onPrev`, `onNext`, `isPrevDisabled`, `isNextDisabled`.
- **Panel** — подпуть. Сетка полей: `items: { id, element, width }[]`, `width` в колонках; `columnsCount` (по умолчанию 6, максимум 40), `rowGap` 12, `columnGap` 20, `minRowHeight` 38. `Panel.EmptyItem` — пустая ячейка. Хорошо собирается с `LabelValue*` внутри `BentoBlock`.

## Fields (LabelValue*)

Пара «подпись — значение» с редактированием по клику. У всех обязателен `label: string`; общие `required`, `disabled`, `error`, `helpPopupContent`.

- **LabelValue** — подпуть. `valueVariant: 'link'` показывает значение ссылкой (константа варианта из главного входа не экспортируется — передавать строкой).
- **LabelValueCheckbox** — `checked` + `onChange` (или `defaultChecked`), `indeterminate`.
- **LabelValueDate** — обязательны `value` и `onChange` (это `selectedDate` и `onDateChanged` из Datepicker); часть пропов Datepicker пробрасывается (`showTime`, `presets`, `dateTimeFormatOptions`).
- **LabelValueInput**, **LabelValueTextfield** — обязателен `name`; `value` + `onChange`.
- **LabelValueFile** — обязательны `label` и `fileUploader` из хука `useFileUploader()`; состояние живёт в хуке, своих `value`/`onChange` нет. Показывает только первый файл. Клик по пустому открывает выбор, по заполненному скачивает. Заполненное состояние программно — через `setFiles` хука.
- **LabelValueLink** — обязательны `label`, `name`; `value` + `onChange`. Без протокола подставляет `https://`. Тип пропов не экспортируется, совпадает с `LabelValueInputProps`.
- **LabelValueSelect** — архивное значение флагом `isArchived` (у самого `Select` он называется `showArchived`).

## Forms

- **AutoComplete** — `renderInput` обязателен, и его `ref` **обязательно** привязать к `input`: это якорь выпадашки, без него краш `Cannot read properties of null (reading 'getBoundingClientRect')`. Дженерик ref не выводится → `ref as Ref<HTMLInputElement>`. `onChange` вызывается без аргументов. `options` — массив или `null`. `renderDropdownActions` — кнопки под списком.
- **Checkbox / Radiobutton** — `onChange(e)`, `e.target` приводить к `HTMLInputElement`.
- **Datepicker** — обязательны `lang` (`ELanguages.RU`), `localeFormat`, `selectedDate`, `onDateChanged(date, options)`. **`localeFormat` — BCP-47-локаль для `Intl.DateTimeFormat` (`'ru-RU'`), а не шаблон формата**: `'dd.MM.yyyy'` даёт `RangeError: Invalid language tag`. Формат вывода — `dateTimeFormatOptions`. С `showTime` полезен `nullableValueWhenTimeIncomplete`.
- **DateRange** — выбор периода. `value: { type, value }` + `onChange`, `type` из `period | day | week | month | anyDate | noDate`; типы значений и хелперы периодов в главном входе. `label` по типу необязателен, но задавать всегда. Флаги `withPeriod`, `withAnyDate`, `withNoDate`, `withTimeSelection`, `withClearButton` (все по умолчанию `true`), `quickFilter` (по умолчанию `['yesterday','today']`), `minDate`, `maxDate`. Язык — из `LocaleContext`, по умолчанию русский.
- **EditableDate** — дата-текст «от 15.06.2026 14:30» с календарём по клику. Пропы `Datepicker` (те же `localeFormat`, `lang`, `selectedDate`, `onDateChanged`), но `selectedDate` без `null`; `prefix` (по умолчанию «от»), `iconPosition`. `showTime`, `inline`, `frameless` и подобные выставляет сам — передать их нельзя.
- **EditableTitle** — редактируемый заголовок, `prefix`, `onToggle(isEdit)`.
- **FieldLabel** — подпуть. Подпись поля, замена deprecated `Label`. `label` — строка (у `Label` был `ReactNode`); без `label` возвращает `null`. `required`, `helpProps` (с `popup` появляется кнопка помощи), `helpSize`, `variant` и `colorToken` как у `Text`, `htmlFor` превращает в `<label>`. Длинный текст обрезается с подсказкой.
- **FieldRow** — подпуть.
- **FileUploader** — хук `useFileUploader()` → `{ files, invalidFiles, loadingFiles, removeFile, open, getInputProps, setFiles, ... }`; `FileUploader.Trigger {...uploader}` — dropzone, `FileUploader` — список (`files`, `onDeleteFile`; `onDelete` устарел).
- **Info** — подпуть. Подпись-пояснение под полем, `size: 'm' | 'l'`. Не путать с `Informer`.
- **Input** — `inputSize: 'M' | 'L'`, `showCounterLimit`, кнопки действий `textActionIcon` + `onTextActionClick` и `trailingActionIcon` + `onTrailingActionClick`.
- **InputClear** — подпуть, служебный.
- **InputUnit** — `value: number`, `onChangeValue`, `unitOptions`, `selectedUnitOption`, `onUnitChange` (опции `ISelectOption`).
- **MentionsTextfield** — `value: TMentionValue` (`{ raw, backend, mentionsMap }`), `items`, `trigger="@"`, `onChange(value)`. Наследует изменения `Textfield`: `size`, `resizeTop`, `resizeBottom`; `clearable`/`onClear` убраны.
- **Multiselect** — `<Multiselect<T>>`: `items: { value, label }[]`, `values: T[]`, `onChange(values)`, `getOtherText(n)`. С `showSelectAllCheckbox` и всеми выбранными показывает чип «Выбраны все» (`allSelectedChipTextVariant: 'full' | 'short'`).
- **Quantity** — `value: number`, `onChange(e | null, value)`.
- **Select** — `value` — **опция целиком** (`ISelectOption<T>`), не raw-значение; `onChange(option)`, `options`. Архивное значение — `showArchived` (было `isArchived`) + `inputHintText`.
- **Textfield** — **без `value` рисует строку «undefined»** — всегда `value` + `onChange`. `size: 'm' | 'l'`, `limit`, `showCounterLimit`, `autoVerticalResize`, `resizeTop`/`resizeBottom`. Кнопки в поле: `onMainBtnClick`, `onEmojiBtnClick`, `isFileBtnVisible`; для кнопки файла нужен `fileUploaderProps` с `handleOpen` и `getInputProps` из `useFileUploader`. `clearable` удалён, `actionsBar`, `onClear`, `help` — deprecated.

## Navigation

- **Breadcrumbs** — compound `Breadcrumbs` + `Breadcrumbs.Item` (проп `items` не существует). `charLimitThreshold` (по умолчанию 40) обрезает длинный элемент с подсказкой.
- **Link** — полиморфный: `as: 'a' | 'button'`, `disabled`.
- **SideMenu** — `items: { id, label }[]`, `selectedId`, `onSelect`.
- **Tabs** — compound `Tabs` (`value`, `onChange`) + `Tabs.Item`.
- **VerticalTab** — `VerticalTabGroup` (`value`, `onChange`) + `VerticalTab` (`title`, `value`, `icon`, `counter`, `titleDot`, `isDisabled`).

## Overlays

Оверлеи открываются controlled-флагом; закрытый оверлей рендерит только триггер. Проверять в браузере в открытом состоянии.

- **BottomSheet** — требует `<BottomSheetContextProvider>`: порталится в его `root`, без провайдера молча не открывается.
- **Dropdown** — `triggerRef: RefObject<HTMLElement>`, `open`, `onClose(reason?)`, `maxHeight`; `DropdownDivider` — отдельный экспорт.
- **Help** — `popup`, `size: 's' | 'm' | 'l'`, `disabled`. Проп `icon` удалён в 31.x.
- **Hint** — `variant` (`standard | alert`), `placement`, `overlay`.
- **Modal** — `isVisible` + `onClose`; compound `Modal.Header`, `Modal.Body`, `Modal.Footer`.
- **OverlayActions** — `actions: { id, title, icon: ComponentType, onClick }[]`, оборачивает `children`.
- **Sidepage** — `isOpen` + `onClose`; части — отдельные экспорты `SidepageHeader`, `SidepageContent`, `SidepageFooter`.
- **Snackbar** — провайдер на корне; показ — `useSnackbar().showSnackbar({ message })` внутри дерева.
- **Tooltip** — **обязательны** `placement` (enum `Placement`) и `offset: [number, number]`; `colorToken: 'light' | 'dark'`.

## Status

- **Badge**, **Banner**, **Counter**, **Dot**, **Progressbar**, **Skeleton**, **Spinner** — статичные, без ловушек.
- **EmptyState** — слоты: `imageSlot` (`EmptyState.Image` с `source`, `alt`), `actionsSlot` (`EmptyState.Actions` + `EmptyState.Button` — это обычный Button).
- **EmptyStateLarge** — своя `EmptyStateLarge.Button` с `variant: 'blue' | 'green'` (не Button из кита!), `.Actions` (`leftButtonSlot`, `rightButtonSlot`), `.Links`/`.Link`, `.Image`.
- **Indicator** — подпуть. `indicator: { mode: 'count' | 'countDot' | 'noveltyDot' | 'noveltyNumber', count? }`.
- **Informer** — информационный блок на экране: `description` обязателен, `title`, `variant: 'blue' | 'green' | 'red'`, `renderTitle`. Без кнопок и закрытия; закрываемый вариант — `Banner`.
- **StatusBadge** — бейдж статуса документа с выпадашкой выбора. Обязательны `title` и `availableStatuses: { label, value, color, dto? }[]`; `value` + `onSelect(option)`. `color` из `StatusColor` (17 значений, без `value` — `empty`), рисуется токенами `--gwt-statuses-*`. Размер `StatusBadgeSize.Comfortable | Compact`; кнопка внизу списка — `dropdownButtonText` + `onDropdownButtonClick`.
- **ViewersStack** — аватары смотрящих: `viewers: { id, label, image? }[]` (пустой массив → `null`), `maxVisibleCount` (по умолчанию 3; при переполнении — счётчик), `label`, `animated`. Цвет аватара без картинки выбирается по `id`.

## Typography

- **Text** — `variant` (`body | bodyL | bodyStrong | bodyXL | caption | heading1..4`), `color` из `TextColor`; шорткаты `Text.H1..H4`, `Text.Body`, `Text.Caption`. Замена deprecated `Header` и `Typography`. При переборе вариантов из массива `string[]` нужен `@ts-expect-error` на `variant`; `Object.values(TextColor)` тип сохраняет.

## Дженерики со «слабым» ограничением

Если дженерик ограничен типом только с необязательными полями (как `WithRowClickLink` у data-grid `Table`): тип-аргумент обязан иметь хотя бы одно общее поле (иначе `TS2559`), а в TSX вывод дженерика ломается — фиксировать instantiation-выражением `const X = Comp<T>;` и рендерить `<X />`.
