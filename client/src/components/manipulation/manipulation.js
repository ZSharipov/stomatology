import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Diagnoses from '../diagnoses';
import Materials from '../materials';
import TempTable from '../temp-table';

import Slider from './slider';
import InputFile from './input-file';
import RootTeeth from './root-teeth';
import MilkTeeth from './milk-teeth';
import { fetchImages } from '../../actions'


// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './manipulation.css';


const Manipulation = ({ obj, history, fetchImages, slides }) => {
    const [id] = useState(obj.id);
    // const [id_doctor, setId_doctor] = useState(obj.id_doctor);
    // const [doc_fio, setDoc_fio] = useState(obj.doc_fio);
    // const [id_patient, setId_patient] = useState(obj.id_patient);
    const [pat_fio] = useState(obj.pat_fio);
    const [birth_day] = useState(obj.birth_day);
    const [address] = useState(obj.address);
    const [tel] = useState(obj.tel);
    // const [note, setNote] = useState(obj.note);
    // const [date_created, setDate_created] = useState(obj.date_created);
    // const [date_edit, setDate_edit] = useState(obj.date_edit);
    // const [date_done, setDate_done] = useState(obj.date_done);
    const [hbs] = useState(obj.hbs);
    const [hcv] = useState(obj.hcv);
    const [hiv] = useState(obj.hiv);
    // const [is_deciduous, setis_Deciduous] = useState(obj.is_deciduous);
    // const [state, setState] = useState(obj.state);
    const hbsClass = `test-div${hbs}`
    const hcvClass = `test-div${hcv}`
    const hivClass = `test-div${hiv}`

    const anaesthesia = [
        { id: 1, text: 'Лидокаин' },
        { id: 2, text: 'Новокаин' },
        { id: 3, text: 'Артикаин' },
        { id: 4, text: 'Ультракаин' },
        { id: 5, text: 'Тримекаин' },
        { id: 6, text: 'Ксилокаин' },
        { id: 7, text: 'Мепивакаин' },
        { id: 8, text: 'Септанест' },
        { id: 9, text: 'Убестезин' },
    ];
    const anaesthetization = [
        { id: 1, text: 'Аппликационная' },
        { id: 2, text: 'Инфильтрационная' },
        { id: 3, text: 'Мандибулярная' },
        { id: 4, text: 'Торусальная' },
        { id: 5, text: 'Туберальная' },
        { id: 6, text: 'Резцовая' },
        { id: 7, text: 'Небная' },
    ];


    useEffect(() => {
        fetchImages(id)
    }, [id])

    const onBtnClick = () => {
        history.goBack();
    }
    console.log(obj)

    return (
        <div className='root-div'>
            <div className='pat-info-div'>
                <div className="left-part">
                    <table class="main-table">
                        <tr>
                            <td>Ф. И. О.</td>
                            <td>{pat_fio}</td>
                        </tr>
                        <tr>
                            <td>Дата рождения</td>
                            <td>{birth_day}</td>
                        </tr>
                        <tr>
                            <td>Адрес</td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td>Телефон</td>
                            <td>{tel}</td>
                        </tr>
                        <tr>
                            <td>Анализы</td>
                            <td>
                                <div className={hbsClass}>hbs</div>
                                <div className={hcvClass}>hcv</div>
                                <div className={hivClass}>hiv</div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="right-part">
                    <div className="div-slider">
                        <Slider slides={slides} id={id} />
                    </div>
                    <div className="div-img-loader">
                        <div>
                            <InputFile id={id} />
                        </div>
                    </div>
                </div>
            </div>
            


            <div className='div-for-params'>
                <div className="div-block div-table-diagnoses">
                    <label>Диагнозы</label>
                    <Diagnoses />
                </div>
                <div className="div-block div-root-teeth">
                    <label>Коренные зубы</label>
                    <RootTeeth />
                </div>
                <div className="div-block div-milk-teeth">
                    <label>Молочные зубы</label>
                    <MilkTeeth />
                </div>
            </div>
            <div className='div-for-params'>
                <div className="div-block div-table-diagnoses">
                    <label>Пломбировочные материалы</label>
                    <Materials />
                </div>
                <div className="div-block div-milk-teeth-tbl">
                    <label>Обезболивание</label>
                    <TempTable dataRows={anaesthetization} />
                </div>
                <div className="div-block div-milk-teeth-tbl">
                    <label>Анестезия</label>
                    <TempTable dataRows={anaesthesia} />
                </div>
            </div>
            <div class="footer">
            <div class="footer-left">
                <div class="txt-area-block">
                    <textarea> dskjfasdjfadsklfskjlad
                        dkfljasdk;jladsk;gj;dfkg kdfsjgkdfsgkdfshgjkldfshkj
                        dfskjghdfskjlghldfskjghdfskjl
                        fdklgjdsfk;lgjdfsk;lgjdfskjgdfsk;lgjk;l
                    </textarea>
                </div>
            </div>
            <div class="footer-right">
                <div className="status-wrapper">
                    <label>
                        <input name="r1" type="radio" value="1" />
                        В очереди
                    </label>
                    <label>
                        <input name="r1" type="radio" value="2" />
                        Рассматривается
                    </label>
                    <label>
                        <input name="r1" type="radio" value="3" />
                        Выполнено
                    </label>
                    <label>
                        <input name="r1" type="radio" value="3" />
                        Отменено
                    </label>
                </div>
                <div className="action-buttons">
                    <button onClick={onBtnClick}>Сохранить</button>
                    <button onClick={onBtnClick}>Отмена</button>
                </div>
            </div>
            </div>
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        obj: state.manipulation.obj,
        slides: state.manipulation.slides,
    }
}
const mapDispatchToProps = {
    fetchImages: fetchImages,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manipulation));