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
