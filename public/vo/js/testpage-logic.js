'use strict';

function injectScript(scriptId, scriptSrc, loadDoneCB) {
    var js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(scriptId)) { return; }
    js = document.createElement('script'); js.id = scriptId;
    js.onload = function () {
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
    jQuery('#playerVersion').html(voplayer.Player.version);
}

// global errors and exceptions catcher
function windowError(message, url, line) {
    console.error(message, url, line);
}
window.onerror = windowError;

function logBandwidth() {
    if (player) {
        var bw = Math.floor(player.estimatedBandwidth / 1000);
        document.getElementById('dlBandwdith').innerHTML = '' + bw;
        //console.log('estimate bw: ', bw);
    }
}

const lngMap = {
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
    if (level.hasOwnProperty('height') && level.height > 0) {
        formatedQuality.text += level.height + 'p';
        if (level.height >= 720) {
            formatedQuality.isHD = true;
        }
    }
    else {
        if (level.bandwidth > 1000000) {
            var b = Math.round(level.bandwidth / 100000);
            formatedQuality.text += ' ' + b / 10 + ' Mbs';
        }
        else {
            var b = Math.round(level.bandwidth / 1000);
            formatedQuality.text += ' ' + b + ' Kbs';
        }
    }
    if (forPrimaryDisplay && abrEnabled) {
        formatedQuality.text = 'Auto ' + formatedQuality.text;
    }
    return formatedQuality;
}

function formatTextTrackForDisplay(track) {
    if (track.name) {
        return track.name
    }
    else {
        if (lngMap.hasOwnProperty(track.language)) {
            return lngMap[track.language];
        }
        else {
            return track.language;
        }
    }
}

function formatAudioTrackForDisplay(track) {
    if (track.name) {
        return track.name
    }
    else {
        if (lngMap.hasOwnProperty(track.language)) {
            return lngMap[track.language];
        }
        else {
            return track.language;
        }
    }
}

function onError(error) {
    // Log the error
    console.error('Player error: ', error);
    switch (error.code) {
        case 1001: // bad HTTP status
            console.error('HTTP error', error.data[1], 'on URI', error.data[0]);
            break;
    }
}

function applyUIConfig() {
    var useWallClockTimes = document.getElementById('useWallClock').checked;
    player.uiController.updateConfig({ displayRelativePositionOnLive: useWallClockTimes });
}

function addSRT(media) {
    var srtUrl = document.getElementById('srtTrackURL').value.trim();
    var strName = document.getElementById('srtTrackName').value.trim();
    var strLang = document.getElementById('srtTrackLanguage').value.trim();
    if (media && media.extSubUrl && media.extSubName) {
        console.log('Media contains external subtitle info: ', media.extSubName, media.extSubUrl, media.extSubLang);
        srtUrl = media.extSubUrl;
        strName = media.extSubName;
        strLang = media.extSubLang || '';
    }
    if ((undefined != srtUrl) && (undefined != strName)
        && (srtUrl != '') && (strName != '')) {
        console.log('Adding external subtitle track ' + name + ' from URL ' + srtUrl + ' for language: ' + strLang);
        player.addSRTTextTrack(strName, strLang, srtUrl);
    }
}

