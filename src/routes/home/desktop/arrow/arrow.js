import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import $ from 'jquery';

import { oddOrEven } from '@routes/home/util';

import styles from './arrow.css';
import customSlickDotStyles from '../homeSlickDots.css';

class Arrow extends Component {
    componentWillReceiveProps() {
        const numOfDots = $(`.active .${customSlickDotStyles.home__slick_dots} li`), /* Next improvement soon */
            numOfDotsHalf =
                oddOrEven(numOfDots.length) === 'even'
                    ? Math.trunc(numOfDots.length / 2 + 1)
                    : Math.ceil(numOfDots.length / 2 + 1),
            margin = numOfDotsHalf * 20,
            screen = $(window),
            screenWidth = screen.width();

        $(`.${styles.home__arrow_next}`).css('right', `${screenWidth / 2 - margin}px`);
        $(`.${styles.home__arrow_prev}`).css('left', `${screenWidth / 2 - margin}px`);
    }

    render() {
        const { onClick, direction, isDark = 1, ...remainingProps } = this.props;
        return (
            <button
                {...remainingProps}
                onClick={onClick}
                className={`
                    ${styles.home__arrow}
                    ${styles[direction === 'next' ? 'home__arrow_next' : 'home__arrow_prev']}
                    slick-${isDark ? "dark" : "white"}
                `}
            >
                {direction}
            </button>
        );
    }
}

export default withStyles(
    styles,
    customSlickDotStyles
)(Arrow);
