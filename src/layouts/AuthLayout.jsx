import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkToken } from '../app/auth';

const AuthLayout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = React.useState(false);
  const [isLogin, setLogin] = React.useState(false);

  React.useEffect(() => {
    dispatch(checkToken())
      .unwrap()
      .then((data) => {
        if (data) {
          console.log({ data });
          setLogin(true);
        } else {
          console.log('not login...');
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [dispatch]);

  if (!isLoaded) return <>Loading...</>;
  if (isLogin) return <>You're login...</>;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
