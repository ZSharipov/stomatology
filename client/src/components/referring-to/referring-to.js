import React from 'react'
import './referring-to.css'

const ReferringTo = ({ doctors, patient }) => {


    let selectId = doctors[0].id;
    const onSelectChange = (event) => {
        selectId=event.target.options[event.target.selectedIndex].value;
    }
    const onButtonClick = () => {
        console.log("d")
    }
    return (
        <div className="parent">
            <div className="child">
                <label>Пациент:</label>
            </div>
            <div className="child">
                <input className="form-control" type="text" readOnly value={patient} />

            </div>
            <div className="child">
                <label className="doctor-label">Направить к:</label>
            </div>
            <div className="child">
                <select onChange={onSelectChange} className="custom-select" name="phone">

                    {
                        doctors.map((doctor) => {
                            return (
                                <option key={doctor.id} value={doctor.id}>{doctor.fio}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="child">
                <button onClick={onButtonClick} className="btn btn-primary">сохранить</button>
            </div>
        </div>
    )

}
export default ReferringTo;