function loadMedia(media) {

    var autostart = document.getElementById('autostartPlayback').checked;
    var jumpLargeGaps = document.getElementById('jumpLargeGaps').checked;
    var drmPersistentState = document.getElementById('drmPersistentState').checked;

    var preferredTextLanguage = document.getElementById('prefTextLng').value.trim();
    var preferredAudioLanguage = document.getElementById('prefAudioLng').value.trim();

    var drmServersConfig = {};
    if (media.drmAgentType == 'widevine') {
        drmServersConfig['com.widevine.alpha'] = media.licenseServer;
    }
    else if (media.drmAgentType == 'playready') {
        drmServersConfig['com.microsoft.playready'] = media.licenseServer;
    }
    else if (media.drmAgentType == 'fairplay') {
        drmServersConfig['com.apple.fps'] = media.licenseServer;
    }

    var config = {
        drm: {
            servers: drmServersConfig,
            advanced: {
                //'com.apple.fps': {},
                'com.widevine.alpha': {
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
    if (jumpLargeGaps) {
        config.streaming = {
            jumpLargeGaps: true
        }
    };

    if (undefined != wvServerCertificate) {
        config.drm.advanced['com.widevine.alpha'].serverCertificate = wvServerCertificate;
    }
    else if (undefined != media.wvServerCertificateUrl) {
        config.drm.advanced['com.widevine.alpha'].serverCertificateUrl = media.wvServerCertificateUrl;
    }

    if (media.fpServerCertificateUrl != '') {
        config.drm.advanced['com.apple.fps'] = {
            serverCertificateUrl: media.fpServerCertificateUrl
        };
    }

    if (preferredTextLanguage.length > 0) {
        config.preferredTextLanguage = preferredTextLanguage;
    }
    if (preferredAudioLanguage.length > 0) {
        config.preferredAudioLanguage = preferredAudioLanguage;
    }

    var startTime = (null != media.startTime) ? media.startTime : 0;
    player.reset().then((function () {
        player.configure(config);
        // applyDrmXHRFilters();
        loadVAST(media).then((function () {
            // Try to load a manifest
            // This is an asynchronous process, returning a Promise
            player.load(media.url, startTime).then(function () {

                // This runs if the asynchronous load is successful
                console.log('The video has now been loaded');

                // add external subtitle track if any
                addSRT(media);
            }).catch(onError);  // onError is executed if the asynchronous load fails
        }).bind(this));
    }).bind(this)
    );
}


// function handleInitBanner(player) {
//     // let adsBannerUrl = _get(this.props, 'adsBannerUrl', '')
//     const banner = new AdBanner(player)
//     banner.closeable = false
//     banner.visibility = false
//     banner.requestURL = 'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=eyJwcm9qZWN0X2lkIjoiNSIsInZpZGVvX2lkIjoiMTA4NzYxMDAxMyIsImFwcF9pZCI6InNlbnRfYWRzIiwic2Vzc2lvbl9pZCI6InZlcmltYXRyaXgtdGVzdCIsImNsaWVudF9pcCI6IjAuMC4wLjAiLCJ1dWlkIjoidmVyaW1hdHJpeC10ZXN0In0='
//     banner.start()
//     window.banner = banner
// }


function applyDrmXHRFilters() {
    var filter = document.getElementById('drmLicenseFilters').value;
    // unregister current filters if any
    if (undefined != currentFilter) {
        if (filters[currentFilter].request) {
            player.unregisterLicenseRequestFilter(filters[currentFilter].requestFct);
        }
        if (filters[currentFilter].response) {
            player.unregisterLicenseResponseFilter(filters[currentFilter].responseFct);
        }
        currentFilter = undefined;
    }

    // register new filters if it exists
    if (filters.hasOwnProperty(filter)) {
        currentFilter = filter;
        console.log('Apply DRM filters: ' + filters[filter].displayName);
        if (filters[currentFilter].requestFct) {
            player.registerLicenseRequestFilter(filters[currentFilter].requestFct);
        }
        if (filters[currentFilter].responseFct) {
            player.registerLicenseResponseFilter(filters[currentFilter].responseFct);
        }
    }
}

function loadTestStream(streamId) {

    var streamUri = document.getElementById('testStreamUrl' + streamId).value.trim();
    var startTime = parseFloat(document.getElementById('testStartTime' + streamId).value);
    // negative values can be used on live/event streams
    if (startTime == Number.NaN) {
        startTime = 0;
    }

    var widevineLicenseServer = document.getElementById('wvnLicenseURL' + streamId).value.trim();
    var playreadyLicenseServer = document.getElementById('plrLicenseURL' + streamId).value.trim();
    var fairplayLicenseServer = document.getElementById('fplLicenseURL' + streamId).value.trim();

    var media = {
        url: streamUri,
        startTime
    };

    if (widevineLicenseServer.length > 0) {
        media.drmAgentType = 'widevine';
        media.licenseServer = widevineLicenseServer
    }
    if (playreadyLicenseServer.length > 0) {
        media.drmAgentType = 'playready';
        media.licenseServer = playreadyLicenseServer
    }
    if (fairplayLicenseServer.length > 0) {
        media.drmAgentType = 'fairplay';
        media.licenseServer = fairplayLicenseServer
    }

    var widevineCertUrl = document.getElementById('wvnServerCertificateURL' + streamId).value;
    if (widevineCertUrl.trim().length > 0) {
        media.wvServerCertificateUrl = widevineCertUrl.trim();
    }

    var fairplayerServerCertificate = document.getElementById('fplServerCertificateURL' + streamId).value.trim();
    if (fairplayerServerCertificate != '') {
        media.fpServerCertificateUrl = fairplayerServerCertificate;
    }

    var adUrl = document.getElementById('vastURL').value.trim();
    if (adUrl.length > 0) {
        media.vastUrl = adUrl;
    }
    else {
        adUrl = document.getElementById('vmapURL').value.trim();;
        media.vmapUrl = (adUrl.length > 0) ? adUrl : null;
    }
    loadMedia(media);
}

function loadVAST(stream) {
    if (stream.vastUrl == null && stream.vmapUrl == null) {
        return new Promise((function (resolve, reject) {
            resolve();
        }).bind(this));
    } else if (stream.vastUrl != null) {
        return player.loadVMAP(stream.vastUrl, false, true);
    } else {
        return player.loadVMAP(stream.vmapUrl, false, false)
    }
}

var wvServerCertificate = undefined;

function onWVServerCertificateLoaded(event) {
    var response = event.target;
    if (response.status >= 200 && response.status < 300) {
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

function loadWVServerCertificate(streamId) {
    var certUrl = document.getElementById('wvnServerCertificateURL' + streamId).value;
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
    document.getElementById('wvServerCertLoadingStatus').innerHTML = '';
}
