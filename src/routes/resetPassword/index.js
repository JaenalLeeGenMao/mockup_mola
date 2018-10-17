/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Molalayout from '@components/Molalayout';
import ResetDesktop from './desktop/Reset';
import ResetMobile from './mobile/Reset';

const title = 'Reset Password';

function action({ isMobile }) {
  return {
    chunks: ['resetPassword'],
    title,
    component: isMobile ? (
      <Molalayout>
        <ResetMobile />
      </Molalayout>
    ) : (
      <Molalayout>
        <ResetDesktop />
      </Molalayout>
    )
  };
}

export default action;
