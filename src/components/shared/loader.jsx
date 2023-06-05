import React from 'react';
import Loader from 'react-js-loader';

export const BubblePing = () => {
  return <Loader type="bubble-ping" bgColor={'#F97316'} color={'#F97316'} size={100} />;
};

export const SpinnerDefault = (title = null) => {
  return <Loader type="spinner-default" title={title} bgColor={'#F97316'} color={'#F97316'} size={100} />;
};
