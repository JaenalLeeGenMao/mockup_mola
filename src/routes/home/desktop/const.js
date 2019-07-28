import React from 'react'
import styles from './home.css'

export const tourSteps = {
  //indonesia
  id: [
    {
      target: '.tourCategory',
      title: 'Kategori Konten',
      content: (
        <div>
          Untuk bernavigasi ke kategori konten yang berbeda, Anda cukup klik tombol atas dan bawah pada keyboard, atau geser
          <span className={styles.swipeUpIcon} /> ke atas dan ke bawah pada layar sentuh/trackpad Anda.
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
      styles: {
        tooltip: {
          maxWidth: '100%',
        },
      },
    },
    {
      target: '.tourSlide',
      title: 'Konten Pilihan',
      content: (
        <div>
          {' '}
          Anda dapat menelusuri konten pilihan Mola di setiap kategori dengan klik tombol kiri dan kanan pada keyboard, atau geser
          <span className={styles.swipeNextIcon} /> kiri dan kanan menggunakan layar sentuh/trackpad Anda.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '.tourOtherCategory',
      title: 'Telusuri Channel lain',
      content: <div> Ingin menonton pertandingan olahraga atau saluran TV lainnya? Telusuri dengan menggunakan pilihan Channel di atas ini.</div>,
      placement: 'right',
      disableBeacon: true,
      locale: { last: 'Finish' },
    },
  ],

  //english
  en: [
    {
      target: '.tourCategory',
      title: 'Categories',
      content: (
        <div>
          Move around {"Mola's"} various categories using this menu.
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
      styles: {
        tooltip: {
          maxWidth: '100%',
        },
      },
    },
    {
      target: '.tourCategoryChannels',
      title: 'Channels',
      content: (
        <div>
          Enjoy {"Mola's"} TV experience here.
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
      styles: {
        tooltip: {
          maxWidth: '100%',
        },
      },
    },
    {
      target: '.tourCategoryMatches',
      title: 'Matches',
      content: (
        <div>
          Click here to check on matches schedules.
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
      styles: {
        tooltip: {
          maxWidth: '100%',
        },
      },
    },
    {
      target: '.tourHighlightChannel',
      title: 'Category highlights',
      content: (
        <div>
          Browse category highlights by clicking the up and down buttons on your keyboard, or swipe <span className={styles.swipeUpIcon} /> up and down on your touchscreen/trackpad.
        </div>
      ),
      styles: {
        tooltip: {
          width: '42rem',
        },
      },
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '.tourSlide',
      title: 'Highlights',
      content: (
        <div>
          Browse the highlights of the category by clicking the left and right buttons on your keyboard, or swipe <span className={styles.swipeNextIcon} /> left and right on your touchscreen/trackpad.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
      styles: {
        tooltip: {
          width: '39rem',
          marginLeft: '55px'
        },
      },
      locale: { last: 'Finish' },
    },
  ],
}
