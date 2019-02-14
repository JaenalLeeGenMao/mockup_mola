import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './conditions.css'
import HeaderCondition from '@components/Header'
import { getLocale } from './locale'

class Conditions extends Component {
  state = {
    info: null,
    locale: getLocale(),
    genre: [],
  }

  render() {
    const { locale } = this.state
    return (
      <div className={styles.conditions_header}>
        <HeaderCondition stickyOff rightMenuOff libraryOff {...this.props} />
        <div className={styles.conditions_content_singlepage}>
          <div className={styles.conditions_contentheadlinecls}>{locale['conditions_contentheadline']}</div>
          <div className={styles.conditions_contentbody}>
            <div className={styles.conditions_titleparagraphcls}>{locale['conditions_titleparagraph_one']}</div>
            <p className={styles.conditions_contentfullpone}>{locale['conditions_contentparagraph_one']}</p>
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

export default compose(withStyles(styles), connect(mapStateToProps))(Conditions)
