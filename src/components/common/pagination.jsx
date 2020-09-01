import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { movieCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(movieCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <button
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "btn btn-info" : "page-link"}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  movieCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
