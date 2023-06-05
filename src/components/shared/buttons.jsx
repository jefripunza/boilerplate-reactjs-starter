/* eslint-disable react/prop-types */
import React from 'react';
import { classNames } from './utils';

export function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className={classNames(
        'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PageButton({ children, className, active, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className={classNames(
        'relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ',
        className,
        active ? 'bg-orange-50 text-orange-500 hover:bg-orange-100' : 'bg-white text-gray-500 hover:bg-gray-100',
      )}
    >
      {children}
    </button>
  );
}
