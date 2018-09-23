import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Banner.css';

class Banner extends Component {
    static propTypes = {
      bannerUrl: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      playBtn: PropTypes.string.isRequired,
    };

    render() {
      return (
        <Fragment>
          <div className={s.banner}>
            <a href={this.props.link}>
              <div className={s.play_icon}>
                <img src={this.props.playBtn} />
                <span>{this.props.playCopy}</span>
              </div>
            </a>
            <img src={this.props.bannerUrl}/>
          </div>
        </Fragment>
      )
    }
}

export default withStyles(s)(Banner);