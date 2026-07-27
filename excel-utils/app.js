/* global XLSX */

const PREVIEW_LIMIT = 30;

const OPERATOR_OPTIONS = [
  { value: "contains", label: "contains" },
  { value: "equals", label: "equals" },
  { value: "not_equals", label: "not equals" },
  { value: "starts_with", label: "starts with" },
  { value: "ends_with", label: "ends with" },
  { value: "greater_than", label: ">" },
  { value: "greater_equal", label: ">=" },
  { value: "less_than", label: "<" },
  { value: "less_equal", label: "<=" },
  { value: "is_empty", label: "is empty" },
  { value: "is_not_empty", label: "is not empty" },
];

const NO_VALUE_OPERATORS = new Set(["is_empty", "is_not_empty"]);
const LOCALE_STORAGE_KEY = "excel_utils_locale";
const THEME_STORAGE_KEY = "excel_utils_theme";
const DEFAULT_LOCALE = "en";
const DEFAULT_THEME = "light";

const I18N = {
  en: {
    "app.title": "Excel Utils",
    "hero.kicker": "Excel Utils",
    "hero.copy": "Upload your files, choose the needed data, and download the final Excel file.",
    "hero.language": "Language",
    "hero.theme_toggle": "Toggle night mode",
    "quick.title": "Report Templates",
    "quick.hint": "Choose a template, upload your files, and generate the final report.",
    "quick.show_advanced": "Show advanced options",
    "plugin.custom": "Custom Builder",
    "plugin.rabies": "Rabies Report",
    "plugin.model347": "Modelo 347",
    "plugin.hint.custom": "Custom Builder is active.",
    "plugin.hint.rabies.advanced": "Rabies report template is active. You can use advanced options below.",
    "plugin.hint.rabies.simple": "Rabies report template is active. Only essential options are shown.",
    "plugin.hint.model347.advanced": "Modelo 347 template is active. You can use advanced options below.",
    "plugin.hint.model347.simple": "Modelo 347 template is active. Only essential options are shown.",
    "rabies.essentials": "Rabies Essentials",
    "rabies.output": "Output filename",
    "rabies.include_unmatched": "Include rows without client match",
    "rabies.panel_hint": "Upload both files in Data Source. The app merges and exports using the rabies preset.",
    "rabies.file_status.ok": "Files loaded: 2 of 2 required.",
    "rabies.file_status.wait": "Files loaded: {loaded}. Exactly 2 files are required (client + vaccination).",
    "rabies.col.number": "No.",
    "rabies.col.chip": "Chip number",
    "rabies.col.date": "Date",
    "rabies.col.primo": "Primary/Revaccination",
    "rabies.col.vaccine": "Vaccine type",
    "rabies.col.batch": "Batch",
    "rabies.col.applied": "Applied by",
    "rabies.col.patient_name": "Patient name",
    "rabies.col.patient_id": "Patient ID",
    "rabies.col.client_name": "Client name",
    "rabies.col.client_id": "Client internal ID",
    "rabies.col.client_legal_id": "Client legal ID",
    "rabies.col.phone": "Phone",
    "rabies.col.consultation": "Consultation date/time",
    "rabies.col.last_visit": "Last visit",
    "rabies.col.last_reason": "Last reason",
    "rabies.col.species": "Species",
    "rabies.col.breed": "Breed",
    "model347.essentials": "Modelo 347 Essentials",
    "model347.output": "Output filename",
    "model347.threshold": "Minimum annual total (€)",
    "model347.panel_hint": "Upload one invoice export in Data Source and generate the Modelo 347 table.",
    "model347.file_status.ok": "Files loaded: 1 of 1 required.",
    "model347.file_status.wait": "Files loaded: {loaded}. Exactly 1 invoice file is required.",
    "data.title": "1) Data Source",
    "data.clear": "Clear Loaded Data",
    "data.combine_mode": "How should files be combined?",
    "data.combine.append": "Keep all rows from each file (no matching)",
    "data.combine.join": "Match rows from 2 files using one common column",
    "data.combine.smart": "Auto-detect common columns and merge files (2+ files)",
    "data.combine.help.append": "Use this when you only want one big list with all rows from all uploaded files.",
    "data.combine.help.join": "Use this when two files share a common value, like ID, phone, or reference.",
    "data.combine.help.smart": "Use this when you have 2+ files and want the app to find and merge matching data automatically.",
    "data.smart.title": "Auto-merge settings",
    "data.smart.primary": "Main file (base rows)",
    "data.smart.hint": "The app automatically finds shared columns and merges data into the main file rows.",
    "data.join.title": "Match settings (2 files)",
    "data.join.left_file": "Main file",
    "data.join.right_file": "Lookup file",
    "data.join.left_key": "Match column in main file",
    "data.join.right_key": "Match column in lookup file",
    "data.join.type": "Keep rows from",
    "data.join.type.left": "Main file (keep all rows)",
    "data.join.type.inner": "Matches only (both files)",
    "data.join.hint": "Rows are matched when both selected columns have the same value.",
    "data.drop.default_title": "Drop files here or click to upload",
    "data.drop.default_hint": "Supports multiple Excel/CSV files. Upload again to add more files.",
    "data.drop.rabies_title": "Upload Rabies source files",
    "data.drop.rabies_hint": "Upload exactly 2 files: client export + vaccination export.",
    "data.drop.model_title": "Upload Modelo 347 source file",
    "data.drop.model_hint": "Upload exactly 1 invoice export file (CSV/XLS/XLSX).",
    "data.summary.none": "No files loaded yet.",
    "data.summary.merge_error": "Merge error: {error}",
    "data.summary.join_zero": "Files are loaded, but current join settings produced 0 rows.",
    "data.summary.smart_zero": "Files are loaded, but smart merge produced 0 rows.",
    "data.summary.mode.append": "append mode",
    "data.summary.mode.join": "join mode",
    "data.summary.mode.smart": "smart merge mode",
    "data.summary.loaded": "Loaded {count} file(s): {names}. Total rows: {rows} ({mode}).{mergeInfo}",
    "data.loaded_files": "Loaded Files",
    "data.table.file": "File",
    "data.table.rows": "Rows",
    "data.table.size": "Size",
    "data.table.action": "Action",
    "data.table.empty": "No files loaded.",
    "data.file.none_simple": "No files uploaded yet.",
    "data.file.meta": "{rows} rows · {size}",
    "action.remove": "Remove",
    "action.up": "Up",
    "action.down": "Down",
    "build.generate_preview": "Generate Preview",
    "build.generate_rabies": "Generate Rabies Report",
    "build.generate_model347": "Generate Modelo 347",
    "build.generating": "Generating...",
    "build.download": "Download XLSX",
    "build.title": "2) Build Output",
    "build.report_type": "Report type",
    "build.output_filename": "Output filename",
    "build.sheet_name": "Sheet name",
    "build.mode.detailed": "Detailed rows",
    "build.mode.summary": "Summary (group + aggregate)",
    "build.mode.quarter": "Quarterly pivot (T1-T4 + total)",
    "build.export_config": "Export Config",
    "build.import_config": "Import Config",
    "build.columns_title": "Columns In Final Output",
    "build.add_column": "Add Column",
    "build.table.source_column": "Source Column",
    "build.table.output_header": "Output Header",
    "build.table.actions": "Actions",
    "filters.title": "3) Filters",
    "filters.enable_date_range": "Enable date range filter",
    "filters.date_column": "Date column",
    "filters.from_date": "From date",
    "filters.to_date": "To date",
    "filters.custom_title": "Custom field filters",
    "filters.add": "Add Filter",
    "sort.title": "4) Sort",
    "sort.by": "Sort by",
    "sort.direction": "Direction",
    "sort.asc": "Ascending",
    "sort.desc": "Descending",
    "preview.title": "Preview",
    "status.ready": "Upload files to start.",
    "status.plugin.rabies": "Rabies plugin applied. Upload exports and generate.",
    "status.plugin.model347": "Modelo 347 plugin applied. Upload invoice export and generate.",
    "status.plugin.custom": "Custom builder active.",
    "status.reading_files": "Reading files...",
    "status.duplicate_files": "Those files are already loaded. Upload different files or clear current data.",
    "status.join_wait_second": "First file loaded. Upload the second file to complete the join.",
    "status.no_rows_in_upload": "No data rows found in uploaded files.",
    "status.added_files": "Added {added} file(s). Total: {totalFiles} file(s), {rows} row(s).{skipped}",
    "status.skipped_files": " Skipped {count} duplicate file(s).",
    "status.loaded_data_cleared": "Loaded data cleared.",
    "status.combine_updated": "Combine settings updated.",
    "status.all_files_removed": "All files removed.",
    "status.file_removed": "Removed file. {count} file(s) still loaded.",
    "status.load_before_filters": "Load files before adding filters.",
    "status.rabies_needs_two": "Rabies plugin requires exactly 2 files: client export and vaccination export.",
    "status.model347_needs_one": "Modelo 347 plugin requires exactly 1 invoice export file.",
    "status.upload_first": "Upload files first.",
    "status.no_joined_rows": "No joined rows available. Adjust join files/keys or join type.",
    "status.no_merged_rows": "No merged rows available. Try a different primary file or switch combine mode.",
    "status.no_rows_from_files": "No rows available from loaded files.",
    "status.generating_preview": "Generating preview...",
    "status.generated_rows": "Generated {rows} row(s).",
    "status.config_exported": "Configuration exported.",
    "status.config_imported": "Configuration imported.",
    "error.select_output_column": "Select at least one output column.",
    "error.rabies_requires_files": "Rabies plugin requires both files: active users + vaccinations.",
    "error.choose_group_by": "Choose a group-by column.",
    "error.choose_aggregation_column": "Choose an aggregation column.",
    "error.choose_quarter_columns": "Choose primary/secondary group, date, and amount columns for quarterly pivot.",
    "error.invalid_config": "Invalid config file.",
    "error.no_sheet_in_file": "No sheet found in file: {file}",
    "preview.showing_first": "{meta} Showing first {count} row(s).",
    "preview.meta.detailed": "Detailed report. Rows: {rows}. Columns: {cols}.",
    "preview.meta.rabies": "Rabies report. Rows: {rows}.",
    "preview.meta.summary": "Summary report ({aggFn}). Groups: {groups}.",
    "preview.meta.quarter": "Quarterly pivot report. Groups: {groups}. Threshold: > {threshold}.",
    "columns.none_left": "No columns left",
    "columns.none_selected": "No selected columns.",
    "columns.none": "No columns",
    "options.none": "Upload files first",
    "column.source_file": "Source File",
    "filters.none": "No custom filters yet.",
    "filters.value_placeholder": "Value",
    "sort.none": "No sorting",
  },
  es: {
    "app.title": "Excel Utils",
    "hero.kicker": "Excel Utils",
    "hero.copy": "Sube tus archivos, elige los datos que necesitas y descarga el Excel final.",
    "hero.language": "Idioma",
    "hero.theme_toggle": "Cambiar modo noche",
    "quick.title": "Plantillas de informe",
    "quick.hint": "Elige una plantilla, sube tus archivos y genera el informe final.",
    "quick.show_advanced": "Mostrar opciones avanzadas",
    "plugin.custom": "Generador personalizado",
    "plugin.rabies": "Informe Rabia",
    "plugin.model347": "Modelo 347",
    "plugin.hint.custom": "Generador personalizado activo.",
    "plugin.hint.rabies.advanced": "La plantilla del informe de rabia está activa. Puedes usar opciones avanzadas abajo.",
    "plugin.hint.rabies.simple": "La plantilla del informe de rabia está activa. Solo se muestran opciones esenciales.",
    "plugin.hint.model347.advanced": "La plantilla de Modelo 347 está activa. Puedes usar opciones avanzadas abajo.",
    "plugin.hint.model347.simple": "La plantilla de Modelo 347 está activa. Solo se muestran opciones esenciales.",
    "rabies.essentials": "Esenciales de Rabia",
    "rabies.output": "Nombre del archivo de salida",
    "rabies.include_unmatched": "Incluir filas sin coincidencia de cliente",
    "rabies.panel_hint": "Sube ambos archivos en Origen de datos. La app combina y exporta con el preset de rabia.",
    "rabies.file_status.ok": "Archivos cargados: 2 de 2 requeridos.",
    "rabies.file_status.wait": "Archivos cargados: {loaded}. Se requieren exactamente 2 archivos (clientes + vacunas).",
    "rabies.col.number": "Nº",
    "rabies.col.chip": "NúmeroChip",
    "rabies.col.date": "Fecha",
    "rabies.col.primo": "Primo/Revacunación",
    "rabies.col.vaccine": "Tipo Vacuna",
    "rabies.col.batch": "Lote",
    "rabies.col.applied": "Aplicada por",
    "rabies.col.patient_name": "Paciente",
    "rabies.col.patient_id": "ID Paciente",
    "rabies.col.client_name": "Cliente",
    "rabies.col.client_id": "ID Cliente interno",
    "rabies.col.client_legal_id": "NIF/DNI Cliente",
    "rabies.col.phone": "Teléfono",
    "rabies.col.consultation": "Fecha/Hora consulta",
    "rabies.col.last_visit": "Última visita",
    "rabies.col.last_reason": "Última causa",
    "rabies.col.species": "Especie",
    "rabies.col.breed": "Raza",
    "model347.essentials": "Esenciales de Modelo 347",
    "model347.output": "Nombre del archivo de salida",
    "model347.threshold": "Total anual mínimo (€)",
    "model347.panel_hint": "Sube un export de facturas en Origen de datos y genera la tabla Modelo 347.",
    "model347.file_status.ok": "Archivos cargados: 1 de 1 requerido.",
    "model347.file_status.wait": "Archivos cargados: {loaded}. Se requiere exactamente 1 archivo de facturas.",
    "data.title": "1) Origen de datos",
    "data.clear": "Limpiar datos cargados",
    "data.combine_mode": "¿Cómo se deben combinar los archivos?",
    "data.combine.append": "Mantener todas las filas de cada archivo (sin cruces)",
    "data.combine.join": "Cruzar filas de 2 archivos usando una columna en común",
    "data.combine.smart": "Detectar columnas comunes y combinar archivos automáticamente (2+ archivos)",
    "data.combine.help.append": "Úsalo cuando solo quieras una lista grande con todas las filas de todos los archivos.",
    "data.combine.help.join": "Úsalo cuando dos archivos comparten un valor común, como ID, teléfono o referencia.",
    "data.combine.help.smart": "Úsalo con 2+ archivos si quieres que la app encuentre y combine datos coincidentes automáticamente.",
    "data.smart.title": "Ajustes de auto-combinación",
    "data.smart.primary": "Archivo principal (filas base)",
    "data.smart.hint": "La app detecta columnas compartidas y combina los datos en las filas del archivo principal.",
    "data.join.title": "Ajustes de cruce (2 archivos)",
    "data.join.left_file": "Archivo principal",
    "data.join.right_file": "Archivo de apoyo",
    "data.join.left_key": "Columna de cruce en archivo principal",
    "data.join.right_key": "Columna de cruce en archivo de apoyo",
    "data.join.type": "Conservar filas de",
    "data.join.type.left": "Archivo principal (todas las filas)",
    "data.join.type.inner": "Solo coincidencias (ambos archivos)",
    "data.join.hint": "Las filas se cruzan cuando ambas columnas seleccionadas tienen el mismo valor.",
    "data.drop.default_title": "Arrastra archivos aquí o haz clic para subir",
    "data.drop.default_hint": "Admite varios archivos Excel/CSV. Vuelve a subir para añadir más.",
    "data.drop.rabies_title": "Sube archivos fuente de Rabia",
    "data.drop.rabies_hint": "Sube exactamente 2 archivos: export de clientes + export de vacunas.",
    "data.drop.model_title": "Sube archivo fuente de Modelo 347",
    "data.drop.model_hint": "Sube exactamente 1 archivo de facturas (CSV/XLS/XLSX).",
    "data.summary.none": "Todavía no hay archivos cargados.",
    "data.summary.merge_error": "Error de combinación: {error}",
    "data.summary.join_zero": "Los archivos están cargados, pero la unión actual produjo 0 filas.",
    "data.summary.smart_zero": "Los archivos están cargados, pero la combinación inteligente produjo 0 filas.",
    "data.summary.mode.append": "modo añadir",
    "data.summary.mode.join": "modo unión",
    "data.summary.mode.smart": "modo combinación inteligente",
    "data.summary.loaded": "Cargados {count} archivo(s): {names}. Filas totales: {rows} ({mode}).{mergeInfo}",
    "data.loaded_files": "Archivos cargados",
    "data.table.file": "Archivo",
    "data.table.rows": "Filas",
    "data.table.size": "Tamaño",
    "data.table.action": "Acción",
    "data.table.empty": "No hay archivos cargados.",
    "data.file.none_simple": "Todavía no hay archivos subidos.",
    "data.file.meta": "{rows} filas · {size}",
    "action.remove": "Quitar",
    "action.up": "Subir",
    "action.down": "Bajar",
    "build.generate_preview": "Generar vista previa",
    "build.generate_rabies": "Generar informe de rabia",
    "build.generate_model347": "Generar Modelo 347",
    "build.generating": "Generando...",
    "build.download": "Descargar XLSX",
    "build.title": "2) Crear salida",
    "build.report_type": "Tipo de informe",
    "build.output_filename": "Nombre del archivo de salida",
    "build.sheet_name": "Nombre de la hoja",
    "build.mode.detailed": "Filas detalladas",
    "build.mode.summary": "Resumen (grupo + agregado)",
    "build.mode.quarter": "Pivote trimestral (T1-T4 + total)",
    "build.export_config": "Exportar configuración",
    "build.import_config": "Importar configuración",
    "build.columns_title": "Columnas en el archivo final",
    "build.add_column": "Añadir columna",
    "build.table.source_column": "Columna origen",
    "build.table.output_header": "Encabezado de salida",
    "build.table.actions": "Acciones",
    "filters.title": "3) Filtros",
    "filters.enable_date_range": "Activar filtro por rango de fechas",
    "filters.date_column": "Columna de fecha",
    "filters.from_date": "Fecha desde",
    "filters.to_date": "Fecha hasta",
    "filters.custom_title": "Filtros por campo",
    "filters.add": "Añadir filtro",
    "sort.title": "4) Ordenar",
    "sort.by": "Ordenar por",
    "sort.direction": "Dirección",
    "sort.asc": "Ascendente",
    "sort.desc": "Descendente",
    "preview.title": "Vista previa",
    "status.ready": "Sube archivos para empezar.",
    "status.plugin.rabies": "Plugin de rabia aplicado. Sube los exports y genera.",
    "status.plugin.model347": "Plugin de Modelo 347 aplicado. Sube el export de facturas y genera.",
    "status.plugin.custom": "Generador personalizado activo.",
    "status.reading_files": "Leyendo archivos...",
    "status.duplicate_files": "Esos archivos ya están cargados. Sube archivos distintos o limpia los datos actuales.",
    "status.join_wait_second": "Primer archivo cargado. Sube el segundo para completar la unión.",
    "status.no_rows_in_upload": "No se encontraron filas de datos en los archivos subidos.",
    "status.added_files": "Añadidos {added} archivo(s). Total: {totalFiles} archivo(s), {rows} fila(s).{skipped}",
    "status.skipped_files": " Se omitieron {count} archivo(s) duplicados.",
    "status.loaded_data_cleared": "Datos cargados limpiados.",
    "status.combine_updated": "Ajustes de combinación actualizados.",
    "status.all_files_removed": "Se quitaron todos los archivos.",
    "status.file_removed": "Archivo quitado. Quedan {count} archivo(s) cargados.",
    "status.load_before_filters": "Carga archivos antes de añadir filtros.",
    "status.rabies_needs_two": "El plugin de rabia requiere exactamente 2 archivos: clientes y vacunas.",
    "status.model347_needs_one": "El plugin de Modelo 347 requiere exactamente 1 archivo de facturas.",
    "status.upload_first": "Sube archivos primero.",
    "status.no_joined_rows": "No hay filas unidas. Ajusta archivos/claves o el tipo de unión.",
    "status.no_merged_rows": "No hay filas combinadas. Prueba otro archivo principal o cambia el modo de combinación.",
    "status.no_rows_from_files": "No hay filas disponibles desde los archivos cargados.",
    "status.generating_preview": "Generando vista previa...",
    "status.generated_rows": "Generadas {rows} fila(s).",
    "status.config_exported": "Configuración exportada.",
    "status.config_imported": "Configuración importada.",
    "error.select_output_column": "Selecciona al menos una columna de salida.",
    "error.rabies_requires_files": "El plugin de rabia requiere ambos archivos: usuarios activos + vacunaciones.",
    "error.choose_group_by": "Elige una columna para agrupar.",
    "error.choose_aggregation_column": "Elige una columna para agregar.",
    "error.choose_quarter_columns": "Elige grupo primario/secundario, fecha e importe para el pivote trimestral.",
    "error.invalid_config": "Archivo de configuración no válido.",
    "error.no_sheet_in_file": "No se encontró ninguna hoja en el archivo: {file}",
    "preview.showing_first": "{meta} Mostrando las primeras {count} fila(s).",
    "preview.meta.detailed": "Informe detallado. Filas: {rows}. Columnas: {cols}.",
    "preview.meta.rabies": "Informe de rabia. Filas: {rows}.",
    "preview.meta.summary": "Informe resumen ({aggFn}). Grupos: {groups}.",
    "preview.meta.quarter": "Informe pivote trimestral. Grupos: {groups}. Umbral: > {threshold}.",
    "columns.none_left": "No quedan columnas",
    "columns.none_selected": "No hay columnas seleccionadas.",
    "columns.none": "Sin columnas",
    "options.none": "Sube archivos primero",
    "column.source_file": "Archivo origen",
    "filters.none": "Todavía no hay filtros personalizados.",
    "filters.value_placeholder": "Valor",
    "sort.none": "Sin orden",
  },
};

