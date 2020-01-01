
import React from 'react'
import { connect } from 'react-redux';

import './registry.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner';
import Patients from '../patients/patients';
import ReferringTo from '../referring-to'



class Registry extends React.Component {

    render() {
        const { id, fio, isType, doctors } = this.props;

        return (
            <div>
                <Patients isAdmin={false} />

                <ReferringTo doctors={doctors} patient="Ifhbgjd" />


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