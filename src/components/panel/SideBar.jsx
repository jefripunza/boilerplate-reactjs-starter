import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import routers from '../../routers';

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useLocation();

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
          return (
            <Link key={i} to={route.path}>
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
                  <p>{route.title}</p>
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
