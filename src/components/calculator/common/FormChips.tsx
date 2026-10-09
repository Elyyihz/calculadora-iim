import React from 'react';
import { Check } from 'lucide-react';

export interface ChipOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface FormChipsProps<T extends string = string> {
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

export interface FormChipsMultiProps<T extends string = string> {
  options: ChipOption<T>[];
  selectedValues: T[];
  onChange: (values: T[]) => void;
  hasError?: boolean;
  exclusiveValue?: T;
}

export function FormChipsMulti<T extends string = string>({
  options,
  selectedValues = [],
  onChange,
  hasError = false,
  exclusiveValue
}: FormChipsMultiProps<T>): React.ReactElement {
  const currentValues = Array.isArray(selectedValues) ? selectedValues : [];

  const handleToggle = (val: T) => {
    if (exclusiveValue && val === exclusiveValue) {
      if (currentValues.includes(exclusiveValue)) {
        onChange([]);
      } else {
        onChange([exclusiveValue]);
      }
      return;
    }

    const withoutExclusive = currentValues.filter((v) => v !== exclusiveValue);
    if (withoutExclusive.includes(val)) {
      onChange(withoutExclusive.filter((v) => v !== val));
    } else {
      onChange([...withoutExclusive, val]);
    }
  };

  return (
    <div className={`calc-chips ${hasError ? 'chips-error' : ''}`}>
      {options.map((opt) => {
        const isSelected = currentValues.includes(opt.value);
        return (
          <button
            type="button"
            key={opt.value}
            className={`calc-chip ${isSelected ? 'selected' : ''}`}
            onClick={() => handleToggle(opt.value)}
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
            {isSelected && (
              <Check
                size={12}
                style={{
                  marginLeft: '2px',
                  strokeWidth: 2.6,
                  color: 'var(--brand)'
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

