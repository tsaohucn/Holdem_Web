import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withTable({
  title: ui.refereeCountTable,
  resource: 'referees',
  by: 'club_id'
}))))