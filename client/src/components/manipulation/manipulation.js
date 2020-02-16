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
import { putJournal } from '../../services/server-service'
import { fetchJournal} from '../../actions'


// import { HomePage, AuthenticationPage, RegistryPage, TestPage } from '../pages';
import './manipulation.css';


const Manipulation = ({ obj, history, fetchImages, slides, isDeciduous, anaesthesia, anaesthetization, materials,fetchJournal }) => {

    const [id] = useState(obj.id);
    const [id_doctor] = useState(obj.id_doctor);
    // const [doc_fio, setDoc_fio] = useState(obj.doc_fio);
    // const [id_patient, setId_patient] = useState(obj.id_patient);
    const [pat_fio] = useState(obj.pat_fio);
    const [birth_day] = useState(obj.birth_day);
    const [address] = useState(obj.address);
    const [tel] = useState(obj.tel);
    const [note] = useState(obj.note);
    const [hbs] = useState(obj.hbs);
    const [hcv] = useState(obj.hcv);
    const [hiv] = useState(obj.hiv);

    const [date_done, setDate_done] = useState(obj.date_done);
    const [journState, setState] = useState(obj.state);

    const date = new Date();
    const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const hbsClass = `test-div${hbs}`
    const hcvClass = `test-div${hcv}`
    const hivClass = `test-div${hiv}`

    // const anaesthesia = [
    //     { id: 1, text: 'Лидокаин' },
    //     { id: 2, text: 'Новокаин' },
    //     { id: 3, text: 'Артикаин' },
    //     { id: 4, text: 'Ультракаин' },
    //     { id: 5, text: 'Тримекаин' },
    //     { id: 6, text: 'Ксилокаин' },
    //     { id: 7, text: 'Мепивакаин' },
    //     { id: 8, text: 'Септанест' },
    //     { id: 9, text: 'Убестезин' },
    // ];
    // const anaesthetization = [
    //     { id: 1, text: 'Аппликационная' },
    //     { id: 2, text: 'Инфильтрационная' },
    //     { id: 3, text: 'Мандибулярная' },
    //     { id: 4, text: 'Торусальная' },
    //     { id: 5, text: 'Туберальная' },
    //     { id: 6, text: 'Резцовая' },
    //     { id: 7, text: 'Небная' },
    // ];


    useEffect(() => {
        fetchImages(id)
    }, [id])


    const onOkBtnClick = () => {
        const data = {
            query: 'UPDATE `journal` SET `state` = ?,`is_deciduous` = ?,`note` = ?,`date_done` = ? WHERE `id` = ? ;',
            params: [journState, isDeciduous, document.getElementById('txtArea').value, date_done, id]
        };
        putJournal(data)
            .then(res => res.json())
            .then((res) =>{
                fetchJournal(id_doctor);
                alert(res.status);
            } )
            .catch((err) => {
                console.error(err);
                alert(`ошибка при обновление`);
                return;
            })


        history.goBack();
    }
    const inputChange = (e) => {
        if (e.target.value === '2') {
            setDate_done(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
        }
        else (setDate_done(null))
        setState(e.target.value);
    };
    const onCacelBtnClick = () => {
        history.goBack();
    }



    return (

        <div className='root-div'>

            <div className='pat-info-div'>
                <div className="left-part">
                    <table className="main-table">
                        <tbody>
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
                        </tbody>
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
                    <Diagnoses title={'Диагноз: '} />
                </div>
                <div className="div-block div-root-teeth">
                    <label>Постоянные зубы</label>
                    <RootTeeth title={'Постоянный зуб: '} />
                </div>
                <div className="div-block div-milk-teeth">
                    <label>Молочные зубы</label>
                    <MilkTeeth title={'Молочный зуб: '} />
                </div>
            </div>
            <div className='div-for-params'>
                
                <div className="div-block div-milk-teeth-tbl">
                    <label>Обезболивание</label>
                    <TempTable dataRows={anaesthetization} title={'Обезболивание: '} />
                </div>
                <div className="div-block div-milk-teeth-tbl">
                    <label>Анестетик</label>
                    <TempTable dataRows={anaesthesia} title={'Анестетик: '} />
                </div>
                <div className="div-block div-table-diagnoses">
                    <label>Пломбировочные материалы</label>
                    <Materials materials={materials} />
                </div>
            </div>
            <div className="footer">
                <div className="footer-left">
                    <label>Примечания</label>
                    <div className="txt-area-block">
                        <textarea
                            id='txtArea'
                            defaultValue={note + currentDate + '\r\n'}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="status-wrapper">
                        <label>
                            <input onChange={inputChange} name="r1" type="radio" value="0" defaultChecked={(obj.state === '0')} />
                            В очереди
                    </label>
                        <label>
                            <input onChange={inputChange} name="r1" type="radio" value="1" defaultChecked={(obj.state === '1')} />
                            Рассматривается
                    </label>
                        <label>
                            <input onChange={inputChange} name="r1" type="radio" value="2" defaultChecked={(obj.state === '2')} />
                            Выполнено
                    </label>
                        <label>
                            <input onChange={inputChange} name="r1" type="radio" value="3" defaultChecked={(obj.state === '3')} />
                            Отменено
                    </label>
                    </div>
                    <div className="action-buttons">
                        <button onClick={onOkBtnClick}>Сохранить</button>
                        <button onClick={onCacelBtnClick}>Отмена</button>
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
        isDeciduous: state.manipulation.is_deciduous,
        anaesthesia: state.tables.anaesthesia,
        anaesthetization: state.tables.anaesthetization,
        materials: state.tables.materials,
    }
}
const mapDispatchToProps = {
    fetchImages: fetchImages,
    fetchJournal: fetchJournal,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manipulation));