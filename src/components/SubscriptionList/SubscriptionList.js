import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import s from './SubscriptionList.css'

class SubscriptionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedPackageIdx: '',
      data: [],
      dummyData: [{ "type": "user - subscriptions", "id": 3048010, "attributes": { "userId": "dTy0cEoJCECAC1wGE69kUgQhsOYZff", "startedAt": "2020 - 03 - 23T13: 31: 42Z", "expireAt": "2020 - 11 - 30T13: 31: 42Z", "unixExpireAt": 1606743102, "status": 1, "orderId": 999375, "subscriptions": [{ "type": "subscription", "id": 28, "attributes": { "title": "Paket sisa musim Premier League & Euro 2020 COMBO", "description": { "features": [{ "name": "Akses semua pertandingan PL hingga akhir mei 2020(10 Match / Minggu)", "status": true }, { "name": "Akses semua pertandingan piala eropa Euro 2020", "status": true }, { "name": "Tampilan full screen tanpa iklan", "status": true }], "miniDescription": "Akses semua pertandingan PL hingga akhir mei 2020(10 Match / Minggu), akses semua pertandingan piala eropa Euro 2020, dan tampilan full screen tanpa iklan" }, "permission": 2, "chargingBase": 1, "maxQty": 1, "ads": 0, "price": 0, "currency": "idr", "displayOrder": 1, "recommended": 1, "icon": "", "enabled": 1, "baseColor": "", "textColor": "", "priceUnit": "Rp", "status": 1, "visibility": 1, "quality": null, "grade": 2, "quantity": 1, "uom": "s", "subscriptionGroupId": 5, "expireAt": "2020 - 11 - 30T00: 00: 00Z", "disabled": false } }], "qualities": [], "playlists": [] } }, { "type": "user - subscriptions", "id": 3043352, "attributes": { "userId": "dTy0cEoJCECAC1wGE69kUgQhsOYZff", "startedAt": "2020 - 01 - 23T10: 04: 56Z", "expireAt": "2020 - 07 - 21T10: 04: 56Z", "unixExpireAt": 1595325896, "status": 1, "orderId": 932976, "subscriptions": [{ "type": "subscription", "id": 88937, "attributes": { "title": "1 Season Plan", "description": { "features": [{ "name": "Free Ads", "status": true }, { "name": "Premiere League", "status": true }, { "name": "Euro 2020", "status": true }, { "name": "Premium Movies", "status": true }, { "name": "Formula E", "status": false }], "miniDescription": "Gratis nonton Premiere League, Euro 2020, Premium Movies dan tanpa iklan, hanya di aplikasi MOLA TV App." }, "permission": 2, "chargingBase": 1, "maxQty": 1, "ads": 0, "price": 100000, "currency": "", "displayOrder": 0, "recommended": 0, "icon": "", "enabled": 1, "baseColor": "", "textColor": "", "priceUnit": "100000", "status": 1, "visibility": 0, "quality": null, "grade": 4, "quantity": 1, "uom": "s", "subscriptionGroupId": 2, "expireAt": "2020 - 12 - 31T00: 00: 00Z", "disabled": false } }], "qualities": [], "playlists": [{ "type": "playlist", "id": 91, "attributes": { "id": 91, "subscriptionId": 88937, "playlistId": "py61972198", "quality": 3, "ads": 1, "status": 1, "createdAt": "2020 - 01 - 31T07: 27: 58Z", "updatedAt": null, "deletedAt": null } }] } }, { "type": "user - subscriptions", "id": 3043342, "attributes": { "userId": "dTy0cEoJCECAC1wGE69kUgQhsOYZff", "startedAt": "2020 - 01 - 23T07: 52: 05Z", "expireAt": "2020 - 07 - 21T07: 52: 05Z", "unixExpireAt": 1595317925, "status": 1, "orderId": 932976, "subscriptions": [{ "type": "subscription", "id": 88937, "attributes": { "title": "1 Season Plan", "description": { "features": [{ "name": "Free Ads", "status": true }, { "name": "Premiere League", "status": true }, { "name": "Euro 2020", "status": true }, { "name": "Premium Movies", "status": true }, { "name": "Formula E", "status": false }], "miniDescription": "Gratis nonton Premiere League, Euro 2020, Premium Movies dan tanpa iklan, hanya di aplikasi MOLA TV App." }, "permission": 2, "chargingBase": 1, "maxQty": 1, "ads": 0, "price": 100000, "currency": "", "displayOrder": 0, "recommended": 0, "icon": "", "enabled": 1, "baseColor": "", "textColor": "", "priceUnit": "100000", "status": 1, "visibility": 0, "quality": null, "grade": 4, "quantity": 1, "uom": "s", "subscriptionGroupId": 2, "expireAt": "2020 - 12 - 31T00: 00: 00Z", "disabled": false } }], "qualities": [], "playlists": [{ "type": "playlist", "id": 91, "attributes": { "id": 91, "subscriptionId": 88937, "playlistId": "py61972198", "quality": 3, "ads": 1, "status": 1, "createdAt": "2020 - 01 - 31T07: 27: 58Z", "updatedAt": null, "deletedAt": null } }] } }, { "type": "user - subscriptions", "id": 3043350, "attributes": { "userId": "dTy0cEoJCECAC1wGE69kUgQhsOYZff", "startedAt": "2020 - 02 - 22T09: 24: 57Z", "expireAt": "2020 - 03 - 23T09: 24: 57Z", "unixExpireAt": 1584955497, "status": 1, "orderId": 932956, "subscriptions": [{ "type": "subscription", "id": 88936, "attributes": { "title": "1 Month Plan", "description": { "features": [{ "name": "Ad - Free", "status": true }, { "name": "HD Video Quality", "status": true }, { "name": "All Premiere League Matches", "status": true }, { "name": "All Euro 2020 Videos", "status": true }], "miniDescription": "Gratis nonton tanpa iklan, kualitas video HD, semua pertandingan premiere league, dan semua pertandingan euro 2020, hanya di aplikasi MOLA TV App." }, "permission": 2, "chargingBase": 1, "maxQty": 1, "ads": 0, "price": 100000, "currency": "", "displayOrder": 0, "recommended": 0, "icon": "", "enabled": 1, "baseColor": "", "textColor": "", "priceUnit": "100000", "status": 1, "visibility": 0, "quality": null, "grade": 3, "quantity": 1, "uom": "m", "subscriptionGroupId": 2, "expireAt": "9999 - 12 - 31T00: 00: 00Z", "disabled": false } }], "qualities": [], "playlists": [{ "type": "playlist", "id": 90, "attributes": { "id": 90, "subscriptionId": 88936, "playlistId": "py61972198", "quality": 3, "ads": 1, "status": 1, "createdAt": "2020 - 01 - 31T07: 27: 58Z", "updatedAt": null, "deletedAt": null } }] } }, { "type": "user - subscriptions", "id": 3043348, "attributes": { "userId": "dTy0cEoJCECAC1wGE69kUgQhsOYZff", "startedAt": "2020 - 01 - 23T09: 24: 57Z", "expireAt": "2020 - 02 - 22T09: 24: 57Z", "unixExpireAt": 1582363497, "status": 1, "orderId": 932963, "subscriptions": [{ "type": "subscription", "id": 88936, "attributes": { "title": "1 Month Plan", "description": { "features": [{ "name": "Ad - Free", "status": true }, { "name": "HD Video Quality", "status": true }, { "name": "All Premiere League Matches", "status": true }, { "name": "All Euro 2020 Videos", "status": true }], "miniDescription": "Gratis nonton tanpa iklan, kualitas video HD, semua pertandingan premiere league, dan semua pertandingan euro 2020, hanya di aplikasi MOLA TV App." }, "permission": 2, "chargingBase": 1, "maxQty": 1, "ads": 0, "price": 100000, "currency": "", "displayOrder": 0, "recommended": 0, "icon": "", "enabled": 1, "baseColor": "", "textColor": "", "priceUnit": "100000", "status": 1, "visibility": 0, "quality": null, "grade": 3, "quantity": 1, "uom": "m", "subscriptionGroupId": 2, "expireAt": "9999 - 12 - 31T00: 00: 00Z", "disabled": false } }], "qualities": [], "playlists": [{ "type": "playlist", "id": 90, "attributes": { "id": 90, "subscriptionId": 88936, "playlistId": "py61972198", "quality": 3, "ads": 1, "status": 1, "createdAt": "2020 - 01 - 31T07: 27: 58Z", "updatedAt": null, "deletedAt": null } }] } }]
    }
  }

  onClickPackage(idx, title) {
    this.setState({ clickedPackageIdx: idx })
    if (this.props.onClickPackage) {
      this.props.onClickPackage(title)
    }
  }

  componentDidMount() {
    console.log('we are here', this.props.data)
  }
  render() {
    const { user, data, isMobile } = this.props
    const { clickedPackageIdx } = this.state

    return (
      <div className={s.subscription__container}>

        <div className={s.subscription_detail_packet}>
          {data.length && data.map((subscription, index) => {
            let hideButtonUgrade = true
            // let hideButtonUgrade = false
            let freeSubs = false
            let statusExp = false
            let isClicked = false

            const expiry = new Date(subscription.attributes.expireAt),
              today = new Date(),
              formattedExpiry = moment(expiry).format('DD-MM-YYYY'),
              title = subscription.attributes.subscriptions[0].attributes.title,
              miniDesc = subscription.attributes.subscriptions[0].attributes.description.miniDescription,
              price = subscription.attributes.subscriptions[0].attributes.price

            // hideButtonUgrade = subscription.attributes.subscriptions[0].id == 25
            freeSubs = subscription.attributes.subscriptions[0].id == 24
            statusExp = today < expiry
            isClicked = clickedPackageIdx === index

            return (
              <>
                <LazyLoad
                  key={index}
                  containerClassName={s.sideCenter}
                  onClick={() => { this.onClickPackage(index, title) }}
                >
                  <div className={s.subscription__wrapper_active} style={isClicked ? { border: '1px solid #319CFF' } : null} >
                    <div className={s.subscription__section_left_active}>
                      <div
                        className={`${
                          statusExp ? s.subscription__section_right_active : s.subscription__section_right_deactive
                          }`}
                      >
                        {statusExp ? 'Active' : 'Expired'}
                      </div>
                      <div className={s.subscription_expiry}>
                        {' '}
                        {!freeSubs ? <p>Berlaku hingga {formattedExpiry}</p> : ''}
                      </div>
                    </div>
                    <h1>{title}</h1>
                    <p>{miniDesc}</p>
                  </div>
                </LazyLoad>
              </>
            )
          })}

        </div>
      </div >
    )
  }
}

export default withStyles(s)(SubscriptionList)
