import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HomePlaceholder from './placeholder';

import styles from './home.css';

class HomeMobile extends Component {
    render() {
        return <HomePlaceholder />;
    }
}

export default withStyles(styles)(HomeMobile);
