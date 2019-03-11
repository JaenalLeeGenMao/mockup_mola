import React from 'react'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'

import '@global/style/css/reactReduxToastr.css'

import { UiInput, UiNavigation, UiButton, UiMobileNav } from '@components'
import LazyLoad from '@components/common/Lazyload'

import s from './subscription.css'

class Subscription extends React.Component {
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
        <div className={s.subscription__container}>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: !isToggled ? 'none' : 'block' }}>
            {/* <div className={s.subscription_form_wrapper}>
              <label htmlFor="currentPassword">Sandi sekarang</label>
              <input type="password" id="currentPassword" onChange={this.onChangeInput} value={currentPassword} />
            </div>
            <div className={s.subscription_form_wrapper}>
              <label htmlFor="newPassword">Ubah sandi</label>
              <input type="password" id="newPassword" onChange={this.onChangeInput} value={newPassword} />
            </div>
            <div className={s.subscription_form_wrapper}>
              <label htmlFor="confirmNewPassword">Konfirmasi sandi</label>
              <input type="password" id="confirmNewPassword" onChange={this.onChangeInput} value={confirmNewPassword} />
            </div>
            <div style={{ textAlign: 'left', padding: '2rem 0' }}>
              <button className={s.subscription_button_active} onClick={this.handleSubmit}>
                Simpan
              </button>
              <button className={s.subscription_button} onClick={this.handleClick}>
                Batal
              </button>
            </div> */}
            <div className={s.subscription__wrapper_active}>
              <div className={s.subscription__section_left_active}>
                <h1>PREMIUM</h1>
                <div className={s.icon_cinema} />
              </div>
              <div className={s.subscription__section_right_active}>
                <h1>IDR 139,000/year</h1>
                <p>Menonton semua streaming film tanpa harus terganggu dengan iklan.</p>
              </div>
              <div className={s.icon_tick} />
            </div>
            <div className={s.subscription_expiry}>Paketmu akan berakhir secara otomatis pada 14/02/19.</div>
            <div className={s.subscription_button_wrapper}>
              <button className={s.subscription_button_active} onClick={this.handleClick}>
                Berhenti berlangganan
              </button>
            </div>
          </LazyLoad>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: isToggled ? 'none' : 'block' }}>
            <div className={s.subscription__wrapper}>
              <div className={s.subscription__section_left}>
                <h1>PREMIUM</h1>
                <div className={s.icon_cinema_active} />
              </div>
              <div className={s.subscription__section_right}>
                <h1>IDR 139,000/year</h1>
                <p>Menonton semua streaming film tanpa harus terganggu dengan iklan.</p>
              </div>
              {!isMobile && <div className={s.icon_tick} style={{ opacity: 0 }} />}
            </div>
            <div className={s.subscription_user_info_wrapper}>
              <h1>Data Pengguna</h1>
              <div>
                <p>Name Pengguna</p>
                <p>Admin Mola</p>
              </div>
              <div>
                <p>Email</p>
                <p>admin@mola.tv</p>
              </div>
              <div>
                <p>Nomor Telephone</p>
                <p>+21 012 3456 789</p>
              </div>
            </div>
            <div className={s.subscription_button_wrapper}>
              <button className={s.subscription_button_active} onClick={this.handleClick}>
                Mulai berlangganan
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

const Default = withStyles(s)(Subscription)
export default connect(mapStateToProps, mapDispatchToProps)(Default)
