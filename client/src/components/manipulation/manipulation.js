import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Diagnoses from '../diagnoses';

import Slider from './slider';
import InputFile from './input-file';
import RootTeeth from './root-teeth';
import MilkTeeth from './milk-teeth';


// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './manipulation.css';


const Manipulation = ({ obj, history }) => {
    const [id, setId] = useState(obj.id);
    // const [id_doctor, setId_doctor] = useState(obj.id_doctor);
    // const [doc_fio, setDoc_fio] = useState(obj.doc_fio);
    // const [id_patient, setId_patient] = useState(obj.id_patient);
    const [pat_fio, setPat_fio] = useState(obj.pat_fio);
    const [birth_day, setBirth_day] = useState(obj.birth_day);
    const [address, setAddress] = useState(obj.address);
    const [tel, setTel] = useState(obj.tel);
    // const [note, setNote] = useState(obj.note);
    // const [date_created, setDate_created] = useState(obj.date_created);
    // const [date_edit, setDate_edit] = useState(obj.date_edit);
    // const [date_done, setDate_done] = useState(obj.date_done);
    // const [hbs, setHbs] = useState(obj.hbs);
    // const [hcv, setHcv] = useState(obj.hcv);
    // const [hiv, setHiv] = useState(obj.hiv);
    // const [is_deciduous, setis_Deciduous] = useState(obj.is_deciduous);
    // const [state, setState] = useState(obj.state);




    const onBtnClick = () => {
        history.goBack();
    }
    console.log(obj)

    return (
        <div className='root-div'>
            <div className='pat-info-div'>
                <div>
                    <div className="div-pair">
                        <div className="pat-label-div">Ф. И. О. :</div>
                        <div className="pat-value-div">{pat_fio}</div>
                    </div>
                    <div className="div-pair">
                        <div className="pat-label-div">Дата рождения: </div>
                        <div className="pat-value-div">{birth_day}</div>
                    </div>
                    <div className="div-pair">
                        <div className="pat-label-div">Адрес:</div>
                        <div className="pat-value-div address-div">{address}</div>
                    </div>
                    <div className="div-pair">
                        <div className="pat-label-div">Телефон:</div>
                        <div className="pat-value-div">{tel}</div>
                    </div>
                </div>

                <div>
                    <div className="div-slider">
                        <h1>here my slider</h1>
                        <Slider />
                    </div>
                </div>
            </div>
            <div className="div-img-loader">
                <div>
                    <InputFile id={id}/>
                </div>
            </div>


            <div className='div-for-params'>
                <div className="div-block div-table-diagnoses">
                    <Diagnoses />
                </div>
                <div className="div-block div-root-teeth">
                    <RootTeeth />
                </div>
                <div className="div-block div-milk-teeth">
                    <MilkTeeth />
                </div>
            </div>
            

            <div>
                <button onClick={onBtnClick}>back</button>
            </div>
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        obj: state.manipulation.obj,
    }
}

export default withRouter(connect(mapStateToProps)(Manipulation));