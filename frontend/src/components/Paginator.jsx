import React from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function Paginator({ pageData }) {
  const [, setPageNumber] = useSearchParams();

  const handleSetPageNumber = (page) => {
    setPageNumber({ pg: page });
  };

  if (!pageData) {
    return null;
  }
  const { has_next, has_previous, next, previous, range, total_page } =
    pageData;


  const renderPrevious = () => {
    if (has_previous) {
      return (
        <>
          <Pagination.First onClick={() => handleSetPageNumber(1)} />
          <Pagination.Prev onClick={() => handleSetPageNumber(previous)} />
        </>
      );
    }
    return null;
  };

  const renderNext = () => {
    if (has_next) {
      return (
        <>
          <Pagination.Next onClick={() => handleSetPageNumber(next)} />
          <Pagination.Last onClick={() => handleSetPageNumber(total_page)} />
        </>
      );
    }
  };

  const renderPaginationNumber = () => {
    return range.map((n) => (
      <Pagination.Item key={n} onClick={() => handleSetPageNumber(n)}>
        {n}
      </Pagination.Item>
    ));
  };

  return (
    <Pagination>
      {renderPrevious()}

      {renderPaginationNumber()}

      {renderNext()}
    </Pagination>
  );
}

export default Paginator;
