import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import Select from 'react-select'

import '@global/style/css/reactReduxToastr.css'

import { updatePassword } from '@actions/resetPassword'
import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'

import { genderOptions, countryOptions } from './const'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './profile.css'

const FormPlaceholder = ({ id, label, value }) => (
  <div className={s.profile_form_wrapper}>
    <label htmlFor={id}>{label}</label>
    <p style={{ display: 'flex' }}>{value}</p>
  </div>
)

const FormContent = ({ id, label, value, type = 'password', onChange, options }) => {
  const colourStyles = {
    control: (base, state) => ({
      ...base,
      padding: '0.38rem 4.5%',
      background: '#343434',
      // match with the menu
      borderRadius: '.4rem',
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#343434' : '#343434',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? '#343434' : '#343434',
      },
    }),
    menu: base => ({
      ...base,
      marginTop: 0,
      background: '#343434',
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      fontSize: '1.2rem',
      padding: 0,
    }),
    placeholder: styles => ({ ...styles, color: '#ffffff' }),
    singleValue: (styles, { data }) => ({ ...styles, color: '#ffffff' }),
  }

  return (
    <div className={s.profile_form_wrapper}>
      <label htmlFor={id}>{label}</label>
      {type === 'select' ? (
        <Select value={value} onChange={selectedOption => onChange({ ...selectedOption, id })} options={options} styles={colourStyles} />
      ) : (
        <input type={type} id={id} onChange={onChange} value={value} />
      )}
    </div>
  )
}

class Profile extends React.Component {
  constructor(props) {
    super(props)

    const { uid, firstName, lastName, email, phoneNumber, birthdate, gender, location, subscriptions } = props.user

    this.state = {
      isToggled: false,
      name: `${firstName} ${lastName}`,
      email: email || '',
      phoneNumber: phoneNumber || '',
      birthdate: birthdate || '',
      gender: gender || '',
      location: location || '',
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    const { name = '', birthdate = '', gender = '', location = '', token = '', phoneNumber = '' } = this.state
    const { csrf } = this.props.runtime
    const payload = { name, csrf, birthdate, gender, location, token, phone: phoneNumber }

    const update = Auth.updateProfile(payload)
    console.log('payload', payload)
    update.then(response => {
      if (response) {
        console.log('result', response)
        // this.setState({
        //   name,
        //   birthdate,
        //   gender,
        //   location,
        //   token,
        //   phone: phoneNumber,
        // })

        toastr.success('Notification', 'Update profile success!')
        this.props.onClick()
      } else {
        toastr.warning('Notification', 'Update profile failed!')
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

  onChangeSelect = selectedOption => {
    this.setState({ [selectedOption.id]: selectedOption.value })
    console.log('Option selected:', selectedOption)
  }

  getGenderText = gender => {
    switch (gender) {
      case 'm':
        return 'Pria'
      case 'f':
        return 'Wanita'
      default:
        return 'Lain'
    }
  }

  render() {
    const { isMobile, onClick, user } = this.props
    const { uid, subscriptions } = user
    const { isToggled, name, email, phoneNumber, birthdate, gender, location } = this.state

    return (
      <div>
        <div className={s.profile__container}>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: !isToggled ? 'none' : 'block' }}>
            <FormContent type="text" id="name" label="Ubah nama" value={name} onChange={this.onChangeInput} />
            <FormContent type="text" id="email" label="Ubah email" value={email} onChange={this.onChangeInput} />
            <FormContent type="text" id="phoneNumber" label="Ubah nomor telfon" value={phoneNumber} onChange={this.onChangeInput} />
            <FormContent type="date" id="birthdate" label="Ubah tanggal lahir" value={birthdate} onChange={this.onChangeInput} />
            <FormContent type="select" id="gender" label="Ubah jenis kelamin" value={{ label: getGenderText(gender), value: gender }} onChange={this.onChangeSelect} options={genderOptions} />
            <FormContent type="select" id="location" label="Ubah lokasi" value={{ label: location, value: location }} onChange={this.onChangeSelect} options={countryOptions} />
            <div className={s.profile_button_wrapper}>
              <button className={s.profile_button_active} onClick={this.handleSubmit}>
                Simpan
              </button>
              <button className={s.profile_button} onClick={this.handleClick}>
                Batal
              </button>
            </div>
          </LazyLoad>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: isToggled ? 'none' : 'block' }}>
            <FormPlaceholder id="defaultID" label="ID Pengguna" value={uid} />
            <FormPlaceholder id="changeName" label="Nama Pengguna" value={name} />
            <FormPlaceholder id="changeEmail" label="Email" value={email} />
            <FormPlaceholder id="changePhoneNumber" label="Nomor Telfon" value={phoneNumber} />
            <FormPlaceholder id="changeBirthdate" label="Tanggal Lahir" value={birthdate} />
            <FormPlaceholder id="changeGender" label="Jenis Kelamin" value={gender} />
            <FormPlaceholder id="changeLocation" label="Lokasi" value={location} />
            <FormPlaceholder id="changeSubscription" label="Status Berlangganan" value={subscriptions || 'Belum Aktif'} />
            <div className={s.profile_button_wrapper}>
              <button className={s.profile_button_active} onClick={this.handleClick}>
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
    user: state.user,
    runtime: state.runtime,
    toaster: state.toastr.toastrs,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleUpdatePassword: params => dispatch(updatePassword(params)),
  }
}

const Default = withStyles(s)(Profile)
export default connect(mapStateToProps, mapDispatchToProps)(Default)
