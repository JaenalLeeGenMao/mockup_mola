import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './conditions.css'
import { getLocale } from './locale'

class Conditions extends Component {
  state = {
    info: null,
    locale: getLocale(),
  }
  render() {
    const { locale } = this.state
    return (
      <div className={styles.conditions_singlepage}>
        <div className={styles.conditions_contentheadlinecls}>{locale['conditions_contentheadline']}</div>
        <div className={styles.conditions_contentbody}>
          <div className={styles.conditions_titleparagraphcls}>{locale['conditions_titleparagraph_one']}</div>
          <p className={styles.conditions_contentfullpone}>{locale['conditions_contentparagraph_one']}</p>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Conditions)
