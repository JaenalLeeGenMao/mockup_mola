## DEV Release Notes

Format note:

```
-> <Major>.<Minor>.<Patch> + (#BUILD_FROM_PIPELINE) (Author - Date(DD/MM/YYY))
```

### Version

* 1.1.0 + #10671 (Jaenal - 19/09/2019)

  * Improvements:

    * fix title shown on video with event DOMSubtreeModified, now title is responsive according to video controller and analytics behaviour changed to the default(now working correctly)

- 1.1.0 + **1234** (Irene - 17/09/2019)

  * New Feature:

    * Add Pay button on Transaction History table. After click button will show dialog.
    * CRUD company manager
    * CRUD regional agents
    * Create List, edit nobar_order (-) (Nurhadi) [Molalivearena Backoffice]
    * Add feature Approve/Reject Order nobar_order
    * CRUD nobar_subscription
    * CRUD venue manager
    * Change Dashboard analytic view used apex-chart
    * New Menu: Pages with the childs is overview, videos and path.
    * New Menu: Audience with the childs is overview, location and technology.
    * Custom Query for Analytic

  * Bug Fixes:

    * Fix topup status message
    * Fix css style button top up payment in Firefox
    * Fix label input nobar_subscription
    * Handle total realtime get the null value

  * Improvements:

    * Hide form company in account for user member
    * New css styling pay button transaction history
    * Remove all file compile of marko (\*.marko.js)
