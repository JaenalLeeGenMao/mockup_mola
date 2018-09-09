import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './arrow.css';

const Arrow = props => {
    const { onClick, direction, isDark = 1, ...remainingProps } = props;
    return (
        <button
            {...remainingProps}
            onClick={onClick}
            className={`slick-arrow slick-${direction} slick-${isDark ? "dark" : "white"}`}
        >
            {direction}
        </button>
    );
}

export default withStyles(styles)(Arrow);