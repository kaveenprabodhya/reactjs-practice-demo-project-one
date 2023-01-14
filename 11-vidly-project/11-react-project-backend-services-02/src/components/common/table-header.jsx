import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === undefined) {
      return null;
    }
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className={!column.path ? "" : "clickable col-sm-2"}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              <div className="d-flex justify-content-between">
                <span>{column.lable}</span>
                <span>{!column.path ? "" : this.renderSortIcon(column)}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
