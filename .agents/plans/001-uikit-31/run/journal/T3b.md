# T3b journal

- Old 28.1.0 unpacked to /tmp/orch-001/T3b/old/package (npm pack).
- Subpath-only computed by script: exports keys ./components/* (84) minus names from dist/index.d.ts (75) = FieldLabel, FieldRow, ImagePreview, Indicator, Info, InputClear, Label, LabelValue, Panel. In 28.1.0: FieldRow, ImagePreview, Indicator, Info, InputClear, Label, LabelValue.
- Tokens computed by parsing both colorVariables.css: 156 -> 178 vars; removed 1 (--elements-disabled), added 23 (3 + 16 gwt-statuses + 4 viewers-stack), 0 changed values.
- Context discrepancies: DateRange is in dist/index.d.ts:21 and index.js:26; hooks/icon/utils still re-exported (index.d.ts:82-84).
- Cite check script: 115 long-form cites (D/O/PKG prefix), all file paths exist and line numbers within file length.
- extra-exports.ts lacks InputClear (and FieldLabel, Panel).
