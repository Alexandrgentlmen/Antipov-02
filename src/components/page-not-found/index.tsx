import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.scss';
import { ROUTES } from '~/router';

function PageNotFound() {
  return (
    <div className={styles.PageNotFound}>
      <h1>Page Not Found</h1>
      <Link className={styles.link} to={ROUTES.USERS_LIST}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default memo(PageNotFound);
