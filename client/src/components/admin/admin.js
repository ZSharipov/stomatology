import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './admin.css';
import Patients from '../patients';
import Doctors from '../doctors';
import Journal from '../journal';
import DiagnosesAdmin from '../diagnoses/diagnosesAdmin';
import { authentication } from '../../actions'



const Admin = ({isType, unauthentication }) => {
    const onLogOutBtn = () => {
        unauthentication([],'')
    }

    if (isType !== 'a')
        return <Redirect to='/authentication' />
    const onPatientBtnClcik = () => {
        if (document.getElementById("div1")) {
            document.getElementById("div1").style.display = 'block';
            document.getElementById('div2').style.display = 'none';
            document.getElementById('div3').style.display = 'none';
            document.getElementById('div4').style.display = 'none';
        }
    }
    const onDoctorsBtnClcik = () => {
        if (document.getElementById("div2")) {
            document.getElementById("div2").style.display = 'block';
            document.getElementById('div1').style.display = 'none';
            document.getElementById('div3').style.display = 'none';
            document.getElementById('div4').style.display = 'none';
        }
    }
    const onJournalBtnClcik = () => {
        if (document.getElementById("div1")) {
            document.getElementById("div3").style.display = 'block';
            document.getElementById('div1').style.display = 'none';
            document.getElementById('div2').style.display = 'none';
            document.getElementById('div4').style.display = 'none';
        }
    }
    const onDiagnosesBtnClcik = () => {
        if (document.getElementById("div1")) {
            document.getElementById("div4").style.display = 'block';
            document.getElementById("div3").style.display = 'none';
            document.getElementById('div1').style.display = 'none';
            document.getElementById('div2').style.display = 'none';
        }
    }

    return (
        <div >
            <div className="header d-flex">
                <ul className="d-block w-100">
                    <button onClick={onPatientBtnClcik} className='btn btn-primary mr-2'>Пациенты</button>
                    <button onClick={onDoctorsBtnClcik} className='btn btn-primary mr-2'>Работники</button>
                    <button onClick={onJournalBtnClcik} className='btn btn-primary mr-2'>Журнал</button>
                    <button onClick={onDiagnosesBtnClcik} className='btn btn-primary'>Диагнозы</button>
                    <button onClick={onLogOutBtn} className='btn btn-primary exitbtn'>Выход</button>
                </ul>
            </div>
            <div id="div1" style={{display:'none'}} className='div-for-patients'>
                <h2>Пациенты</h2>
                <Patients defaultHiddenColumnNames={['date_created', 'date_edit']} />
            </div>
            <div id="div2" style={{display:'none'}} className='div-for-doctors'>
            <h2>Работники</h2>
                <Doctors />
            </div>
            <div id="div3" style={{display:'none'}} className='div-for-journal'>
            <h2>Журнал</h2>
                <Journal 
                    defaultHiddenColumnNames={['date_created', 'date_edit', 'id_doctor', 'id_patient', 'date_done','is_deciduous']} />
            </div>
            <div id="div4" style={{display:'none'}} className='div-for-diagnoses'>
            <h2>Диагнозы</h2>
                <DiagnosesAdmin/>
            </div>

        </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Admin);