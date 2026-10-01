import React from 'react';

interface FormScaleProps {
  value: number;
  min?: number;
  max?: number;
  labels: string[];
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
}

export const FormScale: React.FC<FormScaleProps> = ({
  value,
  min = 0,
  max = 100,
  labels,
  minLabel,
  maxLabel,
  onChange
}) => {
  const currentLabelIndex = Math.min(
    Math.round((value / (max - min)) * (labels.length - 1)),
    labels.length - 1
  );

  return (
    <div className="calc-scale-wrap">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
      <div className="calc-scale-labels">
        <span className="calc-scale-label">{minLabel}</span>
        <span className="calc-scale-label">{maxLabel}</span>
      </div>
      <div className="calc-scale-val">{labels[currentLabelIndex]}</div>
    </div>
  );
};
