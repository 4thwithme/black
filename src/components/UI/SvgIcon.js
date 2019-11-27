import React from 'react';

const url = '/media/sprite-svg.svg';


const SvgIcon = ({ fill, height, width, className, icon }) => (
  <svg viewBox='0 0 16 16' fill={fill} width={width} height={height} className={className}>
    <use xlinkHref={`${url}#${icon}`} />
  </svg>
);
 
export default React.memo(SvgIcon);