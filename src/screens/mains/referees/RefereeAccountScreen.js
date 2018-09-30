// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withChange from '../../../hocs/withAccount'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withChange({
  originalLabel: '請輸入原始帳號',
  newLabel: '請輸入新帳號'
}))))