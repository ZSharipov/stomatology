
import React from 'react'
import { connect } from 'react-redux';

import './registry.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner';
import Patients from '../patients/patients';


const ReferringTo = ({doctors, patient}) => {
    return (
        <div className="parent">
            <div className="child">
                <label>Пациент:</label>
            </div>
            <div className="child">
                <input type="text" readOnly value={patient} />

            </div>
            <div className="child">
                <label className="doctor-label">Направить к:</label>
            </div>
            <div className="child">
                <select className="custom-select" name="phone">
                    {
                        doctors.map((doctor) => {
                            return (
                                <option key={doctor.id_doctor} value={doctor.id_doctor}>{doctor.fio}</option>
                            )
                        })
                    }
                </select>
            </div>

        </div>
    )

}
class Registry extends React.Component {

    render() {
        const { id_doctor, fio, isType, doctors } = this.props;

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
        id_doctor: state.authentication.id_doctor,
        fio: state.authentication.fio,
        isType: state.authentication.isType,
        doctors: state.doctors.doctors,
    }
}

export default connect(mapStateToProps)(Registry);