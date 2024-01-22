import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import styles from './BtnSignIn.module.scss';
import { ROUTES } from '~/router';

const BtnSignIn = () => {
  const location = useLocation();

  return (
    <Link
      className={classNames(styles.BtnSignIn, styles.btnRight)}
      to={ROUTES.LOGIN_PAGE}
      state={{ location }}
    >
      Вход
    </Link>
  );
};

export default BtnSignIn;
