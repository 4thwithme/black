import React from 'react';

interface ISpinnerProps {
  width?: string | number,
  height?: string | number,
  className?: string,
  spinnerStyles?: any,
}

const Spinner = ({ className, width = "100%", height = "100%" }: ISpinnerProps) => (
  <img
    src="/media/spinner.gif"
    width={width}
    height={height}
    className={className}
    alt="Loading..." />
);

export default Spinner;