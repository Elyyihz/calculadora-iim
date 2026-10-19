import React, { useRef, useState, useCallback } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  X,
  RefreshCw,
  Layers,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import {
  ParsedSpreadsheetResult,
  SpreadsheetMetadata
} from '../../../types/spreadsheet';
import { spreadsheetParserService } from '../../../services/SpreadsheetParserService';

interface SpreadsheetDropzoneProps {
  onParsed: (result: ParsedSpreadsheetResult, rawFile: File) => void;
  onClear?: () => void;
  currentResult: ParsedSpreadsheetResult | null;
  currentFile: File | null;
  onSheetChange?: (sheetName: string) => void;
}

/**
 * Modern drag-and-drop file upload zone for CSV and Excel (.xlsx, .xls) files.
 *
 * Provides visual cues for drag-over events, loading spinners during parsing,
 * worksheet selector for multi-sheet workbooks, and error toasts.
 */
export const SpreadsheetDropzone: React.FC<SpreadsheetDropzoneProps> = ({
  onParsed,
  onClear,
  currentResult,
  currentFile,
  onSheetChange
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Processes a File object, parsing it into a ParsedSpreadsheetResult.
   */
  const processFile = useCallback(
    async (file: File, targetSheet?: string) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const result = await spreadsheetParserService.parseFile(file, targetSheet);
        onParsed(result, file);
      } catch (err: any) {
        console.error('[SpreadsheetDropzone] Error parsing spreadsheet:', err);
        setErrorMessage(err?.message || 'Falha ao processar arquivo. Verifique se o formato está correto.');
      } finally {
        setIsLoading(false);
      }
    },
    [onParsed]
  );

  /**
   * Handles native drag over event.
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  /**
   * Handles native drag leave event.
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  /**
   * Handles native drop event.
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  /**
   * Handles native file input change event.
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  /**
   * Handles switching worksheets for an already uploaded workbook.
   */
  const handleSelectSheet = (sheetName: string) => {
    if (!currentFile) return;
    if (onSheetChange) {
      onSheetChange(sheetName);
    }
    processFile(currentFile, sheetName);
  };

  /**
   * Clears the current file and resets dropzone state.
   */
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onClear) {
      onClear();
    }
  };

  const metadata: SpreadsheetMetadata | undefined = currentResult?.metadata;

  return (
    <div style={{ width: '100%' }}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .xlsx, .xls, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      {/* STATE 1: FILE ALREADY LOADED */}
      {metadata && currentFile ? (
        <div
          style={{
            background: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '16px',
            padding: '1.4rem 1.6rem',
            position: 'relative',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.08)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            {/* File Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#2E9E5B',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(46, 158, 91, 0.3)'
                }}
              >
                <FileCheck2 size={24} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0B1924' }}>
                    {metadata.fileName}
                  </span>
                  <span
                    style={{
                      background: '#133E28',
                      color: '#FFFFFF',
                      fontSize: '0.70rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {metadata.fileType}
                  </span>
                </div>

                <div style={{ fontSize: '0.80rem', color: '#4B5563', marginTop: '3px' }}>
                  <span>Tamanho: <strong>{metadata.fileSizeFormatted}</strong></span>
                  <span style={{ margin: '0 8px', color: '#CBD5E1' }}>•</span>
                  <span>Linhas lidas: <strong style={{ color: '#166534' }}>{metadata.totalRows} registros</strong></span>
                  <span style={{ margin: '0 8px', color: '#CBD5E1' }}>•</span>
                  <span>Colunas: <strong>{metadata.totalColumns} identificadas</strong></span>
                </div>
              </div>
            </div>

            {/* Actions: Replace or Remove */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Substituir por outro arquivo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#334155',
                  fontSize: '0.80rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <RefreshCw size={13} />
                <span>Trocar arquivo</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                title="Remover arquivo carregado"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #FECACA',
                  background: '#FFF5F5',
                  color: '#DC2626',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Worksheet selector if workbook has > 1 sheets */}
          {metadata.sheetNames.length > 1 && (
            <div
              style={{
                marginTop: '1.2rem',
                paddingTop: '1rem',
                borderTop: '1px dashed #BBF7D0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803D', fontWeight: 600 }}>
                <Layers size={15} />
                <span>Planilha ativa:</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {metadata.sheetNames.map((sheet) => {
                  const isActive = sheet === metadata.activeSheet;
                  return (
                    <button
                      key={sheet}
                      type="button"
                      onClick={() => handleSelectSheet(sheet)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: isActive ? '1px solid #2E9E5B' : '1px solid #CBD5E1',
                        background: isActive ? '#2E9E5B' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : '#334155',
                        fontSize: '0.78rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {sheet}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* STATE 2: EMPTY DROPZONE */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: isDragOver ? '2px dashed #2E9E5B' : '2px dashed #CBD5E1',
            borderRadius: '16px',
            padding: '2.5rem 1.8rem',
            textAlign: 'center',
            background: isDragOver ? 'rgba(46, 158, 91, 0.05)' : '#FAFAFA',
            cursor: isLoading ? 'wait' : 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={36} color="#2E9E5B" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0B1924' }}>
                Lendo e processando colunas da planilha...
              </div>
              <div style={{ fontSize: '0.80rem', color: '#64748B' }}>
                Extraindo cabeçalhos e registros de colaboradores
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: isDragOver ? '#2E9E5B' : '#F1F5F9',
                  color: isDragOver ? '#FFFFFF' : '#2E9E5B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '4px',
                  transition: 'all 0.2s'
                }}
              >
                <UploadCloud size={28} />
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0B1924' }}>
                {isDragOver ? 'Solte a planilha aqui' : 'Arraste a planilha de respostas ou clique para selecionar'}
              </div>

              <div style={{ fontSize: '0.84rem', color: '#64748B', maxWidth: '480px', lineHeight: 1.5 }}>
                Carregue a exportação das respostas dos funcionários para alimentar o IIM automaticamente.
              </div>

              {/* Badges for accepted formats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '6px',
                    background: '#E2E8F0',
                    color: '#334155'
                  }}
                >
                  <FileSpreadsheet size={13} color="#166534" />
                  Excel (.xlsx, .xls)
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '6px',
                    background: '#E2E8F0',
                    color: '#334155'
                  }}
                >
                  <FileSpreadsheet size={13} color="#0B1924" />
                  CSV (.csv delimitado)
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error alert if any */}
      {errorMessage && (
        <div
          style={{
            marginTop: '0.8rem',
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#B91C1C',
            fontSize: '0.84rem'
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
