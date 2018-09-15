import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Card.css';

class CardLibrary extends Component {
  static propTypes = {
    imgUrl: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className={s.card}>
          <a href={this.props.cardLink}>
            <img src={this.props.imgUrl}/>
          </a>
        </div>
      </Fragment>
    )
  }
};

export default withStyles(s)(CardLibrary);
