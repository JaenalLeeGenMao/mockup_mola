
var vo_playerStartTimeFromVOP = 0;

function injectDOMElement() {
    var loadControl = document.createElement('div');
    loadControl.innerHTML = '<br><hr><h3>Load stream from VOP URL</h3> \
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
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (responseTxt) {
        console.log('got response:', responseTxt);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(responseTxt, 'text/xml');

        var media = {};

        media.url = xmlDoc.getElementsByTagName('URL')[0].childNodes[0].nodeValue;

        var drmTypeTag = xmlDoc.getElementsByTagName('DrmAgentType');
        if (drmTypeTag.length > 0) {
            try {
                var drmTypeValue = drmTypeTag[0].childNodes[0].nodeValue;
                if (drmTypeValue == 'DrmAgentTypeWidevine') {
                    media.drmAgentType = 'widevine';
                }
                else if (drmTypeValue == 'DrmAgentTypePlayready') {
                    media.drmAgentType = 'playready';
                }
            }
            catch (e) { }
        }

        if (media.drmAgentType != undefined) {
            var drmLicenseAcquisionElements = xmlDoc.getElementsByTagName('DrmLicenseAcquisitionUrl');
            if (drmLicenseAcquisionElements.length > 0) {
                try {
                    media.licenseServer = drmLicenseAcquisionElements[0].childNodes[0].nodeValue;
                }
                catch (e) { }
            }
            // look for the server certificate tag for Widevine only
            if (media.drmAgentType == 'widevine') {
                var drmLicenseServerCertTag = xmlDoc.getElementsByTagName('DrmCertificateUrl');
                if (drmLicenseServerCertTag.length > 0) {
                    try {
                        media.wvServerCertificateUrl = drmLicenseServerCertTag[0].childNodes[0].nodeValue;
                    }
                    catch (e) { }
                }
            }
        }

        var vmapUrlTag = xmlDoc.getElementsByTagName('VmapUrl');
        if (vmapUrlTag.length > 0) {
            try {
                media.vmapUrl = vmapUrlTag[0].childNodes[0].nodeValue;
            }
            catch (e) { }
        }

        var vastUrlTag = xmlDoc.getElementsByTagName('VastUrl');
        if (vastUrlTag.length > 0) {
            try {
                media.vastUrl = vastUrlTag[0].childNodes[0].nodeValue;
            }
            catch (e) { }
        }

        console.log('VOP info:', media.url, media.drmAgentType, media.licenseServer, media.vastUrl, media.vmapUrl);

        loadMedia(media);
    });
}

injectDOMElement();
