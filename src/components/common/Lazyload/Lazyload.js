import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lazyload.css';

const CustomLazyLoad = ({
    image,
    width = 100,
    height = 'auto',
    offset = 100,
    className = '',
    children,
    lazyloadOff = false
}) => (
    <div className={[styles.lazyload__wrapper, className].join(' ')}>
        {lazyloadOff
            ? <Fragment>
                {image && <img alt="" src={image} style={{ width, height }} />}
                {children}
            </Fragment>
            : <LazyLoad height={height} offset={offset} once>
                {image && <img alt="" src={image} style={{ width, height }} />}
                {children}
            </LazyLoad>
        }
    </div>
);

export default withStyles(styles)(CustomLazyLoad);
