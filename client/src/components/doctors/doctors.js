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
import { fetchDoctors } from '../../actions'
import { putDoctors, postDoctors, delDoctors } from '../../services/server-service'



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

const Doctors = ({ defaultHiddenColumnNames = ['date_created', 'date_edit'], doctors, fetchDoctors }) => {


    const [defaultColumnWidths] = useState([
        { columnName: 'fio', width: 300 },
        { columnName: 'station', width: 180 },
        { columnName: 'tel', width: 200 },
        { columnName: 'authentication', width: 100 },
        { columnName: 'isType', width: 100 },
        { columnName: 'date_created', width: 100 },
        { columnName: 'date_edit', width: 100 }
    ]);


    const [columns] = useState([
        { name: 'fio', title: 'Ф.И.О.' },
        { name: 'station', title: 'пункт' },
        { name: 'tel', title: 'телефон' },
        { name: 'authentication', title: 'код входа' },
        { name: 'isType', title: 'тип (a,t,d,r)' },
        { name: 'date_created', title: 'дата создание' },
        { name: 'date_edit', title: 'дата изменение' }
    ]);

    const [rows, setRows] = useState(doctors);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        fetchDoctors()
    }, [fetchDoctors]
    )
    useEffect(() => {
        setRows(doctors)
    }, [doctors])




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


            postDoctors({ fio: added[0].fio, station: added[0].station, tel: added[0].tel, authentication: added[0].authentication, isType: added[0].isType })
                .then(res => res.json())
                .then((res) => {
                    fetchDoctors();
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
                }
                else {
                    return row
                }

            });
            if (editRow) {
                const data = {
                    // fio,station,tel,authentication,isType
                    query: 'UPDATE `doctors` SET `fio` = ?, `station`=?, `tel` = ?,`authentication` = ?,`isType` = ? WHERE `id` = ?',
                    params: [editRow.fio, editRow.station, editRow.tel, editRow.authentication, editRow.isType, editRow.id]
                };
                putDoctors(data)
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        fetchDoctors();
                        console.error(err);
                        alert(`ошибка при обновление`);
                        return;
                    })
            }
            changedRows = newArray;
        }
        if (deleted) {

            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));


            const doc = rows.find((row) => {
                return row.id === deleted[0];
            })
            const confirmDel = window.confirm('Удалить запись?');
            if (!confirmDel)
                return
            delDoctors([doc.id])
                .then(res => res.json())
                .then((res) => alert(res.status))
                .catch((err) => {
                    fetchDoctors();
                    console.error(err);
                    alert(`ошибка при удаление`);
                    return;
                })

        }
        setRows(changedRows);
    };


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
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                    width={250}
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
        doctors: state.doctors.doctors,
    }
}
const mapDispatchToProps = {
    fetchDoctors: fetchDoctors,
}



export default connect(mapStateToProps, mapDispatchToProps)(Doctors);