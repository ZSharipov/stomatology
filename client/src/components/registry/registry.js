
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './registry.css'
import Patients from '../patients/patients';
import ReferringTo from '../referring-to';




class Registry extends React.Component {

    render() {
        const { doctors, isType } = this.props;
        if (isType !== 'r')
            return <Redirect to='/authentication' />
        const defaultHiddenColumnNames = ["hbs", "hcv", "hiv", "date_created", "date_edit"]

        return (
            <div>
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

export default connect(mapStateToProps)(Registry);