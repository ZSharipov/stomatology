import { combineReducers } from 'redux'
import patients from './patients'
import doctors from './doctors'
import authentication from './authentication'

export default combineReducers({
    patients,
    authentication,
    doctors,
})