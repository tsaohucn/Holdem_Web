// node_module
import React from 'react'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
import NewPage from '../../components/NewPage'
import SearchPage from '../../views/SearchPage'
import TablePage from '../../views/TablePage'
import ui from '../../configs/ui'

const tableData = [
  {
    id: '1',
    name: 'Frozen yoghurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: '4.0'
  }
]

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title='搜索員工'
    leftButtonTitle='搜索' 
    rightButtonTitle='新增員工'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.employeeField}
   buttonTitle={'確認新增員工'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const EmployeeScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  null,
  null,null
)

export default withHoldemBar(EmployeeScreen)