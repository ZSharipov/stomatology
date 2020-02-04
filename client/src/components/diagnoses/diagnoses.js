import React, { useState, useEffect } from 'react';
import '@icon/open-iconic/open-iconic.css'
//import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import {
    FilteringState,
    IntegratedFiltering,
    EditingState,
    SortingState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    // TableHeaderRow,
    TableFilterRow,
    TableEditRow,
    TableColumnResizing,

} from '@devexpress/dx-react-grid-bootstrap4';


//my imports
import './diagnoses.css'



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


const Diagnoses = () => {


    

    const diagnoses = [
        { id: 1, code: 'К00.1', text: 'Сверхкомплектные зубы' },
        { id: 2, code: 'К00.3', text: 'Крапчатые зубы' },
        { id: 3, code: 'К00.4', text: 'Нарушения формирования зубов' },
        { id: 4, code: 'К00.7', text: 'Синдром прорезывания зубов' },
        { id: 5, code: 'К00.8', text: 'Другие нарушения развития зубов' },
        { id: 6, code: 'К00.9', text: 'Нарушение развития зубов не уточненное' },
        { id: 7, code: 'К01.0', text: 'Ретенированные зубы' },
        { id: 8, code: 'К01.1', text: 'Импактные зубы' },
        { id: 9, code: 'К02.0', text: 'Кариес эмали' },
        { id: 10, code: 'К02.1', text: 'Кариес дентина' },
        { id: 11, code: 'К02.2', text: 'Кариес цемента' },
        { id: 12, code: 'К02.3', text: 'Приостановившийся кариес зубов' },
        { id: 13, code: 'К02.4', text: 'Одонтоклазия' },
        { id: 14, code: 'К02.8', text: 'Другой кариес зубов' },
        { id: 15, code: 'К02.9', text: 'Кариес зубов неуточненный' },
        { id: 16, code: 'К03.0', text: 'Повышенное стирание зубов' },
        { id: 17, code: 'К03.1', text: 'Сошлифование зубов' },
        
    ]

    const [defaultColumnWidths] = useState([
        { columnName: 'code', width:  45},
        { columnName: 'text', width: 127 }
    ]);


    const [columns] = useState([
        { name: 'code', title: 'Код:' },
        { name: 'text', title: 'Наименование' },

    ]);

    const [rows, setRows] = useState(diagnoses);
    const [sorting, setSorting] = useState([]);

    // useEffect(() => {
    //     setRows(diagnoses)
    // }, [diagnoses])




   

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


// const mapDispatchToProps = {
//     fetchDiagnoses: fetchDiagnoses,
// }


export default Diagnoses;