import { ITableItem, FilterState } from './../../../models/table';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import DataApi from 'data/tableData.json';
import moment from 'moment';
import { STATUS_NAME } from 'modules/intl/constants';

export interface TableState {
  allData?: ITableItem[];
  selectedData?: ITableItem[];
  filteredData?: ITableItem[];
  renderingData?: ITableItem[];
  filterState?: FilterState;
}

const InitTableState: TableState = {
  allData: DataApi,
  selectedData: DataApi,
  filteredData: DataApi,
  renderingData: [],
  filterState: {
    status: '',
    dateFrom: '',
    dateTo: '',
    invoice: '',
  },
};

export const setRenderingData = createCustomAction('table/setRenderingData', (data: number) => ({
  data,
}));

export const deleteData = createCustomAction('table/deleteData', (data: ITableItem) => {
  return {
    data,
  };
});

export const filterData = createCustomAction('table/filterData', (data: FilterState) => ({
  data,
}));

export const clearFilter = createCustomAction('table/clearFilter', () => {
  return;
});

export const sortByTotalIncrease = createCustomAction('table/sortByTotalIncrease', () => {
  return;
});

export const sortByTotalDecrease = createCustomAction('table/sortByTotalDecrease', () => {
  return;
});

export const resetPage = createCustomAction('table/resetPage', () => {
  return;
});

const actions = {
  setRenderingData,
  deleteData,
  filterData,
  clearFilter,
  resetPage,
  sortByTotalIncrease,
  sortByTotalDecrease,
};

type Action = ActionType<typeof actions>;

export default function reducer(state: TableState = InitTableState, action: Action) {
  switch (action.type) {
    case getType(setRenderingData): {
      const page = action.data;
      if (state.filteredData && state.filteredData.length > 5) {
        const newRenderingData = state.filteredData?.slice((page - 1) * 5, (page - 1) * 5 + 5);
        return { ...state, renderingData: newRenderingData };
      } else {
        return { ...state, renderingData: state.filteredData };
      }
    }

    case getType(deleteData): {
      // const deletedItemSelected = state.selectedData?.indexOf(action.data);
      const deletedItemFiltered = state.filteredData?.indexOf(action.data);
      // console.log(deletedItemSelected);
      // const newSelectedData = state.selectedData;
      console.log('item parse to delete', action.data);

      const newFilteredData = state.filteredData;
      if (deletedItemFiltered !== undefined) {
        // newSelectedData?.splice(deletedItemSelected, 1);
        const itemDeleted = newFilteredData?.splice(deletedItemFiltered, 1);
        console.log(itemDeleted);
      }
      // console.log(newSelectedData);
      return { ...state, filteredData: newFilteredData };
    }

    case getType(filterData): {
      // filter by status
      let newSelectedData = state.selectedData;
      if (action.data.status && newSelectedData) {
        if (action.data.status === STATUS_NAME.CANCELLED) {
          newSelectedData = newSelectedData.filter((item) => {
            return item.canceled;
          });
        } else if (action.data.status === STATUS_NAME.FULFILLED) {
          newSelectedData = newSelectedData.filter((item) => {
            return item.fulfilled && item.approved && item.matched;
          });
        } else if (action.data.status === STATUS_NAME.RECEIVED) {
          newSelectedData = newSelectedData.filter((item) => {
            return (
              item.received &&
              !item.approved &&
              !item.approved &&
              !item.canceled &&
              !item.fulfilled &&
              item.received &&
              !item.matched
            );
          });
        } else if (action.data.status === STATUS_NAME.PROCESSING) {
          newSelectedData = newSelectedData.filter((item) => {
            return (item.approved || item.matched) && !item.fulfilled;
          });
        } else if (action.data.status === STATUS_NAME.PENDING) {
          newSelectedData = newSelectedData.filter((item) => {
            return (
              !item.approved && !item.matched && !item.fulfilled && !item.canceled && !item.received
            );
          });
        }
        console.log(newSelectedData);
      }
      // filter by invoice
      if (action.data.invoice && newSelectedData) {
        newSelectedData = newSelectedData.filter((item) => {
          if (action.data.invoice) {
            return item.subpayroll_ids[0]?.includes(action.data.invoice);
          }
        });
        console.log(newSelectedData);
      }
      // filter by date
      if (action.data.dateFrom && action.data.dateTo && newSelectedData) {
        const startDate = moment(action.data.dateFrom, 'YYYY-MM-DD').toDate().getTime();
        const endDate = moment(action.data.dateTo, 'YYYY-MM-DD').toDate().getTime();
        newSelectedData = newSelectedData.filter((item) => {
          const selectedDate = moment(item.time_created, 'YYYY-MM-DD').toDate().getTime();
          return selectedDate > startDate && selectedDate < endDate;
        });
        console.log(newSelectedData);
      }
      return { ...state, filteredData: newSelectedData };
    }

    case getType(clearFilter): {
      return { ...state, filteredData: state.selectedData };
    }

    case getType(sortByTotalIncrease): {
      const newFilterdData = state.filteredData;
      if (newFilterdData) {
        newFilterdData.sort((a, b) => {
          return a.volume_input_in_input_currency - b.volume_input_in_input_currency;
        });
      }
      return { ...state, filteredData: newFilterdData };
    }

    case getType(sortByTotalDecrease): {
      const newFilterdData = state.filteredData;
      if (newFilterdData) {
        newFilterdData.sort((a, b) => {
          return a.volume_input_in_input_currency - b.volume_input_in_input_currency;
        });
        newFilterdData.reverse();
      }
      return { ...state, filteredData: newFilterdData };
    }

    case getType(resetPage): {
      return InitTableState;
    }

    default:
      return state;
  }
}
