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
import PropTypes from 'prop-types';
import style from './FormInput.css';
import visible from '@global/style/icons/visible.png'

class FormInput extends React.Component {
    static propTypes = {
      className: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    };

    render() {
      const { className, children, ...props } = this.props;
      return (
        <div className={style.form__formGroup}>
          <input
            className={[style.form__input, className].join(' ')}
            {...props}
            placeholder={children}>
          </input>
          {/* <i className="fa fa-eye" style={{ position: 'absolute', right:  '10px', top: '10px' }}><img src={visible}/></i> */}
          {/* onChange={}// eslint-disable-line jsx-a11y/no-autofocus */}
        </div>
      );
    }
}

export default withStyles(style)(FormInput);