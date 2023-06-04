import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <div className="grid col-1 rounded bg-white h-96 shadow-sm p-4">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.element,
};

export default Container;
