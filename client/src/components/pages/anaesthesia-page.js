import React, {Fragment} from 'react'
import Anaesthesia from '../anaesthesia';
import Anaesthetization from '../anaesthetization';

const AnaesthesiaPage = () =>{
    return <Fragment >
    <h2>Обезболивание</h2>
    <Anaesthetization />

    <h2>Анестетик</h2>
    <Anaesthesia />
</Fragment>
}

export default AnaesthesiaPage;