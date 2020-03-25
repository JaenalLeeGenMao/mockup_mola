import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _isUndefined from 'lodash/isUndefined'
import Modal from 'react-responsive-modal'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Layout from '@components/Molalayout'
import Checkbox from '@components/Checkbox'
import SubscriptionList from '@components/SubscriptionList'

import history from '@source/history'

import styles from './Compensation.css'

class Compensation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user ? props.user.email : '',
      package: '',
      checkboxCheckedOne: false,
      isShowModal: false,
      packageTitle: '',
      tab: '',
      rendered: false
    }
  }

  componentDidMount() {
    this.setState({
      rendered: true
    })
  }
  onPackageClicked = (title) => {
    if (title) {
      let replaceSpace = title.replace(/\s+/g, '+')
      this.setState({ packageTitle: replaceSpace })
    }
  }

  handleButtons = (tab) => {
    if (tab === 'fromCompensation') {
      this.toAnotherPage(tab)
    }
    else if (tab === 'fromRefund') {
      this.handleRenderChange('package')
    }
    else if (tab === 'fromPackage') {
      // go to google docs
      this.toAnotherPage(tab)
    }
  }

  onAcceptRefund = () => {
    this.onShowModal()
    this.handleRenderChange('refund')
  }

  onShowModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  readQueryParams = query => {
    if (this.state.rendered) {
      const uriSearch = location.search
      if (!_isUndefined(uriSearch) && uriSearch !== '') {
        const urlParams = new URLSearchParams(uriSearch)
        return urlParams.get(query)
      }
      return
    }
    return
  }

  handleRenderChange(tab) {
    history.push(`/accounts/compensation${tab ? `?tab=${tab}` : ''}`)
  }


  toAnotherPage(from) {
    if (from === "fromCompensation") {
      window.location.href = `/accounts/ordered?for=compensation`
    }
    else if (from === "fromPackage") {
      window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLSea__GH1_AYLrKoKs-EIHz9MPcrE6_tULD3VVNy0Cb1r7kUmA/viewform?usp=pp_url&entry.713599393=${this.state.email}&entry.202622565=${this.state.packageTitle}`
    }
  }

  renderErrorPage() {
    const { isMobile } = this.props
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        const origin = _get(document, 'location.origin', '')
        const redirectUri = `${origin}${
          isMobile ? '/accounts/subscriptionsList' : '/accounts/profile?tab=subscriptionPackage'
          }`
        // tidak bisa lewat client kena page not found, terpaksa SSR
        window.location.href = `${origin}/signout?redirect_uri=${encodeURIComponent(redirectUri)}`
        return null
      }

      return (
        <div className={styles.compensation__error_wrapper}>
          <p>Your session has expired. Redirecting to login in {seconds} seconds.</p>
        </div>
      )
    }

    return <Countdown date={Date.now() + 5000} renderer={renderer} />
  }

  checkboxOnChange = e => {
    this.setState({
      checkboxCheckedOne: !this.state.checkboxCheckedOne,
    })
  }

  renderModal = () => {
    const bg = {
      modal: {
        background: '#1D1F21'
      }
    }
    return (
      <Modal
        open={this.state.isShowModal}
        onClose={this.onShowModal}
        closeOnOverlayClick={true}
        closeOnEsc={true}
        showCloseIcon={false}
        styles={bg}
        center
      >
        <div className={styles.modalWrapper}>
          <h2> Apakah anda yakin?</h2>
          <p>
            Pengembalian dana dapat berlangsung hingga 7 hari kerja.
        </p>
          <div className={styles.buttonsWrapper}>
            <div className={styles.declineButton} >
              <button className={`${styles.btn} ${styles.danger}`} type="button" onClick={this.onShowModal}>
                Batal
            </button>
              <button className={`${styles.btn} ${styles.success}`} type="button" onClick={() => this.onAcceptRefund()} >
                Ya, Saya yakin
            </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  renderHeader = (name) => {
    return (
      <Header isMobile title={name} />
    )
  }

  renderRefund() {
    const { checkboxCheckedOne } = this.state

    const { isMobile } = this.props

    return (
      <>
        {isMobile && this.renderHeader('Pengembalian Dana')}
        <LazyLoad>
          <div className={styles.compensation_container}>
            <div className={styles.order__content_list}>
              <div style={{ flexDirection: 'row', paddingTop: '6rem' }}>
                <div className={styles.order__content_title}> Syarat dan Ketentuan Pengembalian Dana </div>
                <div className={styles.order__content_list_price}>
                  <p>1. Proses pengembalian dana akan selesai maksimal sampai 7 hari kerja sejak pengajuan pengembalian dana diterima Mola.tv</p><br />
                  <p>2. Jumlah dana yang dikembalikan sesuai dengan nominal yang Anda bayarkan</p><br />
                  <p>3. Proses pengembalian dana akan dilakukan melalui bank transfer ke rekening BCA</p><br />
                  <p>4. Proses pengembalian dana hanya dapat diproses apabila email dan paket yang diajukan untuk pengembalian dana sama dengan email dan paket saat transaksi</p><br />
                  <p>5. Mola.tv akan melakukan konfirmasi ke email pemilik akun jika terdapat perbedaan data. Jika saat melakukan konfirmasi Mola.tv tidak mendapatkan jawaban sampai 7 hari kerja, maka pengajuan pengembalian dana akan dibatalkan</p><br />
                  <p>6. Mola.tv tidak bertanggung jawab atas terhambatnya proses pengembalian dana akibat kesalahan pengisian data atau kurangnya informasi sehubungan dengan pengembalian dana</p><br />
                  <p>7. Pengajuan pengembalian dana yang telah kami proses tidak dapat dibatalkan dengan alasan apa pun</p><br />
                </div>
              </div>

              <div className={styles.order__content_list_button}>
                <button
                  type="submit"
                  className={`${styles.order__content_submit}`}
                  onClick={() => { this.handleButtons("fromRefund") }}
                >
                  Mulai Proses
                </button>
              </div>
            </div>
          </div>
        </LazyLoad>
      </>
    )
  }

  renderPackageList() {
    const { isMobile } = this.props
    const { packageTitle } = this.state

    return (
      <>
        {isMobile && this.renderHeader('Pengembalian Dana')}
        <LazyLoad>
          <div className={[styles.compensation_container, { flexDirection: 'row' }]}>
            <div className={styles.order__content_list}>
              <div style={{ flexDirection: 'row', paddingTop: '6rem' }}>
                <div className={styles.order__content_title}> Pilih paket berlangganan anda. </div>
                <SubscriptionList
                  isMobile={isMobile}
                  data={this.props.user.subscriptions}
                  onClickPackage={this.onPackageClicked}
                // data={this.props.subscribe.data}
                />

              </div>
              <div className={styles.order__content_list_button}>
                <button
                  type="submit"
                  className={`${
                    packageTitle
                      ? styles.order__content_submit
                      : styles.order__content_submit_false
                    }`}
                  onClick={() => { this.handleButtons("fromPackage") }}
                  disabled={!packageTitle}
                >
                  Saya Setuju
                </button>
              </div>
            </div>

          </div>
        </LazyLoad>
      </>
    )
  }

  renderCompensation() {
    const { checkboxCheckedOne } = this.state

    const { isMobile } = this.props

    return (
      <>
        {isMobile && this.renderHeader('Kompensasi')}
        <LazyLoad>
          <div className={styles.compensation_container}>
            <div className={styles.order__content_list}>
              <div style={{ flexDirection: 'row', paddingTop: '6rem' }}>
                <div className={styles.order__content_title}> Kompensasi untuk Pelanggan Premium Mola TV </div>
                <div className={styles.order__content_list_price}>
                <ol>
      <li>
        Paket Liga Inggris Rp 25.000 (Paket 1 Bulan):
        <ul>
          <li>
            Kompensasi penggantian yang diberikan oleh Mola TV adalah sesuai dengan jumlah hari langganan yang masih tersisa dari hari terhitung mulai dari tanggal pembelian paket hingga cut off hari ini (13 Maret 2020) dan sisa hari masa langganan akan dilanjutkan mulai terhitung dari tanggal resmi diumumkan dimulainya pertandingan Liga Inggris.
    Contoh: Bila masih ada sisa 14 hari dari 30 hari masa langganan, maka 14 hari tersebut akan ditambahkan dari tanggal dimulainya kembali pertandingan Liga Inggris.
          </li>
          <li>
            Masa berlaku paket langganan akan otomatis direfresh atau diupdate di status akun masing-masing pelanggan.
          </li>
        </ul>
      </li>
      <li>
        Paket Liga Inggris Rp 50.000 (Sampai Akhir Musim 2019/2020).
        <ul>
          <li>
            Kompensasi penggantian yang diberikan oleh Mola TV adalah akan fleksibel mengikuti sampai masa berakhirnya musim Liga Inggris periode 2019/2020 yang ditentukan secara resmi oleh Liga Inggris.
      Catatan:
         
            Masa berakhirnya paket akan di-update secara otomatis di status akun pelanggan masing-masing.
          </li>
        </ul>
      </li>
      <li>
        Paket langganan Rp 100.000 (Liga Inggris Sampai Akhir Musim 2019/2020 dan Piala Eropa/Euro 2020):
        <ul>
          <li>
            Kompensasi langganan Liga Inggris seperti keterangan paket No. 2 di atas.
          </li>
          <li>
            Kompensasi langganan Piala Eropa/Euro 2020 bila mengalami penundaan akan mengikuti pengumuman resmi selanjutnya tentang ini.
    Catatan:
            Masa berakhirnya paket akan di-update secara otomatis di status akun pelanggan masing-masing.
          </li>
        </ul>
      </li>
    </ol>
                </div>

              </div>

              <div className={styles.order__content_list_button}>
                <div className={styles.order__content_list_info}>
                  <div className={styles.order__content_checkbox}>
                    <div className={styles.order__content_checkbox_list}>
                      <Checkbox value={checkboxCheckedOne} onChange={this.checkboxOnChange} />
                      <div className={styles.order__content_checkbox_text}>
                        <p>
                          Saya telah membaca, mengerti dan menerima Ketentuan & Kebijakan Kompensasi Pelanggan.
                      </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${
                    checkboxCheckedOne
                      ? styles.order__content_submit
                      : styles.order__content_submit_false
                    }`}
                  onClick={() => { this.handleButtons("fromCompensation") }}
                  disabled={!checkboxCheckedOne}
                >
                  Saya Setuju
                </button>

                <div
                  className={`${
                    styles.order__content_submit_refund
                    }`}
                >
                  <p onClick={this.onShowModal}
                  >
                    Saya ingin pengembalian dana
                  </p>
                </div>
              </div>
            </div>
          </div>
          {this.renderModal()}
        </LazyLoad>
      </>
    )
  }

  render() {
    const { loading, error, isShowCompensationDetail } = this.state
    const { isMobile } = this.props
    return (
      <Layout>
        <div className={styles.wrapper}>
          {!this.readQueryParams('tab') && this.renderCompensation()}
          {this.readQueryParams('tab') === 'refund' && this.renderRefund()}
          {this.readQueryParams('tab') === 'package' && this.renderPackageList()}
          {/* {error && this.renderErrorPage()} */}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(Compensation)
