import React, { useState } from "react";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import "@icon/open-iconic/open-iconic.css";
import "./materials.css";
import {
  FilteringState,
  IntegratedFiltering,
  SortingState,
} from "@devexpress/dx-react-grid";

import {
  Grid,
  Table,
  TableFilterRow,
  TableColumnResizing,
  TableColumnVisibility,
} from "@devexpress/dx-react-grid-bootstrap4";

const getRowId = (row) => row.id;
const tableMessages = {
  noData: "Нет данных",
};

const filterRowMessages = {
  filterPlaceholder: "...",
};

const Materials = ({ materials, defaultHiddenColumnNames = ["code"] }) => {
  const [defaultColumnWidths] = useState([
    { columnName: "code", width: 0 },
    { columnName: "text", width: 240 },
  ]);
  const [columns] = useState([
    { name: "code", title: "Код:" },
    { name: "text", title: "Наименование" },
  ]);
  const [rows] = useState(materials);
  const [sorting, setSorting] = useState([]);

  const TableRow = ({ row, ...restProps }) => {
    const cellValue = row["code"]; //for RedBackgraund
    let cellStyle;
    if (cellValue === "") {
      cellStyle = { backgroundColor: "#20f13826", fontWeight: "bold" };
    }

    return (
      <Table.Row
        {...restProps}
        className="trActive"
        onClick={() => {
          if (row["code"] === "") return;
          const txt = document.getElementById("txtArea").value;
          document.getElementById("txtArea").value =
            txt + row["code"] + ": " + row["text"] + "\r\n";
        }}
        style={cellStyle} //for RedBackgraund
      />
    );
  };
  const [tableColumnExtensions] = useState([
    { columnName: "text", wordWrapEnabled: true },
  ]);

  return (
    <div className="div-for-rows">
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table
          columnExtensions={tableColumnExtensions}
          rowComponent={TableRow}
          messages={tableMessages}
        />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableFilterRow messages={filterRowMessages} />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
      </Grid>
    </div>
  );
};

export default Materials;
