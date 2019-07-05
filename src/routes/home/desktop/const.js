import React from 'react'
import styles from './home.css'

export const tourSteps = {
  id: [
    {
      target: '.tourCategory',
      title: 'Genre Film',
      content: (
        <div>
          Untuk bernavigasi di sekitar genre film yang berbeda, Anda cukup mengklik tombol navigasi atau geser <span className={styles.swipeUpIcon} /> atas dan ke bawah pada keyboard Anda.
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
      title: 'Film Pilihan',
      content: (
        <div>
          {' '}
          Anda dapat menelusuri film-film pilihan Mola di setiap genre dengan klik  tombol panah atau geser <span className={styles.swipeNextIcon} /> kanan dan kiri menggunakan keyboard.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '.tourOtherCategory',
      title: 'Telusuri Kategori lain',
      content: (
        <div>
          {' '}
          Ingin menonton pertandingan Olahraga. atau saluran TV lainnya? Telusuri pada pilihan kategori di atas ini.
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
      locale: { last: 'Finish' }
    }
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
      title: 'Movie Category',
      content: (
        <div>
          To navigate around different movie genres, you can simply click the navigation button or swipe <span className={styles.swipeUpIcon} />  up and down on your keyboard.
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
      title: 'Highlighted Movies',
      content: (
        <div>
          {' '}
          You can browse through our top movies in each genre by clicking on the arrow button or swipe <span className={styles.swipeNextIcon} /> right and left on your keyboard.
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '.tourOtherCategory',
      title: 'Navigate Other Categories',
      content: (
        <div>
          {' '}
          Do you want to watch sports matches, or other TV channels? Navigate using the options available here.
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
      locale: { last: 'Finish' }
    }
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
