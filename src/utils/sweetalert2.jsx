import React, { Component } from 'react';

// Sweet Alert 2 Package
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Components
import { SpinnerDefault } from '../components/shared/loader';

const Swal = withReactContent(MySwal);

export function closeModal() {
  Swal.close();
}

export function modalLoading(title) {
  Swal.fire({
    html: <SpinnerDefault title={title} />,

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
  });
}

export const createSuccess = (message, timer = 3000, ifClose = false) => {
  Swal.fire({
    title: <p>{message}</p>,
    icon: 'success',

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,

    willClose: () => {
      if (ifClose) {
        ifClose();
      }
    },

    timer,
  });
};
export const createError = (message) => {
  Swal.fire({
    title: <p>{message}</p>,
    icon: 'error',

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
  });
};
export const createWarning = (message) => {
  Swal.fire({
    title: <p>{message}</p>,
    icon: 'warning',

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
  });
};
export const createInfo = (message) => {
  Swal.fire({
    title: <p>{message}</p>,
    icon: 'info',

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
  });
};

export const createDelete = (onConfirm, message) => {
  Swal.fire({
    html: message,

    showConfirmButton: true,
    confirmButtonText: <span>Yes</span>,
    confirmButtonColor: '#dc3545',

    showCancelButton: true,
    cancelButtonText: <span>Cancel</span>,
    cancelButtonColor: '#6c757d',

    reverseButtons: false,
    showCloseButton: true,
    allowOutsideClick: false,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.isDenied) {
      Swal.close();
    }
  });
};

/**
 * @param {{ title: string|undefined, children: React.ReactElement, width: number, onOpen: Function|undefined, onClose: Function|undefined }} option
 */
export const createModal = (option) => {
  if (!option?.children) {
    throw new Error('please use children!');
  }
  if (!option?.width) {
    option.width = 600;
  }

  Swal.fire({
    title: option.title ? <p>{option.title}</p> : undefined,
    html: option.children,
    width: option.width,

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
    allowOutsideClick: false,

    didOpen: () => {
      if (option?.onOpen) {
        option.onOpen();
      }
    },
    didClose: () => {
      if (option?.onClose) {
        option.onClose();
      }
    },
  });
};
