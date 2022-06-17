import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from 'models/user';
import { IDataItem } from 'models/home';
import { useDispatch } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';

export interface HomeState {
  inforItems?: IDataItem[];
  isLoading?: boolean;
}

// set lai type
export const setListItem = createCustomAction('home/getListItem', (data: IDataItem[]) => ({
  data,
}));

export const setMoreItem = createCustomAction('home/setMoreItem', (data: IDataItem[]) => ({
  data,
}));

export const setLoadding = createCustomAction('home/setLoading', (data: boolean) => ({
  data,
}));

export const cleanDataItem = createCustomAction('home/cleanDataItem');

const actions = { setListItem, setMoreItem, setLoadding, cleanDataItem };

type Action = ActionType<typeof actions>;

export default function reducer(state: HomeState = {}, action: Action) {
  switch (action.type) {
    case getType(setListItem):
      return { ...state, inforItems: action.data };
    case getType(setMoreItem):
      return { ...state, inforItems: state.inforItems?.concat(action.data) };
    case getType(setLoadding):
      return { ...state, isLoading: action.data };
    case getType(cleanDataItem):
      return { ...state, inforItems: [] };
    default:
      return state;
  }
}
