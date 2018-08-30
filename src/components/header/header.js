import React, { Component } from 'react';
import { MdApps } from 'react-icons/md';
import { Link } from "react-router-dom";

import LazyLoad from '@components/common/lazyload';
import logo from '@global/style/icons/Mola_Action A.png';

import styles from './header.css';
import RightMenu from './right-menu';

class Header extends Component {
    render() {
        return (
            <div className={styles.header__container}>
                <div className={styles.header__logo_wrapper}>
                    <Link to="/">
                        <LazyLoad
                            image={logo}
                            className={styles.header__logo}
                        />
                    </Link>
                </div>
                <div className={styles.header__library_wrapper}>
                    <LazyLoad>
                        <Link className ={styles.header__library_link_wrapper} to="/category">
                            <MdApps size='40px' />
                            <div className={styles.header__library_text}>
                                <p>CLICK TO SEE</p>
                                <p className={styles.header__library_underlined}>MOVIE LIBRARY</p>
                            </div>
                        </Link>
                    </LazyLoad>
                </div>
                <RightMenu />
            </div>
        );
    }
}

export default Header;
