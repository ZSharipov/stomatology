import React, { useState, useEffect } from 'react';
import '@icon/open-iconic/open-iconic.css'

import { fetchDiagnoses } from '../../actions'
import { connect } from 'react-redux';

import {
    FilteringState,
    IntegratedFiltering,
   
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableFilterRow,
    TableColumnResizing,
 

} from '@devexpress/dx-react-grid-bootstrap4';


//my imports
import './diagnoses.css'



const getRowId = row => row.id;

const tableMessages = {
    noData: 'Нет данных',
};

const filterRowMessages = {
    filterPlaceholder: '...',
};

const Diagnoses = ({title, fetchDiagnoses, diagnoses}) => {

    //#region 
    // const diagnoses = [
    //     { id: 1, code: 'К00.1', text: 'Сверхкомплектные зубы' },
    //     { id: 2, code: 'К00.3', text: 'Крапчатые зубы' },
    //     { id: 3, code: 'К00.4', text: 'Нарушения формирования зубов' },
    //     { id: 4, code: 'К00.7', text: 'Синдром прорезывания зубов' },
    //     { id: 5, code: 'К00.8', text: 'Другие нарушения развития зубов' },
    //     { id: 6, code: 'К00.9', text: 'Нарушение развития зубов не уточненное' },
    //     { id: 7, code: 'К01.0', text: 'Ретенированные зубы' },
    //     { id: 8, code: 'К01.1', text: 'Импактные зубы' },
    //     { id: 9, code: 'К02.0', text: 'Кариес эмали' },
    //     { id: 10, code: 'К02.1', text: 'Кариес дентина' },
    //     { id: 11, code: 'К02.2', text: 'Кариес цемента' },
    //     { id: 12, code: 'К02.3', text: 'Приостановившийся кариес зубов' },
    //     { id: 13, code: 'К02.4', text: 'Одонтоклазия' },
    //     { id: 14, code: 'К02.8', text: 'Другой кариес зубов' },
    //     { id: 15, code: 'К02.9', text: 'Кариес зубов неуточненный' },
    //     { id: 16, code: 'К03.0', text: 'Повышенное стирание зубов' },
    //     { id: 17, code: 'К03.1', text: 'Сошлифование зубов' },
    //     { id: 18, code: 'К03.2', text: 'Эрозия зубов' },
    //     { id: 19, code: 'К03.3', text: 'Патологическая резорбция зубов' },
    //     { id: 20, code: 'К03.4', text: 'Гиперцементоз' },
    //     { id: 21, code: 'К03.5', text: 'Анкилоз зубов' },
    //     { id: 22, code: 'К03.6', text: 'Отложения (наросты) на зубах' },
    //     { id: 24, code: 'К03.7', text: 'Изменение цвета твердых тканей зубов после прорезывания' },
    //     { id: 25, code: 'К03.8', text: 'Другие уточненные болезни твердых тканей зубов' },
    //     { id: 26, code: 'К03.9', text: 'Болезнь твердых тканей зубов не уточненная' },
    //     { id: 27, code: 'К04.0', text: 'Пульпит' },
    //     { id: 28, code: 'К04.1', text: 'Некроз пульпы' },
    //     { id: 29, code: 'К04.2', text: 'Дегенерация пульпы' },
    //     { id: 30, code: 'К04.4', text: 'Острый апикальный периодонтит пульпарного происхождения' },
    //     { id: 31, code: 'К04.5', text: 'Хронический апикальный периодонтит' },
    //     { id: 32, code: 'К04.6', text: 'Периапикальный абсцесс с полостью' },
    //     { id: 33, code: 'К04.7', text: 'Периапикальный абсцесс без полости' },
    //     { id: 34, code: 'К04.8', text: 'Корневая киста' },
    //     { id: 35, code: 'К04.9', text: 'Другие и не уточненные болезни пульпы и периапикальных тканей' },
    //     { id: 36, code: 'К05.0', text: 'Острый гингивит' },
    //     { id: 37, code: 'К05.1', text: 'Хронический гингивит' },
    //     { id: 38, code: 'К05.2', text: 'Острый пародонтит' },
    //     { id: 39, code: 'К05.3', text: 'Хронический пародонтит' },
    //     { id: 40, code: 'К05.4', text: 'Пародонтоз' },
    //     { id: 41, code: 'К05.5', text: 'Другие болезни пародонта' },
    //     { id: 42, code: 'К05.6', text: 'Болезнь пародонта неуточненная' },
    //     { id: 43, code: 'К06.0', text: 'Рецессия десны' },
    //     { id: 44, code: 'К06.1', text: 'Гипертрофия десны' },
    //     { id: 45, code: 'К06.2', text: 'Поражения десны и беззубого альвеолярного края, обусловленные травмой' },
    //     { id: 46, code: 'К06.8', text: 'Другие уточненные изменения десны и беззубого альвеолярного края' },
    //     { id: 47, code: 'К06.9', text: 'Изменение десны и беззубого альвеолярного края неуточненное' },
    //     { id: 48, code: 'К07.6', text: 'Болезни височно-челюстного сустава' },
    //     { id: 49, code: 'К08.2', text: 'Атрофия беззубого альвеолярного края' },
    //     { id: 50, code: 'К08.8', text: 'Другие уточненные изменения зубов и их опорного аппарата' },
    //     { id: 51, code: 'К09.0', text: 'Кисты, образовавшиеся в процессе формирования зубов' },
    //     { id: 52, code: 'К09.1', text: 'Ростовые (неодонтогенные) кисты области рта' },
    //     { id: 53, code: 'К10.2', text: 'Воспалительные заболевания челюстей' },
    //     { id: 54, code: 'К10.3', text: 'Альвеолит челюстей' },
    //     { id: 55, code: 'К11.2', text: 'Сиалоаденит' },
    //     { id: 56, code: 'К12.0', text: 'Рецидивирующие афты полости рта' },
    //     { id: 57, code: 'К12.1', text: 'Другие формы стоматита' },
    //     { id: 58, code: 'К12.2', text: 'Флегмона и абсцесс полости рта' },
    //     { id: 59, code: 'К13.0', text: 'Болезни губ' },
    //     { id: 60, code: 'К13.2', text: 'Лейкоплакия и другие изменения эпителия полости рта, включая язык' },
    //     { id: 61, code: 'К14.0', text: 'Глоссит' },
    //     { id: 62, code: 'К14.1', text: '«Географический» язык' },
    //     { id: 63, code: 'К14.2', text: 'Срединный ромбовидный глоссит' },
    //     { id: 64, code: 'К14.3', text: 'Гипертрофия сосочков языка' },
    //     { id: 65, code: 'К14.4', text: 'Атрофия сосочков языка' },
    //     { id: 66, code: 'К14.5', text: 'Складчатый язык' },
    //     { id: 67, code: 'К14.6', text: 'Глоссодиния' },
    //     { id: 68, code: 'К14.8', text: 'Другие болезни языка' },
    //     { id: 69, code: 'К14.9', text: 'Болезнь языка не уточненная' },

    // ]
    //#endregion

    const [defaultColumnWidths] = useState([
        { columnName: 'code', width: 45 },
        { columnName: 'text', width: 127 }
    ]);

    const [columns] = useState([
        { name: 'code', title: 'Код:' },
        { name: 'text', title: 'Наименование' },

    ]);

    const [rows, setRows] = useState(diagnoses);

    useEffect(() => {
        setRows(diagnoses)
    }, [diagnoses])

    useEffect(() => {
        fetchDiagnoses()
    }, [fetchDiagnoses])

  


    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
            {...restProps}
            className='trActive'
            onClick={() => {
                const txt = document.getElementById('txtArea').value;
                document.getElementById('txtArea').value =
                    (txt + title + row['code'] + '>' + row['text'] + "\r\n")
            }}

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
               
                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />                 
                <Table
                    columnExtensions={tableColumnExtensions}
                    rowComponent={TableRow}
                    messages={tableMessages} />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow messages={filterRowMessages} />
               
                
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        diagnoses: state.diagnoses.diagnoses,
    }
}


const mapDispatchToProps = {
    fetchDiagnoses: fetchDiagnoses
}



export default connect(mapStateToProps, mapDispatchToProps)(Diagnoses);