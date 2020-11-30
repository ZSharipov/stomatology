
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Patients from '../patients/patients';
import ReferringTo from '../referring-to';
import { authentication } from '../../actions'
import './registry.css'

const Registry = ({ doctors, isType, fio, unauthentication }) => {

  if (isType !== 'r')
    return <Redirect to='/authentication' />

  const defaultHiddenColumnNames = ["hbs", "hcv", "hiv", "date_edit"]
  const onLogOutBtn = () => {
    unauthentication([], '')
  }

  return (
    <div>
      <div id="div1" className='div-for-label'>
        <h2>{fio}</h2>
        <button onClick={onLogOutBtn} >Выход</button>
      </div>
      <Patients
        defaultHiddenColumnNames={defaultHiddenColumnNames} />
      <ReferringTo doctors={doctors} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    id: state.authentication.id,
    fio: state.authentication.fio,
    isType: state.authentication.isType,
    doctors: state.doctors.doctors,
  }
}
const mapDispatchToProps = {
  unauthentication: authentication,
}

export default connect(mapStateToProps, mapDispatchToProps)(Registry);