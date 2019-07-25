import React from 'react'

import VerticalCalendarMobile from './mobile'
import VerticalCalendarDesktop from './desktop'

const VerticalCalendar = props => <>{props.isMobile ? <VerticalCalendarMobile {...props} /> : <VerticalCalendarDesktop {...props} />}</>

export default VerticalCalendar
