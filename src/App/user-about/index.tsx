import { memo, useCallback, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import styles from './UserAbout.module.scss';

import { getParams } from '~/App/user-about/UserAbout.helper';
import Container from '~/components/container';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import Teammate from '~/components/teammate';
import { authSlice } from '~/store/authSlice';
import { usersSlice } from '~/store/userSlice';
import Header from '~/components/header';

function UserAbout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRequest = useAppSelector(
    (state) => state.usersList.fetchUserRequest,
  );
  const { id } = useParams<{ id: string }>();
  const { id: userId } = getParams(id);
  useEffect(() => {
    if (userId !== undefined) {
      dispatch(usersSlice.thunks.fetchUserThunk({ id: userId }));
    }
    return () => {
      dispatch(usersSlice.actions.clearUser());
    };
  }, [userId]);

  console.log('AFTER REGISTRATION   location', location);
  // const fromPage =
  //   location.state?.from?.pathname || location.state?.location?.pathname;
  const fromPage =
    location.state?.location.state?.from?.state?.location?.pathname ||
    location.state?.location?.pathname;
  console.log('AFTER REGISTRATION   fromPage', fromPage);

  const fullName = userRequest.data
    ? `${userRequest.data.data.first_name} ${userRequest.data.data.last_name}`
    : '';
  const avatar = userRequest.data?.data.avatar ?? '';

  const callbacks = {
    logoutUser: useCallback(() => {
      dispatch(authSlice.thunks.logoutThunk());
    }, []),
    stepBack: () => navigate(fromPage),
  };

  return (
    <>
      <Bars
        height="80"
        width="80"
        color="#512689"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={styles.wrapperSpinner}
        visible={userRequest.isLoading}
      />
      <Header
        onBack={callbacks.stepBack}
        types="flexend"
        logout={callbacks.logoutUser}
      >
        <img className={styles.avatar} src={avatar} alt="Avatar" />
        <div className={styles.about}>
          <h1 className={styles.name}>{fullName}</h1>
          <p className={styles.status}>Партнер</p>
        </div>
      </Header>
      <Container types={'spacebetween'}>
        <div className={styles.UserAbout}>
          {userRequest.data && <Teammate email={userRequest.data.data.email} />}
        </div>
      </Container>
    </>
  );
}
export default memo(UserAbout);
