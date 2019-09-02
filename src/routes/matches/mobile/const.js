import React from 'react'
import styles from './matches.css'

export const tourSteps = {
  //indonesia
  id: [
    {
      target: '.tourCategory',
      title: 'Kategori Konten',
      content: (
        <div>
          Untuk bernavigasi ke kategori konten yang berbeda, Anda cukup klik tombol atas dan bawah pada keyboard, atau
          geser
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
          atau geser
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
      placement: 'right',
      disableBeacon: true,
      locale: { last: 'Selesai' },
    },
  ],

  //english
  en: [
    {
      target: '.tourPlaylist',
      title: 'Channel List',
      content: <div>Filter matches based on sports or leagues.</div>,
      placement: 'bottom',
      disableBeacon: true,
      styles: {
        tooltip: {
          // width: '40rem',
        },
      },
    },
    {
      target: '.tourWeek',
      title: 'Filter By Week',
      content: <div>View matches based on week.</div>,
      placement: 'right',
      disableBeacon: true,
      styles: {
        tooltip: {
          maxWidth: '100%',
        },
      },
    },
    {
      target: '.tourFilterDate',
      title: 'Filter By Date',
      content: <div>View matches based on date.</div>,
      placement: 'left',
      disableBeacon: true,
      // styles: {
      //   tooltip: {
      //     maxWidth: '100%',
      //   },
      //   spotlight: {
      //     width: '45px',
      //     border: '1px solid red'
      //   },
      // },
    },
    {
      target: '.tourMatchStatus',
      title: 'Match Status',
      content: (
        <div>
          <div className={styles.matchStatusText}>
            <span className={`${styles.dot} ${styles.live}`} />
            <span className={styles.teksLegend}>The match is live now</span>
          </div>

          <div className={styles.matchStatusText}>
            <span className={`${styles.dot} ${styles.replay}`} />
            <span className={styles.teksLegend}>The match is over and you can see</span>
          </div>

          <div className={styles.matchStatusText}>
            <span className={`${styles.dot} ${styles.transparent}`} />
            <span className={styles.teksLegend}>replay match</span>
          </div>

          <div className={styles.matchStatusText}>
            <span className={`${styles.dot} ${styles.upcoming}`} />
            <span className={styles.teksLegend}>The match is upcoming</span>
          </div>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
      styles: {
        tooltip: {
          width: '23rem',
          // height: '31rem'
        },
      },
      locale: { last: 'Done' },
    },
  ],
}
