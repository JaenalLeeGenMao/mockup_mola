import React from 'react';
import SystemInfo from './system-info';

import MolaLayout from '@components/Molalayout';

async function action({ isMobile }) {
  return {
    chunks: ['system-info'],
    title: 'Mola - System Info',
    component: (
      <MolaLayout>
        <SystemInfo isMobile={isMobile} />
      </MolaLayout>
    )
  };
}

export default action;
