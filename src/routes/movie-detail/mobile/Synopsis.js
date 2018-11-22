import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';

import { setMultilineEllipsis, unsetMultilineEllipsis } from '../util';

import InfoImageSource from '../assets/actor.svg';

import s from './Synopsis.css';

class Synopsis extends Component {
  state = {
    show: false
  };

  static propTypes = {
    synopsisContent: PropTypes.string.isRequired,
    directedBy: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  componentDidMount() {
    setMultilineEllipsis('synopsis__info_content');
  }

  handleClick = () => {
    this.setState({ show: true });
  };

  render() {
    const { synopsisContent } = this.props,
      { show } = this.state;

    if (show) {
      unsetMultilineEllipsis('synopsis__info_content', synopsisContent);
    }

    return (
      <LazyLoad containerClassName={s.container}>
        <div className={s.inner_box}>
          <div className={s.inner_box_header}>
            <img className={s.synopsis__info_icon} alt="info" src={InfoImageSource} />
            <span>info</span>
          </div>
          <p className={`synopsis__info_content ${show ? s.show : ''}`}>{synopsisContent}</p>
          {!show && (
            <button className={s.synopsis__info_read_more} onClick={this.handleClick}>
              Read More <span>&#8963;</span>
            </button>
          )}
        </div>
      </LazyLoad>
    );
  }
}

export default withStyles(s)(Synopsis);
