import React from 'react';
import s from './index.css';

import { UiInput, UiNavigation, UiButton, UiMobileNav } from '@components';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { updatePassword } from '../../../actions/resetPassword/actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    updatePassword(this.state);
  };

  onChangeInput = e => {
    const target = e.target;
    const { id, value } = target;
    this.setState({
      [id]: value
    });
  };

  render() {
    const { isMobile } = this.props;
    const { currentPassword, newPassword, confirmPassword } = this.state;
    const menus = [
      {
        title: 'PROFILE',
        href: '/accounts/profile'
      },
      {
        title: 'SECURITY',
        href: '/accounts/security'
      },
      {
        title: 'SETTING',
        href: '/accounts/setting'
      }
    ];

    return (
      <div>
        {isMobile && <UiMobileNav menus={menus} />}
        <div className={s.root}>
          <div className={s.sideLeft}>
            <UiNavigation menus={menus} />
          </div>
          <div className={s.sideCenter}>
            <UiInput
              type="password"
              id="currentPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="Current Password"
              value={currentPassword}
            />

            <UiInput
              type="password"
              id="newPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="New Password"
              value={newPassword}
            />

            <UiInput
              type="password"
              id="confirmPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="Confirm Password"
              value={confirmPassword}
            />

            <UiButton type="button" text="CHANGE PASSWORD" onClick={this.handleSubmit} />
          </div>
          <div className={s.sideRight} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);
