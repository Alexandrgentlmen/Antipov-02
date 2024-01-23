import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './UserCard.module.scss';
import LikeIcon from '~/assets/like-icon';

interface IUserCard {
  avatarSrc: string;
  name: string;
  id: number;
  link: string;
}

function UserCard({ avatarSrc, id, name, link }: IUserCard) {
  const location = useLocation();

  return (
    <li className={styles.item} key={id}>
      <Link
        className={classNames(styles.button, styles.card)}
        to={link}
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
