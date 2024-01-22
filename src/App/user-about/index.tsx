import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserAbout.module.scss';
import Container from '~/components/container';
import HeaderUser from '~/components/header-user';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import Teammate from '~/components/teammate';
import { authSlice } from '~/store/authSlice';
import { ROUTES } from '~/router';

function UserAbout() {
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.auth.regData.token);
  const dispatch = useAppDispatch();
  const userRequest = useAppSelector(
    (state) => state.usersList.fetchUserRequest,
  );
  console.log(userRequest);
  useEffect(() => {
    navigate(ROUTES.USERS_LIST);
  }, [authToken]);

  const callbacks = {
    logoutUser: useCallback(() => {
      dispatch(authSlice.actions.logout());
    }, [dispatch]),
  };
  return (
    <>
      <HeaderUser
        profile={userRequest}
        logout={callbacks.logoutUser}
        name={`${userRequest.first_name} ${userRequest.last_name}`}
      />
      <Container types={'spacebetween'}>
        <div className={styles.UserAbout}>
          <Teammate profile={userRequest} />
        </div>
      </Container>
    </>
  );
}
export default memo(UserAbout);
