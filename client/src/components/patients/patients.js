import React, { useState } from 'react';
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
    DragDropProvider,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
    generateRows,
    defaultColumnValues,
} from './demo-data/generator';

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

const Patients = ({isAdmin}) => {
    if(!isAdmin){
        editColumnMessages.deleteCommand = "Направить"
    }

    const [defaultColumnWidths] = useState([
        { columnName: 'name', width: 180 },
        { columnName: 'gender', width: 180 },
        { columnName: 'city', width: 180 },
        { columnName: 'car', width: 240 },
      ]);
    
        
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
    ]);

    const [rows, setRows] = useState(generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 8000,
    }));
    const [sorting, setSorting] = useState([]);

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
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            if (isAdmin) {
                const deletedSet = new Set(deleted);
                changedRows = rows.filter(row => !deletedSet.has(row.id));
              
            }
            else {
                console.log(rows[deleted])
                return
            }

        }
        setRows(changedRows);
    };
    return (
        <div className="card">
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting}
                />
                <DragDropProvider />
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

                <TableColumnResizing defaultColumnWidths={defaultColumnWidths}/>
                <TableHeaderRow showSortingControls />

                <TableEditRow />
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                    width={250}
                    messages={editColumnMessages}
                />

                <TableFilterRow
                    messages={filterRowMessages}
                />
              

                <PagingPanel
                    pageSizes={[10, 50, 100, 500]}
                    messages={pagingPanelMessages}
                />
            </Grid>
        </div>
    );
};

export default Patients;