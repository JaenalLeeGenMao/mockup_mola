import styled, { css } from 'react-emotion'

export const Arrow = styled('div')`
   {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 2%;
    left: 2%;
    opacity: ${props => (props.isShow ? '0.5' : '0')};
    border: 3px solid white;
    padding: 10px;
    cursor: pointer;
    transition: opacity 200ms;

    img {
      width: 100%;
    }
  }
`

export const videoPlayer = css`
   {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    position: relative;

    &.theoplayer-skin:hover .vjs-big-play-button,
    &.theoplayer-skin .vjs-big-play-button:focus {
      background: none;
    }

    .theo-primary-color {
      color: #df0024 !important;
    }

    .vjs-selected {
      color: #df0024 !important;
    }

    .vjs-big-play-button {
      width: 6% !important;
      display: block;
    }

    .vjs-big-play-button:after {
      margin-top: 117% !important;
      height: 30% !important;
    }

    .theo-primary-background {
      color: #fff !important;
      background-color: #df0024 !important;
    }

    @media only screen and (max-width: 600px) {
      .vjs-big-play-button {
        width: 13% !important;
      }
    }
  }
`

export const arrowIcon = css`
   {
    background-image: url('data:image/svg+xml;base64,PCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluICAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiCiAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIKICAgICB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxcHgiIGhlaWdodD0iNTFweCIgdmlld0JveD0iMCAwIDUxIDUxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MSA1MTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZGVmcz4KPC9kZWZzPgo8aW1hZ2Ugc3R5bGU9Im92ZXJmbG93OnZpc2libGU7IiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRE1BQUFBekNBWUFBQUE2b1RBcUFBQUFBWE5TUjBJQXJzNGM2UUFBQVExSlJFRlVhQVh0Cm1URU93akFNUlN0R1pzUUZ1QUVuN0JYWk9RQXpGd2hPaFpjSTFCL1prZXYyUjRxeU9OOTUvNmNkMm1rS0hxV1V1YzdnWTlqYmYwRmsKV1VaZUlEbCtUYVFkK1lDRTRCZUlndVVCV2dHcFFBK1paL3NsSHF3QWdsd0dIOE11VHhDN2g3NEtUTVRYVDdzYUU3Rjc2S3ZBUkh6OQp0S3N4RWJ1SHZncE14TmRQdXhvVHNYdm9xM0NrUko0Q2UvVzFiNEFha01oTGFtNERXdnRLQWlCdnFibjdkdTFYTy9WdjJjRU9JSjBjCjEweXpBSUJ5dkFBNmdPcW5vdTEvWVNHUU9yRDFGWGlHZU9WQ1EyUkNvZllEelprUVlGSm9DUk1LdFI5b3pvUUFrMEpMbUZDby9VRHoKb3lhMC9WL25HdDVLUXJQV3BWbi9BT1VEVWNjYm9Md2dEVkIrRUFYaXVuY0hQdDVZYkI3aHhsWDFBQUFBQUVsRlRrU3VRbUNDIj4KPC9pbWFnZT4KPC9zdmc+');
    background-repeat: no-repeat;
    display: block;
    label: arrowicon;
    width: 22px;
    height: 22px;
    background-size: contain;
  }
`

export const AudioButton = styled('div')`
   {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 2%;
    right: 2%;
    border: 3px solid white;
    padding: 10px;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    img {
      width: 100%;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`

export const audioIcon = css`
   {
    background-image: url('data:image/svg+xml;base64,PCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluICAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiCiAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIKICAgICB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxcHgiIGhlaWdodD0iNTFweCIgdmlld0JveD0iMCAwIDUxIDUxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MSA1MTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZGVmcz4KPC9kZWZzPgo8aW1hZ2Ugc3R5bGU9Im92ZXJmbG93OnZpc2libGU7IiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRE1BQUFBekNBWUFBQUE2b1RBcUFBQUFBWE5TUjBJQXJzNGM2UUFBQVExSlJFRlVhQVh0Cm1URU93akFNUlN0R1pzUUZ1QUVuN0JYWk9RQXpGd2hPaFpjSTFCL1prZXYyUjRxeU9OOTUvNmNkMm1rS0hxV1V1YzdnWTlqYmYwRmsKV1VaZUlEbCtUYVFkK1lDRTRCZUlndVVCV2dHcFFBK1paL3NsSHF3QWdsd0dIOE11VHhDN2g3NEtUTVRYVDdzYUU3Rjc2S3ZBUkh6OQp0S3N4RWJ1SHZncE14TmRQdXhvVHNYdm9xM0NrUko0Q2UvVzFiNEFha01oTGFtNERXdnRLQWlCdnFibjdkdTFYTy9WdjJjRU9JSjBjCjEweXpBSUJ5dkFBNmdPcW5vdTEvWVNHUU9yRDFGWGlHZU9WQ1EyUkNvZllEelprUVlGSm9DUk1LdFI5b3pvUUFrMEpMbUZDby9VRHoKb3lhMC9WL25HdDVLUXJQV3BWbi9BT1VEVWNjYm9Md2dEVkIrRUFYaXVuY0hQdDVZYkI3aHhsWDFBQUFBQUVsRlRrU3VRbUNDIj4KPC9pbWFnZT4KPC9zdmc+');
    background-repeat: no-repeat;
    display: block;
    label: arrowicon;
    width: 22px;
    height: 22px;
    background-size: contain;
  }
`
