import React from 'react'
import {Link} from 'react-router-dom';
import './patients-header.css'


const PatientHeader = () =>{
      return(
        <header className="patients-header">
            <Link  className="logo text-dark" to="#">Пациенты</Link>
            <Link to = "/authentication">
            <button type="button" className="btn btn-secondary">вход</button>
            </Link>            
        </header> 
    )
    
};
export default PatientHeader;
