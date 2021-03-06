// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default inject('HoldemStore','db')(withNavigation(withAlert((withSearch({
  resource: 'clubs',
  searchTitle: '俱樂部查詢',
  placeholder: '輸入俱樂部代號查詢，或無內容直接搜尋全部',
  leftButtonTitle: '搜索',
  rightButtonTitle: '新增俱樂部',
  showRightButton: true
})))))