const RABIES_EXPECTED_COLUMNS = [
  "Client ID",
  "First name",
  "Last name",
  "Organization name",
  "Phone number",
  "Street address",
  "Zip code",
  "City",
  "Patient name",
  "Microchip",
  "Age",
  "Date of birth",
  "Client full name",
  "Patient ID",
  "Client legal ID",
  "Last visit",
  "Last reason",
  "Medicine name",
  "Species",
  "Breed",
  "Batch ID",
  "Batch expires",
  "Given",
  "Department ID",
  "Department name",
];

const RABIES_ACTIVE_ID_ALIASES = [
  "Client ID",
  "ClientID",
  "Client Id",
  "Client",
  "ID Cliente",
  "ID del Cliente",
  "Customer ID",
  "Owner ID",
];

const RABIES_DIRECT_VACCINATION_ALIASES = {
  "Client ID": ["Client ID", "ClientID", "Client Id", "ID Cliente", "Owner ID"],
  "First name": ["First name", "First Name", "Client first name"],
  "Last name": ["Last name", "Last Name", "Client last name"],
  "Organization name": ["Organization name", "Organization Name"],
  "Phone number": ["Phone number", "Phone Number", "Phone"],
  "Street address": ["Street address", "Street Address", "Address"],
  "Zip code": ["Zip code", "Zip Code", "Postal code", "Post code"],
  City: ["City"],
  "Patient name": ["Patient name", "Patient Name", "Pet name", "Pet Name"],
  "Patient ID": ["Patient ID", "Pet ID", "ID de Paciente"],
  Microchip: ["Microchip", "PATIENT MICROCHIP", "Patient Microchip"],
  Age: ["Age"],
  "Date of birth": ["Date of birth", "Date of Birth", "DOB"],
  "Medicine name": ["Medicine name", "Medicine Name", "Vaccine", "Product name"],
  Species: ["Species"],
  Breed: ["Breed"],
  "Batch ID": ["Batch ID", "Batch Id", "Lot", "Lot ID", "Lot number"],
  "Batch expires": ["Batch expires", "Batch Expires", "Batch expiry", "Batch expiry date"],
  Given: ["Given", "Used", "Vaccination date", "Application date"],
  "Department ID": ["Department ID", "Department Id"],
  "Department name": ["Department name", "Department Name", "Department"],
};

const RABIES_VACCINATION_ALIASES = {
  "Client full name": ["Cliente", "Client"],
  "Phone number": ["Teléfono", "Telefono", "Phone number", "Phone"],
  "Address raw": ["Dirección", "Direccion", "Address"],
  "Patient name": ["Nombre de paciente", "Patient name", "Pet name"],
  "Age raw": ["Edad del paciente", "Age"],
  "Medicine name": ["Fármacos", "Farmacos", "Medicine name", "Vaccine"],
  "Batch ID": ["Lote", "Batch ID", "Lot"],
  Species: ["Especie", "Species"],
  Breed: ["Raza", "Breed"],
  "Applied by": ["Aplicada por", "Applied by", "Veterinarian", "Vet"],
  Given: ["Dado", "Given", "Used"],
};

const RABIES_ACTIVE_DETAILS_ALIASES = {
  "Client ID": ["ID del Cliente", "Client ID", "ClientID", "Client Id", "ID Cliente"],
  "Client full name": ["Nombre del Cliente", "Client", "Client name"],
  "First name": ["First name", "First Name"],
  "Last name": ["Last name", "Last Name"],
  "Organization name": ["Nombre de la Empresa o Clínica", "Nombre de la Empresa o Clinica", "Organization name"],
  "Phone number": ["Número de telefono", "Telefono", "Teléfono", "Phone number", "Phone"],
  "Client legal ID": ["Número de ID del Cliente", "Numero de ID del Cliente", "Client legal ID", "NIF", "VAT"],
  "Street address": ["Dirección", "Dirección ", "Direccion", "Street address", "Address"],
  "Zip code": ["Código postal", "Codigo postal", "Zip code", "Postal code"],
  City: ["Ciudad", "City"],
  "Patient name": ["Nombre de paciente", "Patient name", "Pet name"],
  "Patient ID": ["ID de Paciente", "Patient ID", "Pet ID"],
  Microchip: ["Microchip", "Microchip ", "PATIENT MICROCHIP"],
  "Date of birth": ["Fecha de Nacimiento", "Date of birth", "DOB"],
  "Last visit": ["Última visita", "Ultima visita", "Last visit"],
  "Last reason": ["Última causa", "Ultima causa", "Last reason"],
  Species: ["Especie", "Species"],
  Breed: ["Raza", "Breed"],
};

const el = {
  languageToggle: document.getElementById("languageToggle"),
  langEnBtn: document.getElementById("langEnBtn"),
  langEsBtn: document.getElementById("langEsBtn"),
  themeIconBtn: document.getElementById("themeIconBtn"),
  heroCopy: document.getElementById("heroCopy"),
  quickPluginsTitle: document.getElementById("quickPluginsTitle"),
  quickPluginsHint: document.getElementById("quickPluginsHint"),
  showAdvancedLabel: document.getElementById("showAdvancedLabel"),
  rabiesEssentialsTitle: document.getElementById("rabiesEssentialsTitle"),
  rabiesOutputLabel: document.getElementById("rabiesOutputLabel"),
  rabiesIncludeLabel: document.getElementById("rabiesIncludeLabel"),
  rabiesPanelHint: document.getElementById("rabiesPanelHint"),
  model347EssentialsTitle: document.getElementById("model347EssentialsTitle"),
  model347OutputLabel: document.getElementById("model347OutputLabel"),
  model347ThresholdLabel: document.getElementById("model347ThresholdLabel"),
  model347PanelHint: document.getElementById("model347PanelHint"),
  dataSourceTitle: document.getElementById("dataSourceTitle"),
  combineModeHelp: document.getElementById("combineModeHelp"),
  smartSettingsTitle: document.getElementById("smartSettingsTitle"),
  smartPrimaryLabel: document.getElementById("smartPrimaryLabel"),
  smartSettingsHint: document.getElementById("smartSettingsHint"),
  joinSettingsTitle: document.getElementById("joinSettingsTitle"),
  joinLeftFileLabel: document.getElementById("joinLeftFileLabel"),
  joinRightFileLabel: document.getElementById("joinRightFileLabel"),
  joinLeftKeyLabel: document.getElementById("joinLeftKeyLabel"),
  joinRightKeyLabel: document.getElementById("joinRightKeyLabel"),
  joinTypeLabel: document.getElementById("joinTypeLabel"),
  joinSettingsHint: document.getElementById("joinSettingsHint"),
  loadedFilesSimpleTitle: document.getElementById("loadedFilesSimpleTitle"),

  pluginCustomBtn: document.getElementById("pluginCustomBtn"),
  pluginRabiesBtn: document.getElementById("pluginRabiesBtn"),
  pluginModel347Btn: document.getElementById("pluginModel347Btn"),
  showAdvancedToggle: document.getElementById("showAdvancedToggle"),
  simplePluginPanel: document.getElementById("simplePluginPanel"),
  rabiesSimplePanel: document.getElementById("rabiesSimplePanel"),
  model347SimplePanel: document.getElementById("model347SimplePanel"),
  rabiesSimpleOutput: document.getElementById("rabiesSimpleOutput"),
  rabiesIncludeUnmatched: document.getElementById("rabiesIncludeUnmatched"),
  rabiesFileStatus: document.getElementById("rabiesFileStatus"),
  model347SimpleOutput: document.getElementById("model347SimpleOutput"),
  model347Threshold: document.getElementById("model347Threshold"),
  model347FileStatus: document.getElementById("model347FileStatus"),
  simpleLoadedFilesBox: document.getElementById("simpleLoadedFilesBox"),
  simpleLoadedFilesList: document.getElementById("simpleLoadedFilesList"),
  pluginHint: document.getElementById("pluginHint"),

  dataSourceCard: document.getElementById("dataSourceCard"),
  buildCard: document.getElementById("buildCard"),
  filtersCard: document.getElementById("filtersCard"),
  sortCard: document.getElementById("sortCard"),
  combineModeWrap: document.getElementById("combineModeWrap"),
  combineModeField: document.getElementById("combineModeField"),
  reportModeField: document.getElementById("reportModeField"),
  outputNameField: document.getElementById("outputNameField"),
  sheetNameField: document.getElementById("sheetNameField"),
  configActions: document.getElementById("configActions"),

  dropZone: document.getElementById("dropZone"),
  dropZoneTitle: document.getElementById("dropZoneTitle"),
  dropZoneHint: document.getElementById("dropZoneHint"),
  fileInput: document.getElementById("fileInput"),
  dataActions: document.getElementById("dataActions"),
  clearFilesBtn: document.getElementById("clearFilesBtn"),
  combineMode: document.getElementById("combineMode"),
  smartSettings: document.getElementById("smartSettings"),
  smartPrimaryFile: document.getElementById("smartPrimaryFile"),
  joinSettings: document.getElementById("joinSettings"),
  joinLeftFile: document.getElementById("joinLeftFile"),
  joinRightFile: document.getElementById("joinRightFile"),
  joinLeftKey: document.getElementById("joinLeftKey"),
  joinRightKey: document.getElementById("joinRightKey"),
  joinType: document.getElementById("joinType"),
  dataSummary: document.getElementById("dataSummary"),
  loadedFilesWrap: document.getElementById("loadedFilesWrap"),
  loadedFilesBody: document.getElementById("loadedFilesBody"),

  reportMode: document.getElementById("reportMode"),
  outputName: document.getElementById("outputName"),
  sheetName: document.getElementById("sheetName"),

  exportConfigBtn: document.getElementById("exportConfigBtn"),
  importConfigBtn: document.getElementById("importConfigBtn"),
  importConfigInput: document.getElementById("importConfigInput"),

  detailedSection: document.getElementById("detailedSection"),
  summarySection: document.getElementById("summarySection"),
  quarterSection: document.getElementById("quarterSection"),

  availableColumns: document.getElementById("availableColumns"),
  addColumnBtn: document.getElementById("addColumnBtn"),
  selectedColumnsBody: document.getElementById("selectedColumnsBody"),

  summaryGroupBy: document.getElementById("summaryGroupBy"),
  summaryAggFn: document.getElementById("summaryAggFn"),
  summaryAggColumn: document.getElementById("summaryAggColumn"),
  summaryGroupLabel: document.getElementById("summaryGroupLabel"),
  summaryMetricLabel: document.getElementById("summaryMetricLabel"),

  qGroupBy1: document.getElementById("qGroupBy1"),
  qGroupBy2: document.getElementById("qGroupBy2"),
  qDateColumn: document.getElementById("qDateColumn"),
  qValueColumn: document.getElementById("qValueColumn"),
  qMissingGroup1: document.getElementById("qMissingGroup1"),
  qMinTotal: document.getElementById("qMinTotal"),
  qGroup1Label: document.getElementById("qGroup1Label"),
  qGroup2Label: document.getElementById("qGroup2Label"),
  qTotalLabel: document.getElementById("qTotalLabel"),

  enableDateFilter: document.getElementById("enableDateFilter"),
  dateColumn: document.getElementById("dateColumn"),
  dateFrom: document.getElementById("dateFrom"),
  dateTo: document.getElementById("dateTo"),

  filtersList: document.getElementById("filtersList"),
  addFilterBtn: document.getElementById("addFilterBtn"),

  sortColumn: document.getElementById("sortColumn"),
  sortDirection: document.getElementById("sortDirection"),

  generateBtn: document.getElementById("generateBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  status: document.getElementById("status"),

  previewCard: document.getElementById("previewCard"),
  previewMeta: document.getElementById("previewMeta"),
  previewHead: document.getElementById("previewHead"),
  previewBody: document.getElementById("previewBody"),
};

el.quarterAdvancedFields = Array.from(document.querySelectorAll("[data-q-advanced='1']"));

const state = {
  locale: DEFAULT_LOCALE,
  theme: DEFAULT_THEME,
  pluginMode: "custom",
  showAdvanced: true,
  autoOutputName: true,
  isBusy: false,
  fileEntries: [],
  nextFileId: 1,
  files: [],
  rawRows: [],
  columns: [],

  combine: {
    mode: "append",
    primaryFileId: "",
    leftFileId: "",
    rightFileId: "",
    leftKey: "",
    rightKey: "",
    joinType: "left",
  },
  mergeNotes: [],
  combineError: "",

  reportMode: "detailed",
  outputName: "clinic_report.xlsx",
  sheetName: "Report",

  selectedColumns: [],
  renameMap: {},

  summary: {
    groupBy: "",
    aggFn: "count",
    aggColumn: "",
    groupLabel: "Group",
    metricLabel: "Count",
  },

  quarterPivot: {
    groupBy1: "",
    groupBy2: "",
    dateColumn: "",
    valueColumn: "",
    missingGroup1: "FALTA NIF/DNI",
    minTotal: "3005.06",
    group1Label: "Número de ID del Cliente",
    group2Label: "Cliente",
    totalLabel: "Total Anual",
  },

  dateFilter: {
    enabled: false,
    column: "",
    from: "",
    to: "",
  },

  filters: [],
  nextFilterId: 1,

  sort: {
    column: "",
    direction: "asc",
  },

  generated: null,
};

function t(key, vars = {}) {
  const active = I18N[state.locale] || I18N[DEFAULT_LOCALE];
  const fallback = I18N[DEFAULT_LOCALE];
  const template = active[key] ?? fallback[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_match, name) => String(vars[name] ?? ""));
}

function normalizeLocale(value) {
  return value === "es" ? "es" : "en";
}

function normalizeTheme(value) {
  if (value === "light" || value === "dark") return value;
  return DEFAULT_THEME;
}

function readStoredValue(key) {
  try {
    return localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function writeStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_error) {
    // Ignore storage failures.
  }
}

function applyThemePreference(preference, persist = false) {
  const normalized = normalizeTheme(preference);
  state.theme = normalized;
  document.body.dataset.theme = normalized;
  el.themeIconBtn.classList.toggle("is-dark", normalized === "dark");
  el.themeIconBtn.setAttribute("aria-pressed", normalized === "dark" ? "true" : "false");
  if (persist) writeStoredValue(THEME_STORAGE_KEY, normalized);
}

function setFieldLabel(control, text) {
  const span = control?.closest("label")?.querySelector("span");
  if (span) span.textContent = text;
}

function setOptionText(select, value, text) {
  const option = Array.from(select?.options || []).find((opt) => opt.value === value);
  if (option) option.textContent = text;
}

