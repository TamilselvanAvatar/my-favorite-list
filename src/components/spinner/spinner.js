import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
export default function Spinner() {
  return (
    <div className="w-[25%] mx-auto items-center flex flex-col">
      <ImSpinner9 className="text-[100px]  animate-spinner" />
    </div>
  );
}
