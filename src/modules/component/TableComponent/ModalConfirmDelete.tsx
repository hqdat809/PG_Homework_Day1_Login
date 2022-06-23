import React, { useState } from 'react';
import { ITableItem } from 'models/table';
import { useDispatch } from 'react-redux';

import { deleteData, setRenderingData } from 'modules/home/redux/tableReducer';

interface Props {
  item: ITableItem | undefined;
  page: number;
  setItemChosenDelete(item: ITableItem): void;
}

const ModalConfirmDelete = (props: Props) => {
  const { item, page } = props;
  console.log(item);

  const dispatch = useDispatch();
  const modal = document.getElementsByClassName('modal');

  const handleClickCancel = () => {
    modal[0].classList.remove('active');
    console.log('item: ', item);
  };

  const handleConfirmDelete = (item: ITableItem) => {
    console.log('item: ', item);
    modal[0].classList.remove('active');
    dispatch(deleteData(item));
    dispatch(setRenderingData(page));
  };
  return (
    <div className="modal" tabIndex={-1} role="dialog" id="DeleteModal-@customer.customer_id">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Confirmation</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this item ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                // console.log(item);
                handleClickCancel();
              }}
            >
              No
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => {
                console.log(item);
                if (item) handleConfirmDelete(item);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
