import React, { Component } from 'react';
import Header from '../../components/header';
import Navbar from '../../components/navigation';

import styles from './home.css';

class Home extends Component {
    render() {
        return (
            <div className={styles.home__container} style={{ height: '2000px' }}>
                <Header />
                <Navbar />
            </div>
        )
    }
}

export default Home;