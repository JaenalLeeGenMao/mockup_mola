import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Card.css';
import Link from '@components/Link/Link';
import Lazyload from '@components/common/Lazyload/Lazyload';

class CardLibrary extends Component {
  static propTypes = {
    imgUrl: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
  };

  render() {
    const { id, imgUrl } = this.props;
    return (
      <div className={s.card}>
        <Link to={`/movie-detail/${id}`}>
          <Lazyload src={imgUrl}/>
        </Link>
      </div>
    )
  }
};

export default withStyles(s)(CardLibrary);
