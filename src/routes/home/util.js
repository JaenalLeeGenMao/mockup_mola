export const oddOrEven = num => num % 2 === 0 ? 'even' : 'odd';

/**
 * event types
 * @param fc => fast click
 * @param swl => swipe left
 * @param swr => swipe right
 * @param swu => swipe up
 * @param swd => swipe down
 */
export const swipeGestureListener = () =>{
  return (d =>{
    let ce= (e,n) => {
        let a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false
      },
      nm=true,sp={ x:0,y:0 },ep={ x:0,y:0 },
      touch={
        touchstart: e => {
          sp={ x:e.touches[0].pageX,y:e.touches[0].pageY }
        },
        touchmove: e => {
          nm=false;ep={ x:e.touches[0].pageX,y:e.touches[0].pageY }
        },
        touchend: e => {
          if(nm){
            ce(e,'fc')
          }else{
            let x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){
              ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))
            }
          };nm=true
        },
        touchcancel: e => {
          nm=false
        }
      };
    for(let a in touch){
      d.addEventListener(a, touch[a], false);
    }
  })(document);
  /** EXAMPLE OF USE ~ MUST ONLY CALLED ONCE ON componentDidMount() ~ e.g nano ~src/routes/home/mobile/home.js
     * window.onload = swipeGestureListener();
     * const handleSwipeEvent = e => {
     *     console.log(e.type,e)
     * };
     *
     * document.body.addEventListener('fc', handleSwipeEvent, false);// 0-50ms vs 500ms with normal click
     * document.body.addEventListener('swl', handleSwipeEvent, false);
     * document.body.addEventListener('swr', handleSwipeEvent, false);
     * document.body.addEventListener('swu', handleSwipeEvent, false);
     * document.body.addEventListener('swd', handleSwipeEvent, false);
     *
    */
}

export const getErrorCode = str => {
  if (str.includes("502" || "500")) {
    return 502;
  } else if (str.includes("400" || "404")) {
    return 400;
  } else {
    return 1;
  }
}