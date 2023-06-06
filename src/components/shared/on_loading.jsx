import React from 'react';
import { SpinnerDefault } from '../../components/shared/loader';

const OnLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SpinnerDefault />
    </div>
  );
};

export default OnLoading;
