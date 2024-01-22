// import { useDispatch, useSelector } from 'react-redux';
// import { changeNumberPage, fetchTeam } from 'store/teamSlice';

import styles from './BtnLoad.module.scss';

const BtnLoad = () => {
  // const dispatch = useDispatch();
  // const numPage = useSelector((state) => state.team.numPage);
  const getMoreUsers = () => {
    // dispatch(changeNumberPage());
    // dispatch(fetchTeam(numPage));
  };
  return (
    <button className={styles.BtnLoad} onClick={getMoreUsers}>
      Показать ещё
    </button>
  );
};

export default BtnLoad;
