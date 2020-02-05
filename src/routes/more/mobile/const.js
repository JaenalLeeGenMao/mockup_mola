import styles from './more.css'

export const moreContent = (storeUrl = '', text = '') => {
  return [
    {
      id: 1,
      title: 'Promos',
      info: 'Get 1 month free for MOLA TV subscription',
      img: styles.img__promos,
      url: '/promo',
    },
    {
      id: 2,
      title: 'Subscription',
      info: 'Subscription',
      img: styles.img__mps__link,
      url: '/accounts/profile?tab=subscription',
    },
    {
      id: 3,
      title: 'Security',
      info: 'Change your password',
      img: styles.img__security,
      url: '/accounts/profile?tab=security',
    },
    {
      id: 4,
      title: 'Information Systems',
      info: 'Playback and application specification',
      img: styles.img__system__info,
      url: '/system-info',
    },
    {
      id: 5,
      title: 'Contact Us',
      info: 'Get help from our representative customer services',
      img: styles.img__contact__us,
      url: '/live-support',
    },
    {
      id: 6,
      title: 'Unduh aplikasi Mola TV',
      info: text,
      img: styles.img__rate,
      url: storeUrl,
    },
  ]
}

export const footers = [
  {
    id: 1,
    list: 'Privasi',
    url: '/privacy',
  },
  {
    id: 2,
    list: 'Syarat',
    url: '/terms',
  },
  {
    id: 3,
    list: 'Ketentuan',
    url: '/conditions',
  },
]
