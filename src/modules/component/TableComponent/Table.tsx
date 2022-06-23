import React, { useState } from 'react';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITableItem } from 'models/table';
import { useDispatch, useSelector } from 'react-redux';

import {
  setRenderingData,
  sortByTotalDecrease,
  sortByTotalIncrease,
} from 'modules/home/redux/tableReducer';
import { AppState } from 'redux/reducer';
import ItemTable from './ItemTable';

interface Props {
  page: number;
  setPage(index: number): void;
  setItemChosenDelete(item: ITableItem): void;
}

const Table = (props: Props) => {
  const { page, setItemChosenDelete } = props;
  const dispatch = useDispatch();

  const renderingData = useSelector((state: AppState) => state.table.renderingData);

  const [sortIncrease, setSortIncrease] = useState(true);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="header-table" scope="col">
            Status
          </th>
          <th className="header-table" scope="col">
            Date
          </th>
          <th className="header-table" scope="col">
            Current
          </th>
          <th
            scope="col"
            className="sort-total"
            onClick={() => {
              if (sortIncrease) {
                dispatch(sortByTotalIncrease());
              } else {
                dispatch(sortByTotalDecrease());
              }
              setSortIncrease(!sortIncrease);
              dispatch(setRenderingData(page));
            }}
          >
            Total <FontAwesomeIcon icon={faArrowsUpDown} />
          </th>
          <th className="header-table" scope="col">
            Invoice #
          </th>
          <th className="header-table" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {renderingData?.map((item, index) => (
          <>
            <ItemTable
              key={index}
              page={page}
              item={item}
              setItemChosenDelete={setItemChosenDelete}
            />
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
