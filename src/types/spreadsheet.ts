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

/**
 * Individual employee diagnosis computed from imported survey responses.
 * Contains individual IIM score and breakdown across all 4 dimensions for 100% of employees.
 */
export interface EmployeeIndividualDiagnosis {
  id: string;
  setor: string;
  cargo: string;
  tempoTrajetoMin: number;
  distanciaKm: number;
  estresse: number;
  sono: number;
  atrasosMes: number;
  riscoDemissao: number;
  modal: string;
  gastoPct: number;
  d1Score: number;
  d2Score: number;
  d3Score: number;
  d4Score: number;
  iimScore: number;
  classification: string;
  classificationColor: string;
  classificationBg: string;
  riskLevel: 'baixo' | 'moderado' | 'alto' | 'critico';
}

/**
 * Breakdown of a specific risk group across the employee base.
 */
export interface CompanyRiskGroup {
  key: 'baixo' | 'moderado' | 'alto' | 'critico';
  label: string;
  range: string;
  color: string;
  bgColor: string;
  count: number;
  percentage: number;
  avgTempo: number;
  avgEstresse: number;
  avgAtrasos: number;
  predominantModal: string;
  summary: string;
  recommendation: string;
}

/**
 * High-impact global intervention suggested for the client company based on consolidated data.
 */
export interface GlobalCompanyIntervention {
  id: string;
  title: string;
  category: 'Jornada & Escala' | 'Benefícios & Auxílios' | 'Logística Corporativa' | 'Saúde & Bem-Estar';
  priority: 'Alta' | 'Média' | 'Estratégica';
  effort: 'Baixo' | 'Médio' | 'Alto';
  timeframe: string;
  targetEmployeesCount: number;
  targetGroupLabel: string;
  iimReductionProjected: number;
  monthlySavingsProjected: number;
  description: string;
  actionSteps: string[];
}

/**
 * Complete executive corporate summary synthesized from 100% of the imported spreadsheet rows.
 */
export interface CompanyExecutiveSummary {
  companyName: string;
  totalEmployees: number;
  avgIimScore: number;
  classification: string;
  classColor: string;
  classBg: string;
  dimensionalAverages: {
    d1: number;
    d2: number;
    d3: number;
    d4: number;
  };
  riskGroups: Record<'baixo' | 'moderado' | 'alto' | 'critico', CompanyRiskGroup>;
  globalInterventions: GlobalCompanyIntervention[];
  keyInsights: string[];
  monthlyFinancialLossEstimate: number;
}
