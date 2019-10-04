function injectScript(scriptId, scriptSrc, loadDoneCB) {
  var js, fjs = document.getElementsByTagName('script')[0];
  if (document.getElementById(scriptId)){ return; }
  js = document.createElement('script'); js.id = scriptId;
  js.onload = function() {
      loadDoneCB();
  };
  js.src = scriptSrc;
  fjs.parentNode.insertBefore(js, fjs);
}

function initPageControls() {
  jQuery('.startPlayback1').on('keyup', function (e) {
      if (e.keyCode == 13) {
          loadTestStream(1);
      }
  });
  jQuery('.startPlayback2').on('keyup', function (e) {
      if (e.keyCode == 13) {
          loadTestStream(2);
      }
  });
  jQuery('#playerVersion').html(' - Player version: ' + squadeo.Player.version);
}

// global errors and exceptions catcher
function windowError(message, url, line) {
    console.error(message, url, line);
}
window.onerror=windowError;

// load extension
function loadExtension() {
  var url = jQuery('#extensionURL')[0].value;
  jQuery.get(url, function(data) {
    jQuery('#extension-content').html(data);
  });
}

function logBandwidth() {
  if(player) {
    var bw = Math.floor(player.estimatedBandwidth / 1000);
    document.getElementById('dlBandwdith').innerHTML = '' + bw;
    //console.log('estimate bw: ', bw);
  }
}

var lngMap = {
  nl: 'Dutch',
  en: 'English',
  de: 'German',
  fr: 'French',
  it: 'Italian',
  pl: 'Polish',
  pt: 'Portuguese',
  ru: 'Russian',
  es: 'Spanish',
  vi: 'Viêt Namese',
  el: 'Greek',
  'pt-br': 'Portuguese'
}

function formatQualityLevelForDisplay(level, forPrimaryDisplay, abrEnabled) {
  var formatedQuality = {
    text: '',
    isHD: false
  };
  if(level.hasOwnProperty('height') && level.height > 0) {
    formatedQuality.text += level.height + 'p';
    if(level.height >= 720) {
      formatedQuality.isHD = true;
    }
  }
  else {
    if(level.bandwidth > 1000000) {
      var b = Math.round(level.bandwidth / 100000);
      formatedQuality.text += ' ' + b/10 + ' Mbs';
    }
    else {
      var b = Math.round(level.bandwidth / 1000);
      formatedQuality.text += ' ' + b + ' Kbs';
    }
  }
  if(forPrimaryDisplay && abrEnabled) {
    formatedQuality.text = 'Auto ' + formatedQuality.text;
  }
  return formatedQuality;
}

function formatTextTrackForDisplay(track) {
  if(track.name) {
    return track.name
  }
  else {
    if(lngMap.hasOwnProperty(track.language)) {
      return lngMap[track.language];
    }
    else {
      return track.language;
    }
  }
}

function formatAudioTrackForDisplay(track) {
  if(track.name) {
    return track.name
  }
  else {
    if(lngMap.hasOwnProperty(track.language)) {
      return lngMap[track.language];
    }
    else {
      return track.language;
    }
  }
}

function onError(error) {
  // Log the error
  console.error('Player error: ' , error);
  switch(error.code) {
    case 1001 : // bad HTTP status
      console.error('HTTP error', error.data[1], 'on URI', error.data[0]);
    break;
  }
}

function addSRT() {
    var srtUrl = document.getElementById('srtTrackURL').value.trim();
    var strName = document.getElementById('srtTrackName').value.trim();
    player.addSRTTextTrack(strName, '', srtUrl);
}

function applyUIConfig() {
    var useWallClockTimes = document.getElementById('useWallClock').checked;
    player.uiController.updateConfig({ displayRelativePositionOnLive: useWallClockTimes });
}

