import React from 'react';

import Poster from './poster';
import Layer from './layer';

const content = eachVids => {
  const {
    id,
    title,
    shortDescription,
    isDark,
    poster,
    backgroundColor,
    background /** background */,
    coverBody /** subject */,
    coverTitle /** title image */,
    type
  } = eachVids;
  if (poster) {
    return <Poster {...eachVids} />;
  }
  return <Layer {...eachVids} />;
};

export default content;
