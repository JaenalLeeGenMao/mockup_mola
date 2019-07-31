import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderPrivacy from '@components/Header'

import styles from './privacy.css'
import { getLocale } from './locale'

class Privacy extends Component {
  state = {
    info: null,
    locale: getLocale(),
    genre: [],
  }
  render() {
    const { locale } = this.state
    const { noHeader } = this.props
    return (
      <>
        {!noHeader && (
          <div className={styles.privacy_header}>
            <HeaderPrivacy {...this.props} />
          </div>
        )}
        <div className={styles.privacy_singlepage}>
          <div className={styles.privacy_contentheadlinecls}>{locale['privacy_contentheadline']}</div>
          <div className={styles.privacy_contentbody}>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_one']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_one']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_two']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_two']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_three']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_three']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_four']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_four']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_five']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_five']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_six']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_six']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_seven']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_seven']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_eight']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_eight']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_nine']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_nine']}</p>
            <div className={styles.privacy_titleparagraphcls}>{locale['privacy_titleparagraph_ten']}</div>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_ten']}</p>
            <a href="mailto:support@mola.tv" className={styles.privacy_contentlink}>
              support@mola.tv
            </a>
            <p className={styles.privacy_contentfullpone}>{locale['privacy_contentparagraph_twlv']}</p>
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

export default compose(withStyles(styles), connect(mapStateToProps))(Privacy)
