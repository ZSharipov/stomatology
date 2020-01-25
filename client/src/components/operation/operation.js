import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './operation.css';
import Journal from '../journal';



const Operation = ({ isType, fio }) => {

    if (isType !== 'd')
        return <Redirect to='/authentication' />


    return (
        <div >
            <div id="div1" className='div-for-label'>
                <h2>{fio}</h2>
            </div>
            <div id="div2" className='div-for-journal'>
                <Journal style={{ visibility: "hidden" }}
                    defaultHiddenColumnNames={[
                        'date_created', 'date_edit', 'id_doctor', 
                        'id_patient', 'date_done', 'doc_fio','note',
                        'is_deciduous' ]} />
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

export default connect(mapStateToProps)(Operation);