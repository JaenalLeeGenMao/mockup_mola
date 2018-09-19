import React from 'react';
import s from './index.css'

import { UiInput, UiNavigation, UiRadio, UiDtPicker, UiMobileNav } from '@components'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput = (e) => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value
    })
  }

  render() {
    const { isMobile } = this.props
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = this.state

    return (
      <div>
        {
          isMobile &&
            <UiMobileNav
              menus={[
                {
                  title: 'PROFILE',
                  href: '/profile'
                },
                {
                  title: 'SECURITY',
                  href: '/security'
                },
                {
                  title: 'SETTING',
                  href: '/setting'
                }
              ]} />
        }
        <div className={s.root}>
          <div className={s.sideLeft}>
            <UiNavigation
              menus={[
                {
                  title: 'PROFILE',
                  href: '/profile'
                },
                {
                  title: 'SECURITY',
                  href: '/security'
                },
                {
                  title: 'SETTING',
                  href: '/setting'
                }
              ]} />
          </div>
          <div className={s.sideCenter}>
            <UiInput
              type="password"
              id="currentPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="Current Password"
              value={currentPassword} />

            <UiInput
              type="password"
              id="newPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="New Password"
              value={newPassword} />

            <UiInput
              type="password"
              id="confirmPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="Confirm Password"
              value={confirmPassword} />
          </div>
          <div className={s.sideRight}></div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);
