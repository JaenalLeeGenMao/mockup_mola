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
        <li className={s.image_element_class}>
          <a href={this.props.cardLink}>
            <img src={this.props.imgUrl} />
          </a>
        </li>
      </Fragment>
    )
  }
};

export default withStyles(s)(CardLibrary);
