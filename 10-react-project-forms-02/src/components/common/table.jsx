import React from "react";
import TableBody from "./table-body";
import TableHeader from "./table-header";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
