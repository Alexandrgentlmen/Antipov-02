import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/store/hooks';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  // const token = localStorage.getItem('token');
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
