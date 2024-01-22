import { memo, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import styles from './UserList.module.scss';
import UserCard from '~/components/user-card';
import Pagination from '~/components/pagination';
import Header from '~/components/header';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { usersSlice } from '~/store/userSlice';
import { UsersListResItem } from '~/api/users.types';
import { Modal } from '~/ui/Modal';

function UserList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(usersSlice.thunks.fetchUsersListThunk({ page: 1 }));
  }, []);
  const callbacks = {
    handlePag: useCallback(
      (page: number) => {
        dispatch(usersSlice.thunks.fetchUsersListThunk({ page }));
      },
      [dispatch],
    ),
  };

  const usersRequest = useAppSelector(
    (state) => state.usersList.fetchUsersListRequest,
  );

  return (
    <>
      <Modal
        isOpen={!!usersRequest.error}
        onClose={() => {
          // dispatch(usersSlice.reducer.resetErrorUsersList());
          navigate('/');
        }}
      />
      <Bars
        height="80"
        width="80"
        color="#512689"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={styles.wrapperSpinner}
        visible={usersRequest.isLoading}
      />
      <Header />
      {usersRequest.data && (
        <div className={styles.UserList}>
          <ul className={classNames(styles.ourCompany, styles.listReset)}>
            {usersRequest.data.data.map((user: UsersListResItem) => (
              <UserCard
                key={user.id}
                name={`${user.first_name} ${user.last_name}`}
                avatarSrc={user.avatar}
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
