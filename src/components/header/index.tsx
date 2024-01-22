import { memo } from 'react';
import classNames from 'classnames';
import Container from '../container';
import styles from './Header.module.scss';
import BtnSignIn from './../../ui/btnSignIn';
import BtnReturn from './../../ui/btnReturn';
import BtnSignOut from '~/ui/btnSignOut';

function Header() {
  const token = localStorage.getItem('token');

  const callbacks = {
    onAdd: (e) => console.log('Выйти/Вход'),
    // onAdd: (e) => props.onAdd(props.item._id)
  };

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
        {token ? <BtnSignOut /> : <BtnSignIn />}
      </Container>
    </header>
  );
}

export default memo(Header);
