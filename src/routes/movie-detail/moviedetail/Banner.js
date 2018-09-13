import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Banner.css';

class Banner extends React.Component {
  static propTypes = {
    bannerUrl: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    playBtn: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.banner}>
        <a href={this.props.link}>
          <div className={s.play_icon}>
            <img src={this.props.playBtn} />
            <span>{this.props.playCopy}</span>
          </div>
        </a>
        <img src={this.props.bannerUrl} alt={this.props.imageTitle} />
      </div>
    );
  }
}

export default withStyles(s)(Banner);
