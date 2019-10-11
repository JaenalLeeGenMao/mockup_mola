import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './socialShare.css'

class SocialShare extends Component {
  handleClickShare = (social, url) => {
    switch (social) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${url}`)
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}`)
        break;
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${url}`)
        break;
      default:

    }
  }
  render() {
    return (
      <div className={s.social_wrapper}>
        <div className={`${s.twitter} ${(this.props.isMobile) && (s.mobile)}`} onClick={() => this.handleClickShare('twitter', this.props.url)}></div>
        <div className={`${s.facebook} ${(this.props.isMobile) && (s.mobile)}`} onClick={() => this.handleClickShare('facebook', this.props.url)}></div>
        <div className={`${s.line} ${(this.props.isMobile) && (s.mobile)}`} onClick={() => this.handleClickShare('line', this.props.url)}></div>
        <div className={`${s.whatsapp} ${this.props.isMobile && s.mobile}`} onClick={() => this.handleClickShare('whatsapp', this.props.url)}></div>
      </div>
    )
  }
}

export default withStyles(s)(SocialShare)