function loadTestStream(streamId) {

  var streamUri = document.getElementById('testStreamUrl' + streamId).value.trim();
  var startTime = parseFloat(document.getElementById('testStartTime' + streamId).value);
  // negative values can be used on live/event streams
  if (startTime == Number.NaN) {
    startTime = 0;
  }

  var autostart = document.getElementById('autostartPlayback').checked;
  var jumpLargeGaps = document.getElementById('jumpLargeGaps').checked;
  var drmPersistentState = document.getElementById('drmPersistentState').checked;

  var widevineLicenseServer = document.getElementById('widevineLicenseServer').value.trim();
  var playreadyLicenseServer = document.getElementById('playreadyLicenseServer').value.trim();
  var fairplayLicenseServer = document.getElementById('fairplayLicenseServer').value.trim();

  var preferredTextLanguage = document.getElementById('prefTextLng').value.trim();
  var preferredAudioLanguage = document.getElementById('prefAudioLng').value.trim();

  var drmServersConfig = {};
  if(widevineLicenseServer.length > 0) {
    drmServersConfig['com.widevine.alpha'] = widevineLicenseServer;
  }
  if(playreadyLicenseServer.length > 0) {
    drmServersConfig['com.microsoft.playready'] = playreadyLicenseServer;
  }
  if(fairplayLicenseServer.length > 0) {
    drmServersConfig['com.apple.fps'] = fairplayLicenseServer;
  }

  var config = {
      drm: {
        servers: drmServersConfig,
        advanced: {
//            'com.apple.fps': {},
            'com.widevine.alpha' : {
                persistentStateRequired: drmPersistentState
            },
            'com.microsoft.playready': {
                persistentStateRequired: drmPersistentState
            }
        }
      },
      subtitles: {
        enableSMPTE: false
      },
      autostart: autostart
    };
  if(jumpLargeGaps) {
    config.streaming = {
      jumpLargeGaps: true
    }
  };

  var widevineCertUrl = document.getElementById('widevineServerCertificateURL').value;
  if(undefined != wvServerCertificate) {
      config.drm.advanced['com.widevine.alpha'].serverCertificate = wvServerCertificate;
  }
  else if(widevineCertUrl.trim().length > 0) {
      config.drm.advanced['com.widevine.alpha'].serverCertificateUrl = widevineCertUrl.trim();
  }

  var fairplayerServerCertificate = document.getElementById('fairplayerServerCertificateURL').value.trim();
  if(fairplayerServerCertificate != '') {
      config.drm.advanced['com.apple.fps'].serverCertificateUrl = fairplayerServerCertificate;
  }

  if(preferredTextLanguage.length > 0) {
      config.preferredTextLanguage = preferredTextLanguage;
  }
  if(preferredAudioLanguage.length > 0) {
      config.preferredAudioLanguage = preferredAudioLanguage;
  }
  
  player.registerLicenseResponseFilter(fairplayLicenseResponseFilter);

  player.reset().then(
    function() {
      player.configure(config);
      // Try to load a manifest
      // This is an asynchronous process, returning a Promise
      player.load(streamUri, startTime).then(function() {
        // This runs if the asynchronous load is successful
        console.log('The video has now been loaded');
      }).catch(onError);  // onError is executed if the asynchronous load fails
    }
  );
}

//WARNING: below is only an example of Fairplay license request filter. This implementation is not meant to be generic
function fairplayLicenseRequestFilter(request) {
    // process only fairplay licenses, all others will not be touched
    if(request.drm == 'com.apple.fps') {
        console.log('fairplayLicenseRequestFilter', request);
        // request body is already base-64 encoded
        var newBody = 'spc=' + request.body;
        newBody += '&assetID=' + request.keyIds[0];
        // replace request body with newly crafted one
        request.body = newBody;
        // add the content-type header matching the new body format
        request.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
}

//WARNING: below is only an example of Fairplay license response filter. This implementation is not meant to be generic
function fairplayLicenseResponseFilter(response) {
    var keyText = response.data.trim();
    if (keyText.substr(0, 5) === '<ckc>' && keyText.substr(-6) === '</ckc>') {
        keyText = keyText.slice(5, -6);
    }
    console.log(keyText.indexOf ('<FAIRPLAY_RESPONSE>'));
    if (keyText.indexOf ('<FAIRPLAY_RESPONSE>') >= 0) {
        var esidx = keyText.search('</LICENSE>');
        keyText = keyText.slice(28, esidx);
        console.log(keyText);
    }
    response.data = keyText;
}

function toggleFairplayLicenseRequestFilter() {
    useFilterBox = document.getElementById('useFairplayLicenseRequestFilter');
    if(useFilterBox.checked) {
        console.log('toggleFairplayLicenseRequestFilter register filter');
        player.registerLicenseRequestFilter(fairplayLicenseRequestFilter);
    }
    else {
        console.log('toggleFairplayLicenseRequestFilter unregister filter');
        player.unregisterLicenseRequestFilter(fairplayLicenseRequestFilter);
    }
}

var wvServerCertificate = undefined;

function onWVServerCertificateLoaded(event) {
    var response = event.target;
    if(response.status >= 200 && response.status < 300) {
        wvServerCertificate = new Uint8Array(response.response);
        document.getElementById('wvServerCertLoadingStatus').innerHTML = 'Loaded';
    }
    else {
        wvServerCertificate = undefined;
        document.getElementById('wvServerCertLoadingStatus').innerHTML = 'Error !';
    }
}

function onWVServerCertificateError() {
    wvServerCertificate = undefined;
    document.getElementById('wvServerCertLoadingStatus').innerHTML = 'Error !';
}

function loadWVServerCertificate() {
    var certUrl = document.getElementById('widevineServerCertificateURL').value;
    document.getElementById('wvServerCertLoadingStatus').innerHTML = 'Loading...';
    console.log('loadWVServerCertificate START');
    var request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';
    request.addEventListener('load', onWVServerCertificateLoaded, false);
    request.addEventListener('error', onWVServerCertificateError, false);
    request.open('GET', certUrl, true);
    request.setRequestHeader('Pragma', 'Cache-Control: no-cache');
    request.setRequestHeader('Cache-Control', 'max-age=0');
    request.send();
    console.log('loadWVServerCertificate END');
}

function deleteWVServerCertificate() {
    wvServerCertificate = undefined;
    var certUrl = document.getElementById('widevineServerCertificateURL').value;
    document.getElementById('wvServerCertLoadingStatus').innerHTML = '';
}
