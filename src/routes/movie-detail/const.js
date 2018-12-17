export const AdBannerOptions = {
  araRequestUrl: '',
  ipaEnabled: true, // enable / disable IPA ads feature
  araEnabled: false, // enable / disable ARA ads feature
  ipaDuration: 30, // durasi refresh banner, how long the ad will last untill another one will be loaded
  ipaTimeOffset: 0, // describes the time between ending one ad and showing another one
  ipaVisibility: true, // If it's set to "false", the ad is normally loaded but it's visualy hidden.
  ipaNoAdsTime: 0, // the time between requests if there will be no in player ads received
  araRefreshTime: 0, // the time interval of ARA request. Timer starts counting after last sheduled linear ad end
  araResume: false, // toggles ON and OFF the ARA Resume feature
  closable: false,
  skipOffset: 0, // its the time, after which the ad can be closed either by using close() function or by clicking in the "X" button
}

export const videoSettings = {
  // className: videoPlayer,
  // showBackBtn: false,
  // isMobile: true,
  // movieUrl:
  //   'https://cdn-supersoccer-k-01.akamaized.net/Content/HLS/VOD/f7ac1d01-81a3-4d56-8e15-61fa8154a555/bfef7d7e-a709-16db-4489-074535b116bc/index.m3u8?hdnts=st=1543312166~exp=1546912166~acl=/*~hmac=ac6eae831f7b0ed02c054a3ea6d4fafebf214a31a0b07921c55ca32720a3422c', //'https://cdn-supersoccer-k-01.akamaized.net/Content/HLS/VOD/f7ac1d01-81a3-4d56-8e15-61fa8154a555/bfef7d7e-a709-16db-4489-074535b116bc/index.m3u8?hdnts=st=1543312166~exp=1546912166~acl=/*~hmac=ac6eae831f7b0ed02c054a3ea6d4fafebf214a31a0b07921c55ca32720a3422c',//'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',//'http://techslides.com/demos/sample-videos/small.mp4',//'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',//'http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-86.mp4',//'https://cdn-supersoccer-b-01.akamaized.net/Content/HLS/VOD/b1d6e402-bbef-4520-b92c-1824dae918e4/f2b2dfe5-7cdf-afe5-dcc1-324a8d53b4e5/index.m3u8?hdnts=st=1539763108~exp=1540367908~acl=/*~hmac=a7ad19456e00ed270be883bdc4241bc0c4b41554f43c71bb29594a471c6f17fc',//,'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
  // theoConfig: [],
  adsSource: '',
  adsBannerUrl: '',
  // adsSource:
  //   'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-preroll-video?params=eyJwcm9qZWN0X2lkIjoiNSIsInZpZGVvX2lkIjoic3N0diIsImFwcF9pZCI6InN1cGVyc29jY2VydHZfYWRzIiwic2Vzc2lvbl9pZCI6Im1oNWhvZXhucmQ5cHY0dHFzNGgxOXVoMmJnc3h1NzFtIiwiY2xpZW50X2lwIjoiOjoxIn0=',
  // videoType: 'video/mp4'
  // adsBannerUrl:
  //   'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=eyJwcm9qZWN0X2lkIjoiNSIsInZpZGVvX2lkIjoic3N0diIsImFwcF9pZCI6InN1cGVyc29jY2VydHZfYWRzIiwic2Vzc2lvbl9pZCI6Im1oNWhvZXhucmQ5cHY0dHFzNGgxOXVoMmJnc3h1NzFtIiwiY2xpZW50X2lwIjoiOjoxIn0=', //'http://api-d.supersoccer.tv/v1-alpha/ad-banner.json',
  adsBannerOptions: AdBannerOptions,
  resizeBannerAndCBarEnabled: true, //kalau false maka banner sesuai parent player, kalau true maka player sesuai banner
}
