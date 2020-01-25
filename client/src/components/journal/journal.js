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
import { fetchJournal, fetchAllJournal, openPatient } from '../../actions'
import { delJournal } from '../../services/server-service'
import { withRouter } from 'react-router-dom'





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

const Journal = ({
    defaultHiddenColumnNames,
    journal, fetchJournal,
    fetchAllJournal,
    id, isType,
    history,
    openPatient, }) => {


    if (isType === 'd') {
        editColumnMessages.deleteCommand = "Открыть"
    }
    const [defaultColumnWidths] = useState([
        { columnName: 'id_doctor', width: 0 },
        { columnName: 'doc_fio', width: 200 },
        { columnName: 'id_patient', width: 0 },
        { columnName: 'pat_fio', width: 250 },
        { columnName: 'birth_day', width: 100 },
        { columnName: 'address', width: 100 },
        { columnName: 'tel', width: 100 },
        { columnName: 'state', width: 100 },
        { columnName: 'is_deciduous', width: 100 },
        { columnName: 'note', width: 100 },
        { columnName: 'hbs', width: 80 },
        { columnName: 'hcv', width: 80 },
        { columnName: 'hiv', width: 80 },
        { columnName: 'date_created', width: 0 },
        { columnName: 'date_edit', width: 0 },
        { columnName: 'date_done', width: 0 }

    ]);

    const [columns] = useState([
        { name: 'id_doctor', title: 'id_doctor' },
        { name: 'doc_fio', title: 'Врач' },
        { name: 'id_patient', title: 'id_patient' },
        { name: 'pat_fio', title: 'Пациент' },
        { name: 'birth_day', title: 'Дата рождения' },
        { name: 'address', title: 'адрес' },
        { name: 'tel', title: 'тел' },
        { name: 'state', title: 'Статус' },
        { name: 'is_deciduous', title: 'Зуб' },
        { name: 'note', title: 'Примичание' },
        { name: 'hbs', title: 'hbs' },
        { name: 'hcv', title: 'hcv' },
        { name: 'hiv', title: 'hiv' },
        { name: 'date_created', title: 'дата создание' },
        { name: 'date_edit', title: 'дата изменение' },
        { name: 'date_done', title: 'дата выполнение' }
    ]);

    const [rows, setRows] = useState(journal);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        if (isType === 'a') {
            fetchAllJournal()
        }
        else {
            fetchJournal(id)
        }
    }, [])

    useEffect(() => {
        setRows(journal)
    }, [journal])




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

            }
            changedRows = newArray;
        }
        if (deleted) {


            const journ = rows.find((row) => {
                return row.id === deleted[0];
            })

            if (isType === 'a') {
                const deletedSet = new Set(deleted);
                changedRows = rows.filter(row => !deletedSet.has(row.id));

                delJournal([journ.id])
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        fetchJournal();
                        console.error(err);
                        alert(`ошибка при удаление`);
                        return;
                    })
            }
            else {
                changedRows = rows;
                openPatient(journ);
                history.push('/manipulation');
            }



        }
        setRows(changedRows);
    };


    // #region for RedBackgraund


    const TableRow = ({ row, ...restProps }) => {

        const cellValue = row['state'];

        let cellStyle;
        switch (cellValue) {
            case '(1) В очереди':
                cellStyle = { backgroundColor: '#20f13826' }
                break;
            case '(2) Рассматривается':
                cellStyle = { backgroundColor: '#e1eb90' }
                break;
            case '(3) Выполнено':
                cellStyle = { backgroundColor: 'white' }
                break;

            default:
                cellStyle = { backgroundColor: '#f3c4c4' }
                break;
        }
        return (
            <Table.Row
                {...restProps}
                // eslint-disable-next-line no-alert

                style={cellStyle}
            />
        );
    };
    //#endregion


    return (
        <div >
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting}
                />
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
                    rowComponent={TableRow}
                    messages={tableMessages}
                />



                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow messages={filterRowMessages} />
                <TableHeaderRow showSortingControls />
                <TableColumnVisibility
                    defaultHiddenColumnNames={defaultHiddenColumnNames}
                />

                <TableEditRow />
                <TableEditColumn
                    // showAddCommand
                    // showEditCommand
                    showDeleteCommand
                    width={100}
                    messages={editColumnMessages}
                />



                <PagingPanel
                    pageSizes={[5, 10, 100]}
                    messages={pagingPanelMessages}
                />
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        journal: state.journal.journal,
        id: state.authentication.id,
        isType: state.authentication.isType,
    }
}
const mapDispatchToProps = {
    openPatient: openPatient,
    fetchJournal: fetchJournal,
    fetchAllJournal: fetchAllJournal,
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journal));