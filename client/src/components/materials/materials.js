import React, { useState } from 'react';
import '@icon/open-iconic/open-iconic.css'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import {
    FilteringState,
    IntegratedFiltering,
    SortingState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableFilterRow,
    TableColumnResizing,
    TableColumnVisibility,

} from '@devexpress/dx-react-grid-bootstrap4';


import './materials.css'



const getRowId = row => row.id;

const tableMessages = {
    noData: 'Нет данных',
};


const filterRowMessages = {
    filterPlaceholder: '...',
};


const Materials = ({ materials, defaultHiddenColumnNames = ['code'] }) => {

    // const materials = [
    //     { id: 1, code: '', text: 'Эндодонтические' },
    //     { id: 2, code: 'Эндодонтические', text: 'Эндометазон' },
    //     { id: 3, code: 'Эндодонтические', text: 'Теэдент' },
    //     { id: 4, code: 'Эндодонтические', text: 'Эндофил' },
    //     { id: 5, code: 'Эндодонтические', text: 'Эодент' },
    //     { id: 6, code: 'Эндодонтические', text: 'Резодент' },
    //     { id: 7, code: 'Эндодонтические', text: 'Форедент' },
    //     { id: 8, code: 'Эндодонтические', text: 'Интрадонт' },
    //     { id: 9, code: 'Эндодонтические', text: 'Цинк-Эвгеноловая паста' },
    //     { id: 10, code: 'Эндодонтические', text: 'Эвгедент' },
    //     { id: 11, code: '', text: 'Прокладочные' },
    //     { id: 12, code: 'Прокладочные', text: 'Уницем' },
    //     { id: 13, code: 'Прокладочные', text: 'Унифас' },
    //     { id: 14, code: '', text: 'Постоянные' },
    //     { id: 15, code: 'Постоянные', text: 'Белоцин' },
    //     { id: 16, code: 'Постоянные', text: 'Белодонт' },
    //     { id: 17, code: 'Постоянные', text: 'Композит' },
    //     { id: 18, code: 'Постоянные', text: 'Магафил' },
    // ]

    const [defaultColumnWidths] = useState([
        { columnName: 'code', width: 0 },
        { columnName: 'text', width: 240 }
    ]);


    const [columns] = useState([
        { name: 'code', title: 'Код:' },
        { name: 'text', title: 'Наименование' },

    ]);

    const [rows] = useState(materials);
    const [sorting, setSorting] = useState([]);






    const TableRow = ({ row, ...restProps }) => {

        const cellValue = row['code'];//for RedBackgraund
        let cellStyle;
        if (cellValue === '') {
            cellStyle = { backgroundColor: '#20f13826', fontWeight: 'bold' }
        }

        return (
            <Table.Row
                {...restProps}
                className='trActive'
                onClick={() => {
                    if (row['code'] === '')
                        return
                    const txt = document.getElementById('txtArea').value;
                    document.getElementById('txtArea').value =
                        (txt + row['code'] + ': ' + row['text'] + "\r\n")
                }}
                style={cellStyle}//for RedBackgraund
            />
        );
    }

    const [tableColumnExtensions] = useState([
        { columnName: 'text', wordWrapEnabled: true },
    ]);

    return (

        <div className="div-for-rows" >
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

                <IntegratedFiltering />

                <Table
                    columnExtensions={tableColumnExtensions}
                    rowComponent={TableRow}
                    messages={tableMessages}
                />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow messages={filterRowMessages} />
                <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames}
                />

            </Grid>
        </div>
    );
};



export default Materials;