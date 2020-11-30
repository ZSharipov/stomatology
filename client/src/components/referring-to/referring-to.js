import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { postJournal } from '../../services/server-service'
import './referring-to.css'

const ReferringTo = ({ doctors, patientReferrId, patientReferrFio }) => {

  const [docs] = useState(doctors.filter((doc) => doc.isType === 'd'))
  const [rootDivHidden, setRootDivHidden] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState(0)
  const [selectedId, setSelectedId] = useState(0)


  const onSelectChange = (event) => {
    setSelectedId(event.target.options[event.target.selectedIndex].value);
  }
  const onButtonClick = () => {
    if (selectedId == false) {
      alert("Вы не указали врача. Укажите врача!")
      return
    }
    postJournal({ id_doctor: selectedId, id_patient: patientReferrId })
      .then(res => res.json())
      .then((res) => alert(res.status))
      .catch((err) => {
        console.error(err)
        alert(`ошибка при отправке`);
        return;
      })

    setRootDivHidden(true)
    setSelectedDoc(0)
    setSelectedId(0)
  }
  const onCancelButtonClick = () => {
    setRootDivHidden(true)
    setSelectedDoc(0)
    setSelectedId(0)
  }

  useEffect(() => {
    if (patientReferrFio)
      setRootDivHidden(false)
  }, [patientReferrFio])

  return (
    <div
      id="rootDiv" className="parent"
      hidden={rootDivHidden}>
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
          <option value={selectedDoc}>врач . . .</option>
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