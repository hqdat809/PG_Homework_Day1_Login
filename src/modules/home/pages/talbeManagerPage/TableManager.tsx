import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { resetPage, setRenderingData } from 'modules/home/redux/tableReducer';
import 'modules/home/pages/talbeManagerPage/TableManager.css';
import FormFilter from 'modules/component/TableComponent/FormFilter';
import Table from 'modules/component/TableComponent/Table';
import Pagination from 'modules/component/TableComponent/Pagination';
import ModalConfirmDelete from 'modules/component/TableComponent/ModalConfirmDelete';
import { ITableItem } from 'models/table';

interface Props {}

const TableManager = () => {
  const [itemChosenDelete, setItemChosenDelete] = useState<ITableItem>();

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const resetBeforeReload = () => {
    dispatch(resetPage());
  };

  React.useEffect(() => {
    return resetBeforeReload();
  }, []);

  React.useEffect(() => {
    dispatch(setRenderingData(page));
  }, [page]);

  return (
    <div className="table-manager">
      <div className="wrapper-table">
        <legend>Payroll Transactions List</legend>
        <FormFilter />
        <Table page={page} setPage={setPage} setItemChosenDelete={setItemChosenDelete} />
        <Pagination setPage={setPage} />
        <ModalConfirmDelete
          item={itemChosenDelete}
          page={page}
          setItemChosenDelete={setItemChosenDelete}
        />
      </div>
    </div>
  );
};

export default TableManager;
