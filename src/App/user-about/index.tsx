import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserAbout.module.scss';
import Container from '~/components/container';
import HeaderUser from '~/components/header-user';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import Teammate from '~/components/teammate';
import { authSlice } from '~/store/authSlice';
import { usersSlice } from '~/store/userSlice';

function UserAbout() {
  const dispatch = useAppDispatch();
  const userRequest = useAppSelector(
    (state) => state.usersList.fetchUserRequest,
  );

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(usersSlice.thunks.fetchUserThunk({ id }));
    }
    return () => {
      dispatch(usersSlice.actions.clearUser());
    };
  }, [id]);

  const fullName = userRequest.data
    ? `${userRequest.data.data.first_name} ${userRequest.data.data.last_name}`
    : '';
  const avatar = userRequest.data?.data.avatar ?? '';

  const callbacks = {
    logoutUser: useCallback(() => {
      dispatch(authSlice.thunks.logoutThunk());
    }, []),
  };

  return (
    <>
      <HeaderUser
        logout={callbacks.logoutUser}
        name={fullName}
        avatar={avatar}
      />
      <Container types={'spacebetween'}>
        <div className={styles.UserAbout}>
          {userRequest.data && <Teammate email={userRequest.data.data.email} />}
        </div>
      </Container>
    </>
  );
}
export default memo(UserAbout);
