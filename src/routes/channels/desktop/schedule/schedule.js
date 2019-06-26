import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './schedule.css'

import { formatDateTime } from '@source/lib/dateTimeUtil'

var interval = 1000 / 60;
var now;
var then = Date.now();
var delta;
var reqAnimation;

class Schedule extends Component {
  state = {
    activeChannel: this.props.scheduleList.length > 0 && this.props.scheduleList[0].id,
    scrollWidth: '3360px',
  }

  clickChannel = (channelId) => {
    this.setState({
      activeChannel: channelId
    })
    this.props.clickChannel && this.props.clickChannel(channelId);
  }

  //animation untuk current time marker yg warna biru
  timeIncrement = (timestamp) => {
    reqAnimation = window.requestAnimationFrame(this.timeIncrement);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);

      const currentTs = Math.floor(now / 1000)
      const currentMin = formatDateTime(currentTs, 'm')
      const startMin = currentMin > 30 ? 30 : 0;
      const startHour = formatDateTime(currentTs, 'H')
      const d = new Date();
      d.setHours(startHour, startMin, 0, 0);
      const tsStartMarkTime = Math.floor(d / 1000);

      const diff = (now / 1000) - tsStartMarkTime;
      this.timeMarker.style.left = `${diff * 14 / 60}px` //add px per second
    }
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      //safari need to specify scroll width biar bisa di scroll
      this.setState({
        scrollWidth: `${window.innerWidth - 200}px`,
      })
    }

    reqAnimation = window.requestAnimationFrame(this.timeIncrement);
  }

  componentWillUnmount() {
    const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    cancelAnimationFrame(reqAnimation);
  }

  render() {
    const schedule = this.props.scheduleList

    const { activeChannel, scrollWidth } = this.state

    const currentTs = Math.floor(Date.now() / 1000)
    const currentMin = formatDateTime(currentTs, 'm')
    const startMin = currentMin > 30 ? 30 : 0;
    const startHour = formatDateTime(currentTs, 'H')
    //startHour dan startMin = pembulatan kebawah untuk current time dg kelipatan 30menit
    //misal sekarang jam 9.45, maka startHour = jam 9, startMin = menit ke 30

    const d = new Date();
    d.setHours(startHour, startMin, 0, 0);
    const tsStartMarkTime = Math.floor(d / 1000);
    //tsStartMarkTime = startHour dan startMin dalam timestamp eg: 1560394560

    let timeMark = [];
    let tsTimeInc = tsStartMarkTime;

    for (var i = 0; i < 8; i++) {
      const formattedTime = formatDateTime(tsTimeInc, 'HH:mm')
      timeMark.push(`${formattedTime}`)
      tsTimeInc = tsTimeInc + (30 * 60)
    }

    let totalTimeWidth = 0

    return (
      <div className={styles.schedule_container}>
        <div className={styles.schedule_wrapper}>
          <div className={styles.schedule_name_list}>
            <div className={styles.schedule_header_left} />
            {/* {for (key in this.props.epg) {

            }} */}
            {schedule && schedule.map((dt) => {
              return (
                <>
                  <div className={`${styles.schedule_header_name} ${activeChannel === dt.id ? styles.schedule_active_channel_name : ''}`}>{dt.title}</div>
                </>
              )
            })}
          </div>
          <div className={styles.schedule_panel_wrapper}>
            <div className={styles.schedule_header_shadow} />
            <div className={styles.schedule_scroll_container} style={{ width: scrollWidth }}>
              <div ref={node => { this.timeMarker = node }} className={styles.schedule_current_time_marker} />
              <div className={styles.schedule_content_container}>
                <div className={styles.schedule_time_container}>
                  {timeMark && timeMark.map((time) => {
                    return (
                      <div className={styles.schedule_time}>{time}</div>
                    )
                  })}
                </div>
                {schedule && schedule.map((dt) => {
                  totalTimeWidth = 0
                  return (
                    <a key={dt.id}
                      className={`${activeChannel === dt.id ? styles.schedule_active_channel : ''} ${styles.schedule_line_container}`}
                      onClick={() => this.clickChannel(dt.id)}>
                      {dt.videos && dt.videos.map((item, index) => {

                        //get endtime from next video starttime
                        const endTime = index + 1 == dt.videos.length ? item.endTime : dt.videos[index + 1].startTime

                        //only display video yg belum selesai tayang
                        if (endTime > tsStartMarkTime) {
                          const pxPerMin = 14
                          let width = (endTime - item.startTime) / 60 * pxPerMin

                          if (item.startTime < tsStartMarkTime) {
                            width = (endTime - tsStartMarkTime) / 60 * pxPerMin
                          }

                          totalTimeWidth = width + totalTimeWidth
                          const totalContainerWidth = pxPerMin * 60 * 4

                          //only display per 4 hour schedule for now
                          if (totalTimeWidth > totalContainerWidth) {
                            width = totalContainerWidth - totalTimeWidth - width
                          }
                          return (
                            <>
                              <div key={item.id} className={styles.schedule_item} style={{ width: width }}>
                                <div className={styles.schedule_item_title}>{item.title}</div>
                                <div className={styles.schedule_item_time}>
                                  {formatDateTime(item.startTime, 'HH:mm')} -
                                    {formatDateTime(endTime, 'HH:mm')}
                                </div>
                              </div>
                            </>
                          )
                        }
                      })}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Schedule)
