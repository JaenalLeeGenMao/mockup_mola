/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './FormInput.css';
import visible from '@global/style/icons/visible.png'

class FormInput extends React.Component {

  render() {
    const { className, children, visibleOn = false, ...props } = this.props;
    return (
      <div className={style.form__formGroup}>
        <input
          className={[style.form__input, className].join(' ')}
          {...props}
          placeholder={children}>
        </input>
        {
          props.type == "password" && visibleOn && (
            <i className={style.form__showPass} style={{ position: 'absolute', right:  '30px', top: '15px' }}><img src={visible}/></i>
          )}
      </div>
    );
  }
}

export default withStyles(style)(FormInput);