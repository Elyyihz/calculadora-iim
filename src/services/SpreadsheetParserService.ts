import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  ParsedSpreadsheetResult,
  SpreadsheetMetadata,
  SpreadsheetFileType,
  ColumnSummary,
  InferredColumnType
} from '../types/spreadsheet';

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB safety limit for browser heap

/**
 * Service responsible for ingesting, validating, and extracting tabular data
 * from external spreadsheets (CSV, Excel .xlsx, and .xls formats).
 */
export class SpreadsheetParserService {
  /**
   * Formats a byte number into a human-readable size string.
   *
   * @param bytes - The raw size in bytes.
   * @returns Formatted size string (e.g., '145.2 KB', '2.4 MB').
   */
  public static formatFileSize(bytes: number): string {
    if (bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / Math.pow(1024, idx);
    return `${value.toFixed(1)} ${units[idx]}`;
  }

  /**
   * Detects the spreadsheet format based on file name extension and MIME type.
   *
   * @param file - The uploaded file.
   * @returns The detected format ('csv', 'xlsx', or 'xls').
   * @throws {Error} If the file format is not supported.
   */
  public static detectFileType(file: File): SpreadsheetFileType {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    if (extension === 'csv' || file.type === 'text/csv') {
      return 'csv';
    }
    if (extension === 'xlsx' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return 'xlsx';
    }
    if (extension === 'xls' || file.type === 'application/vnd.ms-excel') {
      return 'xls';
    }

    // Decision taken: Rejection of unsupported file extension
    console.warn(`[SpreadsheetParser] Decision taken: Unsupported file type for "${file.name}" (ext: ${extension}, mime: ${file.type})`);
    throw new Error('Formato não suportado. Envie um arquivo nos formatos .csv, .xlsx ou .xls.');
  }

  /**
   * Parses an uploaded file into structured tabular data and column metadata.
   *
   * @param file - The File object selected or dropped by the user.
   * @param targetSheet - Optional sheet name to parse if the workbook has multiple sheets.
   * @returns A promise resolving to the parsed result.
   */
  public async parseFile(file: File, targetSheet?: string): Promise<ParsedSpreadsheetResult> {
    console.info(`[SpreadsheetParser] Step started: Parsing file "${file.name}" (${SpreadsheetParserService.formatFileSize(file.size)})`);

    // Guard Clause 1: File presence
    if (!file) {
      console.warn('[SpreadsheetParser] Decision taken: Aborted parsing due to null file');
      throw new Error('Nenhum arquivo fornecido para leitura.');
    }

    // Guard Clause 2: File size boundary
    if (file.size > MAX_FILE_SIZE_BYTES) {
      console.warn(`[SpreadsheetParser] Decision taken: Rejected file exceeding 25MB (${file.size} bytes)`);
      throw new Error(`O arquivo excede o limite de 25 MB suportado pelo navegador (${SpreadsheetParserService.formatFileSize(file.size)}).`);
    }

    const fileType = SpreadsheetParserService.detectFileType(file);

    if (fileType === 'csv') {
      console.info('[SpreadsheetParser] Decision taken: Routing file to CSV parser engine');
      const text = await file.text();
      return this.parseCsvString(text, file.name, file.size);
    }

    console.info(`[SpreadsheetParser] Decision taken: Routing file to Excel engine (${fileType})`);
    const buffer = await file.arrayBuffer();
    return this.parseExcelArrayBuffer(buffer, file.name, file.size, fileType, targetSheet);
  }

  /**
   * Parses CSV string content using PapaParse.
   *
   * @param content - Raw text contents of the CSV file.
   * @param fileName - Original file name.
   * @param fileSizeBytes - Total size in bytes.
   * @returns Parsed spreadsheet result.
   */
  public parseCsvString(content: string, fileName: string, fileSizeBytes: number): ParsedSpreadsheetResult {
    // Guard Clause: Empty content
    if (!content || !content.trim()) {
      console.warn('[SpreadsheetParser] Decision taken: Empty CSV content supplied');
      throw new Error('O arquivo CSV selecionado está vazio.');
    }

    const parseOutcome = Papa.parse<string[]>(content, {
      skipEmptyLines: 'greedy',
      header: false
    });

    if (parseOutcome.errors.length > 0 && parseOutcome.data.length === 0) {
      console.warn('[SpreadsheetParser] Decision taken: CSV parsing failed with syntax errors', parseOutcome.errors);
      throw new Error(`Falha ao ler o arquivo CSV: ${parseOutcome.errors[0]?.message || 'Formatação inválida'}`);
    }

    const rawRows = parseOutcome.data as string[][];

    if (rawRows.length < 1) {
      console.warn('[SpreadsheetParser] Decision taken: No rows found in CSV');
      throw new Error('Nenhuma linha de dados encontrada no arquivo CSV.');
    }

    // Extract and sanitize headers from first line
    const rawHeaders = rawRows[0].map((h) => (h || '').toString().trim());
    const validHeaders = this.sanitizeHeaders(rawHeaders);

    if (validHeaders.length === 0) {
      console.warn('[SpreadsheetParser] Decision taken: Header row is empty or malformed');
      throw new Error('Não foi possível identificar o cabeçalho das colunas no arquivo CSV.');
    }

    const dataRows = rawRows.slice(1);
    const mappedRows: Record<string, any>[] = [];

    for (let r = 0; r < dataRows.length; r++) {
      const line = dataRows[r];
      // Skip completely blank rows
      if (line.every((cell) => cell === undefined || cell === null || cell.toString().trim() === '')) {
        continue;
      }

      const rowObj: Record<string, any> = {};
      validHeaders.forEach((header, colIndex) => {
        const rawCell = line[colIndex];
        rowObj[header] = rawCell !== undefined && rawCell !== null ? rawCell.toString().trim() : '';
      });
      mappedRows.push(rowObj);
    }

    const metadata: SpreadsheetMetadata = {
      fileName,
      fileSizeBytes,
      fileSizeFormatted: SpreadsheetParserService.formatFileSize(fileSizeBytes),
      fileType: 'csv',
      sheetNames: ['Padrão'],
      activeSheet: 'Padrão',
      totalRows: mappedRows.length,
      totalColumns: validHeaders.length,
      uploadedAt: new Date()
    };

    const columnsSummary = this.buildColumnsSummary(validHeaders, mappedRows);

    console.info(`[SpreadsheetParser] Step concluded: CSV parsed successfully (${mappedRows.length} rows, ${validHeaders.length} cols)`);

    return {
      metadata,
      headers: validHeaders,
      rows: mappedRows,
      previewRows: mappedRows.slice(0, 10),
      columnsSummary
    };
  }

  /**
   * Parses an Excel ArrayBuffer (.xlsx or .xls) using SheetJS.
   *
   * @param buffer - Binary ArrayBuffer of the Excel file.
   * @param fileName - Original file name.
   * @param fileSizeBytes - Total size in bytes.
   * @param fileType - 'xlsx' or 'xls'.
   * @param targetSheet - Target sheet name, or defaults to the first available sheet.
   * @returns Parsed spreadsheet result.
   */
  public parseExcelArrayBuffer(
    buffer: ArrayBuffer,
    fileName: string,
    fileSizeBytes: number,
    fileType: 'xlsx' | 'xls',
    targetSheet?: string
  ): ParsedSpreadsheetResult {
    let workbook: XLSX.WorkBook;

    try {
      workbook = XLSX.read(buffer, { type: 'array' });
    } catch (err) {
      console.warn('[SpreadsheetParser] Decision taken: SheetJS failed to decode binary workbook', err);
      throw new Error('Não foi possível decodificar o arquivo Excel. Verifique se o arquivo não está corrompido ou protegido por senha.');
    }

    const sheetNames = workbook.SheetNames;
    if (!sheetNames || sheetNames.length === 0) {
      console.warn('[SpreadsheetParser] Decision taken: Workbook contains zero sheets');
      throw new Error('O arquivo Excel não contém nenhuma planilha legível.');
    }

    const activeSheetName = targetSheet && sheetNames.includes(targetSheet) ? targetSheet : sheetNames[0];
    const worksheet = workbook.Sheets[activeSheetName];

    if (!worksheet) {
      console.warn(`[SpreadsheetParser] Decision taken: Sheet "${activeSheetName}" not found in workbook`);
      throw new Error(`A planilha "${activeSheetName}" não foi encontrada no arquivo.`);
    }

    // Convert sheet to array of row arrays
    const rawMatrix: any[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      blankrows: false,
      defval: ''
    });

    if (rawMatrix.length === 0) {
      console.warn(`[SpreadsheetParser] Decision taken: Sheet "${activeSheetName}" is empty`);
      throw new Error(`A planilha "${activeSheetName}" está vazia.`);
    }

    // Extract headers from first non-empty row
    const rawHeaders = (rawMatrix[0] || []).map((h) => (h !== undefined && h !== null ? String(h).trim() : ''));
    const validHeaders = this.sanitizeHeaders(rawHeaders);

    if (validHeaders.length === 0) {
      console.warn('[SpreadsheetParser] Decision taken: Excel header row contains zero non-empty column names');
      throw new Error('Não foi possível identificar nomes válidos de colunas na primeira linha da planilha.');
    }

    const dataMatrix = rawMatrix.slice(1);
    const mappedRows: Record<string, any>[] = [];

    for (let r = 0; r < dataMatrix.length; r++) {
      const line = dataMatrix[r];
      if (!line || line.every((cell) => cell === undefined || cell === null || String(cell).trim() === '')) {
        continue;
      }

      const rowObj: Record<string, any> = {};
      validHeaders.forEach((header, colIndex) => {
        const cell = line[colIndex];
        rowObj[header] = cell !== undefined && cell !== null ? String(cell).trim() : '';
      });
      mappedRows.push(rowObj);
    }

    const metadata: SpreadsheetMetadata = {
      fileName,
      fileSizeBytes,
      fileSizeFormatted: SpreadsheetParserService.formatFileSize(fileSizeBytes),
      fileType,
      sheetNames,
      activeSheet: activeSheetName,
      totalRows: mappedRows.length,
      totalColumns: validHeaders.length,
      uploadedAt: new Date()
    };

    const columnsSummary = this.buildColumnsSummary(validHeaders, mappedRows);

    console.info(`[SpreadsheetParser] Step concluded: Excel sheet "${activeSheetName}" parsed successfully (${mappedRows.length} rows, ${validHeaders.length} cols)`);

    return {
      metadata,
      headers: validHeaders,
      rows: mappedRows,
      previewRows: mappedRows.slice(0, 10),
      columnsSummary
    };
  }