function applyLanguage() {
  document.documentElement.lang = state.locale;
  document.title = t("app.title");

  const hero = document.querySelector(".hero");
  const heroKicker = hero?.querySelector(".kicker");
  const heroTitle = hero?.querySelector("h1");
  if (heroKicker) heroKicker.textContent = t("hero.kicker");
  if (heroTitle) heroTitle.textContent = t("app.title");

  el.languageToggle.setAttribute("aria-label", t("hero.language"));
  const toggleLabel = t("hero.theme_toggle");
  el.themeIconBtn.setAttribute("aria-label", toggleLabel);
  el.themeIconBtn.title = toggleLabel;
  el.langEnBtn.classList.toggle("is-active", state.locale === "en");
  el.langEsBtn.classList.toggle("is-active", state.locale === "es");
  el.heroCopy.textContent = t("hero.copy");
  el.quickPluginsTitle.textContent = t("quick.title");
  el.quickPluginsHint.textContent = t("quick.hint");
  el.showAdvancedLabel.textContent = t("quick.show_advanced");
  el.pluginCustomBtn.textContent = t("plugin.custom");
  el.pluginRabiesBtn.textContent = t("plugin.rabies");
  el.pluginModel347Btn.textContent = t("plugin.model347");
  el.rabiesEssentialsTitle.textContent = t("rabies.essentials");
  el.rabiesOutputLabel.textContent = t("rabies.output");
  el.rabiesIncludeLabel.textContent = t("rabies.include_unmatched");
  el.rabiesPanelHint.textContent = t("rabies.panel_hint");
  el.model347EssentialsTitle.textContent = t("model347.essentials");
  el.model347OutputLabel.textContent = t("model347.output");
  el.model347ThresholdLabel.textContent = t("model347.threshold");
  el.model347PanelHint.textContent = t("model347.panel_hint");

  el.dataSourceTitle.textContent = t("data.title");
  el.clearFilesBtn.textContent = t("data.clear");
  el.loadedFilesSimpleTitle.textContent = t("data.loaded_files");
  setFieldLabel(el.combineMode, t("data.combine_mode"));
  setOptionText(el.combineMode, "append", t("data.combine.append"));
  setOptionText(el.combineMode, "join", t("data.combine.join"));
  setOptionText(el.combineMode, "smart", t("data.combine.smart"));
  el.smartSettingsTitle.textContent = t("data.smart.title");
  el.smartPrimaryLabel.textContent = t("data.smart.primary");
  el.smartSettingsHint.textContent = t("data.smart.hint");
  el.joinSettingsTitle.textContent = t("data.join.title");
  el.joinLeftFileLabel.textContent = t("data.join.left_file");
  el.joinRightFileLabel.textContent = t("data.join.right_file");
  el.joinLeftKeyLabel.textContent = t("data.join.left_key");
  el.joinRightKeyLabel.textContent = t("data.join.right_key");
  el.joinTypeLabel.textContent = t("data.join.type");
  el.joinSettingsHint.textContent = t("data.join.hint");
  setOptionText(el.joinType, "left", t("data.join.type.left"));
  setOptionText(el.joinType, "inner", t("data.join.type.inner"));

  const loadedTableHeaders = el.loadedFilesWrap.querySelectorAll("thead th");
  if (loadedTableHeaders[0]) loadedTableHeaders[0].textContent = t("data.table.file");
  if (loadedTableHeaders[1]) loadedTableHeaders[1].textContent = t("data.table.rows");
  if (loadedTableHeaders[2]) loadedTableHeaders[2].textContent = t("data.table.size");
  if (loadedTableHeaders[3]) loadedTableHeaders[3].textContent = t("data.table.action");

  const buildTitle = document.querySelector("#buildCard > h2");
  if (buildTitle) buildTitle.textContent = t("build.title");
  setFieldLabel(el.reportMode, t("build.report_type"));
  setFieldLabel(el.outputName, t("build.output_filename"));
  setFieldLabel(el.sheetName, t("build.sheet_name"));
  setOptionText(el.reportMode, "detailed", t("build.mode.detailed"));
  setOptionText(el.reportMode, "summary", t("build.mode.summary"));
  setOptionText(el.reportMode, "quarter_pivot", t("build.mode.quarter"));
  el.exportConfigBtn.textContent = t("build.export_config");
  el.importConfigBtn.textContent = t("build.import_config");
  const detailedTitle = document.querySelector("#detailedSection > h3");
  if (detailedTitle) detailedTitle.textContent = t("build.columns_title");
  el.addColumnBtn.textContent = t("build.add_column");
  const selectedColumnsHeaders = el.selectedColumnsBody.closest("table")?.querySelectorAll("thead th");
  if (selectedColumnsHeaders && selectedColumnsHeaders[1]) selectedColumnsHeaders[1].textContent = t("build.table.source_column");
  if (selectedColumnsHeaders && selectedColumnsHeaders[2]) selectedColumnsHeaders[2].textContent = t("build.table.output_header");
  if (selectedColumnsHeaders && selectedColumnsHeaders[3]) selectedColumnsHeaders[3].textContent = t("build.table.actions");

  const filtersTitle = document.querySelector("#filtersCard > h2");
  if (filtersTitle) filtersTitle.textContent = t("filters.title");
  setFieldLabel(el.enableDateFilter, t("filters.enable_date_range"));
  setFieldLabel(el.dateColumn, t("filters.date_column"));
  setFieldLabel(el.dateFrom, t("filters.from_date"));
  setFieldLabel(el.dateTo, t("filters.to_date"));
  const customFilterTitle = document.querySelector("#filtersCard h3");
  if (customFilterTitle) customFilterTitle.textContent = t("filters.custom_title");
  el.addFilterBtn.textContent = t("filters.add");

  const sortTitle = document.querySelector("#sortCard > h2");
  if (sortTitle) sortTitle.textContent = t("sort.title");
  setFieldLabel(el.sortColumn, t("sort.by"));
  setFieldLabel(el.sortDirection, t("sort.direction"));
  setOptionText(el.sortDirection, "asc", t("sort.asc"));
  setOptionText(el.sortDirection, "desc", t("sort.desc"));

  const previewTitle = document.querySelector("#previewCard > h2");
  if (previewTitle) previewTitle.textContent = t("preview.title");

  el.downloadBtn.textContent = t("build.download");

  refreshActionLabels();
}

init();

function init() {
  state.locale = normalizeLocale(readStoredValue(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE);
  state.theme = normalizeTheme(readStoredValue(THEME_STORAGE_KEY) || DEFAULT_THEME);
  applyThemePreference(state.theme, false);
  applyLanguage();

  el.langEnBtn.addEventListener("click", () => {
    state.locale = "en";
    writeStoredValue(LOCALE_STORAGE_KEY, state.locale);
    applyLanguage();
    renderAll();
    if (state.files.length === 0 && !state.generated && el.status.classList.contains("neutral")) {
      setStatus(t("status.ready"), "neutral");
    }
  });
  el.langEsBtn.addEventListener("click", () => {
    state.locale = "es";
    writeStoredValue(LOCALE_STORAGE_KEY, state.locale);
    applyLanguage();
    renderAll();
    if (state.files.length === 0 && !state.generated && el.status.classList.contains("neutral")) {
      setStatus(t("status.ready"), "neutral");
    }
  });
  el.themeIconBtn.addEventListener("click", () => {
    applyThemePreference(state.theme === "dark" ? "light" : "dark", true);
  });

  el.pluginCustomBtn.addEventListener("click", () => activatePlugin("custom"));
  el.pluginRabiesBtn.addEventListener("click", () => activatePlugin("rabies"));
  el.pluginModel347Btn.addEventListener("click", () => activatePlugin("model347"));
  el.showAdvancedToggle.addEventListener("change", () => {
    state.showAdvanced = el.showAdvancedToggle.checked;
    renderAll();
  });
  el.rabiesSimpleOutput.addEventListener("input", () => {
    state.outputName = el.rabiesSimpleOutput.value;
    state.autoOutputName = false;
    invalidateGenerated();
  });
  el.rabiesIncludeUnmatched.addEventListener("change", () => {
    state.combine.joinType = el.rabiesIncludeUnmatched.checked ? "left" : "inner";
    rebuildDatasetFromFileEntries();
    invalidateGenerated();
    renderAll();
  });
  el.model347SimpleOutput.addEventListener("input", () => {
    state.outputName = el.model347SimpleOutput.value;
    state.autoOutputName = false;
    invalidateGenerated();
  });
  el.model347Threshold.addEventListener("input", () => {
    state.quarterPivot.minTotal = el.model347Threshold.value;
    invalidateGenerated();
  });

  el.fileInput.addEventListener("click", () => {
    // Allow selecting the same file again without requiring a second try.
    el.fileInput.value = "";
  });
  el.dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      el.fileInput.value = "";
      el.fileInput.click();
    }
  });

  el.dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    el.dropZone.classList.add("drag-over");
  });

  el.dropZone.addEventListener("dragleave", () => {
    el.dropZone.classList.remove("drag-over");
  });

  el.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    el.dropZone.classList.remove("drag-over");
    const list = event.dataTransfer?.files;
    if (list && list.length > 0) loadFiles(list);
  });

  el.fileInput.addEventListener("change", () => {
    const list = el.fileInput.files;
    if (list && list.length > 0) loadFiles(list);
    el.fileInput.value = "";
  });

  el.clearFilesBtn.addEventListener("click", clearLoadedData);
  el.loadedFilesBody.addEventListener("click", onLoadedFilesAction);
  el.simpleLoadedFilesList.addEventListener("click", onLoadedFilesAction);
  el.combineMode.addEventListener("change", onCombineSettingsChanged);
  el.smartPrimaryFile.addEventListener("change", onCombineSettingsChanged);
  el.joinLeftFile.addEventListener("change", onCombineSettingsChanged);
  el.joinRightFile.addEventListener("change", onCombineSettingsChanged);
  el.joinLeftKey.addEventListener("change", onCombineSettingsChanged);
  el.joinRightKey.addEventListener("change", onCombineSettingsChanged);
  el.joinType.addEventListener("change", onCombineSettingsChanged);

  el.reportMode.addEventListener("change", () => {
    if (state.pluginMode !== "custom") {
      state.pluginMode = "custom";
      state.showAdvanced = true;
    }
    state.reportMode = el.reportMode.value;
    reconcileWithColumns();
    invalidateGenerated();
    renderAll();
  });

  el.outputName.addEventListener("input", () => {
    state.outputName = el.outputName.value;
    state.autoOutputName = false;
    invalidateGenerated();
  });

  el.sheetName.addEventListener("input", () => {
    state.sheetName = el.sheetName.value;
    invalidateGenerated();
  });

  el.addColumnBtn.addEventListener("click", () => {
    const col = el.availableColumns.value;
    if (!col) return;
    if (!state.selectedColumns.includes(col)) {
      state.selectedColumns.push(col);
      if (!state.renameMap[col]) state.renameMap[col] = defaultOutputHeader(col);
      invalidateGenerated();
      renderSelectedColumns();
      renderAvailableColumns();
    }
  });

  el.selectedColumnsBody.addEventListener("click", onSelectedColumnsAction);

  el.summaryGroupBy.addEventListener("change", () => {
    state.summary.groupBy = el.summaryGroupBy.value;
    invalidateGenerated();
  });

  el.summaryAggFn.addEventListener("change", () => {
    state.summary.aggFn = el.summaryAggFn.value;
    if (state.summary.aggFn === "count" && !state.summary.metricLabel) {
      state.summary.metricLabel = "Count";
    }
    invalidateGenerated();
    renderSummaryControls();
    renderSortControls();
  });

  el.summaryAggColumn.addEventListener("change", () => {
    state.summary.aggColumn = el.summaryAggColumn.value;
    invalidateGenerated();
  });

  el.summaryGroupLabel.addEventListener("input", () => {
    state.summary.groupLabel = el.summaryGroupLabel.value;
    invalidateGenerated();
  });

  el.summaryMetricLabel.addEventListener("input", () => {
    state.summary.metricLabel = el.summaryMetricLabel.value;
    invalidateGenerated();
  });

  el.qGroupBy1.addEventListener("change", () => {
    state.quarterPivot.groupBy1 = el.qGroupBy1.value;
    invalidateGenerated();
  });

  el.qGroupBy2.addEventListener("change", () => {
    state.quarterPivot.groupBy2 = el.qGroupBy2.value;
    invalidateGenerated();
  });

  el.qDateColumn.addEventListener("change", () => {
    state.quarterPivot.dateColumn = el.qDateColumn.value;
    invalidateGenerated();
  });

  el.qValueColumn.addEventListener("change", () => {
    state.quarterPivot.valueColumn = el.qValueColumn.value;
    invalidateGenerated();
  });

  el.qMissingGroup1.addEventListener("input", () => {
    state.quarterPivot.missingGroup1 = el.qMissingGroup1.value;
    invalidateGenerated();
  });

  el.qMinTotal.addEventListener("input", () => {
    state.quarterPivot.minTotal = el.qMinTotal.value;
    invalidateGenerated();
  });

  el.qGroup1Label.addEventListener("input", () => {
    state.quarterPivot.group1Label = el.qGroup1Label.value;
    invalidateGenerated();
  });

  el.qGroup2Label.addEventListener("input", () => {
    state.quarterPivot.group2Label = el.qGroup2Label.value;
    invalidateGenerated();
  });

  el.qTotalLabel.addEventListener("input", () => {
    state.quarterPivot.totalLabel = el.qTotalLabel.value;
    invalidateGenerated();
  });

  el.enableDateFilter.addEventListener("change", () => {
    state.dateFilter.enabled = el.enableDateFilter.checked;
    invalidateGenerated();
  });

  el.dateColumn.addEventListener("change", () => {
    state.dateFilter.column = el.dateColumn.value;
    invalidateGenerated();
  });

  el.dateFrom.addEventListener("change", () => {
    state.dateFilter.from = el.dateFrom.value;
    invalidateGenerated();
  });

  el.dateTo.addEventListener("change", () => {
    state.dateFilter.to = el.dateTo.value;
    invalidateGenerated();
  });

  el.addFilterBtn.addEventListener("click", () => {
    if (state.columns.length === 0) {
      setStatus(t("status.load_before_filters"), "warn");
      return;
    }
    state.filters.push({
      id: state.nextFilterId,
      column: state.columns[0],
      operator: "contains",
      value: "",
    });
    state.nextFilterId += 1;
    invalidateGenerated();
    renderFilters();
  });

  el.sortColumn.addEventListener("change", () => {
    state.sort.column = el.sortColumn.value;
    invalidateGenerated();
  });

  el.sortDirection.addEventListener("change", () => {
    state.sort.direction = el.sortDirection.value;
    invalidateGenerated();
  });

  el.generateBtn.addEventListener("click", onGenerateClicked);
  el.downloadBtn.addEventListener("click", onDownloadClicked);

  el.exportConfigBtn.addEventListener("click", onExportConfigClicked);
  el.importConfigBtn.addEventListener("click", () => el.importConfigInput.click());
  el.importConfigInput.addEventListener("change", onImportConfigSelected);

  renderAll();
  setStatus(t("status.ready"), "neutral");
}

function activatePlugin(mode) {
  state.pluginMode = ["rabies", "model347"].includes(mode) ? mode : "custom";
  state.showAdvanced = state.pluginMode === "custom";
  state.autoOutputName = true;

  if (state.pluginMode === "rabies") {
    applyRabiesPluginPreset();
  } else if (state.pluginMode === "model347") {
    applyModel347PluginPreset();
  } else if (state.autoOutputName) {
    state.outputName = suggestedCustomFileName();
    state.sheetName = "Report";
  }

  invalidateGenerated();
  renderAll();

  if (state.pluginMode === "rabies") {
    setStatus(t("status.plugin.rabies"), "ok");
  } else if (state.pluginMode === "model347") {
    setStatus(t("status.plugin.model347"), "ok");
  } else {
    setStatus(t("status.plugin.custom"), "neutral");
  }
}

function applyRabiesPluginPreset() {
  state.combine.mode = "join";
  state.combine.joinType = "left";
  state.reportMode = "detailed";
  if (state.autoOutputName) {
    state.outputName = suggestedRabiesFileName();
  }
  state.sheetName = "Rabies Report";
  state.dateFilter.enabled = false;
  state.dateFilter.from = "";
  state.dateFilter.to = "";
  state.filters = [];
  state.sort = { column: "", direction: "asc" };

  const vaccEntry = findBestFileEntry(["telefono", "nombredepaciente", "farmacos", "dado"]);
  const clientEntry = findBestFileEntry(["numerodetelefono", "iddelcliente", "microchip"], vaccEntry?.id);
  if (vaccEntry && clientEntry) {
    state.combine.leftFileId = String(vaccEntry.id);
    state.combine.rightFileId = String(clientEntry.id);

    const leftColumns = columnsForFileEntry(vaccEntry);
    const rightColumns = columnsForFileEntry(clientEntry);
    state.combine.leftKey = findColumnByCanonical(leftColumns, ["telefono", "numerodetelefono"]) || leftColumns[0] || "";
    state.combine.rightKey = findColumnByCanonical(rightColumns, ["numerodetelefono", "telefono"]) || rightColumns[0] || "";

    const vaccDateColumn = findColumnByCanonical(leftColumns, ["dado", "given", "fecha", "date"]);
    const periodRows = rabiesRowsForPeriodDetection(vaccEntry.rows, vaccDateColumn);
    const period = detectYearMonthRangeFromRows(periodRows, "__rabies_given");
    if (state.autoOutputName && period) {
      state.outputName = `Rabies_Vaccination_Report_${period}.xlsx`;
    }
  }

  if (state.fileEntries.length > 0) {
    rebuildDatasetFromFileEntries();
    if (state.columns.length > 0) {
      const preferred = [
        "R.ID del Cliente",
        "R.Nombre del Cliente",
        "L.Nombre de paciente",
        "R.Microchip",
        "L.Fármacos",
        "L.Lote",
        "L.Especie",
        "L.Raza",
        "L.Dado",
      ];

      const selected = preferred.filter((col) => state.columns.includes(col));
      if (selected.length > 0) {
        state.selectedColumns = selected;
      }

      const rename = {
        "R.ID del Cliente": "Client ID",
        "R.Nombre del Cliente": "Client Name",
        "L.Nombre de paciente": "Patient name",
        "R.Microchip": "Microchip",
        "L.Fármacos": "Medicine name",
        "L.Lote": "Batch ID",
        "L.Especie": "Species",
        "L.Raza": "Breed",
        "L.Dado": "Given",
      };
      for (const [src, out] of Object.entries(rename)) {
        if (state.columns.includes(src)) state.renameMap[src] = out;
      }
      reconcileWithColumns();
    }
  }
}

