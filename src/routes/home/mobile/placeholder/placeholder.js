import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Header from '@components/header';

import styles from './placeholder.css';

const Placeholder = () => {
    return (
        <div>
            <Header libraryOff className={styles.placeholder__header} />
            <div className={styles.placeholder__container}>
                <div className={styles.placeholder__title}>
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                </div>
                <div className={styles.placeholder__detail}>
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                </div>
                <div className={styles.placeholder__footer}>
                    <div className={styles.placeholder__line} />
                    <div className={styles.placeholder__line} />
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Placeholder);