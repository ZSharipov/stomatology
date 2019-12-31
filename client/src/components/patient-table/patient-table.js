import React from 'react'
import './patient-table.css'
import { connect } from 'react-redux'


const PatientTable = ({ items, onIncrease, onDecrease, onDelete }) => {
  
    const renderRow = (item, idx) => {
        const { id_patient, fio, address, tel } = item;
        const id=id_patient;
        return (
            <tr key={id}>
                <td>{idx+1}</td>
                <td>{fio}</td>
                <td>{address}</td>
                <td>{tel}</td>
                <td>
                    <button
                        onClick={() => onDelete(id)}
                        className="btn btn-outline-danger btn-sm float-right">
                        delete <i className="fa fa-trash-o" />
                    </button>
                    <button
                        onClick={() => onIncrease(id)}
                        className="btn btn-outline-success btn-sm float-right">
                        add <i className="fa fa-plus-circle" />
                    </button>
                    <button
                        onClick={() => { onDecrease(id) }}
                        className="btn btn-outline-warning btn-sm float-right">
                        edit <i className="fa fa-minus-circle" />
                    </button>
                </td>
            </tr>);
    };
    return (
        <div className="patient-table">
            <h2>your order</h2>
            <table className="tabel">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>fio</th>
                        <th>address</th>
                        <th>tel</th>
                        <th>action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        items.map(renderRow)
                    }

                </tbody>
            </table>
            <div>
                _________
                _________
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        items: state.patients.items
    }
};

const mapDispatchToProps = () => {
    return {
        onIncrease: (id) => {
            console.log(id)
        },
        onDecrease: (id) => {
            console.log(id)
        },
        onDelete: (id) => {
            console.log(id)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientTable);