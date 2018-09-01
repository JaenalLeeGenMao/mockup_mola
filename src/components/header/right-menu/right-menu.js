import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropup } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

import LazyLoad from '@components/common/lazyload';

import styles from './right-menu.css';

const RightMenu = () => (
    <div className={styles.right__menu}>
        <Link className={styles.right__menu_search} to="/search" onClick={this.handleSearch}>
            <LazyLoad>Search</LazyLoad>
        </Link>
        <span className ={styles.right__menu_wrapper}>
            <LazyLoad><FaUserCircle size='40px' /></LazyLoad>
            <div className={styles.right__menu_dropdown_wrapper}>
                {/* <IoMdArrowDropup className={styles.right__menu_dropdown_caret} size={44} color="grey" /> */}
                <div className={styles.right__menu_dropdown}>
                    <Link to="/">Account</Link>
                    <Link to="/">History</Link>
                    <Link to="/">Inbox</Link>
                    <Link to="/">System Info</Link>
                    <div className={styles.right__menu_dropdown_footer}>
                        <Link to="/">Account</Link>
                        &bull;
                        <Link to="/">History</Link>
                        &bull;
                        <Link to="/">Inbox</Link>
                    </div>
                </div>
            </div>
        </span>
    </div>
);

export default RightMenu;
