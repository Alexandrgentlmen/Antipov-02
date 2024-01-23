import { memo } from 'react';
import styles from './Header.module.scss';
import Container from '~/components/container';
import BtnReturn from '~/ui/btnReturn';
import { useAppSelector } from '~/store/hooks';
import BtnSignOut from '~/ui/btnSignOut';
import BtnSignIn from '~/ui/btnSignIn';

interface HeaderProps {
  logout: () => void;
  onBack?: () => void;
  children?: React.ReactNode;
  types: 'spacearound' | 'spacebetween' | 'flexstart' | 'flexend' | '';
}

function Header({ logout, onBack, types, children }: HeaderProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <header className={styles.Header}>
      <Container types={types}>
        {onBack && <BtnReturn onBack={onBack} />}
        {children}
        {isAuth ? <BtnSignOut logout={logout} /> : <BtnSignIn />}
      </Container>
    </header>
  );
}

export default memo(Header);
