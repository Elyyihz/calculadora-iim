import React from 'react';

export interface ChipOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface FormChipsProps<T extends string = string> {
  options: ChipOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  hasError?: boolean;
}

export function FormChips<T extends string = string>({
  options,
  selectedValue,
  onChange,
  hasError = false
}: FormChipsProps<T>): React.ReactElement {
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {opt.icon && (
              <span
                className="chip-icon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  lineHeight: 1
                }}
              >
                {opt.icon}
              </span>
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
