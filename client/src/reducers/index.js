import { combineReducers } from 'redux'
import registry from './registry'
import doctors from './doctors'
import journal from './journal'
import authentication from './authentication'
import patients from './patients'
import test from './test'
import manipulation from './manipulation'
import diagnoses from './diagnoses'

export default combineReducers({
    registry,
    authentication,
    doctors,
    patients,
    test,
    journal,
    manipulation,
    diagnoses,
})