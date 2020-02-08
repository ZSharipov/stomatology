import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './operation.css';
import Journal from '../journal';
import { authentication } from '../../actions'

const Operation = ({ isType, fio, unauthentication }) => {

    if (isType !== 'd')
        return <Redirect to='/authentication' />

    const onLogOutBtn = () => {
        unauthentication([], '')
    }
    return (
        <div className="div-wrapper">
            <div id="div1" className='div-for-label'>
               
                <h2>{fio}</h2>
                <button onClick={onLogOutBtn} >Выход</button>
            </div>
            <div className="div-pair">
                <label>
                    <div className="type" style={{ backgroundColor: "#20f13826" }}></div>
                    В очереди
                </label>
                <label>
                    <div className="type" style={{ backgroundColor: "#e1eb90" }}></div>
                    Рассматривается
                </label>
                <label>
                    <div className="type border-wrap-white" style={{ backgroundColor: "#ffffff" }}></div>
                    Выполнено
                </label>
                <label>
                    <div className="type" style={{ backgroundColor: "#f3c4c4" }}></div>
                    Отменено
                </label>
            </div>



            <div id="div2" className='div-for-journal'>
                <Journal style={{ visibility: "hidden" }}
                    defaultHiddenColumnNames={[
                        'date_created', 'date_edit', 'id_doctor',
                        'id_patient', 'date_done', 'doc_fio', 'note',
                        'is_deciduous']} />
            </div>

        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        isType: state.authentication.isType,
        fio: state.authentication.fio,
    }
}
const mapDispatchToProps = {
    unauthentication: authentication,
}

export default connect(mapStateToProps, mapDispatchToProps)(Operation);