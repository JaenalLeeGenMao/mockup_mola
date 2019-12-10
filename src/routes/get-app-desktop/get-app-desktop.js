import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './get-app-desktop.css'
import { playStoreBadge, appStoreBadge } from '@global/imageUrl'
import { getPartners } from '@actions/partners'

class GetAppDesktop extends Component {
  state = {
    store_url: '',
    ios_store_url: '',
  }

  componentDidMount() {
    const { loadPartners } = this.props
    this.getConfig()
    loadPartners()
  }

  getConfig = async () => {
    const { configParams } = this.props
    if (configParams.data) {
      const { store_url, ios_store_url } = configParams.data
      this.setState({
        store_url,
        ios_store_url,
      })
    }
  }

  handleLink = link => {
    window.open(link, '_blank')
  }

  renderLink = () => {
    const { partners } = this.props
    const dataFetch = partners.data

    if (partners.meta.status === 'success') {
      return (
        <>
          {dataFetch.map((dt, idx) => {
            return (
              <a key={idx} onClick={() => this.handleLink(dt.url || '')}>
                {' '}
                <span className={styles.underName}>{dt.name}</span>
              </a>
            )
          })}
        </>
      )
    } else if (partners.meta.status === 'error') {
      {
        return (
          <>
            <a onClick={() => this.handleLink('https://www.polytronstore.com/video/358')}> polytron.com</a>
          </>
        )
      }
    }
  }

  render() {
    return (
      <>
        <div className={styles.imageBg}>
          <div className={styles.container}>
            <div className={styles.titleText}>Unduh aplikasi Mola TV di</div>
            <div className={styles.storeContainer}>
              <img
                src={playStoreBadge}
                className={`${styles.store}`}
                onClick={() => this.handleLink(this.state.store_url || '')}
              />
              <img
                src={appStoreBadge}
                className={`${styles.store}`}
                onClick={() => this.handleLink(this.state.ios_store_url || '')}
              />
            </div>
            <div className={styles.textContainer}>
              <div>
                Mola Polytron Streaming, Mola Polytron Smart TV, Mola Matrix bisa diperoleh di:{' '}
                <span className={styles.electronicCity}>Electronic City</span>
                <br />
                Untuk pembelian online silahkan kunjungi:<span className={styles.partnerList}>{this.renderLink()}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  loadPartners: () => dispatch(getPartners()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(GetAppDesktop)
