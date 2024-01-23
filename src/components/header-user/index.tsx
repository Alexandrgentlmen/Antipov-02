import { memo } from 'react';
import classNames from 'classnames';
import Container from '../container';
import BtnSignOut from '../../ui/btnSignOut';
import BtnReturn from '../../ui/btnReturn';
import styles from './HeaderUser.module.scss';
import { useAppSelector } from '~/store/hooks';

interface HeaderUserProps {
  page: 'users-list' | 'user-about';
  name: string;
  avatar: string;
  logout: () => void;
  onBack: () => void;
}

function HeaderUser({ onBack, page, name, logout, avatar }: HeaderUserProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  page === 'users-list' && (
    <header className={classNames(styles.Header)}>
      <Container types={'spacearound'}>
        {onBack && <BtnReturn onBack={onBack} />}
        <div className={classNames(styles.aboutTeam)}>
          <h1 className={styles.title}>Наша команда</h1>
          <p className={styles.text}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </p>
        </div>
        {isAuth ? <BtnSignOut logout={logout} /> : <BtnSignIn />}
      </Container>
    </header>
  );
  page === 'user-about' && (
    <header className={classNames(styles.HeaderUser)}>
      <Container types={'flexend'}>
        {onBack && <BtnReturn onBack={onBack} />}
        <img className={styles.avatar} src={avatar} alt="Avatar" />
        <div className={styles.about}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.status}>Партнер</p>
        </div>
        <BtnSignOut logout={logout} />
      </Container>
    </header>
  );
}
export default memo(HeaderUser);
