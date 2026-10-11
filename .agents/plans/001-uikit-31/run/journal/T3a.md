# Журнал T3a

Задача: часть A сводки API (24 компонентных раздела, «Витрина использует устаревшее», «Info и Informer»). Результат: `.agents/plans/001-uikit-31/api-changes.part-a.md`.

## Команды и результаты

- `npm pack @moysklad/uikit@28.1.0` в `/tmp/orch-001/T3a/old` → распаковано в `/tmp/orch-001/T3a/old/package/dist` (папки `/tmp/orch-001/uikit-28` на момент запуска не было).
- Скрипты (в `/tmp/orch-001/T3a/`): `d.sh` — построчный diff двух `.d.ts` с номерами строк (`-N` старые, `+N` новые, CRLF срезан); `dc.sh <Dir>` — diff всех общих `.d.ts` каталога плюс списки добавленных и удалённых файлов; `dep.sh` — список `@deprecated` с следующей декларацией.
- Разделы получены по `dc.sh` для: Multiselect, Select, Chip, LabelValue, Breadcrumbs, Link, Input, Tooltip, EditableTitle, InputUnit, Button, LabelValueSelect, AutoComplete, Dropdown, MentionsTextfield, LabelValueInput, Datepicker, FileUploader, EmptyState, Checkbox, Label; Textfield и Help — чтением файлов целиком; data-grid — `comm` по спискам `.d.ts` и `d.sh` по 40 изменённым файлам.
- JS-проверка видимых отличий: для Chip, Datepicker, FileUploader, Checkbox, Dropdown, LabelValueSelect, MentionsTextfield, AutoComplete снят `diff` `.js`; для Textfield, Button, Link, Tooltip, Help, Breadcrumbs, EditableTitle, Select, LabelValue прочитаны ключевые строки `.js` (в отчёте даны номера).

## Результат сравнения @deprecated (весь dist)

`diff dep-old.txt dep-new.txt` (49 строк в старой, 54 в новой):

Новые пометки: Input.helpComponent, InputUnit.helpComponent, Label (целиком), LabelValue/types.d.ts needShowLabelTooltip, Textfield.help, Textfield.actionsBar, Textfield.onClear, data-grid HeaderBuilder.isScrollToDropdownDisabled, data-grid Dropdown (компонент).

Исчезли вместе с удалёнными строками: data-grid Table rowSelection, columnVisibility, fillContainerSpace, fullWidth (последний остался как проп без пометки).

Chip, Checkbox, AutoComplete в списках различий не появились, то есть новых пометок у них нет (в `00-context.md` утверждается обратное).

## Список @deprecated в 31.20.0 (по файлам)

