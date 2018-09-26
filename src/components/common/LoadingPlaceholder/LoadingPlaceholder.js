import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoadingPlaceholder.css';

const LoadingPlaceholder = ({ className, isLight, style }) => {
  return (
    <div style={style} className={`${s.loadingPlaceholder} ${isLight ? s.lightAnimation : s.darkAnimation} ${className ? className : ''}`}>
    </div>
  )
}

export default withStyles(s)(LoadingPlaceholder)
