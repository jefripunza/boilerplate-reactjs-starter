import React, { Component } from 'react';

// Sweet Alert 2 Package
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Components
import { SpinnerDefault } from '../components/shared/loader';

const Swal = withReactContent(MySwal);

export const createModal = (title, children, width = 600) => {
  Swal.fire({
    title: <p>{title}</p>,
    html: children,
    width,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
    allowOutsideClick: false,

    didOpen: () => {
      //
    },

    didClose: () => {
      //
    },
  });
};

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
    confirmButtonText: <span>Ya</span>,
    confirmButtonColor: '#dc3545',

    showCancelButton: true,
    cancelButtonText: <span>Batal</span>,
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

export function modalLoading(title) {
  Swal.fire({
    html: <SpinnerDefault title={title} />,

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
  });
}

export function closeModal() {
  Swal.close();
}
