import { memo } from 'react';
import { Link, useLocation, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import styles from './UserCard.module.scss';
import { ROUTES } from '~/router';
import LikeIcon from '~/assets/like-icon';

interface IUserCard {
  avatarSrc: string;
  name: string;
  id: number;
}

function UserCard({ avatarSrc, name, id }: IUserCard) {
  const location = useLocation();
  return (
    <li className={styles.item} key={id}>
      <Link
        className={classNames(styles.button, styles.card)}
        to={generatePath(ROUTES.USER, { id: id.toString() })}
        state={{ location }}
      >
        <img className={styles.avatar} src={avatarSrc} alt="Avatar" />
        <p className={styles.name}>{name}</p>
      </Link>

      <button className={`${styles.heart} btn-reset`}>
        <LikeIcon isLike={false} />
      </button>
    </li>
  );
}

export default memo(UserCard);
