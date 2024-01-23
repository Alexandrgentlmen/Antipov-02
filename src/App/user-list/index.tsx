import { memo, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Bars } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';
import styles from './UserList.module.scss';
import { getSearchPArams } from './userList.helpers';
import UserCard from '~/components/user-card';
import Pagination from '~/components/pagination';
import Header from '~/components/header';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { usersSlice } from '~/store/userSlice';
import { UsersListResItem } from '~/api/users.types';
import { authSlice } from '~/store/authSlice';
import ErrorViewer from '~/components/error-viewer';

function UserList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = getSearchPArams(searchParams);
  useEffect(() => {
    dispatch(usersSlice.thunks.fetchUsersListThunk({ page }));
  }, [page]);
  const callbacks = {
    handlePag: useCallback(
      (page: number) => {
        setSearchParams({ page: page.toString() });
      },
      [dispatch],
    ),
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
      <Header logout={callbacks.logoutUser} />
      {usersRequest.data && (
        <div className={styles.UserList}>
          <ul className={classNames(styles.ourCompany, styles.listReset)}>
            {usersRequest.data.data.map((user: UsersListResItem) => (
              <UserCard
                key={user.id}
                name={`${user.first_name} ${user.last_name}`}
                avatarSrc={user.avatar}
                id={user.id}
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
