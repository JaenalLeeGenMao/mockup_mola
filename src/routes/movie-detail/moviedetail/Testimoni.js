import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Testimoni.css';

class Testimoni extends React.Component {
  static propTypes = {
      testimoniContent: PropTypes.string.isRequired,
      testimoniPhotoAlt: PropTypes.string.isRequired,
      testimoniPhotoUrl: PropTypes.string.isRequired,
      trailerTitle: PropTypes.string.isRequired,
      testimoniSource: PropTypes.string.isRequired,
  };

  render() {
      return (
          <Fragment>
              <div className={s.box}>
                  <div className={s.inner_box}>
                      <p>{this.props.testimoniContent}</p>
                      <span>{this.props.testimoniSource}</span>
                  </div>
                  <div className={s.photo_frame}>
                      <img
                          alt={this.props.testimoniPhotoAlt}
                          src={this.props.testimoniPhotoUrl}
                      />
                  </div>
                  <div className={s.trailer_title}>{this.props.trailerTitle}</div>
              </div>
          </Fragment>
      );
  }
}

export default withStyles(s)(Testimoni);
