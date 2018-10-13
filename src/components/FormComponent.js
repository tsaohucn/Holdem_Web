// node_module
import React, { PureComponent } from 'react'
import * as EmailValidator from 'email-validator'
import Moment from 'moment'
// local components
import PartialForm from '../views/PartialForm'
import { errorAlert, passwordSchema } from '../helpers'

class FormComponent extends PureComponent {

  state = this.props.field.reduce((o, ele) => { 
    if (ele.key === 'club_key') {
      o[ele.key] = this.props.clubKey
    } else if (ele.key === 'joinDate') {
      o[ele.key] = Moment(new Date()).format('l')
    } else {
      o[ele.key] = ''
    }
    return o
  }, {})

  checkDataIntegrity = () => {
    console.log(this.state)
    const values =  Object.values(this.state)
    const index = values.findIndex(value => (value === null || value === undefined || value === ''))
    if (index < 0) {
      return true
    } else {
      const message = this.props.field[index].label + '不能為空'
      errorAlert(this.props.alert,message)
      return false      
    }
  }

  checkEmailFormat = () => {
    if (this.state.account) {
      if (EmailValidator.validate(this.state.account)) {
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
    if (this.state.password) {
      if (passwordSchema.validate(this.state.password)) {
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
    if (this.state.limit) {
      if (Number.isInteger(parseInt(this.state.limit))) {
        return true
      } else {
        const message = '抓馬額度格式錯誤'
        errorAlert(this.props.alert,message)
        return false         
      }
    } else {
      return true
    }
  }

  onChange = (event,key) => {
    const state = {
      [key]: event.target.value
    }
    this.setState(state)
  }

  onClickNewPageButton = () => {
    if (this.checkDataIntegrity()) {
      if (this.checkEmailFormat()) {
        if (this.checkPasswordFormat()) {
          if (this.checkLimitFormat()) {
            this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state)
          }
        }
      }
    }
  }
 
  render() {
    return(
      <PartialForm
        {...this.props}
        joinDate={this.state.joinDate}
        value={this.state}
        onChange={this.onChange}
        onClickNewPageButton={this.onClickNewPageButton}
      />
    )    
  }
}

export default FormComponent