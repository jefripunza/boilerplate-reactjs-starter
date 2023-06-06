import React from 'react';

import { NoSymbolIcon } from '@heroicons/react/24/outline';

import { classNames } from '../../components/shared/utils';
import { fixZeros } from '../../helpers/changes';

const black_user_img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

export function UserAvatarCell({ value, column, row }) {
  const { img_avatar, phone_number, is_block, shop_name } = row.original;
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        {img_avatar ? (
          <img
            className="h-10 w-10 rounded-full"
            src={img_avatar}
            alt="user profile"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = black_user_img;
            }}
          />
        ) : (
          <img className="h-10 w-10 rounded-full" src={black_user_img} alt="user profile" />
        )}
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        {shop_name ? <div className="text-sm font-bold text-gray-900 font-italic">"{shop_name}"</div> : null}

        <div className="text-sm text-gray-500">{phone_number}</div>
        <div className="text-sm text-gray-500">
          {is_block ? <NoSymbolIcon className="h-5 w-5 text-red-600" aria-hidden="true" /> : null}
        </div>
      </div>
    </div>
  );
}

export function RoleCell({ value, row }) {
  let role = value;
  const { id_seller } = row.original;
  if (id_seller) {
    role = 'basic / seller';
  } else if (value == 'admin') {
    role = value;
  }
  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        role.startsWith('basic / seller') ? 'bg-green-100 text-green-800' : null,
        role.startsWith('basic') ? 'bg-blue-100 text-teal-800' : null,
      )}
    >
      {role}
    </span>
  );
}

export function DateCell({ value }) {
  if (!value) {
    return <span style={{ textAlign: 'center' }}>-</span>;
  }
  const date_value = new Date(value);
  const [year, month, date, hour, minute] = [
    date_value.getFullYear(),
    fixZeros(date_value.getMonth() + 1),
    fixZeros(date_value.getDate()),
    fixZeros(date_value.getHours()),
    fixZeros(date_value.getMinutes()),
  ];
  return (
    <span>
      {year}-{month}-{date} {hour}:{minute}
    </span>
  );
}

export function UserStatusCell({ row }) {
  let status;
  const { is_block, activity_at } = row.original;
  if (is_block) {
    status = 'Blocked';
  } else {
    if (activity_at) {
      status = 'Login';
    } else {
      status = 'Logout';
    }
  }
  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        status.startsWith('Login') ? 'bg-green-100 text-green-800' : null,
        status.startsWith('Logout') ? 'bg-yellow-100 text-yellow-800' : null,
        status.startsWith('Blocked') ? 'bg-red-100 text-red-800' : null,
      )}
    >
      {status}
    </span>
  );
}
