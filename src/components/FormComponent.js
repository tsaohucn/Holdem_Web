// node_module
import React, { PureComponent } from 'react'
import * as EmailValidator from 'email-validator'
import Moment from 'moment'
// local components
import PartialForm from '../views/PartialForm'
import { errorAlert, passwordSchema } from '../helpers'

class FormComponent extends PureComponent {

  constructor(props) {
    super(props)
  
    this.state = {
      data: this.props.field.reduce((o, ele) => { 
        if (ele.key === 'club_id') {
          o[ele.key] = this.props.clubId
        } else if (ele.key === 'joinDate') {
          o[ele.key] = Moment(new Date()).format('l')
        } else {
          o[ele.key] = ''
        }
        return o
      }, {}),
      focusBirthday: false
    }
  }

  checkDataIntegrity = () => {
    const index = requireField.findIndex(key => this.state.data[key] === null || this.state.data[key] === undefined || this.state.data[key] === '')
    if (index < 0) {
      return true
    } else {
      const ele = this.props.field.find(ele => ele.key === requireField[index])  
      if (ele) {
        const { label } = ele
        const message =  label + '不能為空'
        errorAlert(this.props.alert,message)
        return false
      } else {
        return true
      }   
    }
  }

  checkEmailFormat = () => {
    if (this.state.data.account) {
      if (EmailValidator.validate(this.state.data.account)) {
        return true
      } else {
        const message = '帳號格式錯誤'
        errorAlert(this.props.alert,message)
        return false        
      }
    } else {
      return true
    }
  }

  checkPasswordFormat = () => {
    if (this.state.data.password) {
      if (passwordSchema.validate(this.state.data.password)) {
        return true
      } else {
        const message = '密碼格式錯誤'
        errorAlert(this.props.alert,message)
        return false       
      }
    } else {
      return true
    }
  }

  checkLimitFormat = () => {
    if (this.state.data.chipLimit) {
      if (Number.isInteger(parseInt(this.state.data.chipLimit))) {
        if (parseInt(this.state.data.chipLimit) >= 0) {
          return true
        } else {
          const message = '抓馬額度格式錯誤'
          errorAlert(this.props.alert,message)
        }
      } else {
        const message = '抓馬額度格式錯誤'
        errorAlert(this.props.alert,message)
        return false         
      }
    } else {
      return true
    }
  }

  checkRbPercentage = () => {
    if (this.state.data.rbPercentage) {
      if (Number.isInteger(parseInt(this.state.data.rbPercentage))) {
        if ((parseInt(this.state.data.rbPercentage) >= 0) && (parseInt(this.state.data.rbPercentage) <= 100)) {
          return true
        } else {
          const message = '退回協會趴數格式錯誤'
          errorAlert(this.props.alert,message)
          return false 
        }
      } else {
        const message = '退回協會趴數格式錯誤'
        errorAlert(this.props.alert,message)
        return false         
      }
    } else {
      return true
    }    
  }

  onChange = (event,key) => {
    const value = event.target.value
    const data = Object.assign({},this.state.data,{ [key]: value })
    this.setState({
      data
    })
  }

  onSearch = (text,key) => {
    const data = Object.assign({},this.state.data,{ [key]: text })
    this.setState({
      data
    })    
  }

  checkId = () => {
    if (this.state.data.referee_id) {
      if (!this.props.options[this.state.data.referee_id]) { 
        const message = '所屬裁判不存在'
        errorAlert(this.props.alert,message)
        return false 
      }
    }
    if (this.state.data.sale_id) {
      if (!this.props.options[this.state.data.sale_id]) {
        const message = '所屬業務不存在'
        errorAlert(this.props.alert,message)
        return false 
      }
    }
    return true 
  }

  onClickNewPageButton = () => {
    if (this.checkDataIntegrity()) {
      if (this.checkEmailFormat()) {
        if (this.checkPasswordFormat()) {
          if (this.checkLimitFormat()) {
            if (this.checkRbPercentage()) {
              if (this.checkId()) {
                this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state.data)
              }
            }
          }
        }
      }
    }
  }

  onFocusBirthday = () => {
    this.setState({
      focusBirthday: true
    })
  }

  onBlurBirthday = () => {
    this.setState({
      focusBirthday: false
    })
  }
 
  render() {
    return(
      <PartialForm
        {...this.props}
        focusBirthday={this.state.focusBirthday}
        onBlurBirthday={this.onBlurBirthday}
        onFocusBirthday={this.onFocusBirthday}
        data={this.state.data}
        onChange={this.onChange}
        onSearch={this.onSearch}
        onClickNewPageButton={this.onClickNewPageButton}
      />
    )    
  }
}

const requireField = [
  'club_id',
  'referee_id',
  'sale_id',
  'id',
  'name',
  'chipLimit',
  'rbPercentage',
  'account',
  'password'
]

export default FormComponent