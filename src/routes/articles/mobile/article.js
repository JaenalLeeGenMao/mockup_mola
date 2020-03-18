import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ReactMarkdown from 'react-markdown'

import VOPlayer from '@components/VOPlayer'

import BackgroundGradient from '../backgroundGradient/backgroundGradient'

import ArticleCard from '../articleCard/articleCard'
import SocialShare from '../socialShare/socialShare'

import RelatedVideo from '../relatedVideo/relatedVideo'

import s from './article.css'

class Articles extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        {this.props.articlesDetail.data.video && this.props.videoSetting ? (
          <div className={s.video_player_wrapper}>
            <VOPlayer
              poster={this.props.articlesDetail.data.video[0].attributes.images.cover.background.landscape}
              autoPlay={false}
              {...this.props.videoSetting}
            >
            </VOPlayer>
          </div>
        ) : (
          <BackgroundGradient isMobile={true} url={`${this.props.articlesDetail.data.imageUrl}`} />
        )}
        <div className={s.main_content}>
          <div className={s.title}>{this.props.articlesDetail.data.title}</div>
          <span className={s.publishInfo}>
            {this.props.formattedAuthor}
            {this.props.formattedDate}
            {this.props.formattedReadTime}
          </span>
          <div className={s.social_share_section}>
            <SocialShare url={this.props.currentLocation} isMobile={true} />
          </div>
          <div className={s.caption_section}>
            <div className={s.caption_indicator} />
            <div className={s.caption_text}>
              <q>
                Highly-rated midfielder Mason Mount has committed his long-term future to Chelsea by signing a five-year
                contract until 2024 with the club
              </q>
            </div>
          </div>
          <div className={s.react_markdown_wrapper}>
            <ReactMarkdown source={this.props.articlesDetail.data.content} escapeHtml={true} />
          </div>
          {/* <div className={s.tag_section}>
            {this.props.articlesDetail.data.tags &&
              this.props.articlesDetail.data.tags.length && (
                <>
                  {this.props.articlesDetail.data.tags.map((tag, idx) => {
                    return (
                      <div className={s.tag_box} key={idx}>
                        <p className={s.tag_text}>{tag}</p>
                      </div>
                    )
                  })}
                </>
              )}
          </div> */}
          {!this.props.related.isLoading &&
            this.props.related.data.length > 0 && (
              <div className={s.section_box_wrapper}>
                <div className={s.title_text_box}>Related Articles</div>
                {this.props.related.data.map(related => (
                  <ArticleCard isMobile={true} data={related} key={related.id} />
                ))}
              </div>
            )}

          {!this.props.latest.isLoading &&
            this.props.latest.data.length > 0 && (
              <div className={s.section_box_wrapper}>
                <div className={s.title_text_box}>Latest Articles</div>
                {this.props.latest.data.map(latest => <ArticleCard isMobile={true} data={latest} key={latest.id} />)}
              </div>
            )}
        </div>
        <div className={s.related_video_section}>
          {this.props.relatedVideoData &&
            this.props.relatedVideoData.length && (
              <RelatedVideo isMobile={true} title="Related Video" data={this.props.relatedVideoData} />
            )}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Articles)
