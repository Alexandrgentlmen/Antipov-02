import { memo, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Bars } from 'react-loader-spinner';
import { generatePath, useSearchParams } from 'react-router-dom';
import styles from './UserList.module.scss';
import { getSearchParams } from '~/App/user-list/userList.helpers';
import UserCard from '~/components/user-card';
import Pagination from '~/components/pagination';
import Header from '~/components/header';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { usersSlice } from '~/store/userSlice';
import { UsersListResItem } from '~/api/users.types';
import { authSlice } from '~/store/authSlice';
import ErrorViewer from '~/components/error-viewer';
import { ROUTES } from '~/router';

function UserList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = getSearchParams(searchParams);
  useEffect(() => {
    dispatch(usersSlice.thunks.fetchUsersListThunk({ page }));
  }, [page]);

  const callbacks = {
    handlePag: useCallback((page: number) => {
      setSearchParams({ page: page.toString() });
    }, []),
    logoutUser: useCallback(() => {
      dispatch(authSlice.thunks.logoutThunk());
    }, []),
  };

  const usersRequest = useAppSelector(
    (state) => state.usersList.fetchUsersListRequest,
  );

  return (
    <>
      {usersRequest.error && <ErrorViewer error={usersRequest.error} />}
      <Bars
        height="80"
        width="80"
        color="#512689"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={styles.wrapperSpinner}
        visible={usersRequest.isLoading}
      />
      <Header types="spacearound" logout={callbacks.logoutUser}>
        <div className={classNames(styles.aboutTeam)}>
          <h1 className={styles.title}>Наша команда</h1>
          <p className={styles.text}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </p>
        </div>
      </Header>
      {usersRequest.data && (
        <div className={styles.UserList}>
          <ul className={classNames(styles.ourCompany, styles.listReset)}>
            {usersRequest.data.data.map((user: UsersListResItem) => (
              <UserCard
                key={user.id}
                name={`${user.first_name} ${user.last_name}`}
                id={user.id}
                avatarSrc={user.avatar}
                link={generatePath(ROUTES.USER, { id: user.id.toString() })}
              />
            ))}
          </ul>
          <Pagination
            onPag={callbacks.handlePag}
            maxPage={usersRequest.data.total_pages}
            currentPage={usersRequest.data.page}
          />
        </div>
      )}
    </>
  );
}

export default memo(UserList);
