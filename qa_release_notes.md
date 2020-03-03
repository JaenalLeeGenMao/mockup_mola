## QA Release Notes

Format note:

```
Date naik ke beta / branch master(DD/MM/YYY)
<Major>.<Minor>.<Patch> + (#IMAGE_NUMBER from branch master) (Author)
Description should be clear and specific, mention page and what changes added
```

### Example

> **17/09/2019**
>
> v1.1.0 + **#1234**
>
> New Feature:
>
> * Add Akamai Media Analytic and read data like number of audience, when video is watched and ended, bitrate, and buffer time from player on /watch page on desktop and mobile web (Irene)
>
> Improvements:
>
> * Update recommendation api url and response data for /watch page next video autoplay and suggestion section on desktop and mobile web (Irene)
> * Update validation if video title is 'Untitled Page' for facebook seo when blocked, previously only validate if title is null. This is when sharing /watch url on facebook post, can only be tested with production url (Irene)
> * add resizer for some image in channels (Aang)
> * add resizer for images in landing page (Jaenal)
> * remove domain from path and referrer payload for analytics (Elkana)
>
> Bug Fixes:
>
> * fix bug in safari should not showing empty toogle subtitle in watch and channels (Aang)

### Version

**04/10/2019**

V1.3.0 + **1770**


Improvements:
*  add universal/global styling (css) for color and font-size and currently just implemented in home page (Irene)
*  update calling default video setting from render to didmount so on redux call will not rerender tracker on /watch page (Irene)
*  update video detail page (/watch) desktop design (Jaenal)
*  Fix Player layout when window height <700px> (Jaenal)
*  update suggestion design of watch desktop similiar to feature page (Jaenal)
*  update loading placeholder on watch desktop new design (jaenal)
*  optimize platform blocker code on desktop and mobile (Arga)
*  improve video detail page (/watch) cast and crew section with fix height on dekstop  (Jaenal)
*  Change ads app_id from sent_ads to mola_ads (Septian)
*  remove unused code in watch page and resize for suggestions (Jaenal)
*  Add resizer for poster image in home page desktop and mobile (Irene)
*  Update New Design detail page (/matches) icon and function filter league on desktop (Ayu)
*  add resizer image icon matches page w=70 for mobile and w=60 for desktop (Ayu)
*  Adjust banner images on landing page to 1080 and remove chat styling (Irene)
*  Update Styling upcoming video autoplay (popup) title and theoplayer font-size on 4k big screen desktop (Irene)


Bug Fixes:
*  Remove temporary icon photo profile on page screen desktop and mobile (Sabiq)


**04/10/2019**

V1.3.0 + **1776**


Improvements:
*  Add resizer for platform blocker used in video detail page (/channels and /watch) for desktop (w=100) and mobile (w=60) (aang)
*  Fix account detail page (/accounts/profile?tab=security) when back to profile page (/accounts/profile) on desktop and mobile (arga)
*  Update Styling Platform blocker to add clickable MPS icon ‘info selengkapnya’ and redesign platform blocker on mobile and desktop (arga)

**07/10/2019**

V1.3.0 + **1786**


Improvements:
* Adjust caster styling and suggestion card styling when hover video detail page (/watch) on desktop (jaenal) 
* Update countdown style for video detail page (/watch) new design on desktop and mobile (irene)
* Show user (client) current date time on /system-info page desktop and mobile (irene)


V1.3.0 + **1790**


Bug Fixes:
* Fix validation to recall recommendation api (related video and upcoming video) on video detail page (/watch) desktop and mobile. Previously when navigate to next video or other video, the recommendation is still the same (irene)

V1.3.0 + **1795**

Bug Fixes:
* Fix platform blocker styling in video detail page (/channel) both for dekstop and mobile (arga) 

 
 V1.3.0 + **1799**
 
 Improvements:
* Only Show blue dot (next to date filter) if today has live match on video detail page (/matches) both for dekstop and mobile (Irene) 

