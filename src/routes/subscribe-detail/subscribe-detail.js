import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderSubscribe from '@components/Header'

import styles from './subscribedetail.css'
import { getLocale } from './locale'

class SubscribeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          type: 'subscription',
          id: '7',
          attributes: {
            title: 'SSTV',
            description: 'Serie A, MUTV, FA Cup, Copa Libertadores, Replay, Video on Demand',
            permission: 2,
            type: 2,
            price: 50000,
            uom: 'm',
            currency: 'idr',
            order: 10,
            default: true,
            icon: 'https://url/to/icon',
            enabled: true,
            baseColor: '#f1c40f',
            textColor: '#ffffff',
            terms: 'bla bla',
          },
        },
        {
          type: 'subscription',
          id: '2',
          attributes: {
            title: 'Premium',
            description: 'Serie A, MUTV, FA Cup, Copa Libertadores, Replay, Video on Demand',
            permission: 2,
            type: 3,
            parentId: 7,
            chargingBase: 1,
            maxQty: 12,
            price: 50000,
            uom: 'm',
            currency: 'idr',
            order: 10,
            default: true,
            icon: 'https://url/to/icon',
            enabled: true,
            baseColor: '#f1c40f',
            textColor: '#ffffff',
            terms: 'bla bla',
          },
          relationships: {
            playlist: {
              data: [
                {
                  type: 'playlist',
                  id: 'PL5',
                },
                {
                  type: 'playlist',
                  id: 'PL9',
                },
              ],
            },
            promo: {
              data: [
                {
                  type: 'promo',
                  id: 2,
                },
              ],
            },
            quality: {
              data: {
                type: 'quality',
                id: 1,
              },
            },
          },
        },
        {
          type: 'subscription',
          id: '3',
          attributes: {
            title: 'HD',
            description: 'Serie A, MUTV, FA Cup, Copa Libertadores, Replay, Video on Demand',
            permission: 2,
            chargingBase: 1,
            maxQty: 12,
            price: 100000,
            uom: 'm',
            currency: 'idr',
            order: 20,
            default: true,
            icon: 'https://url/to/icon',
            enabled: true,
            baseColor: '#1abc9c',
            textColor: '#ffffff',
            terms: 'bla bla',
          },
          relationships: {
            playlist: {
              data: [
                {
                  type: 'playlist',
                  id: 'PL5',
                },
                {
                  type: 'playlist',
                  id: 'PL9',
                },
              ],
            },
            promo: {
              data: [
                {
                  type: 'promo',
                  id: 1,
                },
              ],
            },
            quality: {
              data: {
                type: 'quality',
                id: 2,
              },
            },
          },
        },
        {
          type: 'subscription',
          id: '4',
          attributes: {
            title: 'Super (SSTV Premium + beIN HD)',
            description: 'Serie A, English Premier League, La Liga, UEFA Champions League, MUTV, FA Cup, Copa Libertadores, Replay, Video on Demand',
            permission: 2,
            chargingBase: 1,
            maxQty: 1,
            price: 100000,
            uom: 'm',
            currency: 'idr',
            order: 40,
            default: true,
            icon: 'https://url/to/icon',
            enabled: true,
            baseColor: '#F2101A',
            textColor: '#ffffff',
            terms: 'bla bla',
          },
          relationships: {
            playlist: {
              data: [
                {
                  type: 'playlist',
                  id: 'PL5',
                },
                {
                  type: 'playlist',
                  id: 'PL9',
                },
              ],
            },
            quality: {
              data: {
                type: 'quality',
                id: 2,
              },
            },
          },
        },
        {
          type: 'subscription',
          id: '5',
          attributes: {
            title: 'beIN',
            description: 'English Premier League, La Liga, UEFA Champions League',
            permission: 2,
            chargingBase: 1,
            maxQty: 1,
            price: 75000,
            uom: 'm',
            currency: 'idr',
            order: 100,
            default: true,
            icon: 'https://url/to/icon',
            enabled: true,
            baseColor: '#9b59b6',
            textColor: '#ffffff',
            terms: 'bla bla',
            clientLock: ['GSyOzu2WPaAijqbX3Tv6HCQr', 'GCuHWO2PmqaniKrXIvsY'],
          },
          relationships: {
            playlist: {
              data: [
                {
                  type: 'playlist',
                  id: 'PL5',
                },
                {
                  type: 'playlist',
                  id: 'PL9',
                },
              ],
            },
            promo: {
              data: [
                {
                  type: 'promo',
                  id: 1,
                },
              ],
            },
            quality: {
              data: {
                type: 'quality',
                id: 2,
              },
            },
          },
        },
        {
          type: 'subscription',
          id: '6',
          attributes: {
            title: 'Super',
            description: 'This is the description.',
            permission: 2,
            chargingBase: 1,
            maxQty: 0,
            price: 0,
            uom: 'd',
            currency: 'idr',
            order: 50,
            default: true,
            icon: 'https://url/to/icon',
            enabled: true,
            baseColor: '#F2101A',
            textColor: '#ffffff',
            terms: 'bla bla',
            parentId: '3',
            clientLock: ['yumivCDabqcdKreWzEO'],
            customOffers: [
              {
                qty: 1,
                uom: 'd',
                price: 15000,
                title: '+ VideoMax 2GB',
              },
              {
                qty: 2,
                uom: 'd',
                price: 25000,
                title: '+ VideoMax 2GB',
              },
              {
                qty: 7,
                uom: 'd',
                price: 50000,
                title: '+ VideoMax 3GB',
              },
              {
                qty: 30,
                uom: 'd',
                price: 165000,
                title: '+ VideoMax 8GB',
              },
            ],
          },
        },
      ],
      included: [
        {
          type: 'playlist',
          id: 'PL9',
          attributes: {
            name: 'La Liga 2017-2018',
          },
        },
        {
          type: 'playlist',
          id: 'PL5',
          attributes: {
            name: 'La Liga',
          },
        },
        {
          type: 'quality',
          id: 1,
          attributes: {
            name: 'SD',
            width: 1024,
            height: 576,
          },
        },
        {
          type: 'quality',
          id: 2,
          attributes: {
            name: 'HD',
            width: 1280,
            height: 720,
          },
        },
        {
          type: 'playlist',
          id: 2,
          attributes: {
            name: 'HD',
            maxResolution: '720p',
          },
        },
        {
          type: 'promo',
          id: 1,
          attributes: {
            type: 'PERCENTOFF',
            title: 'Disc. 37.5%',
            amount: 0.375,
            minQty: 12,
          },
        },
        {
          type: 'promo',
          id: 2,
          attributes: {
            type: 'PRICEOFF',
            title: 'Disc. 41.67%',
            amount: 250000,
            minQty: 12,
          },
        },
      ],
    }
    const { locale } = this.state
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      data: prevState.data.find(rowdata => {
        return rowdata.id === nextProps.subscribeId
      }),
    }
  }

  state = {
    info: null,
    locale: getLocale(),
  }

  render() {
    const { data, locale } = this.state
    return (
      <div className={styles.subscribedetail_singlepage}>
        <div className={styles.subscribedetail_contentheadlinecls}>Subscribe Detail</div>
        <div className={styles.subscribedetail_bundleall}>
          <div className={styles.subscribedetail_paketlabel}>Pilihan Paket</div>
          <div className={styles.subscribedetail_paketcls}>
            <div className={styles.subscribedetail_access_titlecls}>{data.attributes.title}</div>
            {<div className={styles.subscribedetail_accesstitle}>Akses : </div>}
            {<div className={styles.subscribedetail_accessdescriptioncls}>{data.attributes.description}</div>}
            {<div className={styles.subscribedetailkualitastitle}>Kualitas Video: </div>}
            {
              <div className={styles.subscribedetail_price}>
                <div className={styles.subscribedetail_whitebox_packagename}>{data.attributes.title}</div>
                <div className={styles.subscribedetail_whitebox_price}>Rp. {data.attributes.price} per bulan</div>
                <div className={styles.btn_margn_beli}>
                  <button className={styles.subscribedetail_btn_beli}>Beli</button>
                </div>
              </div>
            }
            <div>
              <a href="subscribe">
                <button className={styles.subscribedetail_btn_back}>Kembali</button>
              </a>
            </div>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

//add
// class DataSubscribeDetail extends Component {
//   render() {
//     const dataItem = this.props.dataItem;
//     console.log(dataItem)
//     return (
//       <div><p>color: {dataItem.baseColor}</p></div>
//     );
//   }
// }

export default withStyles(styles)(SubscribeDetail)
