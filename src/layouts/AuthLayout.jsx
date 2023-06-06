import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkToken } from '../app/auth';

import OnLoading from '../components/shared/on_loading';

const AuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    dispatch(checkToken())
      .unwrap()
      .then(([is_error, _]) => {
        if (is_error) {
          // console.log('not login...');
          return;
        }
        // console.log('login...');
        navigate('/panel', { replace: true });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  if (!isLoaded) return <OnLoading />; // <Navigate to={"/login"} replace />
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
