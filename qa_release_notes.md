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
