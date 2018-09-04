import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { Link } from 'react-router-dom';
import Link from '../../Link';
import { IoMdArrowDropup } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

import LazyLoad from '@components/common/Lazyload';

import styles from './right-menu.css';

const RightMenu = ({ color }) => (
    <div className={styles.right__menu}>
        <Link
            style={{ color }}
            className={styles.right__menu_search}
            to="/search"
        >
            <LazyLoad>Search</LazyLoad>
        </Link>
        <span className ={styles.right__menu_wrapper}>
            <LazyLoad><FaUserCircle size='40px' color={color} /></LazyLoad>
            <div className={styles.right__menu_dropdown_wrapper}>
                {/* <IoMdArrowDropup className={styles.right__menu_dropdown_caret} size={44} color="grey" /> */}
                <div className={styles.right__menu_dropdown} style={{ color }}>
                    <Link style={{ color }} to="/">Account</Link>
                    <Link style={{ color }} to="/">History</Link>
                    <Link style={{ color }} to="/">Inbox</Link>
                    <Link style={{ color }} to="/">System Info</Link>
                    <div className={styles.right__menu_dropdown_footer}>
                        <Link style={{ color }} to="/">Account</Link>
                        &bull;
                        <Link style={{ color }} to="/">History</Link>
                        &bull;
                        <Link style={{ color }} to="/">Inbox</Link>
                    </div>
                </div>
            </div>
        </span>
    </div>
);

export default withStyles(styles)(RightMenu);
