// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

export default inject('HoldemStore','db')(withNavigation(withAlert((withForm({
  field: ui.employeesField,
  buttonTitle: '送出',
  resource: 'employees',
  belong: []
})))))