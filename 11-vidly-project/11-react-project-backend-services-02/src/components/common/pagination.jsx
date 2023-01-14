import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";

const Pagination = (props) => {
  const { currentPage, onPageChange, getPages } = props;

  // const pagesCount = Math.ceil(totalCount / pageSize);
  // const pages = _.range(1, pagesCount + 1);

  const { pages, pagesCount } = getPages();

  if (pagesCount === 1) {
    return null;
  }

  console.log("pagination");
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  // itemCount: PropTypes.number.isRequired,
  // pageSize: PropTypes.number.isRequired,
  // pagesCount: PropTypes.number.isRequired,
  getPages: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
