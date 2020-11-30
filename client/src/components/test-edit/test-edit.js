import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { putPatients } from '../../services/server-service'
import { fetchPatients, setTestData } from '../../actions'
import './test-edit.css'

const TestEdit = ({ hbs, hcv, hiv, id, fio, fetchPatients, setTestData }) => {

    const [hbsT, setHbs] = useState(hbs);
    const [hcvT, setHcv] = useState(hcv);
    const [hivT, setHiv] = useState(hiv);
    const [idT, setId] = useState(id);

    useEffect(() => { setHbs(hbs) }, [id, hbs]);
    useEffect(() => { setHcv(hcv) }, [id, hcv]);
    useEffect(() => { setHiv(hiv) }, [id, hiv]);
    useEffect(() => { setId(id) }, [id]);

    const onHbsChange = (event) => {

        setHbs(event.target.checked);
    }
    const onHcvChange = (event) => {

        setHcv(event.target.checked);
    }
    const onHivChange = (event) => {

        setHiv(event.target.checked);
    }
    const onButtonClick = () => {

        const data = {
            query: 'UPDATE `patients` SET `hbs` = ?, `hcv` =?, `hiv` = ? WHERE `id` = ?',
            params: [hbsT, hcvT, hivT, idT]
        };
        putPatients(data)
            .then(res => res.json())
            .then((res) => {
                fetchPatients();
                document.getElementById("rootDiv").style.visibility = 'hidden'
                setTestData(0, 0, 0, '', '')
                alert(res.status)

            })
            .catch((err) => {
                console.error(err);
                alert(`ошибка при обновление`);
                return;
            })
    }

    useEffect(() => {
        if (id)
            document.getElementById("rootDiv").style.visibility = 'visible'
    }, [id])

    return (
        <div style={{ visibility: "hidden" }}
            id="rootDiv"
            className="parent" >
            <div className="child" >
                <li className="fio"> {fio} </li>
            </div>
            <div className="child" >
                <div className="custom-control custom-checkbox mb-3" >
                    <input type="checkbox"
                        checked={hbsT}
                        onChange={onHbsChange}
                        className="custom-control-input"
                        id="input1"
                        required />
                    <label className="custom-control-label"
                        htmlFor="input1" > hbs </label> </div> </div>
            <div className="child" >
                <div className="custom-control custom-checkbox mb-3" >
                    <input type="checkbox"
                        checked={hcvT}
                        onChange={onHcvChange}
                        className="custom-control-input"
                        id="input2"
                        required />
                    <label className="custom-control-label"
                        htmlFor="input2" > hcv </label>
                </div> </div> <div className="child" >
                <div className="custom-control custom-checkbox mb-3" >
                    <input type="checkbox"
                        checked={hivT}
                        onChange={onHivChange}
                        className="custom-control-input"
                        id="input3"
                        required />
                    <label className="custom-control-label"
                        htmlFor="input3" > hiv </label>
                </div>
            </div>
            <div className="child" >
                <button onClick={onButtonClick}
                    className="btn btn-primary" > сохранить </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

        hbs: state.test.hbs,
        hcv: state.test.hcv,
        hiv: state.test.hiv,
        id: state.test.patientId,
        fio: state.test.patientFio,
    }
}
const mapDispatchToProps = {
    fetchPatients: fetchPatients,
    setTestData: setTestData,
}

export default connect(mapStateToProps, mapDispatchToProps)(TestEdit);