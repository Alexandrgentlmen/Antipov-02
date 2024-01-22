import { memo } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

interface ITypes {
  children?: React.ReactNode;
  types: 'spacearound' | 'spacebetween' | 'flexstart' | 'flexend' | '';
}

function Container({ children, types }: ITypes) {
  return (
    <div className={classNames(styles.Container, styles[types])}>
      {children}
    </div>
  );
}

export default memo(Container);
