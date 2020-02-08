
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './registry.css'
import Patients from '../patients/patients';
import ReferringTo from '../referring-to';
import { authentication } from '../../actions'



class Registry extends React.Component {
    
    render() {
        const { doctors, isType,fio,unauthentication } = this.props;
        if (isType !== 'r')
        return <Redirect to='/authentication' />
        const defaultHiddenColumnNames = ["hbs", "hcv", "hiv", "date_created", "date_edit"]
        
        const onLogOutBtn = () => {
                unauthentication([],'')
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

export default connect(mapStateToProps,mapDispatchToProps)(Registry);