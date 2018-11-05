import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Card.css';
import Link from '@components/Link/Link';
import Lazyload from '@components/common/Lazyload/Lazyload';
import LoadingPlaceholder from '../../../components/common/LoadingPlaceholder/LoadingPlaceholder';

class CardLibraryLoading extends Component {
  static propTypes = {
    imgUrl: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
  };

  render() {
    const { id, imgUrl } = this.props;
    return (
      <div className={s.card}>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '300px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '400px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '200px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '700px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '300px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '400px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '200px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '700px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '300px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '400px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '200px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '700px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '300px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '400px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '200px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '700px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '300px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '400px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '200px', }}/>
        <LoadingPlaceholder isLight style={{ width: '200px', height: '700px', }}/>
      </div>
    )
  }
};

export default withStyles(s)(CardLibraryLoading);
