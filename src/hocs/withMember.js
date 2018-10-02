// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import EditComponent from '../components/EditComponent'
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withMember(params) {
  const {
    title,
    resource,
    wrapperComponent,
    auth
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id
      this.state = {
        isLoading: true,
        event: '載入中',
        data: []
      }
    }

    componentDidMount() {
      this.fetchTableData(firebase.database().ref('members').orderByChild(resource).equalTo(this.id))
    }

    fetchTableData = async (fetch) => {
      let data_arr = []
      try {
        await sleep(500)
        const snap = fetch && (await fetch.once('value'))
        const data = (snap && snap.val()) || {}
        data_arr = Object.values(data) || []
        this.setState({
          isLoading: false,
          data: data_arr
        })
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //       
      }      
    }

    goBack = () => {
      this.props.history.goBack()
    }

    render() {

      const Component = wrapperComponent ? wrapperComponent : PartialTable

      return(
        <div 
          style={styles.container} 
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
              <h3>{this.state.event}</h3>
            </div>
            :
            <Component
              {...this.props}
              {...this.state}
              title={title}
              onClickTableReturnButton={this.goBack}
            />
          }
        </div>
      )
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default withMember