import { Navigate, Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import { ROUTES } from './routerPaths';
import { RequireAuth } from '~/hoc/RequireAuth';
import UserList from '~/App/user-list';
import UserAbout from '~/App/user-about';
import { SignUp } from '~/App/sign-up';
import PageNotFound from '~/components/page-not-found';

function RouterApp() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to={ROUTES.USERS_LIST} />} />
        <Route path={ROUTES.USERS_LIST} element={<UserList />} />
        <Route
          path={ROUTES.USER}
          element={
            <RequireAuth>
              <UserAbout />
            </RequireAuth>
          }
        />
        <Route path={ROUTES.LOGIN_PAGE} element={<SignUp />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default memo(RouterApp);
