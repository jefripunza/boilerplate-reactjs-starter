import { Fragment } from 'react';
import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Transition, Popover } from '@headlessui/react';
import { Link } from 'react-router-dom';

const Notification = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="outline-none mr-5 md:mr-8 cursor-pointer text-gray-700">
        <BellIcon className="h-6 w-6" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95"
        enterTo="transform scale-100"
        leave="transition ease-in duration=75"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-95"
      >
        <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen">
          <div className="relative p-3">
            <div className="flex justify-between items-center w-full">
              <p className="text-gray-700 font-medium">Notifications</p>
              <a className="text-sm text-orange-500" href="!#">
                Mark all as read
              </a>
            </div>
            <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
              <div className="flex">
                <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700">Notification Title</p>
                  <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                </div>
              </div>
              <div className="flex">
                <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700">Notification Title</p>
                  <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                </div>
              </div>
              <div className="flex">
                <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700">Notification Title</p>
                  <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                </div>
              </div>
              <div className="flex">
                <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700">Notification Title</p>
                  <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Notification;
