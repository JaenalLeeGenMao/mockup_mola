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
          Untuk bernavigasi ke kategori konten yang berbeda, Anda cukup klik tombol atas dan bawah pada keyboard, atau
          geser <span className={styles.swipeUpIcon} /> ke atas dan ke bawah pada layar sentuh/trackpad Anda.
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
          Anda dapat menelusuri konten pilihan Mola di setiap kategori dengan klik tombol kiri dan kanan pada keyboard,
          atau geser <span className={styles.swipeNextIcon} /> kiri dan kanan menggunakan layar sentuh/trackpad Anda.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '.tourOtherCategory',
      title: 'Telusuri Channel lain',
      content: (
        <div>
          {' '}
          Ingin menonton pertandingan olahraga atau saluran TV lainnya? Telusuri dengan menggunakan pilihan Channel di
          atas ini.
        </div>
      ),
      placement: 'left',
      disableBeacon: true,
      locale: { last: 'Selesai' },
    },
  ],

  //english
  en: [
    {
      target: '.tourHamburger',
      title: 'Explore Channel Category',
      content: <div>Move around {"Mola's"} various categories using this menu.</div>,
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.tourHighlightChannel',
      title: 'Category highlights',
      content: (
        <div>
          Browse category highlights by <br /> swiping <span className={styles.swipeUpIcon} /> up and down.
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '.tourSlide',
      title: 'Highlighted Contents',
      content: (
        <div>
          Browse the highlights of the category by swiping <span className={styles.swipeNextIcon} /> left and right.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
      styles: {
        tooltip: {
          width: 281,
        },
      },
      locale: { last: 'Done' },
    },
  ],
}
