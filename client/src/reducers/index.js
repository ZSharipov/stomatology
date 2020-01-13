import { combineReducers } from 'redux'
import registry from './registry'
import doctors from './doctors'
import authentication from './authentication'
import patients from './patients'
import test from './test'

export default combineReducers({
    registry,
    authentication,
    doctors,
    patients,
    test,
})