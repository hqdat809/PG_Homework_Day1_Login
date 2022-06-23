import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { ITableItem } from 'models/table';
import {
  clearFilter,
  deleteData,
  filterData,
  setRenderingData,
} from 'modules/home/redux/tableReducer';
import {
  STATUS_NAME,
  STATUS_OPTIONS,
  currencyFormat,
  formatColorStatus,
} from 'modules/intl/constants';
import { IValueFilter } from 'models/filter';

const FormFilter = () => {
  const dispatch = useDispatch();

  const [isShowBtnApply, SetIsShowBtnApply] = useState(false);
  const [isShowBtnClear, setIsShowBtnClear] = useState(false);
  const [valueFilter, setValueFilter] = useState<IValueFilter>({
    status: '',
    dateFrom: '',
    dateTo: '',
    invoice: '',
  });

  return (
    <form
      onSubmit={(e) => {
        setIsShowBtnClear(true);
        SetIsShowBtnApply(false);
        e.preventDefault();
        console.log('submit');
        dispatch(filterData(valueFilter));
        dispatch(setRenderingData(1));
      }}
      style={{ display: 'flex' }}
    >
      <fieldset className="form-filter">
        <div className="mb-3">
          <label className="form-label">Status</label>
          <Select
            id="disabledSelect"
            options={STATUS_OPTIONS}
            onChange={(e) => {
              if (e) {
                if (e.value !== '') {
                  SetIsShowBtnApply(true);
                }
                setValueFilter({ ...valueFilter, status: e.value });
              }
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date From</label>
          <input
            type="date"
            className="form-control"
            placeholder="Disabled input"
            value={valueFilter.dateFrom}
            onChange={(e) => {
              if (e.target.value !== '') {
                SetIsShowBtnApply(true);
              }
              setValueFilter({ ...valueFilter, dateFrom: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date To</label>
          <input
            type="date"
            className="form-control"
            placeholder="Disabled input"
            value={valueFilter.dateTo}
            onChange={(e) => {
              if (e.target.value !== '') {
                SetIsShowBtnApply(true);
              }
              setValueFilter({ ...valueFilter, dateTo: e.target.value });
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Invoice</label>
          <input
            type="text"
            id="disabledTextInput"
            className="form-control"
            placeholder="#Invoice"
            value={valueFilter.invoice}
            onChange={(e) => {
              if (!e.target.value) {
                SetIsShowBtnApply(false);
              } else {
                SetIsShowBtnApply(true);
              }
              setValueFilter({ ...valueFilter, invoice: e.target.value });
            }}
          />
        </div>
      </fieldset>
      <div className="btns-action">
        <button type="submit" className="btn btn-primary" disabled={!isShowBtnApply}>
          Aplly
        </button>
        <button
          className="btn-clear-filter btn "
          type="button"
          onClick={() => {
            SetIsShowBtnApply(false);
            setValueFilter({
              status: '',
              dateFrom: '',
              dateTo: '',
              invoice: '',
            });
            setIsShowBtnClear(false);
            dispatch(clearFilter());
            dispatch(setRenderingData(1));
          }}
          disabled={!isShowBtnClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormFilter;
