const licenseURL = 'https://cdn.theoplayer.com/dash/b1e2bf96-a594-4289-b1f7-1d92c371140d'
// const licenseURL = 'https://cdn.theoplayer.com/dash/theoplayer';

let script = [
  // {
  //   src: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
  //   id: 'sdkloaderjs'
  // },
  {
    src: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramewor:1',
    id: 'castsenderjs',
  },
  {
    src: `${licenseURL}/THEOplayer.js`,
    id: 'theoplayerjs',
  },
]

export const theoScripts = script

let style = [
  {
    id: 'uiTheo',
    rel: 'stylesheet',
    type: 'text/css',
    href: `${licenseURL}/ui.css`,
    media: 'all',
  },
]

export const theoStyle = style

export const theoLibraryLocation = `${licenseURL}/`
//theoplayer --> license key for dummy video
//theoplayer --> licensekey real
