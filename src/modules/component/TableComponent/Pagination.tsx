import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';

interface Props {
  setPage(index: number): void;
}

const Pagination = (props: Props) => {
  const { setPage } = props;

  const listTable = useSelector((state: AppState) => state.table.filteredData);
  const numberPage = Math.ceil(listTable ? listTable.length / 5 : 0);

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">>"
      onPageChange={(e) => {
        setPage(e.selected + 1);
      }}
      pageRangeDisplayed={5}
      pageCount={numberPage}
      previousLabel="<<"
    />
  );
};

export default Pagination;
