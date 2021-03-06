import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withLive from '../../../hocs/withLive'
import ui from '../../../configs/ui'

export default inject('HoldemStore','db')(withNavigation(withAlert((withLive({
  title: ui.playersTable
})))))