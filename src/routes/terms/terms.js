import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderTerms from '@components/Header'

import styles from './terms.css'
import { getLocale } from './locale'

class Terms extends Component {
  state = {
    info: null,
    locale: getLocale(),
  }
  render() {
    const { locale } = this.state
    return (
      <div className={styles.terms_header}>
        <HeaderTerms stickyOff rightMenuOff libraryOff {...this.props} />
        <div className={styles.terms_singlepage}>
          <div className={styles.terms_contentheadlinecls}>{locale['terms_contentheadline']}</div>
          <div className={styles.terms_contentbody}>
            <div className={styles.terms_contenttitlecls}>{locale['terms_contenttitle']}</div>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_two']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_two']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_three']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_three']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_four']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_four']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_five']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_five']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_six']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_six']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_seven']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_seven']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_eight']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_eight']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_nine']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_nine']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_ten']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_ten']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_elvn']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_elvn']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_twlv']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_twlv']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_thteen']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_thteen']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_fourteen']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_fourteen']}</p>
            <div className={styles.terms_titleparagraphcls}>{locale['terms_titleparagraph_ffthteen']}</div>
            <p className={styles.terms_contentfullpone}>{locale['terms_contentparagraph_ffthteen']}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Terms)
