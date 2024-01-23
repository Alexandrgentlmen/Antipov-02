import classNames from 'classnames';
import styles from './BtnReturn.module.scss';

interface BtnReturn {
  onBack: () => void;
}

const BtnReturn = ({ onBack }: BtnReturn) => {
  return (
    <button
      className={classNames(styles.btnReturn, styles.btnLeft)}
      onClick={onBack}
    >
      Назад
    </button>
  );
};

export default BtnReturn;
