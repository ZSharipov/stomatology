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
    DataTypeProvider,
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
    DragDropProvider,
    TableColumnVisibility,

} from '@devexpress/dx-react-grid-bootstrap4';


//my imports
import { patientReferr } from '../../actions/registry'
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions'
import { putPatients } from '../../services/server-service'



const getRowId = row => row.id;

const tableMessages = {
    noData: 'Нет данных',
};
const editColumnMessages = {
    addCommand: "Новая строка",
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
    isControl = true,
    colWidth = 250,
    isAdmin,
    defaultHiddenColumnNames,
    patientRef,
    patients,
    fetchPatients }) => {



    if (!isAdmin) {
        editColumnMessages.deleteCommand = "Направить"
    }
    const [patientId, setPatientId] = useState('');
    const [patientFio, setPatientFio] = useState('');
    useEffect(() => {
        patientRef(patientId, patientFio)
    })

    // const [defaultColumnWidths] = useState([
    //     { columnName: '1d', width: 20 },
    //     { columnName: 'fio', width: 180 },
    //     { columnName: 'birth_day', width: 180 },
    //     { columnName: 'address', width: 180 },
    //     { columnName: 'tel', width: 240 },
    //     { columnName: 'hbs', width: 0 }, 
    //     { columnName: 'hcv', width: 0 }, 
    //     { columnName: 'hiv', width: 'hiv' }, 
    //     { columnName: 'date_created', width: 0 }, 
    //     { columnName: 'date_edit', width: 0 }
    // ]);



    // const [columns] = useState([
    //     { name: 'id', title: 'id' }, 
    //     { name: 'fio', title: 'fio' }, 
    //     { name: 'birth_day', title: 'birth_day' }, 
    //     { name: 'address', title: 'address' }, 
    //     { name: 'tel', title: 'tel' }, 
    //     { name: 'hbs', title: 'hbs' }, 
    //     { name: 'hcv', title: 'hcv' }, 
    //     { name: 'hiv', title: 'hiv' }, 
    //     { name: 'date_created', title: 'date_created' }, 
    //     { name: 'date_edit', title: 'date_edit' }
    // ]);


    const [defaultColumnWidths] = useState([
        { columnName: 'fio', width: 180 },
        { columnName: 'birth_day', width: 180 },
        { columnName: 'address', width: 180 },
        { columnName: 'tel', width: 240 },
        { columnName: 'hbs', width: 100 },
        { columnName: 'hbs', width: 100 },
        { columnName: 'hcv', width: 100 },
        { columnName: 'hiv', width: 100 },
        { columnName: 'date_created', width: 100 },
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
        { name: 'date_created', title: 'date_created' },
        { name: 'date_edit', title: 'date_edit' }
    ]);


    const [rows, setRows] = useState(patients);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        fetchPatients()
    }, [fetchPatients]
    )
    useEffect(() => {
        setRows(patients)
    }, [patients])






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
        }
        if (changed) {
            let editRow;
            const newArray = rows.map(row => {
                if (changed[row.id]) {
                    editRow = { ...row, ...changed[row.id] };
                    return editRow
                }
                else {
                    return row
                }

            });
            if (editRow) {
                // const data = { fio: editRow.fio, birth_day: editRow.birth_day, address: editRow.address, tel: editRow.tel, hbs: editRow.hbs, hcv: editRow.hcv, hiv: editRow.hiv, id: editRow.id };
                putPatients(editRow)
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        alert(`ошибка при обновление`);
                        return;
                    })
            }
            changedRows = newArray;
        }
        if (deleted) {
            if (isAdmin) {
                const deletedSet = new Set(deleted);
                changedRows = rows.filter(row => !deletedSet.has(row.id));

            }
            else {
                const patient = rows[deleted - 1];
                setPatientId(patient.id);
                setPatientFio(patient.fio)

                return
            }

        }
        setRows(changedRows);
    };


    //#region for bollTypeColumn
    const [booleanColumns] = useState(['ert']);
    const BooleanFormatter = ({ value, row }) => (
        <span className="badge badge-secondary">
            {value ? '+' : '-'}
        </span>
    );


    const BooleanEditor = ({ value, onValueChange }) => (
        <select
            className="form-control"
            value={value}
            onChange={e => onValueChange(e.target.value === 'true')}
        >
            <option value={false}>
                0
      </option>
            <option value>
                1
      </option>
        </select>
    );

    const BooleanTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={BooleanFormatter}
            editorComponent={BooleanEditor}
            {...props}
        />
    );


    //#endregion

    //#region for RedBackgraund
    const HighlightedCell = ({ value, style, ...restProps }) => (
        <Table.Cell
            {...restProps}
            style={{
                backgroundColor: value > 0 ? 'red' : undefined,
                ...style,
            }}>
            <span
                style={{
                    color: value < 1 ? 'white' : undefined,
                }}>
                {value}
            </span>
        </Table.Cell>
    );

    const Cell = (props) => {
        const { column } = props;
        if (column.name === 'hbs' || column.name === 'hcv' || column.name === 'hiv') {
            return <HighlightedCell {...props} />;
        }
        return <Table.Cell {...props} />;
    };
    //#endregion

    return (
        <div className="cart">
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting}
                />
                {/* <DragDropProvider /> */}
                <FilteringState defaultFilters={[]} />
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <IntegratedSorting />
                <IntegratedFiltering />
                <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={5}
                />
                <IntegratedPaging />
                <Table
                    messages={tableMessages}
                    cellComponent={Cell}
                />

                <BooleanTypeProvider for={booleanColumns} />

                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow messages={filterRowMessages} />
                <TableHeaderRow showSortingControls />
                <TableColumnVisibility
                    defaultHiddenColumnNames={defaultHiddenColumnNames}
                />

                <TableEditRow />
                <TableEditColumn
                    showAddCommand={isControl}
                    showEditCommand
                    showDeleteCommand={isControl}
                    width={colWidth}
                    messages={editColumnMessages}
                />



                <PagingPanel
                    pageSizes={[10, 50, 100, 500]}
                    messages={pagingPanelMessages}
                />
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        patients: state.patients.patients,
    }
}


const mapDispatchToProps = {
    patientRef: patientReferr,
    fetchPatients: fetchPatients,
}



export default connect(mapStateToProps, mapDispatchToProps)(Patients);