import React, { useState, useEffect } from 'react';
import '@icon/open-iconic/open-iconic.css'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import {
    FilteringState,
    IntegratedFiltering,
    EditingState,
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    TableColumnResizing,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    TableColumnVisibility,

} from '@devexpress/dx-react-grid-bootstrap4';


//my imports
import { connect } from 'react-redux';
import { fetchPatients, setTestData, patientReferr } from '../../actions'
import { putPatients, postPatients, delPatients } from '../../services/server-service'



const getRowId = row => row.id;

const tableMessages = {
    noData: 'Нет данных',
};
const editColumnMessages = {
    addCommand: "Добавить",
    editCommand: "Изменить",
    deleteCommand: "Удалить",
    commitCommand: "Сохранить",
    cancelCommand: "Отмена",
};

const filterRowMessages = {
    filterPlaceholder: 'Поиск...',
};
const pagingPanelMessages = {
    showAll: 'Все',
    rowsPerPage: 'Строк на страницу',
    info: 'Строк {from} в {to} ({count} Elemente)',
};

const Patients = ({
    isType,
    isControl = true,
    colWidth = 250,
    defaultHiddenColumnNames,
    patientRef,
    patients,
    fetchPatients,
    setTestData,
}) => {



    if (isType === 'r') {
        editColumnMessages.deleteCommand = "Направить"
    }
    if (isType === 't') {
        editColumnMessages.deleteCommand = "анализы"
    }
    if (isType === 'a') {
        editColumnMessages.deleteCommand = "Удалить"
    }
    const [patientId, setPatientId] = useState('');
    const [patientFio, setPatientFio] = useState('');

    const [patientHbs, setPatientHbs] = useState('');
    const [patientHcv, setPatientHcv] = useState('');
    const [patientHiv, setPatientHiv] = useState('');
    useEffect(() => {
        patientRef(patientId, patientFio)
    }, [patientId, patientFio])
    useEffect(() => {
        setTestData(patientHbs, patientHcv, patientHiv, patientId, patientFio);
    }, [patientHbs, patientHcv, patientHiv, patientId])


    const [defaultColumnWidths] = useState([
        { columnName: 'fio', width: 300 },
        { columnName: 'birth_day', width: 180 },
        { columnName: 'address', width: 180 },
        { columnName: 'tel', width: 240 },
        { columnName: 'hbs', width: 100 },
        { columnName: 'hcv', width: 100 },
        { columnName: 'hiv', width: 100 },
        { columnName: 'date_created', width: 200 },
        { columnName: 'date_edit', width: 100 }
    ]);


    const [columns] = useState([
        { name: 'fio', title: 'Ф.И.О.' },
        { name: 'birth_day', title: 'дата рождения' },
        { name: 'address', title: 'адрес' },
        { name: 'tel', title: 'телефон' },
        { name: 'hbs', title: 'hbs' },
        { name: 'hcv', title: 'hcv' },
        { name: 'hiv', title: 'hiv' },
        { name: 'date_created', title: 'дата создание' },
        { name: 'date_edit', title: 'date_edit' }
    ]);


    const [rows, setRows] = useState(patients);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        fetchPatients()
    }, [fetchPatients])
    useEffect(() => {
        setRows(patients)
    }, [patients])


    const revertData = (str) => {
        const reg = /,|\.|-/g;
        str = str.replace(reg, '/');
        let arr = str.split('/');
        arr = arr.reverse();
        return arr.join('/');
    }


    // eslint-disable-next-line no-alert
    const commitChanges = (args) => {
        const { added, changed, deleted } = args;


        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];

            postPatients({ fio: added[0].fio, birth_day: revertData(added[0].birth_day), address: added[0].address, tel: added[0].tel })
                .then(res => res.json())
                .then((res) => {
                    fetchPatients();
                    alert(res.status)
                })
                .catch((err) => {
                    console.error(err)
                    alert(`ошибка при отправке`);
                    return;
                })
        }
        if (changed) {
            let editRow;
            const newArray = rows.map(row => {
                if (changed[row.id]) {
                    editRow = { ...row, ...changed[row.id] };
                    return editRow
                } else {
                    return row
                }

            });
            if (editRow) {
                const data = {
                    query: 'UPDATE `patients` SET `fio` = ?, `birth_day`=?, `address` = ?,`tel` = ?,`hbs` = ?, `hcv` =?, `hiv` = ? WHERE `id` = ?',
                    params: [editRow.fio, revertData(editRow.birth_day), editRow.address, editRow.tel, editRow.hbs, editRow.hcv, editRow.hiv, editRow.id]
                };
                putPatients(data)
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        fetchPatients();
                        console.error(err);
                        alert(`ошибка при обновление`);
                        return;
                    })
            }
            changedRows = newArray;
        }
        if (deleted) {
            if (isType === 'a') {

                const deletedSet = new Set(deleted);
                changedRows = rows.filter(row => !deletedSet.has(row.id));

                const patient = rows.find((row) => {
                    return row.id === deleted[0];
                })
                const confirmDel = window.confirm('Удалить запись?');
                if (!confirmDel)
                    return
                delPatients([patient.id])
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        fetchPatients();
                        console.error(err);
                        alert(`ошибка при удаление`);
                        return;
                    })

            } else if (isType === 'r') {
                const patient = rows.find((row) => {
                    return row.id === deleted[0];
                })
                setPatientId(patient.id);
                setPatientFio(patient.fio)
                return
            } else if (isType === 't') {
                const patient = rows.find((row) => {
                    return row.id === deleted[0];
                })
                setPatientFio(patient.fio);
                setPatientId(patient.id);
                setPatientHbs(patient.hbs);
                setPatientHcv(patient.hcv);
                setPatientHiv(patient.hiv);

                return
            }

        }
        setRows(changedRows);
    };


    //#region for RedBackgraund
    // const HighlightedCell = ({ value, style, ...restProps }) => (
    //     <Table.Cell
    //         {...restProps}
    //         style={{
    //             backgroundColor: value > 0 ? 'red' : undefined,
    //             ...style,
    //         }}>
    //         <span
    //             style={{
    //                 color: value < 1 ? 'white' : undefined,
    //             }}>
    //             {value}
    //         </span>
    //     </Table.Cell>
    // );

    // const Cell = (props) => {
    //     const { column } = props;
    //     if (column.name === 'hbs' || column.name === 'hcv' || column.name === 'hiv') {
    //         return <HighlightedCell {...props} />;
    //     }
    //     return <Table.Cell {...props} />;
    // };
    //#endregion

    return (
        <div >
            <Grid rows={rows}
                columns={columns}
                getRowId={getRowId} >
                <SortingState sorting={sorting}
                    onSortingChange={setSorting} />
                <FilteringState defaultFilters={[]} />
                <EditingState onCommitChanges={commitChanges} />
                <IntegratedSorting />
                <IntegratedFiltering />
                <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={5} />
                <IntegratedPaging />
                <Table messages={tableMessages} />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow messages={filterRowMessages} />
                <TableHeaderRow showSortingControls />
                <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} />
                <TableEditRow />
                <TableEditColumn showAddCommand={isControl}
                    showEditCommand={isControl}
                    showDeleteCommand width={colWidth}
                    messages={editColumnMessages} />
                <PagingPanel pageSizes={
                    [5, 20, 100, 500]}
                    messages={pagingPanelMessages} />
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        patients: state.patients.patients,
        isType: state.authentication.isType,
    }
}


const mapDispatchToProps = {
    setTestData: setTestData,
    patientRef: patientReferr,
    fetchPatients: fetchPatients,
}



export default connect(mapStateToProps, mapDispatchToProps)(Patients);