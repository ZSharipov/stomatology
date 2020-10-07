import React from 'react';
import {Switch, Route, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { AnaesthesiaPage, DiagnosesPage, JournalPage, DoctrosPage, PatientsPage } from '../pages';

import './admin.css';
import { authentication } from '../../actions'



const Admin = ({ isType, unauthentication }) => {
    const onLogOutBtn = () => {
        unauthentication([], '')
    }

    if (isType !== 'a')
        return <Redirect to='/authentication' />

  

    return (
        <div >
            <div className="header d-flex">
                <ul className="d-block w-100">
                    <Link to='/admin/patients' className='btn mr-2'>Пациенты</Link>
                    <Link to='/admin/doctors' className='btn mr-2'>Работники</Link>
                    <Link to='/admin/journal' className='btn mr-2'>Журнал</Link>
                    <Link to='/admin/diagnoses' className='btn mr-2'>Диагнозы</Link>
                    <Link to='/admin/anaesthesia' className='btn'>Анестезия</Link>

                    <button onClick={onLogOutBtn} className='btn btn-primary exitbtn'>Выход</button>
                </ul>
            </div>
            <Switch>
                <Route path="/admin/doctors" component={DoctrosPage} exact/>  
                <Route path="/admin/patients" component={PatientsPage} exact/>
                <Route path="/admin/journal" component={JournalPage} exact/>
                <Route path="/admin/diagnoses" component={DiagnosesPage} exact/>
                <Route path="/admin/anaesthesia" component={AnaesthesiaPage} exact/>
            </Switch>
           
        </div >
    )
};



const mapStateToProps = (state) => {
    return {
        isType: state.authentication.isType,
    }
}
const mapDispatchToProps = {
    unauthentication: authentication,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);