import React from 'react';
import s from './index.css';

import { UiInput, UiNavigation, UiButton, UiMobileNav } from '@components';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { updatePassword } from '../../../actions/resetPassword/actions';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    const update = this.props.handleUpdatePassword(this.state);
    update.then(response => {
      if (response) {
        this.setState({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      }
    });
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
    const { currentPassword, newPassword, confirmNewPassword } = this.state;
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
              id="confirmNewPassword"
              uiStyle="box"
              onChange={this.onChangeInput}
              label="Confirm Password"
              value={confirmNewPassword}
            />

            <UiButton type="button" text="CHANGE PASSWORD" onClick={this.handleSubmit} />
          </div>
          <div className={s.sideRight} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toaster: state.toastr.toastrs
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleUpdatePassword: params => dispatch(updatePassword(params))
  };
};

const Default = withStyles(s)(Profile);
export default connect(mapStateToProps, mapDispatchToProps)(Default);
