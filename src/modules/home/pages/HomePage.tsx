import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { IDataItem } from 'models/home';
import { fetchThunk } from 'modules/common/redux/thunk';
import ItemInfor from 'modules/component/ItemInfor';
import LoadingItemInfor from 'modules/component/LoadingItemInfor';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { IS_REMEMBER, IS_REMEMBER_FALSE } from '../../../utils/constants';
import { setListItem, setMoreItem, cleanDataItem } from '../redux/homeReducer';
import './HomePage.css';

interface Props {}

const HomePage = (props: Props) => {
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handleLogout = () => {
    Cookies.set(IS_REMEMBER, IS_REMEMBER_FALSE);
    dispatch(replace(ROUTES.login));
  };
  const listUser = useSelector((state: AppState) => state.home.inforItems);

  const handleGetInforUsers = async () => {
    setIsLoading(true);

    const json = await dispatch(
      fetchThunk(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10`, 'get')
    );

    dispatch(setListItem(json));

    console.log(json);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleGetMoreItem = async () => {
    setIsLoading(true);

    const json = await dispatch(
      fetchThunk(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${10}`, 'get')
    );

    dispatch(setMoreItem(json));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 1
    ) {
      console.log('scroll test');
      setPage(page + 1);
    }
  };

  console.log(listUser);

  const handleCleanBeforeUnmout = () => {
    dispatch(cleanDataItem());
  };

  React.useEffect(() => {
    return handleCleanBeforeUnmout();
  }, []);

  React.useEffect(() => {
    handleGetMoreItem();
  }, [page]);

  React.useEffect(() => {
    handleGetInforUsers();
    console.log('useEffect chay');
  }, []);

  return (
    <div>
      <header className="header">
        <h1>HomePage</h1>
        <button onClick={handleLogout} className="btn btn-primary">
          Đăng xuất
        </button>
        <button onClick={handleGetMoreItem} className="btn btn-primary">
          Load more data
        </button>
      </header>

      <div className="content">
        {listUser &&
          listUser.map((item, index) => {
            return (
              <>
                <ItemInfor item={item} key={index} />
              </>
            );
          })}
        {isLoading && (
          <>
            <LoadingItemInfor />
            <LoadingItemInfor />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
