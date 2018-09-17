import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import Link from '../../Link'
import { FiSearch, FiUserX } from 'react-icons/fi'
import { iocircle } from 'react-icons/io'
import { FaUserCircle, fauser } from 'react-icons/fa'
import { showModal } from '../../../actions/modal'
import LazyLoad from '@components/common/Lazyload'
import LazyLoadBeta from '@components/common/LazyloadBeta'
import ModalSearch from '../../../routes/search/ModalSearch/ModalSearch'

// import Modal from '@components/common/Modal';
// import { Portal } from 'react-portal';

import styles from './right-menu.css'

const RightMenu = ({ color, searchOff, searchIsModal, showModal  }) => {
// const RightMenu = (props) => {
  const openAlertModal = (event) => {
    showModal({
      open: true,
      // closeModal: this.closeModal
    },'')

    console.log("props di reight menu", props)
  }

  return (
    <div className={styles.right__menu}>
      { !searchOff &&
      <LazyLoadBeta>
        { !searchIsModal &&
        <Link
          className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white}
          to="/search"
        />
        }
        { searchIsModal &&
        <div>
          <a
            className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white}
            onClick={openAlertModal}
          ></a>
         
          <ModalSearch />
          {/* <ModalSearch className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white} /> } */}
        </div>
        }
      </LazyLoadBeta>
      }
      <span className ={styles.right__menu_wrapper}>
        {/* <LazyLoad><FaUserCircle size='32' color={color} /></LazyLoad> */}
        <LazyLoadBeta>
          <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
        </LazyLoadBeta>
        <div className={styles.right__menu_dropdown_wrapper}>
          <div className={styles.right__menu_dropdown} style={{ color }}>
            <Link style={{ color }} to="/">Account</Link>
            <Link style={{ color }} to="/history">History</Link>
            <Link style={{ color }} to="/">Inbox</Link>
            <Link style={{ color }} to="/">System Info</Link>
            <div className={styles.right__menu_dropdown_footer}>
              <Link style={{ color }} to="/">Privacy</Link>
                          &bull;
              <Link style={{ color }} to="/">Terms</Link>
                          &bull;
              <Link style={{ color }} to="/">Help</Link>
            </div>
          </div>
        </div>
      </span>
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }))
  }
})

function mapStateToProps(state) {
  console.log('INi state right menu', state)
  return {
    ...state
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(RightMenu)