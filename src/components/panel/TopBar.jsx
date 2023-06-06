import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Menu, Transition } from '@headlessui/react';
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';

import NotificationDropDown from './NotificationDropDown';

import { logout } from '../../app/auth';

function TopBar({ showNav, setShowNav }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? 'pl-56' : ''
      }`}
    >
      <div className="pl-4 md:pl-4">
        <Bars3CenterLeftIcon className="h-8 w-8 text-gray-700 cursor-pointer" onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <NotificationDropDown />
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              {/* <picture>
                <img
                  src={`${user.img_avatar}`}
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile"
                />
              </picture> */}
              <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    to="#"
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="#"
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Billing
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/panel/settings"
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <a
                    href="#logout"
                    className="flex hover:bg-orange-500 hover:text-white text-red-500 rounded p-2 text-sm group transition-colors items-center"
                    onClick={async () => {
                      dispatch(logout())
                        .unwrap()
                        .then(([is_error, _]) => {
                          if (!is_error) {
                            setTimeout(() => {
                              navigate('/login', { replace: true });
                            }, 500);
                          }
                        });
                    }}
                  >
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                    Logout
                  </a>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default TopBar;
