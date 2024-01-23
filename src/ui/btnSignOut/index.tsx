import classNames from 'classnames';
import styles from './BtnSignOut.module.scss';

interface BtnSignOutProps {
  logout: () => void;
}

const BtnSignOut = ({ logout }: BtnSignOutProps) => {
  return (
    <button
      className={classNames(styles.BtnSignOut, styles.btnRight)}
      onClick={logout}
    >
      Выход
    </button>
  );
};

export default BtnSignOut;
