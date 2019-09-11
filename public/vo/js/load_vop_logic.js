
var vo_playerStartTimeFromVOP = 0;

function injectDOMElement() {
    var loadControl = document.createElement('div');
    loadControl.innerHTML = '<br><h3>Load stream from VOP URL</h3> \
        <input type="text" id="vopURL" size="80" placeholder="VOP URL" /> \
        <button type="button" onclick="loadTVaaSVOP()">Load stream from VOP</button>';
    document.getElementById('testControls').appendChild(loadControl);
}

function loadTVaaSVOP() {
    var vopURL = document.getElementById('vopURL').value.trim();
    loadVOPFromUrl(vopURL);
}

function loadVOPFromUrl(url) {
    console.log('Loading stream description from VOP url: ' + url);
    fetch(url).then(function(response) {
      return response.text();
    }).then(function(responseTxt) {
        console.log('got response:', responseTxt);
        var parser = new DOMParser();
        var xmlDoc =  parser.parseFromString(responseTxt, 'text/xml');

        var licenseAcqUrl = '';
        var url = xmlDoc.getElementsByTagName('URL')[0].childNodes[0].nodeValue;

        var drmLicenseAcquisionElements = xmlDoc.getElementsByTagName('DrmLicenseAcquisitionUrl');
        if(drmLicenseAcquisionElements.length > 0) {
            try {
                licenseAcqUrl = drmLicenseAcquisionElements[0].childNodes[0].nodeValue;
            }
            catch(e) {
                licenseAcqUrl = '';
            }
        }
        //var licenseAcqCustomData = xmlDoc.getElementsByTagName('DrmLicenseAcquisitionCustomData')[0].childNodes[0].nodeValue;

        console.log('VOP info:', url, licenseAcqUrl);

        var drmServersConfig = {};
        if(licenseAcqUrl.length > 0) {
          drmServersConfig['com.widevine.alpha'] = licenseAcqUrl;
        }

        var config = {
            drm: {
              servers: drmServersConfig,
              advanced: {
      //            'com.apple.fps': {},
                  'com.widevine.alpha' : {
                      persistentStateRequired: false
                  },
                  'com.microsoft.playready': {
                      persistentStateRequired: false
                  }
              }
            },
            manifest: {
              availabilityWindowOverride: Infinity
            },
            subtitles: {
              enableSMPTE: false
            },
            autostart: true
          };

        var widevineCertUrl = document.getElementById('widevineServerCertificateURL').value;
        if(undefined != wvServerCertificate) {
            config.drm.advanced['com.widevine.alpha'].serverCertificate = wvServerCertificate;
        }
        else if(widevineCertUrl.trim().length > 0) {
            config.drm.advanced['com.widevine.alpha'].serverCertificateUrl = widevineCertUrl.trim();
        }

        player.reset().then(
          function() {
            player.configure(config);
            // Try to load a manifest
            // This is an asynchronous process, returning a Promise
            player.load(url, vo_playerStartTimeFromVOP).then(function() {
              // This runs if the asynchronous load is successful
              console.log('The video has now been loaded');
            }).catch(onError);  // onError is executed if the asynchronous load fails
          }
        );
    });
}

injectDOMElement();
