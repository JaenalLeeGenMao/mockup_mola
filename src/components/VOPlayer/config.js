const licenseURL = '9hE0C2TtMYK2ON6PegwrEwu2uP+sAjnnEVhNUvida4xTm/1PPcyaoilM4bYG0+3RwqxQh8c4STXYMTBAjBtblA=='
const version = '2.0.7'
// SUGGESITON:
// nanti kalau pindah ke cdn buat jadi gini aja js sama cssnya
// kalo nemu cara lain boleh propose
/*let script = [
  {
    src: 'http://yourjavascript.com/12091162319/jquery-3-1-1-min.js',
    id: 'jquery',
  },
  {
    src: `../vo/html5player/js/voplayer-${version}.min.js'`
    id: 'voplayerjs',
  },
  {
    src: `../vo/html5player/js/voplayer-ui-${version}.min.js',
    id: 'voplayeruijs',
  },
  {
    src: `../vo/html5player/voplayer-ui-ads-compiled-${version}.js',
    id: 'voplayeruiadsjs',
  },
  {
    src: '../vo/js/adBanner.js',
    id: 'voplayeradbannerjs',
  },
]

let style = [
  {
    id: 'vocss',
    rel: 'stylesheet',
    type: 'text/css',
    href: `../vo/css/style-${version}.css`,
    media: 'all',
  },
  {
    id: 'voplaybackcss',
    rel: 'stylesheet',
    type: 'text/css',
    href: `../vo/html5player/css/voplayer-playback-ui-${version}.css`,
    media: 'all',
  },
  {
    id: 'adsvocss',
    rel: 'stylesheet',
    type: 'text/css',
    href: `../vo/html5player/css/voplayer-ads-ui-${version}.css`,
    media: 'all',
  },
]

*/
let script = [
  {
    //ini sample kalo dari hostingan
    src: 'http://yourjavascript.com/12091162319/jquery-3-1-1-min.js',
    id: 'jquery',
  },
  {
    src: '../vo/html5player/js/voplayer.min.js',
    id: 'voplayerjs',
  },
  {
    src: '../vo/html5player/js/voplayer-ui.min.js',
    id: 'voplayeruijs',
  },
  {
    src: '../vo/html5player/voplayer-ui-ads-compiled.js',
    id: 'voplayeruiadsjs',
  },
  {
    src: '../vo/js/adBanner.js',
    id: 'voplayeradbannerjs',
  },
]

export const VOScript = script

let style = [
  {
    id: 'vocss',
    rel: 'stylesheet',
    type: 'text/css',
    href: '../vo/css/style.css',
    media: 'all',
  },
  {
    id: 'vocustomcss',
    rel: 'stylesheet',
    type: 'text/css',
    href: '../vo/css/custom-vo-style.css',
    media: 'all',
  },
  {
    id: 'voplaybackcss',
    rel: 'stylesheet',
    type: 'text/css',
    href: '../vo/html5player/css/voplayer-playback-ui.css',
    media: 'all',
  },
  {
    id: 'adsvocss',
    rel: 'stylesheet',
    type: 'text/css',
    href: '../vo/html5player/css/voplayer-ads-ui.css',
    media: 'all',
  },
]

export const VOStyle = style

export const VOLicense = licenseURL
//theoplayer --> license key for dummy video
//theoplayer --> licensekey real
