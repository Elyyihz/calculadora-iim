import React from 'react';

export interface ChipOption {
  value: string;
  label: string;
}

interface FormChipsProps {
  options: ChipOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export const FormChips: React.FC<FormChipsProps> = ({
  options,
  selectedValue,
  onChange,
  hasError = false
}) => {
  return (
    <div className={`calc-chips ${hasError ? 'chips-error' : ''}`}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            className={`calc-chip ${isSelected ? 'selected' : ''}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={isSelected}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
