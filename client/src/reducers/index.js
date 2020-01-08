import { combineReducers } from 'redux'
import registry from './registry'
import doctors from './doctors'
import authentication from './authentication'
import patients from './patients'

export default combineReducers({
    registry,
    authentication,
    doctors,
    patients,
})