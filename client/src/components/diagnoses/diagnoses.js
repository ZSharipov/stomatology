import React, { useState, useEffect } from 'react';
import '@icon/open-iconic/open-iconic.css'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

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
    TableEditColumn,

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


const Diagnoses = () => {


    const doctors = [
        { id: 1, code: 'К00.1', text: 'Сверхкомплектные зубы' },
        { id: 2, code: 'К00.3', text: 'Крапчатые зубы' },
        { id: 3, code: 'К00.4', text: 'Нарушения формирования зубов' },
        { id: 4, code: 'К00.7', text: 'Синдром прорезывания зубов' },
        { id: 5, code: 'К00.8', text: 'Другие нарушения развития зубов' },
        { id: 6, code: 'К00.9', text: 'Нарушение развития зубов не уточненное' }
    ]

    const [defaultColumnWidths] = useState([
        { columnName: 'code', width: 90 },
        { columnName: 'text', width: 250 }
    ]);


    const [columns] = useState([
        { name: 'code', title: 'Код:' },
        { name: 'text', title: 'Наименование' },

    ]);

    const [rows, setRows] = useState(doctors);
    const [sorting, setSorting] = useState([]);

    // useEffect(() => {
    //     setRows(doctors)
    // }, [doctors])




    // eslint-disable-next-line no-alert
    const commitChanges = (args) => {
        const { deleted } = args;
        if (deleted) {
            const doc = rows.find((row) => {
                return row.id === deleted[0];
            })
            console.log(doc);
        };
    }

    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
          {...restProps}
          // eslint-disable-next-line no-alert
          onDoubleClick={() => alert(JSON.stringify(row))}

        
         
        />
      );


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
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <IntegratedFiltering />

                <Table
                rowComponent={TableRow}
                    messages={tableMessages}
                />

                <TableFilterRow messages={filterRowMessages} />


                <TableEditRow />
                <TableEditColumn
                    showDeleteCommand
                    width={70}
                    messages={editColumnMessages}
                />




            </Grid>
        </div>
    );
};


// const mapDispatchToProps = {
//     fetchDoctors: fetchDoctors,
// }


export default Diagnoses;