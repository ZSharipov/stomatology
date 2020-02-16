import React from 'react'
import { Link } from 'react-router-dom';
import './patients-header.css'
import { fetchAphorism } from '../../actions'
import { connect } from 'react-redux'
import { useEffect } from 'react';



const PatientHeader = ({ fetchAphorism, aphorism }) => {
    
    useEffect(() => {
        fetchAphorism()
    }, [])
    let aphorisms = [{ text: 'Врач — философ: ведь нет большой разницы между мудростью и медициной. (Гиппократ)' }];
    if (aphorism.length > 0)
        aphorisms = aphorism;
    const rnd = Math.floor(Math.random() * Math.floor(aphorisms.length));
    return (
        <header className="patients-header">
            <h1 className="h-for-aphorism">{aphorisms[rnd].text}</h1>
            <Link to="/authentication">
                <button autoFocus type="button" className="btn btn-primary">вход</button>
            </Link>
        </header>
    )

};


const mapStateToProps = (state) => {
    return {
        aphorism: state.aphorism.aphorism,
    }
}


const mapDispatchToProps = {
    fetchAphorism: fetchAphorism,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHeader);
