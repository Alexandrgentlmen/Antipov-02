import { Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import { ROUTES } from './routerPaths';
import UserList from '~/app/user-list';
import UserAbout from '~/app/user-about';
import PageNotFound from '~/components/page-not-found';
import { SignUp } from '~/app/sign-up';
import { RequireAuth } from '~/hoc/RequireAuth';

function RouterApp() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.USERS_LIST} element={<UserList />} />
        <Route
          path={ROUTES.USER}
          element={
            <RequireAuth>
              <UserAbout />
            </RequireAuth>
          }
        />
        <Route path={'*'} element={<PageNotFound />} />
        <Route path={ROUTES.LOGIN_PAGE} element={<SignUp />} />
      </Routes>
    </>
  );
}

export default memo(RouterApp);
