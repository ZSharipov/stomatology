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

} from '@devexpress/dx-react-grid-bootstrap4';


//my imports
import './temp-table.css'



const getRowId = row => row.id;

const tableMessages = {
    noData: 'Нет данных',
};


const filterRowMessages = {
    filterPlaceholder: '...',
};


const TempTable = ({dataRows}) => {  
    

    const [defaultColumnWidths] = useState([        
        { columnName: 'text', width: 240 }
    ]);


    const [columns] = useState([
        { name: 'text', title: 'Наименование' },

    ]);

    const [rows] = useState(dataRows);
    const [sorting, setSorting] = useState([]);


    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
            {...restProps}
            // eslint-disable-next-line no-alert
            onDoubleClick={() => alert(JSON.stringify(row))}
        />
    );

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
            </Grid>
        </div>
    );
};


export default TempTable;