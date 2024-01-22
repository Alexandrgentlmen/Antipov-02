import { FC } from 'react';
import styles from './LikeIcon.module.scss';

interface LikeIconProps {
  isLike: boolean;
}
const LikeIcon = ({ isLike }: LikeIconProps) => {
  const props = isLike
    ? {
        stroke: '#512689',
        fill: '#512689',
      }
    : {
        stroke: '#151317',
        fill: '#f8f8f8',
      };

  return (
    <svg
      className={styles.LikeIcon}
      height="24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
};
export default LikeIcon;
