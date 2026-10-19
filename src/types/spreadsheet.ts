/**
 * Types and interfaces for bulk spreadsheet ingestion (CSV / Excel .xlsx / .xls).
 *
 * Supports importing client employee survey responses across the 36 multidimensional
 * questions of the UrbanFlow IIM index.
 */

export type SpreadsheetFileType = 'csv' | 'xlsx' | 'xls';

export type InferredColumnType = 'number' | 'string' | 'boolean' | 'date';

/**
 * Metadata about an uploaded spreadsheet file.
 */
export interface SpreadsheetMetadata {
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  fileType: SpreadsheetFileType;
  sheetNames: string[];
  activeSheet: string;
  totalRows: number;
  totalColumns: number;
  uploadedAt: Date;
}

/**
 * Summary metrics and sample data for a detected column.
 */
export interface ColumnSummary {
  header: string;
  index: number;
  sampleValues: (string | number | boolean)[];
  nonEmptyCount: number;
  detectedType: InferredColumnType;
}

/**
 * Result structure produced by parsing a spreadsheet file.
 */
export interface ParsedSpreadsheetResult {
  metadata: SpreadsheetMetadata;
  headers: string[];
  rows: Record<string, any>[];
  previewRows: Record<string, any>[];
  columnsSummary: ColumnSummary[];
}

/**
 * Structured error emitted when spreadsheet parsing fails.
 */
export interface SpreadsheetParseError {
  code: 'EMPTY_FILE' | 'INVALID_FORMAT' | 'PARSE_FAILED' | 'NO_HEADERS' | 'FILE_TOO_LARGE' | 'SHEET_NOT_FOUND';
  message: string;
  details?: string;
}

/**
 * Target mapping definition for one of the 36 questions across the 4 IIM dimensions.
 */
export interface QuestionMappingField {
  id: string;
  dimension: 'D1' | 'D2' | 'D3' | 'D4' | 'EMPRESA';
  label: string;
  description: string;
  expectedType: InferredColumnType;
  mappedColumnHeader?: string;
}
