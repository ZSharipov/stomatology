
import React from 'react'
import { connect } from 'react-redux';

import './registry.css'
import Patients from '../patients/patients';
import ReferringTo from '../referring-to'



class Registry extends React.Component {

    render() {
        const { doctors } = this.props;
        const defaultHiddenColumnNames = ["hbs", "hcv", "hiv", "date_created", "date_edit"]

        return (
            <div>
                <Patients                
                    isAdmin={false}
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