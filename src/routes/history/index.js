import React from 'react';
import Layout from '../../components/Layout';
import History from './History';

const title = 'History';

// const axios = require('axios');

// // Make a request for a user with a given ID
// axios.get('http://mola.lukitomo.com/v2/videos/playlists/horror')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

function action() {
  const dummyHistory = [
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 670,
        updatedAt: '2018-07-17T17:41:33.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'Football Colours - Sporting Gijon',
              chapter: 'Chapter One',
              description:
                'Seorang raja pernah menjadi presiden kehormatan klub ini. Raja tersebut adalah Raja Alfonso XIII. Sebuah kehormatan yang diberikan kepadanya pada tahun 1912. Kepemilikan seorang raja inilah yang membuat klub ini memiliki nama “Real” di depannya.  Klub yang berdiri pada 1902 dengan nama Gijon Sports ini identik dengan warna merah dan putih.  Merupakan sebuah kebanggaan bagi para pemain setiap kali mengenakan jersey utama, terlebih kala bertarung di El Molinon, stadion mereka yang merupakan stadion tertua di Spanyol.  Dari mana asal pemilihan jersey? Siapa yang memprakarsai klub ini serta hubungan mereka dengan sang Raja Alfonso XIII?',
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 1,
              contentType: 1,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/VOD/0fb82f5b-da51-4bbb-849b-f4a558ac4550/68fb97dc-8666-635a-5742-c1ccce4088de/index.m3u8',
              coverUrl:
                'https://cdn01.supersoccer.tv/images/26/f12105146129696d6a7e0ed521db2e48/original.jpg',
              previewUrl: null,
              duration: 7200,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-15T21:41:44.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 499,
        updatedAt: '2018-07-17T17:40:32.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'Dream Teams - It Takes Eleven to Tango',
              chapter: 'Chapter One',
              description:
                'Menyusun tim impian bermaterikan talenta-talenta Argentina bukanlah perkara gampang. Dengan formasi 3-4-3, kami menyajikan sebuah skuad impian yang akan memanjakan semua manajer maupun pelatih di seantora Bumi. Saking dahsyatnya, kita hanya bisa bisa menyayangkan bahwa mimpi ini tidak akan pernah menjadi kenyataan. Siapa yang tidak ingin melihat Maradona dan Messi berada di dalam sebuah line-up yang sama, ditemani sembilan pemain terbaik tim Tango sepanjang masa?  Bayern Munchen mungkin pantas disebut sebagai salah satu tim yang paling konsisten di kancah sepakbola. Dari era Franz Beckenbauer, Karl-Heinz Rummenigge, Lothar Mattheus, Michael Ballack, hingga Arjen Robben, “Die Roten” selalu menjadi penguasa Jerman dan menjuarai Eropa selama lintas dekade. Mewakili eranya masing-masing, terbentuklah sebuah tim impian milik Bayern Munchen.',
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 1,
              contentType: 1,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/VOD/7dd438e6-f98b-451a-885b-c5cd81af6bdd/68fb97dc-8666-635a-5742-c1ccce4088de/index.m3u8',
              coverUrl:
                'https://cdn01.supersoccer.tv/images/457e54f4cb3c0ed26945e30dd2f53edf/original.jpg',
              previewUrl: null,
              duration: 800,
              matchStart: null,
              matchEnd: null,
              displayOrder: 4,
              expireAt: null,
              createdAt: '2017-10-15T21:41:44.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 7779,
        updatedAt: '2018-07-16T16:16:23.000Z',
        videos: [
          {
            type: 'video',
            attributes: {
              title: 'SSTV One',
              description: null,
              shortDescription: null,
              fullDescription: null,
              homeTeamId: null,
              awayTeamId: null,
              visibility: 0,
              permission: 3,
              contentType: 2,
              audioLanguage: null,
              subtitleLanguage: null,
              viewsCount: null,
              likesCount: null,
              rating: null,
              source: 'vos360',
              streamSourceUrl:
                'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/Live/channel(SSP01)/index.m3u8',
              coverUrl: 'http://cdn01.supersoccer.tv/v3/img/covers/sstv.jpg',
              previewUrl: null,
              duration: 8000,
              matchStart: null,
              matchEnd: null,
              displayOrder: null,
              expireAt: null,
              createdAt: '2017-10-22T09:46:41.000Z',
            },
          },
        ],
      },
    },
    {
      type: 'user-video-history',
      id: 2,
      attributes: {
        uid: 'kareemlukitomo123',
        timePosition: 999,
        updatedAt: '2018-07-16T15:13:16.000Z',
        videos: [
          {
            videos: 'not_found',
          },
        ],
      },
    },
  ];
  // const dummyHistory = [
  //     { id:1, title: 'Hannibal Lecter - Season 3', chapter: 'Thirty three', playedDuration: 30, totalDuration: 49, img: 'https://via.placeholder.com/331x207'},
  //     { id:2, title: 'The Greatest Showman', chapter: 'One', playedDuration: 20, totalDuration: 100, img: 'https://via.placeholder.com/331x207'},
  //     { id:3, title: 'Hannibal Lecter - Season 3', chapter: 'Thirty three', playedDuration: 30, totalDuration: 49, img: 'https://via.placeholder.com/331x207'},
  //     { id:4, title: 'The Greatest Showman', chapter: 'One', playedDuration: 20, totalDuration: 100, img: 'https://via.placeholder.com/331x207'},
  //     { id:5, title: 'Hannibal Lecter - Season 3', chapter: 'Thirty three', playedDuration: 30, totalDuration: 49, img: 'https://via.placeholder.com/331x207'},
  //     { id:6, title: 'The Greatest Showman', chapter: 'One', playedDuration: 20, totalDuration: 100, img: 'https://via.placeholder.com/331x207'},
  //     { id:7, title: 'Hannibal Lecter - Season 3', chapter: 'Thirty three', playedDuration: 30, totalDuration: 49, img: 'https://via.placeholder.com/331x207'},
  //     { id:8, title: 'The Greatest Showman', chapter: 'One', playedDuration: 20, totalDuration: 100, img: 'https://via.placeholder.com/331x207'},
  //     { id:9, title: 'Hannibal Lecter - Season 3', chapter: 'Thirty three', playedDuration: 30, totalDuration: 49, img: 'https://via.placeholder.com/331x207'},
  //     { id:10, title: 'The Greatest Showman', chapter: 'One', playedDuration: 20, totalDuration: 100, img: 'https://via.placeholder.com/331x207'},
  //     { id:11, title: 'Hannibal Lecter - Season 3', chapter: 'Thirty three', playedDuration: 30, totalDuration: 49, img: 'https://via.placeholder.com/331x207'},
  //     { id:12, title: 'The Greatest Showman', chapter: 'One', playedDuration: 20, totalDuration: 100, img: 'https://via.placeholder.com/331x207'},
  // ]

  return {
    chunks: ['history'],
    title,
    component: (
      <Layout>
        <History movieDummy={dummyHistory} />
      </Layout>
    ),
  };
}

export default action;
