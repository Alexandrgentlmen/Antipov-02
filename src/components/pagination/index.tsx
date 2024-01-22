import { memo, useMemo } from 'react';
// import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { getUUID } from '~/utils/getUUID';

interface IPagProps {
  onPag: (page: number) => void;
  maxPage: number;
  currentPage: number;
}

function Pagination({ onPag, maxPage, currentPage }: IPagProps) {
  const btnList = useMemo(
    () =>
      Array(maxPage)
        .fill(null)
        .map(() => getUUID()),
    [maxPage],
  );
  // const dispatch = useDispatch();
  const checkProfile = () => {
    // dispatch(fetchUser({ id }));
  };
  return (
    <ul className={`${styles.Pagination} list-reset`} onClick={checkProfile}>
      {btnList.map((id, idx) => (
        <button
          className={classNames(
            `${styles.pagBtn} btn-reset`,
            idx + 1 === currentPage &&
              `${styles.pagBtn} ${styles.active} btn-reset`,
          )}
          onClick={() => onPag(idx + 1)}
          key={id}
        >
          {idx + 1}
        </button>
      ))}
    </ul>
  );
}

export default memo(Pagination);