**09/10/2019**

V1.3.1 + **1803**

New feature:
* If redirect to apps parameter is true, add floating button which user can redirect to Play Store or Apps Store. The icon Play Store and Apps Store are detected based on user device agent. (Trisno)

**11/10/2019**

V1.4.0 + **1812**

Improvements:

* Update calling default video setting from render to did mount and did update on video detail page (/channels) both for desktop and mobile (Aang)
* Set up a realtime EPG Schedule on video detail page (/channel) both for desktop and mobile. Previous EPG was still visible even though the channel has ended (Aang)
* Remove chache on enpoints channel playlist, program guides and search game both for desktop and mobile (Aang)
* Fix responsive arrow when resizing desktop and if greater than 1200px the icon will not show (Ayu)

Bug Fixes:
* Styling the line height icon "readmore" from 1.4 to 1.5 on movies detail page for mobile. Previously the line height stil the same (Ayu)
* Fix eror console “Error while trying to use the following icon from the Manifest: https://mola.tv/mola.png (Resource size is not correct - typo in the Manifest?)”. Previously when logging into mola and clicking inspect, an error appeared in the console. (Ayu)
* Fix league category scroller on video detail page (/ matches) for desktop (take out styling overflow_x from tooltip). Previously appeared a white line on the scrollbar in mozila windows (Ayu)

**14/10/2019**

V1.4.0 + **1816**

Bug Fixes:
* Fixing the realtime EPG is not working when first time opened video detail page (/channel) (Aang)

V1.4.0 + **1824**

Improvements:
* Update font size of video titles on video detail page (/watch) from 28 px to 22 px and homepage from 26 px to 22 px for mobile only (Irene) 
* Update read text config params from API (from misty) “untuk menyaksikan tayangan ini, silahkan unduh aplikasi Mola TV melalui tombol di bawah ini” on video detail page (/watch) for mobile. Previously read from static text. (Trisno)

**17/10/2019**

V1.4.1 + **1828**

New Feature:
* Add video player blocker (read configuration from config app param desktop_video_blocker: true) on video detail page (/watch and /channel) for desktop. 
previously the video player could be played (Arga) 

V1.4.1 + **1834**

Bug Fixes:
* Fix error when calling /oauth/app-callback from mobile app. Previously if error then the web app will break, fix is changing the code to handle if return error then don't break but show error object (Irene)

	
**18/10/2019**

V1.5.0 + **1856** 

New Feature:
* Add clickable articles card on video detail page catalog (/epl, /movies, /kids and /sports) when user click it will redirect to articles details page both for mobile and desktop. Previously there was no clickable card articles. (Ferdy)

Improvements:
* Add placeholder when first time opening video detail page (/epl, /movies, /kids and /sport) on the video loading page both for desktop and mobile. Previously there was no placeholder. (Ayu)
* Keep utm_source when first time open video detail page (/watch and /channel) and click play the page will display download page (/download-app) for mobile only. Previous no utm-source redirect (Elkana) 
* Send Video ID (redirect-to-appstore/videoId or redirect-to-playstore/videoId for analityc) when first time click store badge download on app store / play store for mobile only. previously only redirect-to-appstore or redirect-to-playstore and videoId was not included. (Elkana)
* Update thumbnail images for og:image resolution to 600px because some thumbnail image is not show up when sharing on whatsapp (share /watch page) (Irene)
* Blocking all video player with switcher to remove blocker on video detail page (/watch and /channels) desktop only (Arga)
* Add new API url on config js (Sabiq)

Bug Fixes:
* Fix error when login calling oauth web and mobile. Previously if login error then the web app will break, fix is changing the code to handle error, and changes enpoint oauth2/v1/token (Sabiq)
* Update code on /oauth/app-callback, merged with sabiq new code (Irene)

**21/10/2019**

V1.5.0 + **1864** 

