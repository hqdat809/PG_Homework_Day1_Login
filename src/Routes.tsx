import Cookies from 'js-cookie';
import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import {
  ACCESS_TOKEN_KEY,
  IS_REMEMBER,
  IS_REMEMBER_TRUE,
  IS_REMEMBER_FALSE,
} from './utils/constants';

const ReduxPage = lazy(() => import('./modules/home/pages/ReduxPage/ReduxPage'));
const TableManager = lazy(() => import('./modules/home/pages/talbeManagerPage/TableManager'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage2'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();
  const cookiesLogin = Cookies.get(IS_REMEMBER);

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route
          path={ROUTES.login}
          component={cookiesLogin === IS_REMEMBER_TRUE ? ReduxPage : LoginPage}
        />
        <ProtectedRoute path={ROUTES.reduxPage} component={ReduxPage} />
        <Route path={ROUTES.tableManager} component={TableManager} />
        <Route path={ROUTES.signUp} component={SignUpPage} />

        <Route path="/" component={cookiesLogin === IS_REMEMBER_TRUE ? ReduxPage : LoginPage} />
      </Switch>
    </Suspense>
  );
};
