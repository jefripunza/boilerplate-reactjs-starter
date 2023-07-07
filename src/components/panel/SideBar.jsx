/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { forwardRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import routers from '../../routers';

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useLocation();
  const [openNested, setNested] = useState(null);

  const open = (route) => {
    setNested((prevState) => {
      return prevState == route.title ? null : route.title;
    });
  };

  const children = routers.routes
    .find((route) => route.path == '/panel')
    .children.filter((route) => !route.index)
    .filter((route) => route.path != '*');
  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src="/ferox-transparent.png" alt="company logo" />
        </picture>
      </div>

      <div className="flex flex-col">
        {children.map((route, i) => {
          const MenuIcon = route.icon;

          const children_nested = route?.children;
          if (children_nested && children_nested.length > 0) {
            return (
              <div
                key={i}
                className={`pl-6 py-3 mx-5 rounded cursor-pointer mb-3 flex items-start transition-colors ${
                  router.pathname == route.path
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-gray-400 hover:bg-orange-100 hover:text-orange-500'
                }`}
              >
                <div className="mr-2" onClick={() => open(route)}>
                  <MenuIcon className="h-5 w-5" />
                </div>
                <div onClick={() => open(route)}>
                  <p>{route.title}</p>
                </div>
                <ul className={'-ml-12 pt-8 space-y-3' + (openNested == route.title ? '' : ' hidden')}>
                  {children_nested
                    .filter((nested) => !nested.hidden)
                    .map((child_nested, i_nested) => {
                      return (
                        <li key={i_nested}>
                          <Link
                            key={i}
                            to={[route.path, child_nested.path].join('/')}
                            className="flex items-start no-underline p-2 px-4 text-gray-500 transition duration-75 rounded-lg group hover:bg-gray-700 hover:text-orange-500"
                          >
                            {child_nested.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          }

          return (
            <Link key={i} to={route.path} className="no-underline" onClick={() => setNested(null)}>
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  router.pathname == route.path
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-gray-400 hover:bg-orange-100 hover:text-orange-500'
                }`}
              >
                <div className="mr-2">
                  <MenuIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="no-underline">{route.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
