import Cookies from 'js-cookie';
import React from 'react';
import { ROUTES } from '../../../configs/routes';
import { IS_REMEMBER, IS_REMEMBER_FALSE } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { replace } from 'connected-react-router';

interface Props {}

const HomePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handleLogout = () => {
    Cookies.set(IS_REMEMBER, IS_REMEMBER_FALSE);
    dispatch(replace(ROUTES.login));
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleLogout} className="btn btn-primary">
        Đăng xuất
      </button>
    </div>
  );
};

export default HomePage;