function applyModel347PluginPreset() {
  state.combine.mode = "append";
  state.reportMode = "quarter_pivot";
  if (state.autoOutputName) {
    state.outputName = suggestedModel347FileName();
  }
  state.sheetName = "Modelo 347";
  state.filters = [];
  state.dateFilter.enabled = false;
  state.dateFilter.from = "";
  state.dateFilter.to = "";
  state.sort = { column: "__total", direction: "desc" };
  state.quarterPivot = {
    groupBy1: "",
    groupBy2: "",
    dateColumn: "",
    valueColumn: "",
    missingGroup1: "FALTA NIF/DNI",
    minTotal: "3005.06",
    group1Label: "Número de ID del Cliente",
    group2Label: "Cliente",
    totalLabel: "Total Anual",
  };

  if (state.fileEntries.length > 0) {
    rebuildDatasetFromFileEntries();
    const cols = state.columns.filter((col) => col !== "__source_file");
    state.quarterPivot.groupBy1 =
      findColumnByCanonical(cols, ["numerodeiddelcliente", "iddelcliente", "taxid", "nif"]) ||
      firstNonSourceColumn(state.columns) ||
      "";
    state.quarterPivot.groupBy2 =
      findColumnByCanonical(cols, ["cliente", "clientname", "client"]) ||
      cols.find((col) => col !== state.quarterPivot.groupBy1) ||
      state.quarterPivot.groupBy1 ||
      "";
    state.quarterPivot.dateColumn =
      findColumnByCanonical(cols, ["fecha", "date", "issuedate"]) ||
      guessDateColumn(cols) ||
      cols[0] ||
      "";
    state.quarterPivot.valueColumn =
      findColumnByCanonical(cols, ["totalincliva", "grosstotal", "total"]) ||
      firstNumericLikeColumn(state.rawRows, cols) ||
      cols[0] ||
      "";

    const detectedYear = detectPrimaryYearFromRows(state.rawRows, state.quarterPivot.dateColumn);
    if (state.autoOutputName && detectedYear) {
      state.outputName = `Modelo_347_${detectedYear}.xlsx`;
    }
    reconcileWithColumns();
  }
}

function suggestedCustomFileName() {
  return "clinic_report.xlsx";
}

function suggestedRabiesFileName() {
  const ym = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  return `Rabies_Vaccination_Report_${ym}.xlsx`;
}

function suggestedModel347FileName() {
  return `Modelo_347_${new Date().getFullYear()}.xlsx`;
}

function detectPrimaryYearFromRows(rows, dateColumn) {
  if (!dateColumn || !rows || rows.length === 0) return "";
  const counts = new Map();
  for (const row of rows) {
    const dt = toDate(row[dateColumn]);
    if (!dt) continue;
    const year = String(dt.getUTCFullYear());
    counts.set(year, (counts.get(year) || 0) + 1);
  }
  let bestYear = "";
  let bestCount = 0;
  for (const [year, count] of counts.entries()) {
    if (count > bestCount) {
      bestYear = year;
      bestCount = count;
    }
  }
  return bestYear;
}

function detectYearMonthRangeFromRows(rows, dateColumn) {
  if (!dateColumn || !rows || rows.length === 0) return "";
  let min = null;
  let max = null;
  for (const row of rows) {
    const dt = toDate(row[dateColumn]);
    if (!dt) continue;
    const monthDate = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), 1));
    if (!min || monthDate < min) min = monthDate;
    if (!max || monthDate > max) max = monthDate;
  }
  if (!min || !max) return "";
  const from = `${min.getUTCFullYear()}-${String(min.getUTCMonth() + 1).padStart(2, "0")}`;
  const to = `${max.getUTCFullYear()}-${String(max.getUTCMonth() + 1).padStart(2, "0")}`;
  return from === to ? from : `${from}_to_${to}`;
}

