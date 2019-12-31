import React from 'react';
import './patient-list-item.css';

const PatientListItem = ({ patient, onAdedToCard }) => {
    const { fio, address, tel, hbs, hcv, hiv, birth_day, coverImage } = patient;
    return (
        <div className="patient-list-item" >
            <div className="patient-cover" >
                < img src={coverImage} alt="cover" />
            </div> <div className="patient-details" >
                <span className="patient-fio" > ФИО: {fio} </span>
                <div className="patient-fio" > адрес: {address} </div>
                <div className="patient-fio" > телефон: {tel} </div>
                <div className="patient-fio" > Hbs: {hbs} </div>
                <div className="patient-fio" > HCV: {hcv} </div>
                <div className="patient-fio" > HIV: {hiv} </div>
                <div className="patient-fio" > дата рождение: {birth_day} </div>
                <button 
                onClick={onAdedToCard}
                className="btn btn-info add-to-cart" > Add </button>
            </div>
        </div>
    )
}

export default PatientListItem;