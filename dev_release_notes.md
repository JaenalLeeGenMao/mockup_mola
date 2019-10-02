## DEV Release Notes

Format note:

```
<Major>.<Minor>.<Patch> + (#BUILD_FROM_PIPELINE) (Author - Date(DD/MM/YYY))
Description should be clear and specific, mention page and what changes added
```

### Example

v1.1.0

* New Feature:

  * Add Pay button on Transaction History table. After click button will show dialog. **#1234** (Irene - 17/09/2019)
  * CRUD company manager **#1235** (Ayu - 17/09/2019)
  * CRUD regional agents **#1336** (Aang - 17/09/2019)

* Bug Fixes:

  * Fix topup status message **#1336** (Aang - 17/09/2019)
  * Fix css style button top up payment in Firefox **#1336** (Aang - 17/09/2019)

* Improvements:
  * Hide form company in account for user member **#1340** (Jaenal - 17/09/2019)
  * New css styling pay button transaction history **#1340** (Jaenal - 17/09/2019)

### Version

v1.1.0

* Improvements:

  * fix title shown on video with event DOMSubtreeModified, now title is responsive according to video controller and analytics behaviour changed to the default(now working correctly) #10671 (Jaenal - 19/09/2019)
  * add function scroll horizontal playlists(league list) with icon prev next on matches page #10679 (Ayu - 19/09/2019)
  * styling position next prev on horizontal playlists (league list) on matches page #10693 (Ayu - 19/09/2019)
  * styling icon scroll on horizontal playlists (league list) on matches page #10713 (Ayu - 19/09/2019)
  * remade offline notice popup in watch video and channels #10728 (Aang - 20/09/2019)
  * Force user to refresh the browser on error during server license server request #10760 (Arga Tahta - 20/09/2019)

* Bug fixes:

  * bug fixing time duration in channels should not showing a decimal number #10728 (Aang - 20/09/2019)

v1.2.0

* New Feature:

  * Add Akamai Media Analytic and read data like number of audience, when video is watched and ended, bitrate, and buffer time from player on /watch page on desktop and mobile web #4d7b071b #5d0fe434 #56e64a56 (Irene - 23-24/09/2019)

* Improvements:

  * Update recommendation api url and response data for /watch page next video autoplay and suggestion section on desktop and mobile web #6a500835 (Irene - 24/09/2019)
  * Update validation if video title is 'Untitled Page' for facebook seo when blocked, previously only validate if title is null. This is when sharing /watch url on facebook post, can only be tested with production url #95b08e0f (Irene - 24/09/2019)
  * add resizer for some image in channels #10939 (Aang - 26/09/2019)
  * add resizer for images in landing page #10936 (Jaenal - 26/09/2019)
  * remove domain from path and referrer payload for analytics #16077 (Elkana - 26/09/2019)

* Bug Fixes:
  * fix bug in safari should not showing empty toogle subtitle in watch and channels #10885 (Aang - 25/-09/209)

v1.3.0 + **1745** (Septian - 02/10/2019)

* Improvements:
  * Change ads app_id from sent_ads to mola_ads