  /**
   * Sanitizes and guarantees unique, non-empty headers for all detected columns.
   *
   * @param headers - Raw header labels.
   * @returns Clean array of unique header strings.
   */
  private sanitizeHeaders(headers: string[]): string[] {
    const seenCount: Record<string, number> = {};
    const sanitized: string[] = [];

    for (let i = 0; i < headers.length; i++) {
      const original = headers[i]?.trim();
      const baseName = original || `Coluna_${i + 1}`;

      if (!seenCount[baseName]) {
        seenCount[baseName] = 1;
        sanitized.push(baseName);
      } else {
        seenCount[baseName]++;
        sanitized.push(`${baseName}_${seenCount[baseName]}`);
      }
    }

    return sanitized;
  }

  /**
   * Inspects values in each column to summarize sample values, non-empty count, and inferred type.
   *
   * @param headers - Array of sanitized column headers.
   * @param rows - Array of row objects.
   * @returns Array of ColumnSummary descriptors.
   */
  private buildColumnsSummary(headers: string[], rows: Record<string, any>[]): ColumnSummary[] {
    return headers.map((header, index) => {
      const samples: (string | number | boolean)[] = [];
      let nonEmptyCount = 0;
      let numericCount = 0;
      let booleanCount = 0;

      for (let r = 0; r < rows.length; r++) {
        const val = rows[r][header];
        if (val !== undefined && val !== null && val !== '') {
          nonEmptyCount++;

          if (samples.length < 4) {
            samples.push(val);
          }

          // Check for numeric
          const num = Number(val);
          if (!isNaN(num) && typeof val !== 'boolean') {
            numericCount++;
          } else if (/^(true|false|sim|nao|não)$/i.test(String(val))) {
            booleanCount++;
          }
        }
      }

      let detectedType: InferredColumnType = 'string';
      if (nonEmptyCount > 0) {
        if (numericCount / nonEmptyCount >= 0.75) {
          detectedType = 'number';
        } else if (booleanCount / nonEmptyCount >= 0.75) {
          detectedType = 'boolean';
        }
      }

      return {
        header,
        index,
        sampleValues: samples,
        nonEmptyCount,
        detectedType
      };
    });
  }
}

export const spreadsheetParserService = new SpreadsheetParserService();
