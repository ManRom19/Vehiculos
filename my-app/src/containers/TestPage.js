import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Test from '../components/Test'
import {fetchTestInfo} from '../actions/TestActions'

export function mapStateToProps (state) {
  return {}
}

export function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      fetchTestInfo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)