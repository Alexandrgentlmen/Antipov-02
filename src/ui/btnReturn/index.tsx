import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './BtnReturn.module.scss';
import { ROUTES } from '~/router';

const BtnReturn = () => {
  const navigate = useNavigate();
  return (
    <button
      className={classNames(styles.btnReturn, styles.btnLeft)}
      onClick={navigate(ROUTES.USERS_LIST)}
    >
      Назад
    </button>
  );
};

export default BtnReturn;
