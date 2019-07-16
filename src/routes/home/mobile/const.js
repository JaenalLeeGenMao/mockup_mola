import React from 'react'
import styles from './home.css'

export const tourSteps = {
  id: [
    {
      target: '.tourCategory',
      title: 'Kategori konten',
      content: (
        <div>
          Untuk bernavigasi ke kategori konten yang berbeda, Anda cukup klik tombol atas dan bawah pada keyboard, atau geser <span className={styles.swipeUpIcon} /> ke atas dan ke bawah pada layar
          sentuh/trackpad Anda.
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
          Anda dapat menelusuri konten pilihan Mola di setiap kategori dengan klik tombol kiri dan kanan pada keyboard, atau geser <span className={styles.swipeNextIcon} /> kiri dan kanan menggunakan
          layar sentuh/trackpad Anda.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '.tourOtherCategory',
      title: 'Telusuri Channel lain',
      content: <div> Ingin menonton pertandingan olahraga atau saluran TV lainnya? Telusuri dengan menggunakan pilihan Channel di atas ini.</div>,
      placement: 'left',
      disableBeacon: true,
      locale: { last: 'Finish' },
    },
    // {
    //   target: '.tourLibrary',
    //   title: 'Perpustakaan Film',
    //   content: 'Anda dapat menekan ikon ini untuk melihat semua daftar film per kategori',
    //   placement: 'bottom',
    //   disableBeacon: true,
    // },
    // {
    //   target: '.tourMovieDiscover',
    //   title: 'Temukan Film Kami',
    //   content: 'Klik tombol ini untuk menemukan daftar film kami yang luar biasa',
    //   placement: 'top',
    //   disableBeacon: true,
    // },
    // {
    //   target: '.tourMovieDetail',
    //   title: 'Lihat Detail Film',
    //   content: 'Klik tombol ini untuk menonton film dan melihat detail film: sinopsis, testimonial, pemeran, dan cuplikan',
    //   placement: 'top',
    //   disableBeacon: true,
    //   locale: { last: 'Selesai' },
    // },
  ],
  en: [
    {
      target: '.tourCategory',
      title: 'Content Categories',
      content: (
        <div>
          To navigate around different content categories, you can simply click the up and down buttons on your keyboard, or swipe <span className={styles.swipeUpIcon} /> up and down on your
          touchscreen/trackpad.
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
      title: 'Highlighted Contents',
      content: (
        <div>
          {' '}
          You can browse {"Mola's"} selected contents in each category by clicking on the left and right arrow buttons on the keyboard, or swipe <span className={styles.swipeNextIcon} /> left and
          right using your touch screen / trackpad.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '.tourOtherCategory',
      title: 'Navigate to Other Channels',
      content: <div> Do you want to watch sports, or other TV channels? Navigate using the Channel options available here.</div>,
      placement: 'bottom',
      disableBeacon: true,
      locale: { last: 'Finish' },
    },
    // {
    //   target: '.tourLibrary',
    //   title: 'Movie Library',
    //   content: 'You can click this icon to view all movie list per category',
    //   placement: 'bottom',
    //   disableBeacon: true,
    // },
    // {
    //   target: '.tourMovieDiscover',
    //   title: 'Discover Our Movie',
    //   content: 'Click this button to discover our awesome list of movies',
    //   placement: 'top',
    //   disableBeacon: true,
    // },
    // {
    //   target: '.tourMovieDetail',
    //   title: 'View Movie Detail',
    //   content: 'Click this button to watch movie and view movie detail: synopsis, testimonial, cast, and trailer',
    //   placement: 'top',
    //   disableBeacon: true,
    //   locale: { last: 'Finish' },
    // },
  ],
}
