import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './admin.css';
import Patients from '../patients';
import Doctors from '../doctors';
import Journal from '../journal';



const Admin = ({isType }) => {

    if (isType !== 'a')
        return <Redirect to='/authentication' />
    const onPatientBtnClcik = () => {
        if (document.getElementById("div1")) {
            document.getElementById("div1").style.visibility = 'visible';
            document.getElementById('div2').style.visibility = 'hidden';
            document.getElementById('div3').style.visibility = 'hidden';
        }

    }
    const onDoctorsBtnClcik = () => {
        if (document.getElementById("div2")) {
            document.getElementById("div2").style.visibility = 'visible';
            document.getElementById('div1').style.visibility = 'hidden';
            document.getElementById('div3').style.visibility = 'hidden';
        }

    }
    const onJournalBtnClcik = () => {
        if (document.getElementById("div1")) {
            document.getElementById("div3").style.visibility = 'visible';
            document.getElementById("div1").style.visibility = 'hidden';
            document.getElementById('div2').style.visibility = 'hidden';
        }

    }

    return (
        <div >
            <div className="header d-flex">
                <ul className="d-flex">
                    <button onClick={onPatientBtnClcik} className='btn btn-primary'>Пациенты</button>
                    <button onClick={onDoctorsBtnClcik} className='btn btn-primary'>Работники</button>
                    <button onClick={onJournalBtnClcik} className='btn btn-primary'>Журнал</button>
                </ul>
            </div>
            <div id="div1" className='div-for-patients'>
                <Patients defaultHiddenColumnNames={['date_created', 'date_edit']} />
            </div>
            <div id="div2" className='div-for-doctors'>
                <Doctors />
            </div>
            <div id="div3" className='div-for-journal'>
                <Journal 
                    defaultHiddenColumnNames={['date_created', 'date_edit', 'id_doctor', 'id_patient', 'date_done','is_deciduous']} />
            </div>

        </div>
    )
};


const mapStateToProps = (state) => {
    return {    
        isType: state.authentication.isType,
    }
}

export default connect(mapStateToProps)(Admin);