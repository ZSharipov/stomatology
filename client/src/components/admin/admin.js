import React, { Fragment} from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import './admin.css';
import Patients from '../patients';
import Doctors from '../doctors';
import Journal from '../journal';
import Anaesthesia from '../anaesthesia';
import Anaesthetization from '../anaesthetization';
import DiagnosesAdmin from '../diagnoses/diagnosesAdmin';
import { authentication, admin } from '../../actions'



const Admin = ({ isType, unauthentication, setActiveWindow, activWindow }) => {
    const onLogOutBtn = () => {
        unauthentication([], '')
    }

    if (isType !== 'a')
        return <Redirect to='/authentication' />

    const toggleWindow = (activWindow) => {
        setActiveWindow(activWindow);
    }

    return (
        <div >
            <div className="header d-flex">
                <ul className="d-block w-100">
                    <button onClick={() => toggleWindow('patients')} className='btn btn-primary mr-2'>Пациенты</button>
                    <button onClick={() => toggleWindow('doctors')} className='btn btn-primary mr-2'>Работники</button>
                    <button onClick={() => toggleWindow('journal')} className='btn btn-primary mr-2'>Журнал</button>
                    <button onClick={() => toggleWindow('diagnoses')} className='btn btn-primary mr-2'>Диагнозы</button>
                    <button onClick={() => toggleWindow('anaesthesia')} className='btn btn-primary'>Анестезия</button>

                    <button onClick={onLogOutBtn} className='btn btn-primary exitbtn'>Выход</button>
                </ul>
            </div>


            {
                (activWindow === 'patients')
                    ? <Fragment >
                        <h2>Пациенты</h2>
                        <Patients defaultHiddenColumnNames={['date_edit']} />
                    </Fragment>
                    : null
            }
            {
                (activWindow === 'doctors')
                    ? <Fragment >
                        <h2>Работники</h2>
                        <Doctors />
                    </Fragment>
                    : null
            }
            {
                (activWindow === 'journal')
                    ? <Fragment >
                        <h2>Журнал</h2>
                        <Journal
                            defaultHiddenColumnNames={['date_done', 'id_doctor', 'id_patient', 'is_deciduous']} />
                    </Fragment>
                    : null
            }
            {
                (activWindow === 'diagnoses')
                    ? <Fragment >
                        <h2>Диагнозы</h2>
                        <DiagnosesAdmin />
                    </Fragment>
                    : null
            }
            {
                (activWindow === 'anaesthesia')
                    ? <Fragment >
                        <h2>Обезболивание</h2>
                        <Anaesthetization />

                        <h2>Анестетик</h2>
                        <Anaesthesia />
                    </Fragment>
                    : null
            }
        </div >
    )
};



const mapStateToProps = (state) => {
    return {
        isType: state.authentication.isType,
        activWindow: state.admin.activWindow,
    }
}
const mapDispatchToProps = {
    unauthentication: authentication,
    setActiveWindow: admin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);