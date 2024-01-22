import { memo } from 'react';
import classNames from 'classnames';
import Container from '../container';
import BtnSignOut from '../../ui/btnSignOut';
import BtnReturn from '../../ui/btnReturn';
import styles from './HeaderUser.module.scss';

function HeaderUser({ name, logout }) {
  const callbacks = {
    onAdd: (e) => console.log('Выйти/Вход'),
  };
  return (
    <>
      <header className={classNames(styles.HeaderUser)}>
        <Container types={'flexend'}>
          <BtnReturn />
          <img className={styles.avatar} src={'#partner.avatar'} alt="Avatar" />
          <div className={styles.about}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.status}>Партнер</p>
          </div>
          <BtnSignOut logout={logout} />
        </Container>
      </header>
    </>
  );
}

export default memo(HeaderUser);