- components/AutoComplete/AutoComplete.d.ts :: name?: string;
- components/AutoComplete/AutoComplete.d.ts :: value?: string;
- components/BodyL/BodyL.d.ts :: export type BodyLProps = TypographyProps<HTMLElement>;
- components/BodyL/BodyL.d.ts :: export declare const BodyL: import("react").ForwardRefExoticComponent<Omit<BodyLProps, "ref"> & import("react").RefAttributes<HTMLParagraphE
- components/BodyText/BodyText.d.ts :: export type BodyTextProps = TypographyProps<HTMLElement>;
- components/BodyText/BodyText.d.ts :: export declare const BodyText: import("react").ForwardRefExoticComponent<Omit<BodyTextProps, "ref"> & import("react").RefAttributes<HT
- components/BodyTextStrong/BodyTextStrong.d.ts :: export type BodyTextStrongProps = TypographyProps<HTMLElement>;
- components/BodyTextStrong/BodyTextStrong.d.ts :: export declare const BodyTextStrong: import("react").ForwardRefExoticComponent<Omit<BodyTextStrongProps, "ref"> & import("
- components/BodyXL/BodyXL.d.ts :: export type BodyXLProps = TypographyProps<HTMLElement>;
- components/BodyXL/BodyXL.d.ts :: export declare const BodyXL: import("react").ForwardRefExoticComponent<Omit<BodyXLProps, "ref"> & import("react").RefAttributes<HTMLParagr
- components/Caption/Caption.d.ts :: export type CaptionProps = TypographyProps<HTMLElement>;
- components/Caption/Caption.d.ts :: export declare const Caption: import("react").ForwardRefExoticComponent<Omit<CaptionProps, "ref"> & import("react").RefAttributes<HTMLSp
- components/Checkbox/Checkbox.types.d.ts :: help?: ReactElement 
- components/Checkbox/Checkbox.types.d.ts :: children?: ReactNode;
- components/Checkbox/Checkbox.types.d.ts :: disableRemoveAllSelectionRanges?: boolean;
- components/Chip/Chip.types.d.ts :: children: ReactNode 
- components/Chip/Chip.types.d.ts :: iconPosition?: 'end' 
- components/Chip/Chip.types.d.ts :: icon?: ReactNode;
- components/Chip/Chip.types.d.ts :: onClick: (isActive: boolean) => void;
- components/Chip/Chip.types.d.ts :: isActive: boolean;
- components/Chip/Chip.types.d.ts :: small?: boolean;
- components/Chip/Chip.types.d.ts :: isTextEllipsis?: boolean;
- components/Chip/Chip.types.d.ts :: bodyTextClassName?: string;
- components/Chip/Chip.types.d.ts :: overrideActiveClass?: HTMLAttributes<HTMLButtonElement>['className'];
- components/FileUploader/FileUploader.types.d.ts :: onDelete?: (idx: number) => void;
- components/H1/H1.d.ts :: export declare const H1: import("react").ForwardRefExoticComponent<Omit<H1Props, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
- components/H2/H2.d.ts :: export declare const H2: import("react").ForwardRefExoticComponent<Omit<H2Props, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
- components/H3/H3.d.ts :: export declare const H3: import("react").ForwardRefExoticComponent<Omit<H3Props, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
- components/H4/H4.d.ts :: export declare const H4: import("react").ForwardRefExoticComponent<Omit<H4Props, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
- components/Header/Header.d.ts :: export type HeaderProps = TypographyProps<HTMLElement>;
- components/Header/Header.d.ts :: export declare const Header: import("react").ForwardRefExoticComponent<Omit<HeaderProps, "ref"> & import("react").RefAttributes<HTMLHeadin
- components/Input/Input.d.ts :: helpComponent?: ReactNode;
- components/InputUnit/InputUnit.d.ts :: helpComponent?: ReactNode;
- components/Label/Label.d.ts :: export declare const Label: {
- components/LabelValue/types.d.ts :: needShowLabelTooltip?: boolean;
- components/Multiselect/Multiselect.d.ts :: helperText?: string;
- components/Radiobutton/Radiobutton.types.d.ts :: children?: ReactNode;
- components/Radiobutton/Radiobutton.types.d.ts :: help?: ReactElement 
- components/Select/types.d.ts :: helperText?: string;
- components/Switch/Item.d.ts :: export interface SwitchItem {
- components/Switch/Switch.d.ts :: export declare const Switch: FC<SwitchProps>;
- components/Switch/Switch.d.ts :: export interface SwitchProps {
- components/Textfield/Textfield.d.ts :: help?: ReactNode;
- components/Textfield/Textfield.d.ts :: actionsBar?: ReactNode;
- components/Textfield/Textfield.d.ts :: onClear?: () => void;
- components/Toggle/Toggle.types.d.ts :: help?: ReactElement 
- components/Typography/Typography.d.ts :: export type TypographyProps<T = HTMLElement> = IHasTestId & HTMLProps<T> & {
- components/Typography/Typography.d.ts :: export declare const Typography: import("react").ForwardRefExoticComponent<Omit<TypographyProps<HTMLElement>, "ref"> & import("rea
- components/Typography/Typography.d.ts :: export declare const TypographyTag: {
- components/Typography/Typography.d.ts :: export type TypographyTagValue = TextTagValue;
- data-grid/Filters/FiltersContainer/FiltersContainer.d.ts :: initialFiltersDisplayState?: Record<string, boolean>;
- data-grid/headers/components/Dropdown/DropdownArrowBtn/DropdownArrowBtn.d.ts :: isActive?: boolean;
- data-grid/headers/components/Dropdown/Dropdown.d.ts :: export declare const Dropdown: import("react").ForwardRefExoticComponent<{
- data-grid/headers/components/HeaderBuilder/HeaderBuilder.d.ts :: isScrollToDropdownDisabled?: boolean;

## Поиск устаревшего в витрине

Команды (корень проекта):

- `rg -n "\b(helperText|helpComponent|actionsBar|onClear|isActive|iconPosition|isTextEllipsis|bodyTextClassName|overrideActiveClass|needShowLabelTooltip|disableRemoveAllSelectionRanges|initialFiltersDisplayState|isScrollToDropdownDisabled|clearable|isArchived|showArchived|fillContainerSpace|rowSelection|columnVisibility|fullWidth)\b" src` → только clearable/onClear у Select, Input, Chip (новый API), isArchived у TextCell, fullWidth у SearchInput, rowSelection как состояние `useReactTable`.
- `rg -n "\bhelp=|\bhelp:|small\b|\bchildren=|onDelete\b" src` → пусто.
- `rg -n "\b(Switch|Header|Typography|BodyL|BodyTextStrong|BodyText|BodyXL|Caption|H1|H2|H3|H4)\b" src` по импортам → пусто.
- `rg -n "<(Label|Textfield|MentionsTextfield|Help|Info|Chip|Checkbox|AutoComplete|Radiobutton|Toggle|FileUploader|Multiselect|Tooltip|Datepicker)\b" src` → список использований; из них устаревший только `Label` в `src/stories/catalog/Label.stories.tsx:4,21,25` и `src/stories/catalog/FieldRow.stories.tsx:4,21,25`.
- `rg -n "Все элементы" src` → пусто.

## Проверка ссылок

Выборочно сверено `sed -n <строка>p` по `new/`: Multiselect/lib/consts.d.ts:3, Link.js:21-23, Button.js:51-53, Breadcrumbs.js:7, Textfield.js:91, AutoComplete.js:120, InputUnit.js:190, FileUploader.js:74, FileUploaderPreview.js:12-13, Datepicker.js:133-134,260, data-grid Table.d.ts:23 и old Table.d.ts:18-20 — все совпали.

## Что не сделано и почему

- Рантайм не запускался (не входит в T3a): выводы о поведении — по `.js` в dist, не по запуску.
- Для data-grid разобраны публичные поверхности (Table, cells, headers, локаль); внутренние файлы перечислены списком, построчно не описаны.
