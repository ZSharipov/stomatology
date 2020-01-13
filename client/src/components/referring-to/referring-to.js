import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { postJournal } from '../../services/server-service'


import './referring-to.css'

const ReferringTo = ({ doctors, patientReferrId, patientReferrFio }) => {

const [docs]=useState(doctors.filter((doc)=>doc.isType==='d'))

    let selectId = 0;
    const onSelectChange = (event) => {
        selectId = event.target.options[event.target.selectedIndex].value;
    }
    const onButtonClick = () => {
        if (selectId == false) {
            alert("Вы не указали врача. Укажите врача!")
            return
        }
        postJournal({id_doctor:selectId,id_patient: patientReferrId})
            .then(res => res.json())
            .then((res) => alert(res.status))
            .catch((err) => {
                console.error(err)
                alert(`ошибка при отправке`);
                return;
            }
            )

        document.getElementById("rootDiv").style.visibility = 'hidden'

        document.getElementById("select").value = 0;
        selectId = 0;

    }
    const onCancelButtonClick=() =>{
        document.getElementById("rootDiv").style.visibility = 'hidden'

        document.getElementById("select").value = 0;
        selectId = 0;        
    }

    useEffect(() => {
        if (patientReferrFio)
            document.getElementById("rootDiv").style.visibility = 'visible'
    }, [patientReferrFio])

    return (
        <div style={{ visibility: "hidden" }}
            id="rootDiv" className="parent">
            <div className="child">
                <label>Пациент:</label>
            </div>
            <div className="child">
                <input
                    id="referrFioInput"
                    className=" form-control"
                    type="text"
                    readOnly value={patientReferrFio} />

            </div>
            <div className="child">
                <label className="doctor-label">Направить к:</label>
            </div>
            <div className="child">
                <select
                    id="select"
                    onChange={onSelectChange}
                    className="custom-select">
                    <option value={0}>врач . . .</option>
                    {
                        docs.map((doctor) => {
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
            <div className="child">
                <button onClick={onCancelButtonClick} className="btn btn-primary">отмена</button>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        patientReferrId: state.registry.patientReferrId,
        patientReferrFio: state.registry.patientReferrFio,
    }
}


export default connect(mapStateToProps)(ReferringTo);