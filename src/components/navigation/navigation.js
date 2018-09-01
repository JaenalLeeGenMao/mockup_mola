import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LazyLoad from '@components/common/lazyload';
import styles from './navigation.css';

class Navigation extends Component {
    handleNavigation = e => {
        e.preventDefault();
        const {onClick } = this.props;
        onClick(e.currentTarget.id);
    }

    render() {
        const {
            color = "black",
            playlists = undefined
        } = this.props;
        return (
            <div className={styles.navigation__wrapper}>
            {
                playlists && playlists.map(({id, isActive, attributes, attributes : { title, coverUrl }}) => {
                    return (
                        <Link
                            key={id}
                            id={id}
                            to="/"
                            onClick={this.handleNavigation}
                            className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")}
                            style={{ color }}
                        >
                            {isActive && 
                                <LazyLoad>
                                    <hr style={{ "borderBottom": `1px solid ${color}` }} />
                                </LazyLoad>
                            }
                            {title.toUpperCase()}
                        </Link>
                    );
                })
            }
            </div>
        );
    }
}

export default Navigation;