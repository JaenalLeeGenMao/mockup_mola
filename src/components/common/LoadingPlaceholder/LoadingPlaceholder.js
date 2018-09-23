import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoadingPlaceholder.css';

const LoadingPlaceholder = ({ className }) => {
  return (
    <div className={`${s.loadingPlaceholder} ${className}`}>
    </div>
  )
}

export default withStyles(s)(LoadingPlaceholder)
