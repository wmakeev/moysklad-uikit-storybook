// Реэкспорт subpath-only компонентов @moysklad/uikit, которых нет в главном входе
// (dist/index.js). Используется как path-form cfg.extraEntries: конвертер
// (а) бандлит эти компоненты на window.MoyskladUikit для рендера превью и
// (б) видит их имена через статический скан `export { X } from` → распознаёт
// соответствующие истории как компоненты-карточки (иначе [TITLE_UNMAPPED]).
export { FieldRow } from '@moysklad/uikit/components/FieldRow';
export { ImagePreview } from '@moysklad/uikit/components/ImagePreview';
export { Indicator } from '@moysklad/uikit/components/Indicator';
export { Info } from '@moysklad/uikit/components/Info';
export { Label } from '@moysklad/uikit/components/Label';
export { LabelValue } from '@moysklad/uikit/components/LabelValue';