function findBestFileEntry(requiredCanonTokens, disallowId) {
  let best = null;
  let bestScore = 0;
  for (const entry of state.fileEntries) {
    if (disallowId && String(entry.id) === String(disallowId)) continue;
    const cols = columnsForFileEntry(entry).map((col) => canonical(col));
    let score = 0;
    for (const token of requiredCanonTokens) {
      if (cols.some((col) => col.includes(token))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best : null;
}

function findColumnByCanonical(columns, canonCandidates) {
  const list = columns || [];
  for (const candidate of canonCandidates) {
    const exact = list.find((col) => canonical(col) === candidate);
    if (exact) return exact;
  }
  for (const candidate of canonCandidates) {
    const partial = list.find((col) => canonical(col).includes(candidate) || candidate.includes(canonical(col)));
    if (partial) return partial;
  }
  return "";
}

async function loadFiles(fileList) {
  const files = Array.from(fileList || []);
  if (files.length === 0) return;

  try {
    setStatus(t("status.reading_files"), "neutral");
    setBusy(true);

    const existingSignatures = new Set(state.fileEntries.map((entry) => entry.signature));
    const incomingFiles = files.filter((file) => !existingSignatures.has(fileSignature(file)));
    const skippedCount = files.length - incomingFiles.length;

    if (incomingFiles.length === 0) {
      setStatus(t("status.duplicate_files"), "warn");
      return;
    }

    const rowsByFile = await Promise.all(
      incomingFiles.map(async (file) => {
        const rows = await readRowsFromFile(file);
        return {
          file,
          rows: rows.map((row) => ({ ...row, __source_file: file.name })),
        };
      })
    );

    for (const item of rowsByFile) {
      state.fileEntries.push({
        id: state.nextFileId,
        signature: fileSignature(item.file),
        fileName: item.file.name,
        fileSize: item.file.size,
        rows: item.rows,
      });
      state.nextFileId += 1;
    }

    rebuildDatasetFromFileEntries();

    if (state.pluginMode === "rabies") {
      applyRabiesPluginPreset();
    } else if (state.pluginMode === "model347") {
      applyModel347PluginPreset();
    }

    if (state.combineError) {
      throw new Error(state.combineError);
    }

    if (state.rawRows.length === 0) {
      if (state.combine.mode === "join" && state.fileEntries.length < 2) {
        invalidateGenerated();
        renderAll();
        setStatus(t("status.join_wait_second"), "warn");
        return;
      }
      throw new Error(t("status.no_rows_in_upload"));
    }

    invalidateGenerated();
    renderAll();

    const skippedText = skippedCount > 0 ? t("status.skipped_files", { count: skippedCount }) : "";
    setStatus(
      t("status.added_files", {
        added: incomingFiles.length,
        totalFiles: state.files.length,
        rows: state.rawRows.length,
        skipped: skippedText,
      }),
      "ok"
    );
  } catch (error) {
    invalidateGenerated();
    renderAll();
    setStatus(error instanceof Error ? error.message : String(error), "err");
  } finally {
    setBusy(false);
  }
}

function clearLoadedData() {
  state.fileEntries = [];
  state.nextFileId = 1;
  state.files = [];
  state.rawRows = [];
  state.columns = [];
  state.combine = {
    mode: "append",
    primaryFileId: "",
    leftFileId: "",
    rightFileId: "",
    leftKey: "",
    rightKey: "",
    joinType: "left",
  };
  state.mergeNotes = [];
  state.combineError = "";
  state.selectedColumns = [];
  state.renameMap = {};
  state.filters = [];
  state.dateFilter = { enabled: false, column: "", from: "", to: "" };
  state.quarterPivot = {
    groupBy1: "",
    groupBy2: "",
    dateColumn: "",
    valueColumn: "",
    missingGroup1: "FALTA NIF/DNI",
    minTotal: "3005.06",
    group1Label: "Número de ID del Cliente",
    group2Label: "Cliente",
    totalLabel: "Total Anual",
  };
  state.sort = { column: "", direction: "asc" };
  state.generated = null;
  state.autoOutputName = true;

  if (state.pluginMode === "rabies") {
    applyRabiesPluginPreset();
  } else if (state.pluginMode === "model347") {
    applyModel347PluginPreset();
  }

  renderAll();
  setStatus(t("status.loaded_data_cleared"), "neutral");
}

function onCombineSettingsChanged() {
  if (state.pluginMode !== "custom") {
    state.pluginMode = "custom";
    state.showAdvanced = true;
  }
  state.combine.mode = ["join", "smart"].includes(el.combineMode.value) ? el.combineMode.value : "append";
  state.combine.primaryFileId = el.smartPrimaryFile.value || "";
  state.combine.leftFileId = el.joinLeftFile.value || "";
  state.combine.rightFileId = el.joinRightFile.value || "";
  state.combine.leftKey = el.joinLeftKey.value || "";
  state.combine.rightKey = el.joinRightKey.value || "";
  state.combine.joinType = el.joinType.value === "left" ? "left" : "inner";

  rebuildDatasetFromFileEntries();
  invalidateGenerated();
  renderAll();
  if (state.combineError) {
    setStatus(state.combineError, "err");
  } else {
    setStatus(t("status.combine_updated"), "neutral");
  }
}

function onLoadedFilesAction(event) {
  const btn = event.target.closest("button[data-action='remove-file']");
  if (!btn) return;
  const fileId = Number(btn.dataset.fileId);
  if (!Number.isInteger(fileId)) return;

  state.fileEntries = state.fileEntries.filter((entry) => entry.id !== fileId);
  rebuildDatasetFromFileEntries();

  if (state.pluginMode === "rabies") {
    applyRabiesPluginPreset();
  } else if (state.pluginMode === "model347") {
    applyModel347PluginPreset();
  }

  invalidateGenerated();
  renderAll();

  if (state.combineError) {
    setStatus(state.combineError, "err");
    return;
  }

  if (state.fileEntries.length === 0) {
    setStatus(t("status.all_files_removed"), "neutral");
  } else {
    setStatus(t("status.file_removed", { count: state.files.length }), "neutral");
  }
}

function rebuildDatasetFromFileEntries() {
  state.mergeNotes = [];
  state.combineError = "";
  state.files = state.fileEntries.map((entry) => ({
    name: entry.fileName,
    size: entry.fileSize,
  }));

  try {
    if (state.combine.mode === "join") {
      rebuildJoinDataset();
    } else if (state.combine.mode === "smart") {
      rebuildSmartDataset();
    } else {
      rebuildAppendDataset();
    }
  } catch (error) {
    state.rawRows = [];
    state.columns = [];
    state.selectedColumns = [];
    state.sort.column = "";
    state.combineError = error instanceof Error ? error.message : String(error);
    return;
  }

  if (state.rawRows.length === 0) {
    state.columns = [];
    state.selectedColumns = [];
    state.sort.column = "";
    return;
  }

  state.columns = collectColumns(state.rawRows);
  if (!state.columns.includes("__source_file")) {
    state.columns.unshift("__source_file");
  } else {
    state.columns = ["__source_file", ...state.columns.filter((x) => x !== "__source_file")];
  }

  reconcileWithColumns();
}

function rebuildAppendDataset() {
  state.rawRows = state.fileEntries.flatMap((entry) => entry.rows);
}

function rebuildJoinDataset() {
  if (state.fileEntries.length < 2) {
    state.rawRows = [];
    return;
  }

  const leftEntry = resolveJoinEntry("left");
  const rightEntry = resolveJoinEntry("right", leftEntry?.id);
  if (!leftEntry || !rightEntry) {
    state.rawRows = [];
    return;
  }

  state.combine.leftFileId = String(leftEntry.id);
  state.combine.rightFileId = String(rightEntry.id);

  const leftColumns = columnsForFileEntry(leftEntry);
  const rightColumns = columnsForFileEntry(rightEntry);

  if (!leftColumns.includes(state.combine.leftKey)) {
    state.combine.leftKey = leftColumns[0] || "";
  }
  if (!rightColumns.includes(state.combine.rightKey)) {
    state.combine.rightKey = rightColumns[0] || "";
  }

  if (!state.combine.leftKey || !state.combine.rightKey) {
    state.rawRows = [];
    return;
  }

  const joinResult = buildJoinedRows(leftEntry, rightEntry, state.combine.leftKey, state.combine.rightKey, state.combine.joinType);
  state.rawRows = joinResult.rows;

  const modeText = state.combine.joinType === "left" ? "left join" : "inner join";
  const pairText = joinResult.comparisonPairs.length > 0
    ? ` Disambiguation fields: ${joinResult.comparisonPairs.map((p) => `${p.left} ↔ ${p.right}`).join(", ")}.`
    : "";
  state.mergeNotes.push(
    `Join (${modeText}) on ${state.combine.leftKey} ↔ ${state.combine.rightKey}: matched ${joinResult.stats.matchedLeftRows}/${joinResult.stats.leftRows} left rows, unresolved ${joinResult.stats.unmatchedLeftRows}, ambiguous keys resolved ${joinResult.stats.ambiguousLeftRows}.${pairText}`
  );
}

function resolveJoinEntry(side, disallowId) {
  const currentId = side === "left" ? state.combine.leftFileId : state.combine.rightFileId;
  let entry = currentId ? state.fileEntries.find((x) => String(x.id) === String(currentId)) : null;
  if (entry && disallowId && String(entry.id) === String(disallowId)) {
    entry = null;
  }
  if (entry) return entry;

  for (const candidate of state.fileEntries) {
    if (disallowId && String(candidate.id) === String(disallowId)) continue;
    return candidate;
  }
  return null;
}

function columnsForFileEntry(entry) {
  if (!entry || !entry.rows || entry.rows.length === 0) return [];
  return collectColumns(entry.rows).filter((col) => col !== "__source_file");
}

function buildJoinedRows(leftEntry, rightEntry, leftKey, rightKey, joinType) {
  const leftColumns = columnsForFileEntry(leftEntry);
  const rightColumns = columnsForFileEntry(rightEntry);
  const rightMap = new Map();
  const comparisonPairs = buildJoinComparisonPairs(leftEntry.rows, rightEntry.rows, leftColumns, rightColumns, leftKey, rightKey);

  for (const row of rightEntry.rows) {
    const key = joinKey(row[rightKey]);
    if (!rightMap.has(key)) rightMap.set(key, []);
    rightMap.get(key).push(row);
  }

  const merged = [];
  const stats = {
    leftRows: leftEntry.rows.length,
    matchedLeftRows: 0,
    unmatchedLeftRows: 0,
    ambiguousLeftRows: 0,
  };

  for (const leftRow of leftEntry.rows) {
    const key = joinKey(leftRow[leftKey]);
    const matches = key ? rightMap.get(key) || [] : [];

    if (matches.length === 0 && joinType === "inner") continue;

    if (matches.length === 0) {
      stats.unmatchedLeftRows += 1;
      merged.push(joinRow(leftRow, null, leftColumns, rightColumns, leftEntry.fileName, rightEntry.fileName, key));
      continue;
    }

    stats.matchedLeftRows += 1;

    let rightRow = matches[0];
    if (matches.length > 1) {
      stats.ambiguousLeftRows += 1;
      rightRow = selectBestJoinCandidate(leftRow, matches, comparisonPairs);
    }
    merged.push(joinRow(leftRow, rightRow, leftColumns, rightColumns, leftEntry.fileName, rightEntry.fileName, key));
  }

  if (joinType === "inner") {
    stats.unmatchedLeftRows = stats.leftRows - stats.matchedLeftRows;
  }

  return {
    rows: merged,
    stats,
    comparisonPairs,
  };
}

function buildJoinComparisonPairs(leftRows, rightRows, leftColumns, rightColumns, leftKey, rightKey) {
  const leftValueSets = new Map(leftColumns.map((col) => [col, buildColumnValueSet(leftRows, col)]));
  const rightValueSets = new Map(rightColumns.map((col) => [col, buildColumnValueSet(rightRows, col)]));

  const candidates = [];
  for (const leftCol of leftColumns) {
    if (leftCol === leftKey) continue;
    for (const rightCol of rightColumns) {
      if (rightCol === rightKey) continue;

      const nameScore = columnNameSimilarity(leftCol, rightCol);
      if (nameScore < 0.35) continue;

      const leftSet = leftValueSets.get(leftCol) || new Set();
      const rightSet = rightValueSets.get(rightCol) || new Set();
      if (leftSet.size === 0 || rightSet.size === 0) continue;

      let overlapCount = 0;
      for (const value of leftSet) {
        if (rightSet.has(value)) overlapCount += 1;
      }
      if (overlapCount === 0) continue;

      const overlapRate = overlapCount / Math.max(1, Math.min(leftSet.size, rightSet.size));
      const score = nameScore * 0.55 + overlapRate * 0.9;
      if (score < 0.45) continue;

      candidates.push({
        left: leftCol,
        right: rightCol,
        nameScore,
        overlapRate,
        score,
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  const selected = [];
  const usedLeft = new Set();
  const usedRight = new Set();
  for (const candidate of candidates) {
    if (usedLeft.has(candidate.left) || usedRight.has(candidate.right)) continue;
    selected.push(candidate);
    usedLeft.add(candidate.left);
    usedRight.add(candidate.right);
    if (selected.length >= 6) break;
  }

  return selected;
}

function buildColumnValueSet(rows, columnName, maxValues = 3000) {
  const values = new Set();
  for (const row of rows) {
    const value = joinKey(row[columnName]);
    if (!value) continue;
    values.add(value);
    if (values.size >= maxValues) break;
  }
  return values;
}

function selectBestJoinCandidate(leftRow, matches, comparisonPairs) {
  if (!comparisonPairs || comparisonPairs.length === 0 || matches.length <= 1) return matches[0];

  let best = matches[0];
  let bestScore = {
    exactMatches: -1,
    score: Number.NEGATIVE_INFINITY,
    compared: -1,
    nonEmpty: -1,
  };

  for (const candidate of matches) {
    const score = scoreJoinCandidate(leftRow, candidate, comparisonPairs);
    if (
      score.exactMatches > bestScore.exactMatches ||
      (score.exactMatches === bestScore.exactMatches && score.score > bestScore.score) ||
      (score.exactMatches === bestScore.exactMatches && score.score === bestScore.score && score.compared > bestScore.compared) ||
      (score.exactMatches === bestScore.exactMatches &&
        score.score === bestScore.score &&
        score.compared === bestScore.compared &&
        score.nonEmpty > bestScore.nonEmpty)
    ) {
      best = candidate;
      bestScore = score;
    }
  }

  return best;
}

function scoreJoinCandidate(leftRow, rightRow, comparisonPairs) {
  let exactMatches = 0;
  let score = 0;
  let compared = 0;
  let nonEmpty = 0;

  for (const pair of comparisonPairs) {
    const leftValue = joinKey(leftRow[pair.left]);
    const rightValue = joinKey(rightRow[pair.right]);
    if (!leftValue || !rightValue) continue;
    compared += 1;

    if (leftValue === rightValue) {
      exactMatches += 1;
      score += 3 + pair.score;
    } else if (leftValue.includes(rightValue) || rightValue.includes(leftValue)) {
      score += 0.7;
    } else {
      score -= 0.25;
    }
  }

  for (const pair of comparisonPairs) {
    if (joinKey(rightRow[pair.right])) nonEmpty += 1;
  }

  return { exactMatches, score, compared, nonEmpty };
}

function joinRow(leftRow, rightRow, leftColumns, rightColumns, leftFileName, rightFileName, joinKeyValue) {
  const row = {
    __source_file: `${leftFileName} + ${rightFileName}`,
    __join_key: joinKeyValue,
  };

  for (const col of leftColumns) {
    row[`L.${col}`] = leftRow[col] ?? null;
  }

  for (const col of rightColumns) {
    row[`R.${col}`] = rightRow ? rightRow[col] ?? null : null;
  }

  return row;
}

function joinKey(value) {
  if (isNullish(value)) return "";
  return normalizeString(value);
}

function rebuildSmartDataset() {
  if (state.fileEntries.length === 0) {
    state.rawRows = [];
    return;
  }

  let primary = state.fileEntries.find((entry) => String(entry.id) === String(state.combine.primaryFileId));
  if (!primary) primary = state.fileEntries[0];
  state.combine.primaryFileId = String(primary.id);

  let currentRows = primary.rows.map((row) => ({ ...row }));
  const others = state.fileEntries.filter((entry) => entry.id !== primary.id);

  if (others.length === 0) {
    state.rawRows = currentRows;
    return;
  }

  for (const other of others) {
    const baseColumns = collectColumns(currentRows).filter((col) => col !== "__source_file");
    const otherColumns = columnsForFileEntry(other);
    const candidates = findKeyCandidates(baseColumns, otherColumns);

    if (candidates.length === 0) {
      throw new Error(`Cannot smart-merge "${other.fileName}": no common key columns were detected.`);
    }

    const keyPlan = detectBestKeyPlan(currentRows, other.rows, candidates);

    if (!keyPlan || keyPlan.pairs.length === 0) {
      throw new Error(`Cannot smart-merge "${other.fileName}": common columns exist but no key plan could be built.`);
    }
    if (keyPlan.matchedRows === 0) {
      throw new Error(`Cannot smart-merge "${other.fileName}": key columns were found but no matching values exist.`);
    }

    currentRows = mergeRowsByPlan(currentRows, other.rows, keyPlan, other.fileName);
    const pairText = keyPlan.pairs.map((p) => `${p.left} ↔ ${p.right}`).join(" + ");
    state.mergeNotes.push(
      `Merged ${other.fileName} using ${pairText} (${keyPlan.matchedRows}/${currentRows.length} base rows matched, ${(keyPlan.coverage * 100).toFixed(1)}%).`
    );
  }

  state.rawRows = currentRows;
}

function findKeyCandidates(leftColumns, rightColumns) {
  const candidates = [];
  for (const leftCol of leftColumns) {
    for (const rightCol of rightColumns) {
      const nameScore = columnNameSimilarity(leftCol, rightCol);
      if (nameScore < 0.4) continue;
      candidates.push({ left: leftCol, right: rightCol, nameScore });
    }
  }
  return candidates;
}

function detectBestKeyPlan(leftRows, rightRows, candidates) {
  const top = [...candidates].sort((a, b) => b.nameScore - a.nameScore).slice(0, 10);
  if (top.length === 0) return null;

  let best = null;
  for (const pair of top) {
    const plan = evaluateKeyPlan(leftRows, rightRows, [pair]);
    if (!best || plan.score > best.score) best = plan;
  }

  for (let i = 0; i < top.length; i += 1) {
    for (let j = i + 1; j < top.length; j += 1) {
      const p1 = top[i];
      const p2 = top[j];
      if (p1.left === p2.left || p1.right === p2.right) continue;
      const plan = evaluateKeyPlan(leftRows, rightRows, [p1, p2]);
      if (!best || plan.score > best.score) best = plan;
    }
  }

  return best;
}

function evaluateKeyPlan(leftRows, rightRows, pairs) {
  const leftStats = buildKeyStats(leftRows, pairs, "left");
  const rightStats = buildKeyStats(rightRows, pairs, "right");

  const matchedRows = leftStats.nonEmptyKeys.filter((key) => rightStats.keySet.has(key)).length;
  const matchedDistinct = Array.from(leftStats.keySet).filter((key) => rightStats.keySet.has(key)).length;
  const coverage = leftStats.nonEmptyKeys.length > 0 ? matchedRows / leftStats.nonEmptyKeys.length : 0;
  const distinctCoverage = leftStats.keySet.size > 0 ? matchedDistinct / leftStats.keySet.size : 0;

  const dupLeft = leftStats.nonEmptyKeys.length > 0 ? (leftStats.nonEmptyKeys.length - leftStats.keySet.size) / leftStats.nonEmptyKeys.length : 1;
  const dupRight = rightStats.nonEmptyKeys.length > 0 ? (rightStats.nonEmptyKeys.length - rightStats.keySet.size) / rightStats.nonEmptyKeys.length : 1;

  const avgName = pairs.reduce((sum, p) => sum + p.nameScore, 0) / pairs.length;
  const score = coverage + 0.25 * distinctCoverage - 0.35 * (dupLeft + dupRight) + 0.2 * avgName;

  return { pairs, coverage, distinctCoverage, matchedRows, matchedDistinct, dupLeft, dupRight, avgName, score };
}

function buildKeyStats(rows, pairs, side) {
  const keys = [];
  for (const row of rows) {
    const key = buildCompositeKey(row, pairs, side);
    if (!key) continue;
    keys.push(key);
  }
  return {
    nonEmptyKeys: keys,
    keySet: new Set(keys),
  };
}

function buildCompositeKey(row, pairs, side) {
  const parts = [];
  for (const pair of pairs) {
    const col = side === "left" ? pair.left : pair.right;
    const value = joinKey(row[col]);
    if (!value) return "";
    parts.push(value);
  }
  return parts.join("||");
}

function mergeRowsByPlan(baseRows, otherRows, plan, otherFileName) {
  const rightMap = new Map();
  for (const row of otherRows) {
    const key = buildCompositeKey(row, plan.pairs, "right");
    if (!key) continue;
    if (!rightMap.has(key)) rightMap.set(key, row);
  }

  const result = [];
  const currentColumns = collectColumns(baseRows);
  const currentCanonMap = new Map(currentColumns.map((col) => [canonical(col), col]));
  const otherColumns = collectColumns(otherRows).filter((col) => col !== "__source_file");
  const filePrefix = sanitizeColumnPrefix(otherFileName);

  for (const baseRow of baseRows) {
    const key = buildCompositeKey(baseRow, plan.pairs, "left");
    const match = key ? rightMap.get(key) : null;

    const merged = { ...baseRow };
    merged[`__match_${filePrefix}`] = Boolean(match);

    if (match) {
      for (const col of otherColumns) {
        const value = match[col];
        if (isNullish(value)) continue;

        const canon = canonical(col);
        const existingCol = currentCanonMap.get(canon);
        if (existingCol) {
          if (isNullish(merged[existingCol])) {
            merged[existingCol] = value;
          }
          continue;
        }

        const prefixed = `${filePrefix}.${col}`;
        merged[prefixed] = value;
      }
    }

    result.push(merged);
  }

  return result;
}

function sanitizeColumnPrefix(fileName) {
  return String(fileName || "file")
    .replace(/\.[^.]+$/, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32) || "file";
}

function reconcileWithColumns() {
  if (state.columns.length === 0) return;

  if (state.selectedColumns.length === 0) {
    state.selectedColumns = [...state.columns];
  } else {
    state.selectedColumns = state.selectedColumns.filter((col) => state.columns.includes(col));
    if (state.selectedColumns.length === 0) state.selectedColumns = [...state.columns];
  }

  for (const col of state.columns) {
    if (!state.renameMap[col]) state.renameMap[col] = defaultOutputHeader(col);
  }

  for (const filter of state.filters) {
    if (!state.columns.includes(filter.column)) filter.column = state.columns[0];
  }

  if (!state.columns.includes(state.dateFilter.column)) {
    state.dateFilter.column = guessDateColumn(state.columns) || state.columns[0];
  }

  if (state.reportMode === "detailed") {
    if (!state.columns.includes(state.sort.column)) state.sort.column = "";
  } else if (state.reportMode === "summary" && !["", "__group", "__metric"].includes(state.sort.column)) {
    state.sort.column = "";
  } else if (state.reportMode === "quarter_pivot" && !["", "__group1", "__group2", "__total"].includes(state.sort.column)) {
    state.sort.column = "";
  }

  if (!state.columns.includes(state.summary.groupBy)) {
    state.summary.groupBy = firstNonSourceColumn(state.columns) || state.columns[0];
  }

  if (!state.columns.includes(state.summary.aggColumn)) {
    state.summary.aggColumn = firstNumericLikeColumn(state.rawRows, state.columns) || firstNonSourceColumn(state.columns) || state.columns[0];
  }

  if (!state.summary.groupLabel) state.summary.groupLabel = "Group";
  if (!state.summary.metricLabel) state.summary.metricLabel = defaultMetricLabel(state.summary.aggFn, state.summary.aggColumn);

  if (!state.columns.includes(state.quarterPivot.groupBy1)) {
    state.quarterPivot.groupBy1 = firstNonSourceColumn(state.columns) || state.columns[0];
  }
  if (!state.columns.includes(state.quarterPivot.groupBy2)) {
    const first = state.quarterPivot.groupBy1;
    state.quarterPivot.groupBy2 = state.columns.find((col) => col !== "__source_file" && col !== first) || first || state.columns[0];
  }
  if (!state.columns.includes(state.quarterPivot.dateColumn)) {
    state.quarterPivot.dateColumn = guessDateColumn(state.columns) || state.columns[0];
  }
  if (!state.columns.includes(state.quarterPivot.valueColumn)) {
    state.quarterPivot.valueColumn = firstNumericLikeColumn(state.rawRows, state.columns) || firstNonSourceColumn(state.columns) || state.columns[0];
  }
  if (!state.quarterPivot.missingGroup1) state.quarterPivot.missingGroup1 = "FALTA NIF/DNI";
  if (!state.quarterPivot.group1Label) state.quarterPivot.group1Label = "Número de ID del Cliente";
  if (!state.quarterPivot.group2Label) state.quarterPivot.group2Label = "Cliente";
  if (!state.quarterPivot.totalLabel) state.quarterPivot.totalLabel = "Total Anual";
}

function renderAll() {
  renderPluginControls();
  renderCombineControls();
  renderDataSummary();
  renderLoadedFiles();
  renderModeSections();
  renderPluginLayout();
  renderAvailableColumns();
  renderSelectedColumns();
  renderSummaryControls();
  renderQuarterControls();
  renderFilters();
  renderSortControls();
  renderPreview(state.generated);
  refreshActionLabels();

  el.reportMode.value = state.reportMode;
  el.outputName.value = state.outputName;
  el.sheetName.value = state.sheetName;
}

function renderPluginControls() {
  const current = state.pluginMode;
  document.body.dataset.pluginMode = current;
  const pluginButtons = [
    { el: el.pluginCustomBtn, mode: "custom" },
    { el: el.pluginRabiesBtn, mode: "rabies" },
    { el: el.pluginModel347Btn, mode: "model347" },
  ];

  for (const item of pluginButtons) {
    item.el.classList.toggle("is-active", current === item.mode);
  }

  if (current === "rabies") {
    el.pluginHint.textContent = state.showAdvanced
      ? t("plugin.hint.rabies.advanced")
      : t("plugin.hint.rabies.simple");
  } else if (current === "model347") {
    el.pluginHint.textContent = state.showAdvanced
      ? t("plugin.hint.model347.advanced")
      : t("plugin.hint.model347.simple");
  } else {
    state.showAdvanced = true;
    el.pluginHint.textContent = t("plugin.hint.custom");
  }

  el.showAdvancedToggle.disabled = current === "custom";
  el.showAdvancedToggle.checked = state.showAdvanced;
}

function renderPluginLayout() {
  const pluginPresetMode = state.pluginMode !== "custom";
  const simplePluginMode = state.pluginMode !== "custom" && !state.showAdvanced;
  const rabiesSimple = simplePluginMode && state.pluginMode === "rabies";
  const model347Simple = simplePluginMode && state.pluginMode === "model347";
  const rabiesLoaded = state.fileEntries.length;
  const modelLoaded = state.fileEntries.length;

  el.simplePluginPanel.hidden = !simplePluginMode;
  el.rabiesSimplePanel.hidden = !rabiesSimple;
  el.model347SimplePanel.hidden = !model347Simple;

  el.rabiesSimpleOutput.value = state.outputName;
  el.rabiesIncludeUnmatched.checked = state.combine.joinType === "left";
  el.model347SimpleOutput.value = state.outputName;
  el.model347Threshold.value = state.quarterPivot.minTotal;
  el.rabiesFileStatus.textContent =
    rabiesLoaded === 2
      ? t("rabies.file_status.ok")
      : t("rabies.file_status.wait", { loaded: rabiesLoaded });
  el.model347FileStatus.textContent =
    modelLoaded === 1
      ? t("model347.file_status.ok")
      : t("model347.file_status.wait", { loaded: modelLoaded });

  el.buildCard.hidden = simplePluginMode;
  el.combineModeWrap.hidden = pluginPresetMode;
  el.combineModeField.hidden = pluginPresetMode;
  el.combineModeHelp.hidden = pluginPresetMode;
  el.combineModeWrap.style.display = pluginPresetMode ? "none" : "grid";
  el.combineModeField.style.display = pluginPresetMode ? "none" : "";
  el.configActions.hidden = simplePluginMode;
  el.reportModeField.hidden = simplePluginMode;
  el.sheetNameField.hidden = simplePluginMode;
  el.filtersCard.hidden = simplePluginMode;
  el.sortCard.hidden = simplePluginMode;
  el.dataSummary.hidden = simplePluginMode;
  el.loadedFilesWrap.hidden = simplePluginMode;
  el.pluginHint.hidden = simplePluginMode;
  el.simpleLoadedFilesBox.hidden = !simplePluginMode;

  if (simplePluginMode) {
    el.smartSettings.hidden = true;
    el.joinSettings.hidden = true;
    if (rabiesSimple) {
      el.dropZoneTitle.textContent = t("data.drop.rabies_title");
      el.dropZoneHint.textContent = t("data.drop.rabies_hint");
    } else if (model347Simple) {
      el.dropZoneTitle.textContent = t("data.drop.model_title");
      el.dropZoneHint.textContent = t("data.drop.model_hint");
    }
  } else {
    el.dropZoneTitle.textContent = t("data.drop.default_title");
    el.dropZoneHint.textContent = t("data.drop.default_hint");
  }

  // In Modelo 347 simple mode, keep only threshold in quarter settings when advanced is enabled.
  for (const field of el.quarterAdvancedFields) {
    field.hidden = model347Simple;
  }

  renderSimpleLoadedFiles(simplePluginMode);
}

function renderCombineControls() {
  el.combineMode.value = state.combine.mode;
  const combineHelpKey = state.combine.mode === "join"
    ? "data.combine.help.join"
    : state.combine.mode === "smart"
      ? "data.combine.help.smart"
      : "data.combine.help.append";
  el.combineModeHelp.textContent = t(combineHelpKey);
  const smartMode = state.combine.mode === "smart";
  const joinMode = state.combine.mode === "join";
  el.smartSettings.hidden = !smartMode;
  el.joinSettings.hidden = !joinMode;

  const fileOptions = state.fileEntries.map((entry) => ({
    value: String(entry.id),
    label: entry.fileName,
  }));

  renderOptionList(el.smartPrimaryFile, fileOptions, state.combine.primaryFileId);
  state.combine.primaryFileId = el.smartPrimaryFile.value || "";

  renderOptionList(el.joinLeftFile, fileOptions, state.combine.leftFileId);

  const rightOptions = state.fileEntries
    .filter((entry) => String(entry.id) !== String(state.combine.leftFileId))
    .map((entry) => ({
      value: String(entry.id),
      label: entry.fileName,
    }));
  renderOptionList(el.joinRightFile, rightOptions, state.combine.rightFileId);

  state.combine.leftFileId = el.joinLeftFile.value || "";
  state.combine.rightFileId = el.joinRightFile.value || "";

  const leftEntry = state.fileEntries.find((entry) => String(entry.id) === state.combine.leftFileId) || null;
  const rightEntry = state.fileEntries.find((entry) => String(entry.id) === state.combine.rightFileId) || null;

  const leftColumns = columnsForFileEntry(leftEntry);
  const rightColumns = columnsForFileEntry(rightEntry);

  renderOptionList(
    el.joinLeftKey,
    leftColumns.map((col) => ({ value: col, label: displayColumnName(col) })),
    state.combine.leftKey
  );
  renderOptionList(
    el.joinRightKey,
    rightColumns.map((col) => ({ value: col, label: displayColumnName(col) })),
    state.combine.rightKey
  );

  state.combine.leftKey = el.joinLeftKey.value || "";
  state.combine.rightKey = el.joinRightKey.value || "";
  el.joinType.value = state.combine.joinType;
}

function renderDataSummary() {
  if (state.files.length === 0) {
    el.dataSummary.textContent = t("data.summary.none");
    return;
  }

  if (state.combineError) {
    el.dataSummary.textContent = t("data.summary.merge_error", { error: state.combineError });
    return;
  }

  if (state.combine.mode === "join" && state.rawRows.length === 0) {
    el.dataSummary.textContent = t("data.summary.join_zero");
    return;
  }
  if (state.combine.mode === "smart" && state.rawRows.length === 0) {
    el.dataSummary.textContent = t("data.summary.smart_zero");
    return;
  }

  const fileNames = state.files.map((f) => f.name).join(", ");
  const modeText =
    state.combine.mode === "join"
      ? t("data.summary.mode.join")
      : state.combine.mode === "smart"
        ? t("data.summary.mode.smart")
        : t("data.summary.mode.append");
  const mergeInfo =
    state.mergeNotes.length > 0 ? ` ${state.mergeNotes.join(" ")}` : "";
  el.dataSummary.textContent = t("data.summary.loaded", {
    count: state.files.length,
    names: fileNames,
    rows: state.rawRows.length,
    mode: modeText,
    mergeInfo,
  });
}

function renderLoadedFiles() {
  el.loadedFilesBody.innerHTML = "";

  if (state.fileEntries.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = t("data.table.empty");
    tr.appendChild(td);
    el.loadedFilesBody.appendChild(tr);
    return;
  }

  for (const entry of state.fileEntries) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = entry.fileName;
    tr.appendChild(tdName);

    const tdRows = document.createElement("td");
    tdRows.textContent = String(entry.rows.length);
    tdRows.className = "num";
    tr.appendChild(tdRows);

    const tdSize = document.createElement("td");
    tdSize.textContent = formatFileSize(entry.fileSize);
    tr.appendChild(tdSize);

    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-small";
    btn.dataset.action = "remove-file";
    btn.dataset.fileId = String(entry.id);
    btn.textContent = t("action.remove");
    tdAction.appendChild(btn);
    tr.appendChild(tdAction);

    el.loadedFilesBody.appendChild(tr);
  }
}

function renderSimpleLoadedFiles(enabled) {
  el.simpleLoadedFilesList.innerHTML = "";
  if (!enabled) return;

  if (state.fileEntries.length === 0) {
    const li = document.createElement("li");
    li.className = "simple-files-item";
    li.textContent = t("data.file.none_simple");
    el.simpleLoadedFilesList.appendChild(li);
    return;
  }

  for (const entry of state.fileEntries) {
    const li = document.createElement("li");
    li.className = "simple-files-item";

    const meta = document.createElement("div");
    meta.className = "simple-files-meta";

    const name = document.createElement("div");
    name.className = "simple-files-name";
    name.textContent = entry.fileName;
    meta.appendChild(name);

    const sub = document.createElement("div");
    sub.className = "simple-files-sub";
    sub.textContent = t("data.file.meta", { rows: entry.rows.length, size: formatFileSize(entry.fileSize) });
    meta.appendChild(sub);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-small";
    btn.dataset.action = "remove-file";
    btn.dataset.fileId = String(entry.id);
    btn.textContent = t("action.remove");

    li.appendChild(meta);
    li.appendChild(btn);
    el.simpleLoadedFilesList.appendChild(li);
  }
}

function renderModeSections() {
  const detailedMode = state.reportMode === "detailed";
  const summaryMode = state.reportMode === "summary";
  const quarterMode = state.reportMode === "quarter_pivot";
  el.detailedSection.hidden = !detailedMode;
  el.summarySection.hidden = !summaryMode;
  el.quarterSection.hidden = !quarterMode;
}

function renderAvailableColumns() {
  el.availableColumns.innerHTML = "";
  const available = state.columns.filter((col) => !state.selectedColumns.includes(col));

  if (available.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = t("columns.none_left");
    el.availableColumns.appendChild(opt);
    el.addColumnBtn.disabled = true;
    return;
  }

  for (const col of available) {
    const opt = document.createElement("option");
    opt.value = col;
    opt.textContent = displayColumnName(col);
    el.availableColumns.appendChild(opt);
  }
  el.addColumnBtn.disabled = false;
}

function renderSelectedColumns() {
  el.selectedColumnsBody.innerHTML = "";

  if (state.selectedColumns.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = t("columns.none_selected");
    tr.appendChild(td);
    el.selectedColumnsBody.appendChild(tr);
    return;
  }

  state.selectedColumns.forEach((col, index) => {
    const tr = document.createElement("tr");
    tr.dataset.col = col;

    const tdIndex = document.createElement("td");
    tdIndex.textContent = String(index + 1);
    tr.appendChild(tdIndex);

    const tdSource = document.createElement("td");
    tdSource.textContent = displayColumnName(col);
    tr.appendChild(tdSource);

    const tdRename = document.createElement("td");
    const renameInput = document.createElement("input");
    renameInput.type = "text";
    renameInput.value = state.renameMap[col] || defaultOutputHeader(col);
    renameInput.addEventListener("input", () => {
      state.renameMap[col] = renameInput.value;
      invalidateGenerated();
    });
    tdRename.appendChild(renameInput);
    tr.appendChild(tdRename);

    const tdActions = document.createElement("td");
    tdActions.className = "row-actions";

    tdActions.appendChild(makeRowActionButton("up", t("action.up"), col, index === 0));
    tdActions.appendChild(makeRowActionButton("down", t("action.down"), col, index === state.selectedColumns.length - 1));
    tdActions.appendChild(makeRowActionButton("remove", t("action.remove"), col, false));

    tr.appendChild(tdActions);
    el.selectedColumnsBody.appendChild(tr);
  });
}

function makeRowActionButton(action, label, col, disabled) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-small";
  btn.dataset.action = action;
  btn.dataset.col = col;
  btn.textContent = label;
  btn.disabled = disabled;
  return btn;
}

function onSelectedColumnsAction(event) {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const col = btn.dataset.col;
  const idx = state.selectedColumns.indexOf(col);
  if (idx < 0) return;

  if (action === "up" && idx > 0) {
    [state.selectedColumns[idx - 1], state.selectedColumns[idx]] = [state.selectedColumns[idx], state.selectedColumns[idx - 1]];
  } else if (action === "down" && idx < state.selectedColumns.length - 1) {
    [state.selectedColumns[idx], state.selectedColumns[idx + 1]] = [state.selectedColumns[idx + 1], state.selectedColumns[idx]];
  } else if (action === "remove") {
    state.selectedColumns.splice(idx, 1);
  }

  invalidateGenerated();
  renderSelectedColumns();
  renderAvailableColumns();
}

function renderSummaryControls() {
  renderColumnSelect(el.summaryGroupBy, state.columns, state.summary.groupBy);
  renderColumnSelect(el.summaryAggColumn, state.columns, state.summary.aggColumn);

  el.summaryAggFn.value = state.summary.aggFn;
  el.summaryGroupLabel.value = state.summary.groupLabel;
  el.summaryMetricLabel.value = state.summary.metricLabel;

  const disableAggColumn = state.summary.aggFn === "count";
  el.summaryAggColumn.disabled = disableAggColumn;
}

function renderQuarterControls() {
  renderColumnSelect(el.qGroupBy1, state.columns, state.quarterPivot.groupBy1);
  renderColumnSelect(el.qGroupBy2, state.columns, state.quarterPivot.groupBy2);
  renderColumnSelect(el.qDateColumn, state.columns, state.quarterPivot.dateColumn);
  renderColumnSelect(el.qValueColumn, state.columns, state.quarterPivot.valueColumn);

  el.qMissingGroup1.value = state.quarterPivot.missingGroup1;
  el.qMinTotal.value = state.quarterPivot.minTotal;
  el.qGroup1Label.value = state.quarterPivot.group1Label;
  el.qGroup2Label.value = state.quarterPivot.group2Label;
  el.qTotalLabel.value = state.quarterPivot.totalLabel;
}

function renderFilters() {
  renderColumnSelect(el.dateColumn, state.columns, state.dateFilter.column);
  el.enableDateFilter.checked = state.dateFilter.enabled;
  el.dateFrom.value = state.dateFilter.from;
  el.dateTo.value = state.dateFilter.to;

  el.filtersList.innerHTML = "";

  if (state.filters.length === 0) {
    const empty = document.createElement("p");
    empty.className = "hint";
    empty.textContent = t("filters.none");
    el.filtersList.appendChild(empty);
    return;
  }

  for (const filter of state.filters) {
    const row = document.createElement("div");
    row.className = "filter-row";

    const colSel = document.createElement("select");
    appendColumnOptions(colSel, state.columns, filter.column);
    colSel.addEventListener("change", () => {
      filter.column = colSel.value;
      invalidateGenerated();
    });

    const opSel = document.createElement("select");
    for (const op of OPERATOR_OPTIONS) {
      const opt = document.createElement("option");
      opt.value = op.value;
      opt.textContent = op.label;
      opSel.appendChild(opt);
    }
    opSel.value = filter.operator;
    opSel.addEventListener("change", () => {
      filter.operator = opSel.value;
      invalidateGenerated();
      renderFilters();
    });

    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.value = filter.value;
    valueInput.placeholder = t("filters.value_placeholder");
    valueInput.disabled = NO_VALUE_OPERATORS.has(filter.operator);
    valueInput.addEventListener("input", () => {
      filter.value = valueInput.value;
      invalidateGenerated();
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn btn-small";
    removeBtn.textContent = t("action.remove");
    removeBtn.addEventListener("click", () => {
      state.filters = state.filters.filter((x) => x.id !== filter.id);
      invalidateGenerated();
      renderFilters();
    });

    row.appendChild(colSel);
    row.appendChild(opSel);
    row.appendChild(valueInput);
    row.appendChild(removeBtn);
    el.filtersList.appendChild(row);
  }
}

function renderSortControls() {
  el.sortColumn.innerHTML = "";

  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = t("sort.none");
  el.sortColumn.appendChild(blank);

  if (state.reportMode === "detailed") {
    for (const col of state.columns) {
      const opt = document.createElement("option");
      opt.value = col;
      opt.textContent = displayColumnName(col);
      el.sortColumn.appendChild(opt);
    }
  } else if (state.reportMode === "summary") {
    const groupOpt = document.createElement("option");
    groupOpt.value = "__group";
    groupOpt.textContent = state.summary.groupLabel || "Group";
    el.sortColumn.appendChild(groupOpt);

    const metricOpt = document.createElement("option");
    metricOpt.value = "__metric";
    metricOpt.textContent = state.summary.metricLabel || "Metric";
    el.sortColumn.appendChild(metricOpt);
  } else if (state.reportMode === "quarter_pivot") {
    const group1Opt = document.createElement("option");
    group1Opt.value = "__group1";
    group1Opt.textContent = state.quarterPivot.group1Label || "Group 1";
    el.sortColumn.appendChild(group1Opt);

    const group2Opt = document.createElement("option");
    group2Opt.value = "__group2";
    group2Opt.textContent = state.quarterPivot.group2Label || "Group 2";
    el.sortColumn.appendChild(group2Opt);

    const totalOpt = document.createElement("option");
    totalOpt.value = "__total";
    totalOpt.textContent = state.quarterPivot.totalLabel || "Total";
    el.sortColumn.appendChild(totalOpt);
  }

  if (!Array.from(el.sortColumn.options).some((x) => x.value === state.sort.column)) {
    state.sort.column = "";
  }

  el.sortColumn.value = state.sort.column;
  el.sortDirection.value = state.sort.direction;
}

async function onGenerateClicked() {
  if (state.combineError) {
    setStatus(state.combineError, "err");
    return;
  }

  const simplePluginMode = state.pluginMode !== "custom" && !state.showAdvanced;
  if (simplePluginMode && state.pluginMode === "rabies" && state.fileEntries.length !== 2) {
    setStatus(t("status.rabies_needs_two"), "warn");
    return;
  }
  if (simplePluginMode && state.pluginMode === "model347" && state.fileEntries.length !== 1) {
    setStatus(t("status.model347_needs_one"), "warn");
    return;
  }

  if (state.rawRows.length === 0) {
    if (state.files.length === 0) {
      setStatus(t("status.upload_first"), "warn");
    } else if (state.combine.mode === "join") {
      setStatus(t("status.no_joined_rows"), "warn");
    } else if (state.combine.mode === "smart") {
      setStatus(t("status.no_merged_rows"), "warn");
    } else {
      setStatus(t("status.no_rows_from_files"), "warn");
    }
    return;
  }

  try {
    setBusy(true);
    setStatus(t("status.generating_preview"), "neutral");

    const result = buildReportResult();
    state.generated = result;
    el.downloadBtn.disabled = false;

    renderPreview(result);
    setStatus(t("status.generated_rows", { rows: result.rows.length }), "ok");
  } catch (error) {
    state.generated = null;
    el.downloadBtn.disabled = true;
    renderPreview(null);
    setStatus(error instanceof Error ? error.message : String(error), "err");
  } finally {
    setBusy(false);
  }
}

function onDownloadClicked() {
  if (!state.generated) return;
  downloadResult(state.generated);
}

function onExportConfigClicked() {
  const config = getCurrentConfig();
  downloadJson(config, "excel_generator_config.json");
  setStatus(t("status.config_exported"), "ok");
}

async function onImportConfigSelected() {
  const file = el.importConfigInput.files && el.importConfigInput.files[0];
  el.importConfigInput.value = "";
  if (!file) return;

  try {
    const text = await readAsText(file);
    const parsed = JSON.parse(text);
    applyImportedConfig(parsed);
    invalidateGenerated();
    renderAll();
    setStatus(t("status.config_imported"), "ok");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), "err");
  }
}

function getCurrentConfig() {
  return {
    version: 1,
    pluginMode: state.pluginMode,
    showAdvanced: state.showAdvanced,
    combine: { ...state.combine },
    reportMode: state.reportMode,
    outputName: state.outputName,
    sheetName: state.sheetName,
    selectedColumns: [...state.selectedColumns],
    renameMap: { ...state.renameMap },
    summary: { ...state.summary },
    quarterPivot: { ...state.quarterPivot },
    dateFilter: { ...state.dateFilter },
    filters: state.filters.map((x) => ({ ...x })),
    sort: { ...state.sort },
  };
}

function applyImportedConfig(parsed) {
  if (!parsed || typeof parsed !== "object") {
    throw new Error(t("error.invalid_config"));
  }

  state.pluginMode = ["custom", "rabies", "model347"].includes(parsed.pluginMode) ? parsed.pluginMode : "custom";
  state.showAdvanced = typeof parsed.showAdvanced === "boolean" ? parsed.showAdvanced : state.pluginMode === "custom";
  state.autoOutputName = false;

  state.combine = {
    mode: parsed.combine?.mode === "join" || parsed.combine?.mode === "smart" ? parsed.combine.mode : "append",
    primaryFileId: String(parsed.combine?.primaryFileId || ""),
    leftFileId: String(parsed.combine?.leftFileId || ""),
    rightFileId: String(parsed.combine?.rightFileId || ""),
    leftKey: String(parsed.combine?.leftKey || ""),
    rightKey: String(parsed.combine?.rightKey || ""),
    joinType: parsed.combine?.joinType === "inner" ? "inner" : "left",
  };

  state.reportMode = ["summary", "quarter_pivot"].includes(parsed.reportMode) ? parsed.reportMode : "detailed";
  state.outputName = String(parsed.outputName || "clinic_report.xlsx");
  state.sheetName = String(parsed.sheetName || "Report");

  state.selectedColumns = Array.isArray(parsed.selectedColumns) ? parsed.selectedColumns.map(String) : [];
  state.renameMap = parsed.renameMap && typeof parsed.renameMap === "object" ? { ...parsed.renameMap } : {};

  state.summary = {
    groupBy: String(parsed.summary?.groupBy || ""),
    aggFn: ["count", "sum", "avg", "min", "max"].includes(parsed.summary?.aggFn) ? parsed.summary.aggFn : "count",
    aggColumn: String(parsed.summary?.aggColumn || ""),
    groupLabel: String(parsed.summary?.groupLabel || "Group"),
    metricLabel: String(parsed.summary?.metricLabel || "Count"),
  };

  state.quarterPivot = {
    groupBy1: String(parsed.quarterPivot?.groupBy1 || ""),
    groupBy2: String(parsed.quarterPivot?.groupBy2 || ""),
    dateColumn: String(parsed.quarterPivot?.dateColumn || ""),
    valueColumn: String(parsed.quarterPivot?.valueColumn || ""),
    missingGroup1: String(parsed.quarterPivot?.missingGroup1 || "FALTA NIF/DNI"),
    minTotal: String(parsed.quarterPivot?.minTotal || "3005.06"),
    group1Label: String(parsed.quarterPivot?.group1Label || "Número de ID del Cliente"),
    group2Label: String(parsed.quarterPivot?.group2Label || "Cliente"),
    totalLabel: String(parsed.quarterPivot?.totalLabel || "Total Anual"),
  };

  state.dateFilter = {
    enabled: Boolean(parsed.dateFilter?.enabled),
    column: String(parsed.dateFilter?.column || ""),
    from: String(parsed.dateFilter?.from || ""),
    to: String(parsed.dateFilter?.to || ""),
  };

  state.filters = Array.isArray(parsed.filters)
    ? parsed.filters.map((item) => ({
        id: Number.isInteger(item?.id) ? item.id : state.nextFilterId++,
        column: String(item?.column || ""),
        operator: validOperator(item?.operator) ? item.operator : "contains",
        value: String(item?.value || ""),
      }))
    : [];

  state.sort = {
    column: String(parsed.sort?.column || ""),
    direction: parsed.sort?.direction === "desc" ? "desc" : "asc",
  };

  if (state.fileEntries.length > 0) {
    rebuildDatasetFromFileEntries();
  } else if (state.columns.length > 0) {
    reconcileWithColumns();
  }
}

function buildReportResult() {
  let rows = [...state.rawRows];

  rows = applyDateFilter(rows, state.dateFilter);
  rows = applyCustomFilters(rows, state.filters);

  const fileName = sanitizeXlsxFilename(state.outputName, "clinic_report.xlsx");
  const sheetName = sanitizeSheetName(state.sheetName || "Report");

  if (state.pluginMode === "rabies" && !state.showAdvanced) {
    return buildRabiesPluginResult(rows, fileName, sheetName);
  }
  if (state.reportMode === "summary") {
    return buildSummaryResult(rows, fileName, sheetName);
  }
  if (state.reportMode === "quarter_pivot") {
    return buildQuarterPivotResult(rows, fileName, sheetName);
  }
  return buildDetailedResult(rows, fileName, sheetName);
}

function buildDetailedResult(rows, fileName, sheetName) {
  if (state.selectedColumns.length === 0) {
    throw new Error(t("error.select_output_column"));
  }

  const sortedRows = sortDetailedRows(rows, state.sort);
  const outputHeaders = uniqueOutputHeaders(state.selectedColumns.map((col) => state.renameMap[col] || defaultOutputHeader(col)));

  const outputRows = sortedRows.map((row) => {
    const out = {};
    state.selectedColumns.forEach((col, idx) => {
      out[outputHeaders[idx]] = row[col] ?? null;
    });
    return out;
  });

  return {
    mode: "detailed",
    rows: outputRows,
    columns: outputHeaders,
    fileName,
    sheetName,
    meta: t("preview.meta.detailed", { rows: outputRows.length, cols: outputHeaders.length }),
  };
}

function buildRabiesPluginResult(_rows, fileName, sheetName) {
  const vaccinationEntry = findBestFileEntry(["telefono", "nombredepaciente", "farmacos", "dado"]);
  const activeEntry = findBestFileEntry(["numerodetelefono", "iddelcliente", "microchip"], vaccinationEntry?.id);
  if (!vaccinationEntry || !activeEntry) {
    throw new Error(t("error.rabies_requires_files"));
  }

  const activeRows = activeEntry.rows;
  const vaccinationRows = vaccinationEntry.rows;
  const includeNonActive = state.combine.joinType === "left";

  const hasDirectClientId = rabiesFindColumnName(vaccinationRows, RABIES_DIRECT_VACCINATION_ALIASES["Client ID"], false);
  const hasDirectGiven = rabiesFindColumnName(vaccinationRows, RABIES_DIRECT_VACCINATION_ALIASES.Given, false);

  const outputRows =
    hasDirectClientId && hasDirectGiven
      ? rabiesBuildFromDirectExport(activeRows, vaccinationRows, !includeNonActive)
      : rabiesBuildFromExports(activeRows, vaccinationRows, -1, !includeNonActive);

  return {
    mode: "rabies",
    rows: officialRows,
    columns: officialRows.length > 0 ? Object.keys(officialRows[0]) : rabiesOfficialColumns(),
    fileName,
    sheetName,
    meta: t("preview.meta.rabies", { rows: officialRows.length }),
  };
}

function buildSummaryResult(rows, fileName, sheetName) {
  const groupBy = state.summary.groupBy;
  if (!groupBy) throw new Error(t("error.choose_group_by"));

  const aggFn = state.summary.aggFn;
  const aggColumn = state.summary.aggColumn;
  if (aggFn !== "count" && !aggColumn) {
    throw new Error(t("error.choose_aggregation_column"));
  }

  const groupLabel = (state.summary.groupLabel || "Group").trim() || "Group";
  const metricLabel = (state.summary.metricLabel || defaultMetricLabel(aggFn, aggColumn)).trim() || "Metric";

  const map = new Map();
  for (const row of rows) {
    const rawKey = row[groupBy];
    const key = isNullish(rawKey) ? "(blank)" : String(rawKey);

    if (!map.has(key)) {
      map.set(key, {
        key,
        count: 0,
        sum: 0,
        min: null,
        max: null,
        validNumericCount: 0,
      });
    }

    const acc = map.get(key);
    acc.count += 1;

    if (aggFn !== "count") {
      const numeric = parseNumber(row[aggColumn]);
      if (numeric !== null) {
        acc.sum += numeric;
        acc.validNumericCount += 1;
        if (acc.min === null || numeric < acc.min) acc.min = numeric;
        if (acc.max === null || numeric > acc.max) acc.max = numeric;
      }
    }
  }

  const outputRows = [];
  for (const acc of map.values()) {
    let metric = null;
    if (aggFn === "count") metric = acc.count;
    if (aggFn === "sum") metric = acc.validNumericCount > 0 ? roundTwo(acc.sum) : null;
    if (aggFn === "avg") metric = acc.validNumericCount > 0 ? roundTwo(acc.sum / acc.validNumericCount) : null;
    if (aggFn === "min") metric = acc.min;
    if (aggFn === "max") metric = acc.max;

    outputRows.push({
      [groupLabel]: acc.key,
      [metricLabel]: metric,
    });
  }

  const sortedRows = sortSummaryRows(outputRows, groupLabel, metricLabel, state.sort);

  return {
    mode: "summary",
    rows: sortedRows,
    columns: [groupLabel, metricLabel],
    fileName,
    sheetName,
    meta: t("preview.meta.summary", { aggFn, groups: sortedRows.length }),
  };
}

function rabiesStripAccents(value) {
  return String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

function rabiesNormalizeText(value) {
  if (isNullish(value)) return "";
  return rabiesStripAccents(String(value).toUpperCase().trim())
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function rabiesNormalizePhoneForLookup(value) {
  if (isNullish(value)) return "";
  return String(value).replace(/\D/g, "");
}

function rabiesClientNameParts(fullName) {
  const text = String(fullName || "").trim();
  if (!text) return [null, null];
  const parts = text.split(/\s+/);
  if (parts.length === 1) return [parts[0], null];
  if (parts.length === 2) return [parts[0], parts[1]];
  if (parts.length === 3) return [`${parts[0]} ${parts[1]}`, parts[2]];
  return [`${parts[0]} ${parts[1]}`, parts.slice(2).join(" ")];
}

function rabiesParseAddress(raw) {
  const text = String(raw || "").trim();
  if (!text) return [null, null, null];
  const m = text.match(/^(.*?),\s*(\d{4,5})\s+([^,]+)(?:,.*)?$/);
  if (!m) return [text, null, null];
  return [m[1].trim(), m[2].trim(), m[3].trim()];
}

function rabiesAgeTextOrDates(ageText, dob, given) {
  if (!isNullish(ageText)) {
    const text = rabiesStripAccents(String(ageText).toLowerCase());
    const m = text.match(/(\d+)\s*(anos|years?)/);
    if (m) return `${parseInt(m[1], 10)} years`;
  }

  const dobDate = toDate(dob);
  const givenDate = toDate(given);
  if (!dobDate || !givenDate) return null;

  let years = givenDate.getUTCFullYear() - dobDate.getUTCFullYear();
  const beforeBirthday =
    givenDate.getUTCMonth() < dobDate.getUTCMonth() ||
    (givenDate.getUTCMonth() === dobDate.getUTCMonth() && givenDate.getUTCDate() < dobDate.getUTCDate());
  if (beforeBirthday) years -= 1;
  return `${Math.max(years, 0)} years`;
}

function rabiesNormalizeClientId(value) {
  if (isNullish(value)) return null;
  const text = String(value).trim();
  if (!text) return null;
  if (/^\d+\.0+$/.test(text)) return text.split(".")[0];
  const digits = text.replace(/[^\d]/g, "");
  return digits || null;
}

function rabiesNormalizeBatchId(value) {
  if (isNullish(value)) return null;
  const text = String(value).trim();
  if (!text) return null;
  if (/^\d+\.0+$/.test(text)) return text.split(".")[0];
  return text;
}

function addHoursUtc(dateObj, hours) {
  if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime())) return null;
  return new Date(dateObj.getTime() + hours * 3600 * 1000);
}

function rabiesColumnsFromRows(rows) {
  const set = new Set();
  for (const row of rows) {
    for (const key of Object.keys(row)) set.add(key);
  }
  return Array.from(set);
}

function rabiesFindColumnName(rows, aliases, required) {
  const columns = rabiesColumnsFromRows(rows);
  const lookup = new Map(columns.map((col) => [canonical(col), col]));
  for (const alias of aliases) {
    const hit = lookup.get(canonical(alias));
    if (hit) return hit;
  }
  if (required) throw new Error(`Missing required column. Tried aliases: ${aliases.join(", ")}`);
  return null;
}

function rabiesMapColumns(rows, aliasMap) {
  const sourceColumns = rabiesColumnsFromRows(rows);
  const lookup = new Map(sourceColumns.map((col) => [canonical(col), col]));
  const mappings = {};

  for (const [target, aliases] of Object.entries(aliasMap)) {
    let source = null;
    for (const alias of aliases) {
      const hit = lookup.get(canonical(alias));
      if (hit) {
        source = hit;
        break;
      }
    }
    mappings[target] = source;
  }

  return rows.map((row) => {
    const mapped = {};
    for (const [target, source] of Object.entries(mappings)) {
      mapped[target] = source ? row[source] : null;
    }
    return mapped;
  });
}

function rabiesDedupeByHighestScore(rows, keyName) {
  const map = new Map();
  for (const row of rows) {
    const key = row[keyName];
    if (!key) continue;
    const prev = map.get(key);
    if (!prev || row._score > prev._score) map.set(key, row);
  }
  return map;
}

function rabiesPrepareActiveLookup(activeRows) {
  const mapped = rabiesMapColumns(activeRows, RABIES_ACTIVE_DETAILS_ALIASES);
  const hasClientFull = mapped.some((row) => !isNullish(row["Client full name"]));
  if (!hasClientFull) {
    for (const row of mapped) {
      const first = String(row["First name"] || "").trim();
      const last = String(row["Last name"] || "").trim();
      const full = `${first} ${last}`.trim();
      row["Client full name"] = full || null;
    }
  }

  for (const row of mapped) {
    row.k_client_patient = `${rabiesNormalizeText(row["Client full name"])}|${rabiesNormalizeText(row["Patient name"])}`;
    row.k_patient_phone = `${rabiesNormalizeText(row["Patient name"])}|${rabiesNormalizePhoneForLookup(row["Phone number"])}`;
    row.k_client = rabiesNormalizeText(row["Client full name"]);
    row._score =
      (isNullish(row.Microchip) ? 0 : 1) +
      (isNullish(row["Date of birth"]) ? 0 : 1) +
      (isNullish(row["Street address"]) ? 0 : 1) +
      (isNullish(row.City) ? 0 : 1) +
      (isNullish(row["Client ID"]) ? 0 : 1);
  }

  const lookup1 = rabiesDedupeByHighestScore(mapped, "k_client_patient");
  const lookup2 = rabiesDedupeByHighestScore(mapped, "k_patient_phone");

  const clientPatientCounts = new Map();
  for (const row of mapped) {
    const key = row.k_client;
    if (!key) continue;
    if (!clientPatientCounts.has(key)) clientPatientCounts.set(key, new Set());
    clientPatientCounts.get(key).add(rabiesNormalizeText(row["Patient name"]));
  }

  const lookup3 = new Map();
  for (const row of mapped) {
    const set = clientPatientCounts.get(row.k_client);
    if (!row.k_client || !set || set.size !== 1) continue;
    const prev = lookup3.get(row.k_client);
    if (!prev || row._score > prev._score) lookup3.set(row.k_client, row);
  }

  return {
    lookup1,
    lookup2,
    lookup3,
    keys1: new Set(lookup1.keys()),
    keys2: new Set(lookup2.keys()),
    keys3: new Set(lookup3.keys()),
  };
}

function rabiesLookupField(row, field, lookups) {
  const by1 = lookups.lookup1.get(row.k_client_patient);
  if (by1 && !isNullish(by1[field])) return by1[field];
  const by2 = lookups.lookup2.get(row.k_patient_phone);
  if (by2 && !isNullish(by2[field])) return by2[field];
  const by3 = lookups.lookup3.get(row.k_client);
  if (by3 && !isNullish(by3[field])) return by3[field];
  return null;
}

function rabiesNormalizeExpectedColumns(row) {
  const out = {};
  for (const col of RABIES_EXPECTED_COLUMNS) {
    out[col] = col in row ? row[col] : null;
  }
  return out;
}

function rabiesBuildFromExports(activeRows, vaccinationRows, offsetHours, requireActiveMatch) {
  const vacc = rabiesMapColumns(vaccinationRows, RABIES_VACCINATION_ALIASES)
    .filter((row) => rabiesNormalizeText(row["Client full name"]) !== "TOTAL")
    .map((row) => ({
      ...row,
      Given: addHoursUtc(toDate(row.Given), offsetHours),
      k_client_patient: `${rabiesNormalizeText(row["Client full name"])}|${rabiesNormalizeText(row["Patient name"])}`,
      k_patient_phone: `${rabiesNormalizeText(row["Patient name"])}|${rabiesNormalizePhoneForLookup(row["Phone number"])}`,
      k_client: rabiesNormalizeText(row["Client full name"]),
    }))
    .filter((row) => row.Given);

  const lookups = rabiesPrepareActiveLookup(activeRows);
  const output = [];

  for (const row of vacc) {
    const matched =
      lookups.keys1.has(row.k_client_patient) ||
      lookups.keys2.has(row.k_patient_phone) ||
      lookups.keys3.has(row.k_client);
    if (requireActiveMatch && !matched) continue;

    const clientId = rabiesNormalizeClientId(rabiesLookupField(row, "Client ID", lookups));
    const clientFull = rabiesLookupField(row, "Client full name", lookups) || row["Client full name"];
    const [firstName, lastName] = rabiesClientNameParts(clientFull);
    const [streetFromRaw, zipFromRaw, cityFromRaw] = rabiesParseAddress(row["Address raw"]);
    const dob = toDate(rabiesLookupField(row, "Date of birth", lookups));

    output.push(
      rabiesNormalizeExpectedColumns({
        "Client ID": clientId,
        "First name": firstName,
        "Last name": lastName,
        "Organization name": rabiesLookupField(row, "Organization name", lookups),
        "Phone number": rabiesLookupField(row, "Phone number", lookups) || row["Phone number"] || null,
        "Street address": rabiesLookupField(row, "Street address", lookups) || streetFromRaw,
        "Zip code": rabiesLookupField(row, "Zip code", lookups) || zipFromRaw,
        City: rabiesLookupField(row, "City", lookups) || cityFromRaw,
        "Patient name": row["Patient name"] || null,
        Microchip: rabiesLookupField(row, "Microchip", lookups),
        Age: rabiesAgeTextOrDates(row["Age raw"], dob, row.Given),
        "Date of birth": dob,
        "Client full name": clientFull,
        "Patient ID": rabiesLookupField(row, "Patient ID", lookups),
        "Client legal ID": rabiesLookupField(row, "Client legal ID", lookups),
        "Last visit": rabiesLookupField(row, "Last visit", lookups),
        "Last reason": rabiesLookupField(row, "Last reason", lookups),
        "Medicine name": row["Medicine name"] || null,
        Species: row.Species || rabiesLookupField(row, "Species", lookups),
        Breed: row.Breed || rabiesLookupField(row, "Breed", lookups),
        "Batch ID": rabiesNormalizeBatchId(row["Batch ID"]),
        "Batch expires": null,
        Given: row.Given,
        "Department ID": null,
        "Department name": row["Applied by"] || null,
      })
    );
  }

  return output;
}

function rabiesBuildFromDirectExport(activeRows, vaccinationRows, requireActiveMatch) {
  const mappedVacc = rabiesMapColumns(vaccinationRows, RABIES_DIRECT_VACCINATION_ALIASES);
  const activeIdCol = rabiesFindColumnName(activeRows, RABIES_ACTIVE_ID_ALIASES, true);
  const activeIds = new Set(
    activeRows
      .map((row) => rabiesNormalizeClientId(row[activeIdCol]))
      .filter((x) => x)
  );

  const output = [];
  for (const row of mappedVacc) {
    const given = toDate(row.Given);
    if (!given) continue;

    const clientId = rabiesNormalizeClientId(row["Client ID"]);
    if (requireActiveMatch && !activeIds.has(clientId)) continue;

    output.push(
      rabiesNormalizeExpectedColumns({
        ...row,
        "Client ID": clientId,
        "Client full name": [row["First name"], row["Last name"]].filter(Boolean).join(" ") || null,
        Given: given,
        "Batch ID": rabiesNormalizeBatchId(row["Batch ID"]),
        "Date of birth": toDate(row["Date of birth"]),
        "Batch expires": toDate(row["Batch expires"]),
      })
    );
  }
  return output;
}

function rabiesRowsForPeriodDetection(vaccinationRows, dateColumn) {
  if (!dateColumn) return [];
  return vaccinationRows
    .filter((row) => rabiesNormalizeText(row.Cliente || row.Client || row["Client full name"]) !== "TOTAL")
    .map((row) => ({ __rabies_given: row[dateColumn] }))
    .filter((row) => toDate(row.__rabies_given));
}

function rabiesTextCell(value) {
  if (isNullish(value)) return null;
  const text = String(value).trim();
  if (!text) return null;
  if (/^\d+\.0+$/.test(text)) return text.split(".")[0];
  return text;
}

function rabiesDisplayDate(value) {
  const dt = toDate(value);
  if (!dt) return null;
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = String(dt.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function rabiesDisplayDateTime(value) {
  const dt = toDate(value);
  if (!dt) return null;
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = String(dt.getFullYear());
  const hh = String(dt.getHours()).padStart(2, "0");
  const mi = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`;
}

function rabiesBatchDisplay(batchId, batchExpires) {
  const batch = rabiesTextCell(batchId);
  if (!batch) return null;
  const expiry = toDate(batchExpires);
  if (!expiry) return batch;
  const mm = String(expiry.getMonth() + 1).padStart(2, "0");
  const yyyy = String(expiry.getFullYear());
  return `${batch} - ${mm}/${yyyy}`;
}

function rabiesOfficialColumns() {
  return [
    t("rabies.col.number"),
    t("rabies.col.chip"),
    t("rabies.col.date"),
    t("rabies.col.primo"),
    t("rabies.col.vaccine"),
    t("rabies.col.batch"),
    t("rabies.col.applied"),
    t("rabies.col.patient_name"),
    t("rabies.col.patient_id"),
    t("rabies.col.client_name"),
    t("rabies.col.client_id"),
    t("rabies.col.client_legal_id"),
    t("rabies.col.phone"),
    t("rabies.col.consultation"),
    t("rabies.col.last_visit"),
    t("rabies.col.last_reason"),
    t("rabies.col.species"),
    t("rabies.col.breed"),
  ];
}

function buildRabiesOfficialFillRows(rows) {
  const headers = rabiesOfficialColumns();
  return rows.map((row, idx) => {
    const clientName = row["Client full name"] || [row["First name"], row["Last name"]].filter(Boolean).join(" ") || null;
    return {
      [headers[0]]: idx + 1,
      [headers[1]]: rabiesTextCell(row.Microchip),
      [headers[2]]: rabiesDisplayDate(row.Given),
      [headers[3]]: null,
      [headers[4]]: rabiesTextCell(row["Medicine name"]),
      [headers[5]]: rabiesBatchDisplay(row["Batch ID"], row["Batch expires"]),
      [headers[6]]: rabiesTextCell(row["Department name"]),
      [headers[7]]: rabiesTextCell(row["Patient name"]),
      [headers[8]]: rabiesTextCell(row["Patient ID"]),
      [headers[9]]: rabiesTextCell(clientName),
      [headers[10]]: rabiesTextCell(row["Client ID"]),
      [headers[11]]: rabiesTextCell(row["Client legal ID"]),
      [headers[12]]: rabiesTextCell(row["Phone number"]),
      [headers[13]]: rabiesDisplayDateTime(row.Given),
      [headers[14]]: rabiesDisplayDateTime(row["Last visit"]),
      [headers[15]]: rabiesTextCell(row["Last reason"]),
      [headers[16]]: rabiesTextCell(row.Species),
      [headers[17]]: rabiesTextCell(row.Breed),
    };
  });
}

function buildQuarterPivotResult(rows, fileName, sheetName) {
  const groupBy1 = state.quarterPivot.groupBy1;
  const groupBy2 = state.quarterPivot.groupBy2;
  const dateColumn = state.quarterPivot.dateColumn;
  const valueColumn = state.quarterPivot.valueColumn;
  if (!groupBy1 || !groupBy2 || !dateColumn || !valueColumn) {
    throw new Error(t("error.choose_quarter_columns"));
  }

  const group1Label = (state.quarterPivot.group1Label || "Número de ID del Cliente").trim() || "Número de ID del Cliente";
  const group2Label = (state.quarterPivot.group2Label || "Cliente").trim() || "Cliente";
  const totalLabel = (state.quarterPivot.totalLabel || "Total Anual").trim() || "Total Anual";
  const missingGroup1 = (state.quarterPivot.missingGroup1 || "FALTA NIF/DNI").trim() || "FALTA NIF/DNI";
  const minTotal = parseNumber(state.quarterPivot.minTotal) ?? 0;
  const strictModel347Mode = state.pluginMode === "model347" && !state.showAdvanced;
  const invoiceColumn = strictModel347Mode
    ? findColumnByCanonical(state.columns, ["factura", "invoice", "numerofactura", "facturano"])
    : "";

  const map = new Map();
  for (const row of rows) {
    if (invoiceColumn && isNullish(row[invoiceColumn])) continue;
    const dt = toDate(row[dateColumn]);
    if (!dt) continue;

    const quarter = `T${Math.floor(dt.getUTCMonth() / 3) + 1}`;
    const amount = parseNumber(row[valueColumn]);
    if (amount === null) continue;

    const group1 = isNullish(row[groupBy1]) ? missingGroup1 : String(row[groupBy1]).trim();
    const group2 = isNullish(row[groupBy2]) ? "" : String(row[groupBy2]).trim();
    if (strictModel347Mode && !group2) continue;
    const key = `${group1}||${group2}`;
    if (!map.has(key)) {
      map.set(key, {
        group1,
        group2,
        T1: 0,
        T2: 0,
        T3: 0,
        T4: 0,
      });
    }
    const acc = map.get(key);
    acc[quarter] += amount;
  }

  const outputRows = [];
  for (const acc of map.values()) {
    const total = acc.T1 + acc.T2 + acc.T3 + acc.T4;
    if (total <= minTotal) continue;
    outputRows.push({
      [group1Label]: acc.group1,
      [group2Label]: acc.group2,
      T1: roundTwo(acc.T1),
      T2: roundTwo(acc.T2),
      T3: roundTwo(acc.T3),
      T4: roundTwo(acc.T4),
      [totalLabel]: roundTwo(total),
    });
  }

  const sortedRows = sortQuarterRows(outputRows, group1Label, group2Label, totalLabel, state.sort);

  return {
    mode: "quarter_pivot",
    rows: sortedRows,
    columns: [group1Label, group2Label, "T1", "T2", "T3", "T4", totalLabel],
    fileName,
    sheetName,
    meta: t("preview.meta.quarter", { groups: sortedRows.length, threshold: minTotal }),
  };
}

function sortDetailedRows(rows, sortState) {
  if (!sortState.column) return rows;

  return [...rows].sort((a, b) => {
    const cmp = compareValues(a[sortState.column], b[sortState.column]);
    return sortState.direction === "desc" ? -cmp : cmp;
  });
}

function sortSummaryRows(rows, groupLabel, metricLabel, sortState) {
  if (!sortState.column) return rows;

  const key = sortState.column === "__metric" ? metricLabel : groupLabel;
  return [...rows].sort((a, b) => {
    const cmp = compareValues(a[key], b[key]);
    return sortState.direction === "desc" ? -cmp : cmp;
  });
}

function sortQuarterRows(rows, group1Label, group2Label, totalLabel, sortState) {
  if (!sortState.column) return rows;

  let key = totalLabel;
  if (sortState.column === "__group1") key = group1Label;
  if (sortState.column === "__group2") key = group2Label;

  return [...rows].sort((a, b) => {
    const cmp = compareValues(a[key], b[key]);
    return sortState.direction === "desc" ? -cmp : cmp;
  });
}

function applyDateFilter(rows, dateFilter) {
  if (!dateFilter.enabled || !dateFilter.column) return rows;

  const from = dateFilter.from ? new Date(`${dateFilter.from}T00:00:00`) : null;
  const to = dateFilter.to ? new Date(`${dateFilter.to}T23:59:59`) : null;

  return rows.filter((row) => {
    const date = toDate(row[dateFilter.column]);
    if (!date) return false;
    if (from && date < from) return false;
    if (to && date > to) return false;
    return true;
  });
}

function applyCustomFilters(rows, filters) {
  if (!filters || filters.length === 0) return rows;

  return rows.filter((row) => {
    for (const filter of filters) {
      if (!evaluateFilter(row[filter.column], filter.operator, filter.value)) {
        return false;
      }
    }
    return true;
  });
}

function evaluateFilter(rawValue, operator, rawExpected) {
  const leftText = normalizeString(rawValue);
  const rightText = normalizeString(rawExpected);

  if (operator === "is_empty") return isNullish(rawValue);
  if (operator === "is_not_empty") return !isNullish(rawValue);

  if (operator === "contains") return leftText.includes(rightText);
  if (operator === "equals") return leftText === rightText;
  if (operator === "not_equals") return leftText !== rightText;
  if (operator === "starts_with") return leftText.startsWith(rightText);
  if (operator === "ends_with") return leftText.endsWith(rightText);

  if (operator === "greater_than") return compareValues(rawValue, rawExpected) > 0;
  if (operator === "greater_equal") return compareValues(rawValue, rawExpected) >= 0;
  if (operator === "less_than") return compareValues(rawValue, rawExpected) < 0;
  if (operator === "less_equal") return compareValues(rawValue, rawExpected) <= 0;

  return true;
}

function compareValues(a, b) {
  if (isNullish(a) && isNullish(b)) return 0;
  if (isNullish(a)) return 1;
  if (isNullish(b)) return -1;

  const numA = parseNumber(a);
  const numB = parseNumber(b);
  if (numA !== null && numB !== null) {
    if (numA < numB) return -1;
    if (numA > numB) return 1;
    return 0;
  }

  const dateA = toDate(a);
  const dateB = toDate(b);
  if (dateA && dateB) {
    const msA = dateA.getTime();
    const msB = dateB.getTime();
    if (msA < msB) return -1;
    if (msA > msB) return 1;
    return 0;
  }

  const strA = normalizeString(a);
  const strB = normalizeString(b);
  return strA.localeCompare(strB);
}

function renderPreview(result) {
  if (!result) {
    el.previewCard.hidden = true;
    el.previewMeta.textContent = "";
    el.previewHead.innerHTML = "";
    el.previewBody.innerHTML = "";
    return;
  }

  el.previewCard.hidden = false;
  el.previewMeta.textContent = t("preview.showing_first", {
    meta: result.meta,
    count: Math.min(PREVIEW_LIMIT, result.rows.length),
  });

  const headRow = document.createElement("tr");
  result.columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    headRow.appendChild(th);
  });

  el.previewHead.innerHTML = "";
  el.previewHead.appendChild(headRow);

  el.previewBody.innerHTML = "";
  const previewRows = result.rows.slice(0, PREVIEW_LIMIT);
  previewRows.forEach((row) => {
    const tr = document.createElement("tr");
    result.columns.forEach((col) => {
      const td = document.createElement("td");
      const value = row[col];
      td.textContent = displayValue(value);
      if (typeof value === "number") td.classList.add("num");
      tr.appendChild(td);
    });
    el.previewBody.appendChild(tr);
  });
}

function downloadResult(result) {
  const aoa = [result.columns];

  for (const row of result.rows) {
    aoa.push(
      result.columns.map((col) => {
        const value = row[col];
        if (value instanceof Date && !Number.isNaN(value.getTime())) return dateToIsoString(value);
        return value ?? null;
      })
    );
  }

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sanitizeSheetName(result.sheetName));
  XLSX.writeFile(wb, sanitizeXlsxFilename(result.fileName, "clinic_report.xlsx"));
}

function invalidateGenerated() {
  state.generated = null;
  el.downloadBtn.disabled = true;
}

function setBusy(busy) {
  state.isBusy = busy;
  el.generateBtn.disabled = busy || !canGenerateNow();
  el.generateBtn.textContent = busy ? t("build.generating") : generateButtonLabel();
}

function refreshActionLabels() {
  el.generateBtn.textContent = generateButtonLabel();
  el.generateBtn.disabled = !canGenerateNow();
  el.downloadBtn.textContent = t("build.download");
}

function generateButtonLabel() {
  if (state.pluginMode === "rabies" && !state.showAdvanced) return t("build.generate_rabies");
  if (state.pluginMode === "model347" && !state.showAdvanced) return t("build.generate_model347");
  return t("build.generate_preview");
}

function canGenerateNow() {
  if (state.isBusy) return false;
  if (state.pluginMode === "rabies" && !state.showAdvanced) {
    return state.fileEntries.length === 2 && !state.combineError;
  }
  if (state.pluginMode === "model347" && !state.showAdvanced) {
    return state.fileEntries.length === 1 && !state.combineError;
  }
  return true;
}

function setStatus(message, type) {
  el.status.className = `status ${type}`;
  el.status.textContent = message;
}

async function readRowsFromFile(file) {
  const lower = file.name.toLowerCase();
  let workbook;

  if (lower.endsWith(".csv")) {
    const text = await readAsText(file);
    workbook = XLSX.read(text, { type: "string", cellDates: true });
  } else {
    const buffer = await readAsArrayBuffer(file);
    workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  }

  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) throw new Error(t("error.no_sheet_in_file", { file: file.name }));

  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: true,
    defval: null,
    blankrows: false,
  });

  const headerIndex = detectLikelyHeaderRow(rows, 40);
  return tableFromRows(rows, headerIndex);
}

function detectLikelyHeaderRow(rows, maxRows) {
  const limit = Math.min(rows.length, maxRows);
  let bestIndex = 0;
  let bestScore = -1;

  for (let i = 0; i < limit; i += 1) {
    const row = rows[i] || [];
    const nonEmpty = row.filter((x) => !isNullish(x));
    if (nonEmpty.length < 2) continue;

    const stringCount = nonEmpty.filter((x) => typeof x === "string").length;
    const unique = new Set(nonEmpty.map((x) => normalizeString(x))).size;
    const score = nonEmpty.length + stringCount * 0.8 + unique * 0.4;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  return bestIndex;
}

function tableFromRows(rows, headerRowIndex) {
  const headerRow = rows[headerRowIndex] || [];
  const headers = headerRow.map((value, idx) => {
    const text = String(value ?? "").trim();
    return text || `Unnamed_${idx + 1}`;
  });

  const out = [];
  for (let i = headerRowIndex + 1; i < rows.length; i += 1) {
    const row = rows[i] || [];
    let hasAny = false;
    const obj = {};

    for (let c = 0; c < headers.length; c += 1) {
      const value = row[c] === undefined ? null : row[c];
      if (!isNullish(value)) hasAny = true;
      obj[headers[c]] = value;
    }

    if (hasAny) out.push(obj);
  }

  return out;
}

function collectColumns(rows) {
  const seen = new Set();
  const out = [];

  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(key);
    }
  }

  return out;
}

function renderOptionList(selectEl, options, selectedValue) {
  selectEl.innerHTML = "";
  if (!options || options.length === 0) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = t("options.none");
    selectEl.appendChild(empty);
    return;
  }

  for (const optData of options) {
    const opt = document.createElement("option");
    opt.value = optData.value;
    opt.textContent = optData.label;
    selectEl.appendChild(opt);
  }

  if (options.some((x) => x.value === selectedValue)) {
    selectEl.value = selectedValue;
  } else {
    selectEl.value = options[0].value;
  }
}

function renderColumnSelect(selectEl, columns, selectedValue) {
  selectEl.innerHTML = "";
  appendColumnOptions(selectEl, columns, selectedValue);
}

function appendColumnOptions(selectEl, columns, selectedValue) {
  if (columns.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = t("columns.none");
    selectEl.appendChild(opt);
    return;
  }

  for (const col of columns) {
    const opt = document.createElement("option");
    opt.value = col;
    opt.textContent = displayColumnName(col);
    selectEl.appendChild(opt);
  }

  if (columns.includes(selectedValue)) {
    selectEl.value = selectedValue;
  } else {
    selectEl.value = columns[0];
  }
}

function displayColumnName(col) {
  if (col === "__source_file") return t("column.source_file");
  return col;
}

function defaultOutputHeader(col) {
  if (col === "__source_file") return "Source File";
  return col;
}

function uniqueOutputHeaders(headers) {
  const counts = new Map();
  return headers.map((header) => {
    const base = String(header || "Column").trim() || "Column";
    const used = counts.get(base) || 0;
    counts.set(base, used + 1);
    if (used === 0) return base;
    return `${base} (${used + 1})`;
  });
}

function firstNonSourceColumn(columns) {
  return columns.find((c) => c !== "__source_file") || "";
}

function guessDateColumn(columns) {
  return columns.find((col) => {
    const c = normalizeString(col);
    return c.includes("date") || c.includes("fecha") || c.includes("given") || c.includes("time");
  });
}

function firstNumericLikeColumn(rows, columns) {
  for (const col of columns) {
    if (col === "__source_file") continue;
    let checked = 0;
    let numericHits = 0;
    for (const row of rows) {
      const value = row[col];
      if (isNullish(value)) continue;
      checked += 1;
      if (parseNumber(value) !== null) numericHits += 1;
      if (checked >= 20) break;
    }
    if (checked > 0 && numericHits / checked >= 0.6) return col;
  }
  return "";
}

function defaultMetricLabel(aggFn, aggColumn) {
  if (aggFn === "count") return "Count";
  if (!aggColumn) return aggFn.toUpperCase();
  return `${aggFn.toUpperCase()} ${aggColumn}`;
}

function fileSignature(file) {
  return `${file.name}::${file.size}::${file.lastModified}`;
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.max(1, Math.round(kb))} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function validOperator(value) {
  return OPERATOR_OPTIONS.some((x) => x.value === value);
}

function sanitizeXlsxFilename(value, fallback) {
  const cleaned = String(value || "")
    .trim()
    .replace(/[^A-Za-z0-9._ -]+/g, "");
  const name = cleaned || fallback;
  return name.toLowerCase().endsWith(".xlsx") ? name : `${name}.xlsx`;
}

function sanitizeSheetName(value) {
  return String(value || "Report")
    .replace(/[\\/?*\[\]:]/g, "")
    .slice(0, 31) || "Report";
}

function isNullish(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function normalizeString(value) {
  return String(value ?? "").trim().toLowerCase();
}

function canonical(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function tokenize(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((x) => x);
}

function columnNameSimilarity(a, b) {
  const ca = canonical(a);
  const cb = canonical(b);
  if (!ca || !cb) return 0;
  if (ca === cb) return 1;
  if (ca.includes(cb) || cb.includes(ca)) return 0.85;

  const ta = new Set(tokenize(a));
  const tb = new Set(tokenize(b));
  if (ta.size === 0 || tb.size === 0) return 0;

  let common = 0;
  for (const token of ta) {
    if (tb.has(token)) common += 1;
  }
  if (common === 0) return 0;

  const overlap = common / Math.min(ta.size, tb.size);
  const union = new Set([...ta, ...tb]).size;
  const jaccard = common / union;
  return Math.max(overlap * 0.9, jaccard * 0.8);
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  let text = String(value).trim();
  if (!text) return null;

  text = text.replace(/\s+/g, "");

  if (/^-?[\d.]+,[\d]+$/.test(text)) {
    text = text.replace(/\./g, "").replace(",", ".");
  } else if (/^-?[\d,]+\.[\d]+$/.test(text)) {
    text = text.replace(/,/g, "");
  } else if (/^-?[\d,]+$/.test(text)) {
    text = text.replace(/,/g, "");
  }

  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

function toDate(value) {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed && parsed.y && parsed.m && parsed.d) {
      return new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d, parsed.H || 0, parsed.M || 0, parsed.S || 0));
    }
    return null;
  }

  const text = String(value).trim();
  if (!text) return null;

  const iso = new Date(text);
  if (!Number.isNaN(iso.getTime())) return iso;

  const m = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) {
    const day = parseInt(m[1], 10);
    const month = parseInt(m[2], 10);
    const year = parseInt(m[3], 10);
    const hour = parseInt(m[4] || "0", 10);
    const minute = parseInt(m[5] || "0", 10);
    const second = parseInt(m[6] || "0", 10);
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  }

  return null;
}

function dateToIsoString(dateObj) {
  if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime())) return "";
  const yyyy = String(dateObj.getFullYear());
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const hh = String(dateObj.getHours()).padStart(2, "0");
  const mi = String(dateObj.getMinutes()).padStart(2, "0");
  const ss = String(dateObj.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "";
  if (value instanceof Date) return dateToIsoString(value);
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : String(roundTwo(value));
  return String(value);
}

function roundTwo(n) {
  return Math.round(n * 100) / 100;
}

function downloadJson(obj, fileName) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read file: ${file.name}`));
    reader.readAsArrayBuffer(file);
  });
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read file: ${file.name}`));
    reader.readAsText(file);
  });
}
