import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        {...props}
        className={classNames(styles.Button, className)}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
