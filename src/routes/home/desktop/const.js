import React from 'react'
import styles from './home.css'

export const tourSteps = {
  id: [
    {
      target: '.tourCategory',
      title: 'Kategori Film',
      content: `
      Untuk bernavigasi di sekitar kategori film yang berbeda, Anda cukup mengklik navigasi
      tombol atau tekan ↑ atas dan ↓ pada keyboard Anda yang luar biasa
      `,
      placement: 'right',
      disableBeacon: true,
      disableOverlayClicks: true,
    },
    {
      target: '.tourSlide',
      title: 'Film Menarik',
      content: `
      Anda dapat menelusuri film-film top kami di setiap kategori dengan klik lembut pada tombol panah
       atau menggunakan keyboard dan beralih → kanan dan ← kiri`,
      placement: 'top',
      disableBeacon: true,
      disableOverlayClicks: true,
    },
    {
      target: '.tourLibrary',
      title: 'Perpustakaan Film',
      content: 'Anda dapat mengklik ikon ini untuk melihat semua daftar film per kategori',
      placement: 'bottom',
      disableBeacon: true,
      disableOverlayClicks: true,
    },
    // {
    //   target: '.tourMovieDiscover',
    //   title: 'Temukan Film Kami',
    //   content: 'Klik tombol ini untuk menemukan daftar film kami yang luar biasa',
    //   placement: 'top',
    //   spotlightPadding: 0,
    //   disableBeacon: true,
    //   disableOverlayClicks: true,
    // },
    {
      target: '.tourMovieDetail',
      title: 'Lihat Detail Film',
      content: 'Klik tombol ini untuk menonton film dan melihat detail film: sinopsis, testimonial, pemeran, dan cuplikan',
      placement: 'top',
      spotlightPadding: 0,
      disableBeacon: true,
      disableOverlayClicks: true,
      locale: { last: 'Selesai' },
    },
  ],
  en: [
    {
      target: '.tourCategory',
      title: 'Movie Category',
      content: `
      To navigate around different movie categories, you can simply click the navigation 
      button or press ↑ up and ↓ down on your awesome keyboard`,
      placement: 'right',
      disableBeacon: true,
      disableOverlayClicks: true,
    },
    {
      target: '.tourSlide',
      title: 'Highlighted Movies',
      content: `
      You can browse through our top movies in each category with gentle click on the arrow buttons 
      or using keyboards and toggle → right and ← left`,
      placement: 'top',
      disableBeacon: true,
      disableOverlayClicks: true,
    },
    {
      target: '.tourLibrary',
      title: 'Movie Library',
      content: 'You can click this icon to view all movie list per category',
      placement: 'bottom',
      disableBeacon: true,
      disableOverlayClicks: true,
    },
    // {
    //   target: '.tourMovieDiscover',
    //   title: 'Discover Our Movie',
    //   content: 'Click this button to discover our awesome list of movies',
    //   placement: 'top',
    //   spotlightPadding: 0,
    //   disableBeacon: true,
    //   disableOverlayClicks: true,
    // },
    {
      target: '.tourMovieDetail',
      title: 'View Movie Detail',
      content: 'Click this button to watch movie and view movie detail: synopsis, testimonial, cast, and trailer',
      placement: 'top',
      spotlightPadding: 0,
      disableBeacon: true,
      disableOverlayClicks: true,
      locale: { last: 'Finish' },
    },
  ],
}
