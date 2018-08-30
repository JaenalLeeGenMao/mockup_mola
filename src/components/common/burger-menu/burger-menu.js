import React, { Component } from 'react';
import { Link } from "react-router-dom";
import $ from 'jquery';
import styles from './burger-menu.css';

// const BurgerMenu = ({ links = [], status = false, toggleMenu }) => (

class BurgerMenu extends Component {
    handleToggle = () => {
        const { toggleMenu } = this.props;
        $('#burgerToggle').fadeOut('slow', () => {
            toggleMenu();
            $('#burgerToggle').fadeIn('slow')
        });
    }
    render() {
        const { links = [], status = false } = this.props;
        return (
            <div className={styles.burger__menu}>
                <Link id="burgerToggle" className={styles.burger__menu_wrapper} to="/" onClick={this.handleToggle}>
                    {status === true ? "Close" : "Open"}
                </Link>
                {links.map(({ url, title }) => (
                    <Link className={[styles.burger__menu_pop_up, status ? styles.show : styles.hide].join(' ')} to={url} onClick={this.handlemenu}>
                        {title}
                    </Link>
                ))}
            </div>
        );
    }
}

export default BurgerMenu;