import { memo } from 'react';
import classNames from 'classnames';
import Container from '../container';
import styles from './Header.module.scss';
import BtnSignIn from './../../ui/btnSignIn';
import BtnReturn from './../../ui/btnReturn';
import BtnSignOut from '~/ui/btnSignOut';
import { useAppSelector } from '~/store/hooks';

interface HeaderProps {
  logout: () => void;
}

function Header({ logout }: HeaderProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <header className={classNames(styles.Header)}>
      <Container types={'spacearound'}>
        <BtnReturn />
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
}

export default memo(Header);
