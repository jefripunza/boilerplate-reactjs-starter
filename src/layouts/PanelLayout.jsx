import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Transition } from '@headlessui/react';

import { checkToken } from '../app/auth';

import TopBar from '../components/panel/TopBar';
import SideBar from '../components/panel/SideBar';

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

  // if (!isLoaded) return <>Loading...</>;
  // if (!isLogin) return <>You're not login...</>;

  const [showNav, setShowNav] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  React.useEffect(() => {
    if (typeof window != 'undefined') {
      addEventListener('resize', handleResize);
    }

    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={React.Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} />
      </Transition>
      <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? 'pl-56' : ''}`}>
        <div className="px-4 md:px-16">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
