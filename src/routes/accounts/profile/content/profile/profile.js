import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import Select from 'react-select'

import { updatePassword } from '@actions/resetPassword'
import Auth from '@api/auth'
import Uploader from '@api/uploader'

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

const FormContent = ({ id, label, value, type = 'password', disabled, onChange, options }) => {
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
        <input type={type} id={id} onChange={onChange} value={value} className={disabled ? s.disabled : ''} disabled={disabled} />
      )}
    </div>
  )
}

class Profile extends React.Component {
  constructor(props) {
    super(props)

    const { uid, firstName, lastName, email, phoneNumber, photo, birthdate, gender, location, subscriptions } = props.user

    this.state = {
      isToggled: false,
      name: `${firstName} ${lastName}`,
      email: email || '',
      phoneNumber: phoneNumber || '',
      photo: photo || '',
      birthdate: birthdate || '',
      gender: gender || '',
      location: location || '',
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    const { name = '', email = '', birthdate = '', photo = '', gender = '', location = '', phoneNumber = '' } = this.state
    const { csrf } = this.props.runtime
    const { token } = this.props.user
    const payload = { name, csrf, birthdate, gender, location, token, phone: phoneNumber }

    const update = Auth.updateProfile(payload)
    update.then(response => {
      if (response.meta.status === 'success') {
        // this.setState({
        //   name,
        //   email,
        //   phoneNumber,
        //   photo,
        //   birthdate,
        //   gender,
        //   location,
        // })

        this.setState({
          isToggled: !this.state.isToggled,
        })
        this.props.onClick()
        toastr.success('Notification', 'Update profile success!')
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

  updateProgress = evt => {
    console.log('updateProgress', evt)
    // const progress = document.querySelector('#percentage')
    // progress.textContent = '0%'
    // console.log(progress)
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round(evt.loaded / evt.total * 100)
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        // progress.style.width = percentLoaded + '%';
        // progress.textContent = percentLoaded + '%'
      }
    }
  }

  handleFileSelect = evt => {
    var files = evt.target.files // FileList object
    const that = this

    // Loop through the FileList and render image files as thumbnails.
    // eslint-disable-next-line no-cond-assign
    for (var i = 0, f; (f = files[i]); i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue
      }

      var reader = new FileReader()
      reader.onprogress = this.updateProgress

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        // console.log('onload', theFile)
        return function(e) {
          console.log(e)
          const postFiles = Uploader.uploadImage(theFile)
          postFiles.then(response => {
            console.log(response)
            if (response.meta.status === 'success') {
              that.setState({
                photo: reader.result,
              })
            }
          })
          // Render thumbnail.
          // var span = document.createElement('span')
          // span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('')
          // document.getElementById('list').insertBefore(span, null)
        }
      })(f)

      // Read in the image file as a data URL.
      reader.readAsDataURL(f)
    }
  }

  handleProfileClick = e => {
    setTimeout(function() {
      document.querySelector('#file').click()
    }, 250)
  }

  render() {
    const { isMobile, onClick, user } = this.props
    const { uid, subscriptions } = user
    const { isToggled, name, email, phoneNumber, photo, birthdate, gender, location } = this.state

    return (
      <div>
        <div className={s.profile__container}>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: !isToggled ? 'none' : 'block' }}>
            <div style={{ position: 'relative' }}>
              <div onClick={this.handleProfileClick} className={s.profile_image_wrapper}>
                {!photo && <p>Edit</p>}
                {photo && <img alt="" src={photo} />}
              </div>
              <input id="file" className={s.profile_image_input} type="file" accept="image/*" onChange={this.handleFileSelect} />
            </div>
            <FormContent type="text" id="name" label="Ubah nama" value={name} onChange={this.onChangeInput} />
            <FormContent type="text" id="email" label="Ubah email" value={email} onChange={this.onChangeInput} disabled />
            <FormContent type="text" id="phoneNumber" label="Ubah nomor telfon" value={phoneNumber} onChange={this.onChangeInput} disabled />
            <FormContent type="date" id="birthdate" label="Ubah tanggal lahir" value={birthdate} onChange={this.onChangeInput} />
            <FormContent type="select" id="gender" label="Ubah jenis kelamin" value={{ label: this.getGenderText(gender), value: gender }} onChange={this.onChangeSelect} options={genderOptions} />
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
            <div style={{ position: 'relative' }}>
              <div className={s.profile_image_wrapper}>{photo && <img alt="" src={user.photo} />}</div>
            </div>
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
