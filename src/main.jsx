/* eslint-disable react-refresh/only-export-components */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import './modify.css';

import routers from './routers';
import store from './store';

const App = () => {
  React.useEffect(() => {
    // handle anchor button
    document.addEventListener('click', function (event) {
      event.preventDefault(); // Don't navigate!
      const anchor = event.target.closest('a'); // Find closest Anchor (or self)
      if (!anchor) return; // Not found. Exit here.
      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');
      if (String(href).startsWith('#')) {
        const id = String(href).replaceAll('#', '');
        if (document.getElementById(id)) {
          document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
          });
        } else {
          if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // console.log("not found");
          }
        }
      } else if (target === '_blank') {
        window.open(href, '_blank').focus();
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
