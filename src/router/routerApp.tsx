import { Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import { ROUTES } from './routerPaths';
import { RequireAuth } from '~/hoc/RequireAuth';
import UserList from '~/app/user-list';
import UserAbout from '~/app/user-about';
import { SignUp } from '~/app/sign-up';
import PageNotFound from '~/components/page-not-found';

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
        <Route path={ROUTES.LOGIN_PAGE} element={<SignUp />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default memo(RouterApp);
