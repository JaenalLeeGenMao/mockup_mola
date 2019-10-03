## DEV Release Notes

Format note:

```
<Major>.<Minor>.<Patch> + (#IMAGE_NUMBER from new-design-dev) (Author - Date(DD/MM/YYY))
Description should be clear and specific, mention page and what changes added
```

### Example

> **17/09/2019**
>
> v1.1.0 + **#1234** (Irene)
>
> * Add Pay button on Transaction History table. After click button will show dialog. (New Feature)
>
> v1.1.0 + **#1235** (Ayu)
>
> * CRUD company manager **#1235** (New Feature)
>
> v1.1.0 + **#1336** (Aang)
>
> * CRUD regional agents **#1336** (New Feature)
> * Fix topup status message **#1336** (Bug Fixes)
> * Fix css style button top up payment in Firefox (Bug Fixes)
>
> **18/09/2019**
>
> v1.1.0 + **#1340** (Jaenal)
>
> * Hide form company in account for user member (Improvements)
> * New css styling pay button transaction history (Improvements)

### Version

**19/09/2019**

v1.1.0 + **1674** (Jaenal)

* fix title shown on video with event DOMSubtreeModified, now title is responsive according to video controller and analytics behaviour changed to the default(now working correctly) (Improvements)

v1.1.0 + **1682** (Ayu)

* add function scroll horizontal playlists(league list) with icon prev next on matches page (Improvements)

v1.1.0 + **1689** (Ayu)

* styling position next prev on horizontal playlists (league list) on matches page (Improvements)

v1.1.0 + **1691** (Ayu)

* styling icon scroll on horizontal playlists (league list) on matches page (Improvements)

**20/09/2019**

v1.1.0 + **1611** (Aang)

* remade offline notice popup in watch video and channels (Improvements)

v1.1.0 + **1705** (Arga)

* Force user to refresh the browser on error during server license server request (Improvements)

v1.1.0 + **1694** (Aang)

* bug fixing time duration in channels should not showing a decimal number (Bug Fixes)

**23/09/2019**

v1.2.0 + **1710** **1711** **1714** (Irene)

* Add Akamai Media Analytic and read data like number of audience, when video is watched and ended, bitrate, and buffer time from player on /watch page on desktop and mobile web (New Feature)

**24/09/2019**

v1.2.0 + **1714** (Irene)

* Update recommendation api url and response data for /watch page next video autoplay and suggestion section on desktop and mobile web (Improvements)

v1.2.0 + **1716** (Irene)

* Update validation if video title is 'Untitled Page' for facebook seo when blocked, previously only validate if title is null. This is when sharing /watch url on facebook post, can only be tested with production url (Improvements)

**25/09/2019**

v1.2.0 + **1708** **1721** **1715** (Aang)

* fix bug in safari should not showing empty toogle subtitle in watch and channels (Bug Fixes)

**26/09/2019**

v1.2.0 + **1727** (Aang)

* add resizer for some image in channels (Improvements)

v1.2.0 + **1725** (Jaenal)

* add resizer for images in landing page #10936 (Improvements)

v1.2.0 + **1713** (Elkana)

* remove domain from path and referrer payload for analytics #16077 (Improvements)

**27/09/2019**

v1.3.0 + **1733** (Irene)

* add universal/global styling (css) for color and font-size and currently just implemented in home page (Improvements)
* update calling defaultvideosetting from render to didmount so on redux call will not rerender tracker on /watch page (Improvements)

**02/10/2019**

v1.3.0 + **1719** (Jaenal)

* Update watch desktop design (Improvements)

v1.3.0 + **1720** (Jaenal)

* Fix player layout when window height < 700px> (Improvements)

v1.3.0 + **1735** (Jaenal)

* Update suggestion design of watch desktop simalar to feature page (Improvements)

v1.3.0 + **1738** (Jaenal)

* Update loading placeholder on watch desktop new design (Improvements

v1.3.0 + **1740** (Jaenal)

* improve watchpage casters with fix height (Improvements)

v1.3.0 + **1743** (Septian)

* Change ads app_id from sent_ads to mola_ads (Improvements)

v1.3.0 + **1743** (Irene)

* Fix styling upcoming video on big screen (Improvements)

v1.3.0 + **1746** (Irene)

* Fix countdown circle styling on upcoming video on big screen (Improvements)

v1.3.0 + **1751** (Jaenal)

* remove unused code in watch page and resizer for suggestions (Improvements)
