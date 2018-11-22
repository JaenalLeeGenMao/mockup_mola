import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Testimoni.css';

class Testimoni extends React.Component {
  static propTypes = {
    testimoniContent: PropTypes.string.isRequired,
    testimoniPhotoUrl: PropTypes.string.isRequired,
    trailerTitle: PropTypes.string.isRequired,
    testimoniSource: PropTypes.string.isRequired,
    trailerText: PropTypes.bool.isRequired
  };
  componentDidMount() {
    const dataArray = document.getElementsByClassName('testibox');
    [].forEach.call(dataArray, function(el) {
      let wordArray = el.innerHTML.split('');
      while (el.scrollHeight > el.offsetHeight) {
        if (wordArray.length > 1) {
          wordArray.pop();
        } else {
          return;
        }
        el.innerHTML = `${wordArray.join('')}...`;
      }
    });
  }

  render() {
    const testibox = {
      height: '9rem'
    };
    return (
      <Fragment>
        <div className={s.box}>
          <div className={s.inner_box}>
            <p className="testibox" style={testibox}>
              {this.props.testimoniContent}
            </p>
            <span>{this.props.testimoniSource}</span>
          </div>
          <div className={s.photo_frame}>
            <img src={this.props.testimoniPhotoUrl} />
          </div>
          {this.props.trailerText && <div className={s.trailer_title}>{this.props.trailerTitle}</div>}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Testimoni);
