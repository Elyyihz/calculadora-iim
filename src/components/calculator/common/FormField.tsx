import React from 'react';
import { FormTip } from './FormTip';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  tip?: string;
  subPeso?: string;
  subPesoHigh?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  tip,
  subPeso,
  subPesoHigh = false,
  hasError = false,
  errorMessage = 'Campo obrigatório — responda para continuar',
  children,
  style
}) => {
  return (
    <div
      className={`calc-field ${hasError ? 'field-required-missing' : ''}`}
      style={style}
    >
      <label>
        {label}
        {tip && <FormTip tip={tip} />}
        {subPeso && (
          <span className={`calc-sub-peso ${subPesoHigh ? 'high' : ''}`}>
            {subPeso}
          </span>
        )}
      </label>

      {children}

      {hasError && (
        <div className="calc-field-required-note show">
          <AlertCircle size={13} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