New Features:
* Enable live support and change new script salesforce for live chat support feature (Ferdy)
* Add the chat icon feature directly on the home page to start chatting with customer service agents. (Ferdy)


Improvements: 
* Add dns-prefetch and preconnect for third party domain (//mola01.koicdn.com, //res-mola01.koicdn.com, //cdn01.mola.tv, //cdn02.mola.tv, //bam.nr-data.net, //js-agent.newrelic.com) to improve page speed in every pages (Irene)
* Read error when calling header menu api and store in window.debugStore.headerMenu (Irene)
* Change url (change-url-live-cs) for live chat with costumer support Agent. (Ferdy)
* Change the path detection mechanism from window location. (Ferdy)


**22/10/2019**

V1.5.0 + **1867** 

Improvement:
* Change config api from external api to internal api (http://config.core.sstv.local) for header menu and app-params. Because on mola beta the external api call from server is blocked, so need to use internal api. Previously on beta the header menu and config app param is not shown. (Irene)

V1.5.0 + **1870** 

Improvement:
*  Add app_id=molatv to internal api call for header menu and app param (Irene)

V1.5.0 + **1873** 

Improvement:
* (Code improvement) Change variable name for config app param url so not overriding internal config url variable. (Irene)

V1.5.0 + **1876**

Improvement:
* Add toggle to enable/disable live chat support (from config param misty) for the live chat features (Ferdy)

V1.5.0 + **1879**

Improvement:
* Replace POST method to GET. For speed up in matches playlists with a set of query string (Aang)

V1.5.0 + **1882** 

Bug Fixes:
* Open a new tab if click on the home banner and the redirect link is an external link both for desktop and mobile (Elkana)
* Fix error class on home onboarding (user journey) for desktop only (Elkana)

**23/10/2019**

V1.5.0 + **1885**

Improvement:
* Add parameter &summary=1 for new batch playlist endpoint (Irene)


**28/10/2019**
	
V1.5.0 + **1892**

Disable Feature:
* Disable articles on video detail page (/epl, /movies, /kids and /sports) both for mobile and desktop (Ferdy)

**28/10/2019**

V1.5.1 + **1896**

Improvement:
* remove unnecessary attribute (description, short description, and streamsource) in Tayangan Langsung page (/matches) (Irene)

Bug Fix:
* remove crossOrigin attribute in google-analytic script. Previously get error 'Access to script at 'https://www.google-analytics.com/analytics.js' from origin 'https://mola.tv' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. (Irene)

**05/11/2019**

V1.6.0 + **1916**

New Features: 
* Add BCA subscription feature while access to /activate/bca/{voucher-code}. (Arga) 
* add tab subscription mola bca (Sabiq)

Improvements:

* Update Hit Timestamp from 12 hours to 24 hours format (for analityc) (Elkana)
* Remove GAP from the vertical league category filter list styling on video detail page (/matches) following data league for desktop only. Previous width = 800 no matter how much league data, GAP will widen when league data decreases. (Ayu)
* Update matches page (Tayangan Langsung) to use new endpoint for leagues list and respective match list both for desktop and mobile (Irene)
* Update styling league list filter (horizontal leagues) and arrow to be on center (Irene)
* Update the arrow size of the league list icon on video detail page (/matches) and it will appear for monitor and big tv. (Ayu)
* Simplify responsive arrow icon validation on video detail page (/matches) for monitor and big tv. (Ayu)

Bug Fixes:
* Fixing endpoint redeem bca voucher, fix is changing endpoints and add x-app-id then content-type (Sabiq)
* Fix endpoint user subscriptions, fix is changing endpoints and normalize data (Sabiq)
* Upload default image for club image (home team and away team's logo in Tayangan Langsung page) to beta and production. Currently only uploaded to staging. Only can be tested if home team or away team's logo is not found/error from api (Irene)
* Temporarily remove related videos section on not-found page (404 page) to prevent errors until api is available/known (Irene)

V1.6.0 + **1924** 

Improvements:
* Remove "status berlangganan" on profile, previously show "status berlangganan", fix is comment the code (Sabiq)
* Update Hit Timestamp from 12 hours to 24 hours format (for analityc) on video tracker (Elkana)

Bug Fxes:
* Fixing forgot password , previously if forgot password error the web will break, fix is changing the code to handle error (Sabiq)
* Fix styling forgot password, previously button on forgot pasword not show, fix is changes opacity (Sabiq)


**11/11/2019**

V1.7.0 + **1942**

Improvements:

* Add validation no match on video detail page (/matches) mobile only, if there is no match and will display "Tidak ada pertandingan" (Ayu)
* Hide tab subscritptions, when user doesn't have subscriptions package (Sabiq)

Bug Fixes:

* Fix error Cannot read property 'preventDefault' of undefined when click on Profile menu on mobile web menu (Irene)
* Fix styling reset password on desktop, previously button on reset pasword ('/accounts/resetPassword') not show, fix is changes opacity (Sabiq)

V1.7.0 + **1945**

Bug Fix:

* Fix error when share videopage on facebook not load image, title and description (Irene)

**14/11/2019**

V1.7.1 + **1946** 

Bug Fix:

* Fixing redirect on video detail page (/watch?v={videoId}), previously video detail page (/watch) was NotFound (Jaenal)

**18/11/2019**

V1.8.0 + **1955**

improvement:

* redesign ui profile web and mobile desk (Sabiq)

Bug fixes:

* Fix styling tab subscription (Sabiq)
* Changes mekanisme hide tab subscription using subscriptionId (Sabiq)

**21/11/2019**

V1.8.0  + **1962**

Improvements:

* Add react-markdown on description mobile and desktop web to read paragraph (Irene)
* Add Read Less button on description on mobile web (Irene)
* Add validation ismovie has content type vod on global util because now all video with content type = movie is changed to vod (Aang)
* Article server call use external call (changes on server.js) but right now article feature is disabled (Ferdy)
* Add margin to description mobile sport so not overlap with app/playstore logo (Irene)
* Update config.js add article_api_url F article server call use external call (changes on server.js) but right now article feature is disabled (Ferdy)

**25/11/2019** 

V1.8.0 + **1965**

Improvements:
* Add new login redemption page, when user want to redeem code and not login both for mobile and desktop web. (Sabiq)
* Changes activation code path, to mola.tv/p/code. (Sabiq)

V1.8.1 + **1966**

Improvement:
* Hotfix remove All on league filter on /matches, call api per league click (desktop and mobile web) and add /cache on this 2 endpoints
https://mola.tv/api/v2/videos/cache/playlists/league-list 
https://mola.tv/api/v2/videos/cache/playlists/league-list/matches (irene)

V1.8.1 + **1967**

Improvement:
* Update versioning to 1.8.1 on package.json (Irene)

V1.8.2 + **1971** 

Improvement:
* Update versioning to 1.8.2 on package.json (Irene)

Bug Fix:
* Fix redirect path to bca /p/code when users succes reedem code (Sabiq)

**28/11/2019**

V1.8.3 + **1992**

Improvement:
* add /get-app routes and tracker for analytics (Elkana)


**06/12/2019**

V1.8.3 + **1994**

Improvement:
* Add wording for BCA Promo (Karim)

V1.8.3 + **1996**

Improvement:
* Improved Display of BCA Promo (Trisno) 

**09/12/2019**

V.1.8.4 + **1997**

Improvement:
* Update new CI (Jaenal)

**10/12/2019**

V1.8.4 + **2006**

Improvements:
* Add BCA Promotion page (Arga)
* Add new banner link and redirect BCA (Arga)


**11/12/2019**

V.1.8.5 + **2016**

Improvements:
* Fix Playlist card consistent with placeholder (Jaenal)
* Fix styling suggestion and correction typo on term and conditions page for web view iphone devices only (Ayu)
* Add /get-app page for desktop (Elkana)
* Fix Deployment Script (Risal)
* Add validate promo BCA (Sabiq)


V.1.8.5 + **2017**

Improvement:
* Update CI (Rahadian)

**12/12/2019**

V1.8.5 + **2018**

Improvement:
* Update BCA Promo (bcaPromo.css) (Arga)

V1.8.6 + **2021**

Improvement:
* Hotfix build variable CDN (Jaenal)

**16/12/2019**

V1.8.6 + **2024**

Improvement:
* Add promo BCA menu (Elkana)

**18/12/2019**

*18/12/2019*

V1.8.6 + **2027** 

Improvement:
* Add BCA script tracker for google ads (Jaenal)

*19/12/2019*

V.1.8.6 + **2030** 

Improvement:
* HotFix carousel cellSpacing default value (Jaenal)

*03/01/2020*

V1.8.7 + **2035** 

Improvement
* Change text promo BCA from salin to Gunakan (Jaenal)

*14/01/2020*

V1.8.7 + **2037** 

Improvement:
* Update License key for newrelic (Jaenal)

V1.8.8 + **2040** 

Improvement:
* Hotfix Channels on video 404 must show blocker with plaformblocker enabled (Jaenal)

V1.8.8 + **2043** 

Improvement:
* Enable channel mobile platformblocker (Jaenal)

*27/01/2020*

V1.9.0 + **2095** 

Improvements:
* Update gitlab CI (Risal)
* Cleanup unused command in gitlab CI (Risal)
* Add Medium and Campaign for deeplink (Elkana)

*28/01/2020*

V1.9.0 + **2096** 

Improvement:
* Reorder header menu from API (Elkana)

V1.9.0 + **2097** 

Improvements:
* Fix date picker on register (Sabiq)
* update gitlab CI (Risal)
* Cleanup unused command in gitlab CI (Risal)

*03/02/2020*

V1.9.0 + **2115**

Improvement:
* Remove Webpack dashboard and promo BCA logic script (Jaenal)

*07/02/2020*

V1.10.0 + **2145** 
Improvement:
* Add component Mola Original (Jaenal)
* Change endpoints recomendation, For movie or match recommendation display (Ayu)
* Styling placeholders on a loading match page (Ayu)


Bug Fix: 
* Fix Bug jumpto video detail page matches, previously cannot scrolled base on date picker (Ayu)

V1.10.0 + **2147** 

Improvement
* Add component Mola Original (Jaenal)
* Add feature promo page and redesign on playlist card (Elkana)

V.10.0 + **2148** 

Improvements:
* Change new header on homepage (Ayu)
* Update visbility for help button mobile view (Ayu)

V1.10.0 + **2149** 

Improvements
* Fix new mola logo 44px (Jaenal)
* Styling feature promo page and playlist card (Elkana)

*10/02/2020*

V1.10.0 + **2157** 

Improvements:
* Recommit Banner square for branch develop #104 (Aang)
* Home mobile change to feature. recommit #103 (Aang)
* recommit mobile navigation bar #102 (Aang)
* Add more screen #105 (Aang)
* Add Clickable content in more pages #105 (Aang)
* Banner square modify with configparams #105 (Aang)
* Hot fix to ignore fetchprofile #105 (Aang)
* page more revision #105 (Aang)
* move placeholder to component #103 (Aang)
* Resolve conflict (Aang)
* remove temporary comment feature.js placeholder (jaenal)
* Add feature mola checkout (sabiq)
* Enabled subs by config params and changes behaviour view profile on mobile view (sabiq)
* Fix icon on more mobile web (Sabiq)


Bug Fix:
* fixing bug dowmloaded apps and user profile #105 (Aang)

V1.10.0 + **2162** 

Improvement:
* Hotfix wording on more page mobile (Sabiq)

V1.10.0 + **2162** 

Improvement:
* Add platform blocker with api gg tq (Sabiq)

*11/02/2020*

V1.10.0 + **2168** 

Improvements:
* Add Checkout detail (Septian) 

*12/02/2020*

V1.10.0 + **2168** 

Improvements:
* Hot fix banner add padding in banner (Aang) 
* Fix mola ori styles and change font to public sans (Jaenal)
* HotFix card and promo style (Elkana)
* Hotfix Add checkout MCBill (Septian)

*13/02/2020*

V1.10.0 + **2174** 

Improvements:
* Hotfix Add Loading on checkout, Open new tab on link to bca website (Septian)
* Hotfix Add icon loading co and fix styling subslist (Sabiq)
* HotFix tooltip and handler payment ve id (Fujianto)

*14/02/2020*

V1.11.0 + **2177** 

Improvement:
* Update New relic (Jaenal)

*17/02/2020*

V1.11.0 + **2187** 

Improvement:
* Add new flow subscribe for non login users, Show subscribe menu on mobile (Fujianto)

V1.11.0 + **2187** 

Improvement:
* Fix redirect_uri on subscriptionList (Jaenal)

V1.11.0 + **2194** 

Improvement:
* Set new relic to prod (Jaenal)

V1.11.0 + **2195** 

Improvement:
* Add redirect_uri on client side login.js (Jaenal)

V1.11.0 + **2195** 

Improvement:
* Validate redirect_url param (Jaenal)

V1.11.0 + **2199**

Improvement:
* Wrong lifecycle (Jaenal)

*18/02/2020*

V1.11.0 + **2200** 
Improvement:
* Fix cookie on client side to 60s (Jaenal)

V1.11.0 + **2201** 

Improvement:
* Hotfix button back no package and hide subscription by config params on tab more (Sabiq)

*19/02/2020*

V1.11.0 + **2202** 

Improvement:
* Hotfix wording checkout (Sabiq)

V1.11.0 + **2203** 

Improvement:
* Hotfix more with id 1 (Jaenal)

V1.11.0 + **2204** 

Improvement:
* Change config param and header menu cache to 1 min (Jaenal)

*21/02/2020*

V1.11.0 + **2210** 

Improvement:
* Hotfix color bg payment (Sabiq)

*27/02/2020*

V1.11.0 + **2231** 

Improvement: 
* read query string no header for live support (Trisno)
* Change subscription redux account api user (Ayu)
* Consume config param for page more (Aang)
* Create home featured no potrait image based n contentype playlist (Aang)
* * Add details page on video card (Elkana)
* Styling videocard feature heigt into 19rem (Elkana)
* Add more height to videocard on movies (Elkana)
* Matches dropdown change to scroller “this solves #113 #107 #106” (Naufal) 
* Channels dropdown change to scroller “this solves #113 #107 #106” (Naufal) 
* Add new flow subscriptions and new design subscriptions (jaenal)
* Add link not found when clicked banner without data (Cecep)
* fix debagging placeholder banner on EPL (Cecep)
* Resolve error and add price unit (Jaenal)
* Styling "Syarat ketentuan" in user subscriptions (Jaenal)
* onHandleBanner set into on and cache server set 60 sec. (Jaenal)

Bug Fix:
* Fix error invalid host account api user (Bug Fix)
* Fixing bug wrong filtered id for get redux banner (Bug Fix)



*28/03/2020*

V1.11.0 + **2232** 

Improvement:
* Add platform api on server side (Jaenal)

V1.11.0 + **2234** 

Improvement:
* Hotfix wording bayar (Sabiq)

V1.11.0 + **2235** 

Improvement:
* Move Pubsub to configParam and enable live support on all pages (Jaenal)

V1.11.0 + **2236** 

Improvement:
* Add checkbox on payment page (Sabiq)

*29/02/2020*

V1.11.0 + **2237** 

Improvement:
* Remove live support visibility hidden (Jaenal)

*03/03/2020*

V1.11.0 + **2238** 

Improvement: 
* Comment and remove all live support visibility hidden (Improvement)


