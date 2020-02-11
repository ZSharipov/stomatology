import React, { useState, useEffect } from 'react';
import '@icon/open-iconic/open-iconic.css'
//import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import { fetchTables } from '../../actions'
import { connect } from 'react-redux';
import { putAnaesthetization, postAnaesthetization, delAnaesthetization } from '../../services/server-service'

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
import './anaesthetization.css'



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
    filterPlaceholder: '...',
};

const pagingPanelMessages = {
    showAll: 'Все',
    rowsPerPage: 'Строк на страницу',
    info: 'Строк {from} в {to} ({count} Elemente)',
};

const Anaesthetization = ({anaesthetization,fetchTables}) => {

    

    const [defaultColumnWidths] = useState([
        { columnName: 'text', width: 350 }
    ]);

    const [columns] = useState([
        { name: 'text', title: 'Наименование' },

    ]);

    const [rows, setRows] = useState(anaesthetization);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        setRows(anaesthetization)
    }, [anaesthetization])

    useEffect(() => {
        fetchTables()
    }, [fetchTables])


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

            postAnaesthetization({text: added[0].text})
                .then(res => res.json())
                .then((res) => {
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
                    query: 'UPDATE `anaesthetization` SET `text`=? WHERE `id` = ?',
                    params: [editRow.text, editRow.id]
                };
                putAnaesthetization(data)
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        fetchTables()
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

                const anaest = rows.find((row) => {
                    return row.id === deleted[0];
                })
                const confirmDel = window.confirm('Удалить запись?');
                if (!confirmDel)
                    return
                delAnaesthetization([anaest.id])
                    .then(res => res.json())
                    .then((res) => alert(res.status))
                    .catch((err) => {
                        fetchTables()
                        console.error(err);
                        alert(`ошибка при удаление`);
                        return;
                    })            
            

        }
        setRows(changedRows);
    };

   
    const [tableColumnExtensions] = useState([
        { columnName: 'text', wordWrapEnabled: true },
    ]);

    return (
        
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting} />
                <FilteringState defaultFilters={[]} />
                <EditingState onCommitChanges={commitChanges} />
                <IntegratedSorting />
                <IntegratedFiltering /> 

                <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={5} />
                <IntegratedPaging/>
                <Table
                    columnExtensions={tableColumnExtensions}
                    messages={tableMessages} />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow messages={filterRowMessages} />
                <TableHeaderRow showSortingControls />
                {/* <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} /> */}
                <TableEditRow />
                <TableEditColumn showAddCommand
                    showEditCommand
                    showDeleteCommand width={250}
                    messages={editColumnMessages} />
                <PagingPanel pageSizes={
                    [5, 20, 100]}
                    messages={pagingPanelMessages} />
            </Grid>
        
    );
};

const mapStateToProps = (state) => {
    return {
        anaesthetization: state.tables.anaesthetization,
    }
}


const mapDispatchToProps = {
    fetchTables: fetchTables
}



export default connect(mapStateToProps, mapDispatchToProps)(Anaesthetization);