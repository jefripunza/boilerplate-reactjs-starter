import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <div className="grid col-1 rounded bg-white shadow-sm p-4 mb-14">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.element,
};

export default Container;
