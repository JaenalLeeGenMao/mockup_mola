import React from 'react';
import MobileContent from './content';

const content = eachVids => {
  const { isMobile = false } = eachVids;
  return <MobileContent {...eachVids} isMobile={isMobile} />;
};

export default content;
