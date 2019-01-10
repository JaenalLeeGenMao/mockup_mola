class AdBanner {
  constructor({
    player,
    ipaRequestUrl,
    araRequestUrl,
    ipaEnabled = true,
    ipaDuration = 30,
    ipaVisibility = true,
    ipaNoAdsTime = 30,
    closable = true,
    skipOffset = 0,
    ipaTimeOffset = 0,
    araRefreshTime = 60,
    araResume = true,
    araEnabled = false,
    resizeBannerAndCBarEnabled = true,
  }) {
    // constructor props
    this.player = player
    this.ipaRequestUrl = ipaRequestUrl
    this.araRequestUrl = araRequestUrl
    this.ipaEnabled = ipaEnabled
    this.araEnabled = araEnabled
    this.visibility = ipaVisibility
    this.closable = closable
    this.ipaDuration = typeof ipaDuration === 'number' ? ipaDuration : this.hmsToSecondsOnly(ipaDuration) || 0
    this.skipOffset = typeof skipOffset === 'number' ? skipOffset : this.hmsToSecondsOnly(skipOffset) || 0
    this.ipaTimeOffset = typeof ipaTimeOffset === 'number' ? ipaTimeOffset : this.hmsToSecondsOnly(ipaTimeOffset) || 0
    this.ipaNoAdsTime = typeof ipaNoAdsTime === 'number' ? ipaNoAdsTime : this.hmsToSecondsOnly(ipaNoAdsTime) || 30
    this.araRefreshTime = typeof araRefreshTime === 'number' ? araRefreshTime : this.hmsToSecondsOnly(araRefreshTime) || 60
    this.araResume = araResume
    this.resizeBannerAndCBarEnabled = resizeBannerAndCBarEnabled

    // IPA banner dimension
    this.BANNER_ASPECT_WIDTH = 377
    this.BANNER_ASPECT_HEIGHT = 30
    this.VIDEO_ASPECT_WIDTH = 16
    this.VIDEO_ASPECT_HEIGHT = 9

    // sources
    this.currentAd = {}
    this.araAdsFromServer = []

    // timers
    this.globalTime = 0
    this.timeOffsetTimer = null
    this.rotationTimer = null
    this.araRequestTimer = null
    this.noIpaAdsTimer = null

    // api helpers
    this.ipaAdPlaying = false
    this.araListener = false
    this.setSkipOffsetIfClosable = this.closable ? this.skipOffset : 0
    this.currenAraAdIndex = 0
    this.isThisAdAlredySheduled = null

    // ui helpers
    this.playerControls = {}
    this.ipaStyleAttached = false
    this.closeElement = null
    this.resetControls = false

    // custom event listener functions: "adchange"
    this.listeners = new Map()

    // global binded functions used in even listeners
    this.sheduleAfterFirstStreamLoad = function() {
      // method thats fires up the shedule after first play after the class instance was created
      if (!this.streamListener) {
        this.streamListener = true
        this.ipaRequest()
        this.araRequest()
      } else {
        return
      }
    }.bind(this)

    this.onAraAdStart = function() {
      // method for skipping forward the stream after the ad ends if the resume property is set to true

      this.resetControls = true
      this.unloadBanner()

      let resumeTime = 0

      let resumeTimer = setInterval(() => {
        resumeTime += 0.25
      }, 250)

      let onAraAdEnd = function() {
        this.currenAraAdIndex += 1

        if (this.currenAraAdIndex === this.araAdsFromServer.length) {
          this.currenAraAdIndex = 0
          clearTimeout(this.araRequestTimer)
          this.araRequest()
        }

        this.player.ads.removeEventListener('adbreakend', onAraAdEnd)
        this.ipaRequest()

        if (this.araResume) {
          clearInterval(resumeTimer)
          this.player.currentTime += resumeTime
        }
      }.bind(this)

      this.player.ads.addEventListener('adbreakend', onAraAdEnd)
    }.bind(this)
  }

  init() {
    this.player.addEventListener('timeupdate', this.sheduleAfterFirstStreamLoad)
    //if (!this.streamListener) {
    //    this.player.addEventListener('timeupdate', this.sheduleAfterFirstStreamLoad);
    //} else {
    //    this.ipaRequest();
    //    this.araRequest();
    //}
  }

  ipaRequest() {
    if (this.ipaEnabled && this.ipaRequestUrl) {
      let xhttp = new XMLHttpRequest()
      clearTimeout(this.noIpaAdsTimer)
      this.isThisAdAlredySheduled = false

      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          const response = JSON.parse(xhttp.responseText)
          const ads = response.data.data
          let imgURL, clickthroughURL, id

          if (ads.length <= 0) {
            this.resetControls = true
            this.resetControlsPosition()
            this.noIpaAdsTimer = setTimeout(() => {
              this.ipaRequest()
            }, this.ipaNoAdsTime * 1000)
          }

          ads.forEach(responseAd => {
            imgURL = responseAd.mediaURL
            clickthroughURL = responseAd.link
            id = responseAd.id

            this.initIpa(imgURL, clickthroughURL, id)

            let detailsObj = {
              details: {
                id: id,
                mediaImg: imgURL,
                clickTarget: clickthroughURL,
                requestUrl: this.requestUrl,
                globalTime: this.globalTime,
              },
            }

            this.dispatchCustomEvent('adchange', detailsObj)

            if (window.webkit) {
              //message for iOS
              window.webkit.messageHandlers.adchange.postMessage(detailsObj)
            }

            if (typeof theoplayerAndroid !== 'undefined') {
              //message for android
              theoplayerAndroid.sendMessage('adchange', JSON.stringify(detailsObj))
            }
          })
          this.closeElement = null
          this.resetControls = false
        }
      }.bind(this)

      xhttp.onerror = function() {
        console.log('An ad error has occured. Please check whether an ad blocker is active.')
      }
      xhttp.open('GET', this.ipaRequestUrl, true)
      xhttp.send()
    }
  }

  araRequest() {
    if (this.araEnabled && this.araRequestUrl) {
      this.araRequestTimer = setTimeout(() => {
        this.araAdsFromServer = []

        //ARA REQUEST
        let araXhttp = new XMLHttpRequest()
        araXhttp.onreadystatechange = function() {
          if (araXhttp.readyState === 4 && araXhttp.status === 200) {
            const response = JSON.parse(araXhttp.responseText)
            const ads = response.data

            this.araAdsFromServer = ads.data[0].ads

            this.dispatchCustomEvent('adchange', this.araAdsFromServer)

            if (window.webkit) {
              //message for iOS
              window.webkit.messageHandlers.adchange.postMessage(this.araAdsFromServer)
            }

            if (typeof theoplayerAndroid !== 'undefined') {
              //message for android
              theoplayerAndroid.sendMessage('adchange', JSON.stringify(this.araAdsFromServer))
            }

            if (this.araAdsFromServer.length === 0) {
              this.araRequest()
            } else {
              this.initARA()
            }
          }
        }.bind(this)
        araXhttp.onerror = function() {
          console.log('An ad error has occured. Please check whether an ad blocker is active.')
        }
        araXhttp.open('GET', this.araRequestUrl, true)
        araXhttp.send()
      }, this.araRefreshTime * 1000)
    }
  }

  initARA() {
    // sheduling ARA ads

    this.araAdsFromServer.forEach(ad => {
      let adTimeOffsetScheduleValue

      if (typeof ad.timeOffset === 'number') {
        adTimeOffsetScheduleValue = ad.timeOffset + this.player.currentTime
      } else {
        let timeOffsetInSeconds = this.hmsToSecondsOnly(ad.timeOffset)
        adTimeOffsetScheduleValue = timeOffsetInSeconds ? timeOffsetInSeconds + this.player.currentTime : ad.timeOffset
      }
      this.player.ads.schedule({ sources: ad.adTag, timeOffset: adTimeOffsetScheduleValue, skipOffset: this.closable ? this.setSkipOffsetIfClosable : -1 })
    })
    if (!this.araListener) {
      this.araListener = true
      this.player.ads.addEventListener('adbreakbegin', this.onAraAdStart)
    }
    this.setRotation()
  }

  initIpa(imgUrl, clickthroughUrl, id) {
    //  console.log('initIpa at', this.globalTime, ' id ', id);
    const vastTemplate = `<?xml version="1.0" encoding="UTF-8"?>
                <VAST xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="vast.xsd" version="3.0">
                 <Ad>
                  <InLine>
                   <AdSystem>GDFP</AdSystem>
                   <AdTitle>THEOplayer NonLinearImage</AdTitle>
                   <Description><![CDATA[External NCA1C1L1 NonLinearImage ad]]></Description>
                   <Creatives>
                    <Creative id="${id}">
                     <NonLinearAds width="125" height="125">
                      <NonLinear id="GDFP" width="480" height="70" minSuggestedDuration="00:00:20" scalable="true" maintainAspectRatio="true">
                        <NonLinearClickThrough><![CDATA[${clickthroughUrl}]]></NonLinearClickThrough>
                       <StaticResource creativeType="image/png"><![CDATA[${imgUrl}]]></StaticResource>
                      </NonLinear>
                     </NonLinearAds>
                    </Creative>
                   </Creatives>
                  </InLine>
                 </Ad>
                </VAST>`

    const blob = new Blob([vastTemplate], { type: 'application/octet-stream' }) // pass a useful mime type here
    const url = URL.createObjectURL(blob)

    this.player.ads.scheduledAdBreaks.forEach(ad => {
      ad.ads.forEach(sheduledAd => {
        if (sheduledAd.id && sheduledAd.id.toString() === id.toString()) {
          this.isThisAdAlredySheduled = true
        }
      })
    })

    //this.player.ads.schedule({ sources: url, skipOffset: this.setSkipOffsetIfClosable });

    if (!this.isThisAdAlredySheduled) {
      this.player.ads.schedule({ sources: url, skipOffset: this.setSkipOffsetIfClosable })
    }

    this.isThisAdAlredySheduled = false

    const wrapper = this.player.element.parentNode
    const playerContainer = wrapper.parentElement
    const bannerContainer = wrapper.querySelector('.theoplayer-ad-nonlinear')
    const controlBar = wrapper.querySelector('.vjs-control-bar')

    let dimensionChangeListener
    if (this.resizeBannerAndCBarEnabled) {
      this.resizeBannerAndControlBar.bind(this, playerContainer, wrapper, bannerContainer, controlBar)
    }
    let presentationModeChangeListener = this.updateWrapperHeight.bind(this, wrapper)

    if (this.playerControls && this.playerControls.bannerContainer && this.visibility) {
      this.initialiseBanner(playerContainer, wrapper, bannerContainer, controlBar, dimensionChangeListener, presentationModeChangeListener)
    }

    let initializeBannerOnce = function(event) {
      if (event.ad.type === 'nonlinear' && event.ad.clickThrough === clickthroughUrl && !this.ipaAdPlaying) {
        //  console.log('initializeBannerOnce at', this.globalTime);
        this.playerControls = {
          playerContainer: playerContainer,
          wrapper: wrapper,
          controlBar: controlBar,
          dimensionChangeListener: dimensionChangeListener,
          presentationModeChangeListener: presentationModeChangeListener,
          bannerContainer: bannerContainer,
        }

        this.currentAd = {
          id: id,
          currentTime: 0,
          clickThrough: event.ad.clickThrough,
          type: event.ad.type,
        }

        this.player.ads.removeEventListener('adbegin', initializeBannerOnce)
        this.ipaAdPlaying = true

        if (this.playerControls.bannerContainer && this.visibility) {
          this.initialiseBanner(playerContainer, wrapper, bannerContainer, controlBar, dimensionChangeListener, presentationModeChangeListener)
          this.playerControls.bannerContainer.style.display = 'block'
        } else {
          this.playerControls.bannerContainer.style.display = 'none'
        }

        this.setCloseButton()
        this.setRotation()
      }
    }.bind(this)

    this.player.ads.addEventListener('adbegin', initializeBannerOnce)

    let unloadBannerOnce = function(event) {
      this.ipaAdPlaying = false
      if (event.ad.type === 'nonlinear' && event.ad.clickThrough === clickthroughUrl) {
        this.skipped = true
        this.player.ads.removeEventListener('adskip', unloadBannerOnce)
        this.unloadBanner()
      }
    }.bind(this)

    this.player.ads.addEventListener('adskip', unloadBannerOnce)
  }

  initialiseBanner(playerContainer, wrapper, bannerContainer, controlBar, dimensionChangeListener, presentationModeChangeListener) {
    this.changeDOM(playerContainer, wrapper, bannerContainer, controlBar)
    this.player.presentation.addEventListener('presentationmodechange', presentationModeChangeListener)
    this.player.addEventListener('dimensionchange', dimensionChangeListener)
  }

  unloadBanner() {
    this.player.presentation.removeEventListener('presentationmodechange', this.playerControls.presentationModeChangeListener)
    this.player.removeEventListener('dimensionchange', this.loadedAddimensionChangeListener)
    this.resetControlsPosition()
  }

  changeDOM(playerContainer, wrapper, bannerContainer, controlBar) {
    this.reAttachBannerContainerToWrapper(wrapper, bannerContainer)

    this.updateBannerContainerSizeAndPosition(bannerContainer)
    this.setWidthAndHeightOfAllChildrenTo100PercentIfNotAnAdCloseButton(bannerContainer)

    controlBar.style.width = 'initial'

    this.updateWrapperHeight(wrapper)
    if (this.resizeBannerAndCBarEnabled) {
      this.resizeBannerAndControlBar(playerContainer, wrapper, bannerContainer, controlBar)
    }
  }

  updateBannerContainerSizeAndPosition(bannerContainer) {
    bannerContainer.style.width = ''
    bannerContainer.style.zIndex = ''
    bannerContainer.style.left = ''
    bannerContainer.style.right = ''
    const bannerHeightPercentage = this.BANNER_ASPECT_HEIGHT * this.VIDEO_ASPECT_WIDTH / (this.VIDEO_ASPECT_HEIGHT * this.BANNER_ASPECT_WIDTH) * 100
    bannerContainer.style.height = bannerHeightPercentage + '%'
    bannerContainer.setAttribute('style', bannerContainer.getAttribute('style') + ';bottom:-' + bannerHeightPercentage + '% !important') // cannot just override important
  }

  setWidthAndHeightOfAllChildrenTo100PercentIfNotAnAdCloseButton(container) {
    if (container && !this.ipaStyleAttached) {
      this.ipaStyleAttached = true
      let styleValue =
        '.theoplayer-ad-nonlinear-content {position:relaive; width:100%; height:100%} .theoplayer-ad-nonlinear-content a {display:block; width:100%; height:100%} .theoplayer-ad-nonlinear-content a img {display:block; width:100%; height:100%}'

      let style = document.createElement('STYLE')
      style.type = 'text/css'
      style.appendChild(document.createTextNode(styleValue))
      document.head.appendChild(style)
    }
  }

  updateWrapperHeight(wrapper) {
    wrapper.style.bottom = this.BANNER_ASPECT_HEIGHT * this.VIDEO_ASPECT_WIDTH / (this.BANNER_ASPECT_HEIGHT * this.VIDEO_ASPECT_WIDTH + this.VIDEO_ASPECT_HEIGHT * this.BANNER_ASPECT_WIDTH) * 100 + '%'
  }

  resizeBannerAndControlBar(playerContainer, wrapper, bannerContainer, controlBar) {
    const containerWidth = playerContainer.offsetWidth
    const containerHeight = playerContainer.offsetHeight
    const ratioOfVideoAndBannerWidth = this.BANNER_ASPECT_WIDTH * this.VIDEO_ASPECT_WIDTH
    const ratioOfVideoAndBannerHeight = this.BANNER_ASPECT_HEIGHT * this.VIDEO_ASPECT_WIDTH + this.VIDEO_ASPECT_HEIGHT * this.BANNER_ASPECT_WIDTH

    let hasBlackBarsOnSide = ratioOfVideoAndBannerHeight * containerWidth / (ratioOfVideoAndBannerWidth * containerHeight) > 1

    let margin = 0

    if (hasBlackBarsOnSide) {
      margin = Math.floor((wrapper.offsetWidth - Math.min(wrapper.offsetHeight * this.VIDEO_ASPECT_WIDTH / this.VIDEO_ASPECT_HEIGHT, wrapper.offsetWidth)) / 2)
      margin += 'px'
    }

    bannerContainer.style.right = bannerContainer.style.left = controlBar.style.right = controlBar.style.left = margin
  }

  reAttachBannerContainerToWrapper(wrapper, bannerContainer) {
    wrapper.appendChild(bannerContainer)
  }

  resetControlsPosition() {
    if (this.playerControls.controlBar && this.resetControls) {
      this.playerControls.controlBar.style.width = ''
      this.playerControls.controlBar.style.right = ''
      this.playerControls.controlBar.style.left = ''
      this.playerControls.wrapper.style.bottom = ''
    }
  }

  setCloseButton() {
    if (this.player) {
      setTimeout(() => {
        if (!this.closable && this.playerControls.wrapper) {
          this.playerControls.bannerContentContainer = this.playerControls.wrapper.querySelector('.theoplayer-ad-nonlinear-content')
          this.closeElement = this.playerControls.bannerContentContainer.querySelector('.theoplayer-ad-nonlinear-close')
          this.closeElement.remove()
        } else if (this.playerControls.bannerContentContainer && this.closeElement) {
          this.playerControls.bannerContentContainer.appendChild(this.closeElement)
        }
      }, 10)
    }
  }

  setRotation() {
    if (!this.rotationTimer) {
      this.rotationTimer = setInterval(() => {
        this.globalTime += 0.25
        this.currentAd.currentTime += 0.25

        if (!this.closeElement) {
          if (!this.playerControls.bannerContentContainer && this.playerControls.wrapper) {
            this.playerControls.bannerContentContainer = this.playerControls.wrapper.querySelector('.theoplayer-ad-nonlinear-content')
          } else if (this.playerControls.bannerContentContainer) {
            this.closeElement = this.playerControls.bannerContentContainer.querySelector('.theoplayer-ad-nonlinear-close')
          }

          if (this.closeElement) {
            let events = ['mouseup', 'touchend']
            events.forEach(
              function(e) {
                this.closeElement.addEventListener(
                  e,
                  function() {
                    this.resetControls = true
                    this.resetControlsPosition()
                  }.bind(this)
                )
              }.bind(this)
            )
          }
        }

        //console.log('current time', this.currentAd.currentTime);
        if (!this.player.ads.playing) {
          if (this.skipOffset > 0 && this.ipaDuration > 0) {
            if (this.ipaDuration >= this.skipOffset && this.currentAd.currentTime >= this.ipaDuration) {
              this.rotationChange()
            } else if (this.ipaDuration <= this.skipOffset && this.currentAd.currentTime >= this.skipOffset) {
              this.rotationChange()
            }
          } else if (this.ipaDuration > 0 && this.currentAd.currentTime >= this.ipaDuration) {
            this.rotationChange()
          }
        }
      }, 250)
    }
  }

  rotationChange() {
    this.currentAd.currentTime = 0
    if (this.ipaTimeOffset > 0) {
      this.resetControls = true
      this.player.ads.skip()
      this.timeOffsetTimer = setTimeout(() => {
        this.ipaRequest()
      }, this.ipaTimeOffset * 1000)
    } else {
      this.player.ads.skip()
      this.ipaRequest()
    }
  }

  close() {
    if (this.closable) {
      this.resetControls = true
      this.player.ads.skip()
    }
  }

  //enableClosing() {
  //    if (!this.closable) {
  //        this.closable = true;
  //    }
  //    this.setCloseButton();
  //}

  //disableClosing() {
  //    if (this.closable) {
  //        this.closable = false;
  //    }
  //    this.setCloseButton();
  //}

  showIpa() {
    this.visibility = true
    if (this.ipaAdPlaying) {
      this.playerControls.bannerContainer.style.display = 'block'
      this.changeDOM(this.playerControls.playerContainer, this.playerControls.wrapper, this.playerControls.bannerContainer, this.playerControls.controlBar)
    }
  }

  hideIpa() {
    this.visibility = false
    if (this.ipaAdPlaying) {
      this.playerControls.bannerContainer.style.display = 'none'
      this.resetControls = true
      this.resetControlsPosition()
    }
  }

  destroy() {
    if (!this.ipaAdPlaying) {
      this.eraseData()
    } else if (this.skipOffset > 0) {
      if (this.currentAd.currentTime < this.skipOffset) {
        let destroyTimer = setInterval(
          function() {
            if (this.currentAd.currentTime > this.skipOffset) {
              this.eraseData()
              clearInterval(destroyTimer)
            }
          }.bind(this),
          250
        )
      } else {
        this.eraseData()
      }
    } else {
      this.eraseData()
    }
  }

  eraseData() {
    clearTimeout(this.timeOffsetTimer)
    this.timeOffsetTimer = null

    clearTimeout(this.araRequestTimer)
    this.araRequestTimer = null

    clearTimeout(this.noIpaAdsTimer)
    this.noIpaAdsTimer = null

    clearInterval(this.rotationTimer)
    this.rotationTimer = null

    this.player.removeEventListener('timeupdate', this.sheduleAfterFirstStreamLoad)
    this.player.ads.removeEventListener('adbreakbegin', this.onAraAdStart)

    this.resetControls = true
    this.player.ads.skip()
    this.unloadBanner()
    this.araAdsFromServer = []
    this.araListener = false
    this.currentAd = null
  }

  //helpers

  hmsToSecondsOnly(str) {
    let p = str.split(':'),
      s = 0,
      m = 1

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10)
      m *= 60
    }

    return s
  }

  isFunction(obj) {
    return typeof obj === 'function' || false
  }

  addEventListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }

  removeEventListener(label, callback) {
    let listeners = this.listeners.get(label),
      index

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return this.isFunction(listener) && listener === callback ? (i = index) : i
      }, -1)

      if (index > -1) {
        listeners.splice(index, 1)
        this.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }

  dispatchCustomEvent(label, ...args) {
    let listeners = this.listeners.get(label)

    if (listeners && listeners.length) {
      listeners.forEach(listener => {
        listener(...args)
      })
      return true
    }
    return false
  }
}

function mobileAdInit({ player, ipaRequestUrl, araRequestUrl, ipaEnabled, araEnabled, ipaDuration, ipaVisibility, ipaTimeOffset, araRefreshTime, araResume, closable, skipOffset }) {
  mobileAdApi = new AdBanner({ player, ipaRequestUrl, araRequestUrl, ipaEnabled, araEnabled, ipaDuration, ipaVisibility, ipaTimeOffset, araRefreshTime, araResume, closable, skipOffset })
  mobileAdApi.init()
}

function mobileAdDestroy() {
  mobileAdApi.destroy()
  mobileAdApi = null
}

function mobileAdClose() {
  mobileAdApi.close()
}

function mobileAdShowIpa() {
  mobileAdApi.showIpa()
}

function mobileAdHideIpa() {
  mobileAdApi.hideIpa()
}

export default AdBanner
