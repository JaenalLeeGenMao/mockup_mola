'use strict';

function licenseRequestFilterVOLicenser(request) {

    console.log('licenseRequestFilterVOLicenser START');

    var rawLicenseRequest = new Uint8Array(request.body);
    var rawLicenseRequestBase64 = btoa(String.fromCharCode.apply(null, rawLicenseRequest));

    var drmAddParamElem = document.getElementById('drmReqAddtionalParam').value.trim();

    var newBody = 'licenserequest=' + encodeURIComponent(rawLicenseRequestBase64);
    if(drmAddParamElem.length > 0) {
        newBody +=  '&' + drmAddParamElem;
    }

    console.log('new body=', newBody);
    request.headers['Content-type'] = 'application/x-www-form-urlencoded';
    request.allowCrossSiteCredentials = true;

    request.body = new Uint8Array(newBody.length);
    for (var i = 0; i < newBody.length; ++i) {
        request.body[i] = newBody.charCodeAt(i);
    }
}

function licenseResponseFilterVOLicenser(response) {
    console.log('licenseResponseFilterVOLicenser START');

    var responseData = new Uint8Array(response.data);
    var responseTxt = String.fromCharCode.apply(null, responseData);

    console.log('responseTxt = ', responseTxt);
    var licenseMatch = responseTxt.match(/<License>(.+)<\/License>/i);
    if(licenseMatch) {
        console.log('Found license data, process it', licenseMatch[1]);
        var licenseData = licenseMatch[1];

        var rawLicenseString = atob(licenseData);

        response.data = new Uint8Array(rawLicenseString.length);
        for (var i = 0; i < rawLicenseString.length; ++i) {
            response.data[i] = rawLicenseString.charCodeAt(i);
        }
    }
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

const filters = {
    'volicenser': {
        displayName: 'VO Licenser',
        requestFct: licenseRequestFilterVOLicenser,
        responseFct: licenseResponseFilterVOLicenser
    },
    'fairplayCustom': {
        displayName: 'Fairplay Custom',
        requestFct: fairplayLicenseRequestFilter,
        responseFct: fairplayLicenseResponseFilter
    }
}

function populateFilterSelection() {
    var filtersSelect = document.getElementById('drmLicenseFilters');
    for(var f in filters) {
        console.log('adding filter', f);
        var opt = document.createElement('option');
        opt.value = f;
        opt.innerHTML = filters[f].displayName;
        filtersSelect.appendChild(opt);
    }
}

var currentFilter = undefined;

document.addEventListener('DOMContentLoaded', () => {
    populateFilterSelection();
});
