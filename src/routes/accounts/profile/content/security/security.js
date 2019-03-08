import React from 'react'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'

import '@global/style/css/reactReduxToastr.css'

import { UiInput, UiNavigation, UiButton, UiMobileNav } from '@components'
import LazyLoad from '@components/common/Lazyload'

import s from './security.css'

class Security extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    const update = this.props.handleUpdatePassword(this.state)
    update.then(response => {
      if (response) {
        this.setState({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        })

        this.props.onClick()
      }
    })
  }

  handleClick = e => {
    this.setState({
      isToggled: !this.state.isToggled,
    })
    this.props.onClick()
  }

  onChangeInput = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  render() {
    const { isMobile, onClick } = this.props
    const { isToggled, currentPassword, newPassword, confirmNewPassword } = this.state

    return (
      <div>
        <div className={s.security__container}>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: !isToggled ? 'none' : 'block' }}>
            <div className={s.security_form_wrapper}>
              <label htmlFor="currentPassword">Sandi sekarang</label>
              <input type="password" id="currentPassword" onChange={this.onChangeInput} value={currentPassword} />
            </div>
            <div className={s.security_form_wrapper}>
              <label htmlFor="newPassword">Ubah sandi</label>
              <input type="password" id="newPassword" onChange={this.onChangeInput} value={newPassword} />
            </div>
            <div className={s.security_form_wrapper}>
              <label htmlFor="confirmNewPassword">Konfirmasi sandi</label>
              <input type="password" id="confirmNewPassword" onChange={this.onChangeInput} value={confirmNewPassword} />
            </div>
            <div style={{ textAlign: 'left', padding: '2rem 0' }}>
              <button className={s.security_button_active} onClick={this.handleSubmit}>
                Simpan
              </button>
              <button className={s.security_button} onClick={this.handleClick}>
                Batal
              </button>
            </div>
          </LazyLoad>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: isToggled ? 'none' : 'block' }}>
            <div className={s.security_form_wrapper}>
              <label htmlFor="changePassword">Kata sandi</label>
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => <div key={index} className={s.custom_dots} />)}
                <div />
              </div>
            </div>
            <div style={{ textAlign: 'left', padding: '2rem 0' }}>
              <button className={s.security_button_active} onClick={this.handleClick}>
                Ubah
              </button>
            </div>
          </LazyLoad>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    toaster: state.toastr.toastrs,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleUpdatePassword: params => dispatch(updatePassword(params)),
  }
}

const Default = withStyles(s)(Security)
export default connect(mapStateToProps, mapDispatchToProps)(Default)
