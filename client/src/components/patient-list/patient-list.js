import React from 'react';
import PatientListItem from '../patient-list-item';

import './patient-list.css'

const PatientList = ({patients, onAdedToCard}) => {
    return (
        <ul className="patient-list" > {
            patients.map((patient) => {
                return (
                    <li key={patient.id_patient} > 
                    <PatientListItem 
                    patient={patient}
                    onAdedToCard={()=>onAdedToCard(patient.id_patient)} /></li >
                )
            })
        } </ul>
    )
};
export default PatientList;