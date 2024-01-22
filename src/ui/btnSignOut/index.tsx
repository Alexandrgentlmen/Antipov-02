import classNames from 'classnames';
import styles from './BtnSignOut.module.scss';

const BtnSignOut = ({ logout }) => {
  return (
    <button
      className={classNames(styles.BtnSignOut, styles.btnRight)}
      onClick={() => {
        localStorage.removeItem('token');
        logout;
      }}
    >
      Выход
    </button>
  );
};

export default BtnSignOut;
