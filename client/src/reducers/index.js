import { combineReducers } from 'redux'
import registry from './registry'
import doctors from './doctors'
import journal from './journal'
import authentication from './authentication'
import patients from './patients'
import test from './test'
import manipulation from './manipulation'
import diagnoses from './diagnoses'
import aphorism from './aphorism'
import tables from './tables-for-manipulation'
import admin from './admin'


export default combineReducers({
    registry,
    authentication,
    doctors,
    patients,
    test,
    journal,
    manipulation,
    diagnoses,
    tables,
    aphorism,
    admin,
})