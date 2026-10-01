import React from 'react';

interface FormTipProps {
  tip: string;
}

export const FormTip: React.FC<FormTipProps> = ({ tip }) => {
  return (
    <span className="tip" data-tip={tip} tabIndex={0} aria-label={tip}>
      ?
    </span>
  );
};
