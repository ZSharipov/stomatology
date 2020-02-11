import React from 'react'
import { Link } from 'react-router-dom';
import './patients-header.css'

const aphorism = [
    'Врач — философ: ведь нет большой разницы между мудростью и медициной. (Гиппократ)',
    'Врач — не что иное, как утешитель для души. (Петроний)',
    'В медицине главным лекарством является сам врач. (Антоний Кэмпиньский)',
    'Оптимистическая ложь до такой степени необходима в медицине, что врач, неспособный искренне лгать, выбрал не ту профессию. (Джордж Бернард Шоу)',
    'От врачей и учителей требуют чуда, а если чудо свершится – никто не удивляется. (Мария Эбнер Эшенбах)',
    'Если после разговора с врачом не стало легче, то это не врач. (В. Бехтерев)',
    'Наличие хорошего врача в городе — благодеяние Господне.',
]
const rnd = Math.floor(Math.random() * Math.floor(aphorism.length));

const PatientHeader = () => {
    return (
        <header className="patients-header">
            <h1 className="h-for-aphorism">{aphorism[rnd]}</h1>
            <Link to="/authentication">
                <button type="button" className="btn btn-primary">вход</button>
            </Link>
        </header>
    )

};
export default PatientHeader;
