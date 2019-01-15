/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Auth from '@api/auth'
import config from '@source/config'

import Form from '@components/FormInput'
import s from './Reset.css'
import { setUserVariable } from '@actions/user'

import { getLocale } from '../locale'

class Reset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: getLocale(),
      password: '',
      confirmPassword: '',
      token: '',
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  handleResetPassword = async () => {
    const { password } = this.state,
      { runtime: { csrf } } = this.props

    const result = await Auth.updateNewPassword({
      password,
      csrf,
    })
    if (result.meta.status === 'success') {
      window.location.href = `${config.endpoints.domain}/accounts/login`
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { locale, password, confirmPassword } = this.state

    return (
      <Fragment>
        <div className={s.wrapper}>
          <div className={s.root}>
            <div className={s.container}>
              <p className={s.labelHeader}>Reset password</p>
              <p>{locale['subtitle']}</p>
              <div>
                <Form id="password" type="password" name="password" onChange={this.onChangeInput} value={password} autoFocus>
                  {locale['new_password']}
                </Form>
                <Form id="confirmPassword" type="password" name="confirmPassword" onChange={this.onChangeInput} value={confirmPassword}>
                  {`${locale['confirm']} password`}
                </Form>
                <div className={s.formGroup}>
                  <button className={s.button} onClick={this.handleResetPassword}>
                    {locale['send']}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => ({
  onSetUserVariables: ({ name, value }) => dispatch(setUserVariable({ name, value })),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Reset)
