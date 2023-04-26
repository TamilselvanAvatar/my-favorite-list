import React, { useState } from 'react';

import Slider from './slider';
import { FiMenu } from 'react-icons/fi';
export default function Header({ title }) {
  const [show, setShow] = useState(false);
  let modal = '';
  if (show) {
    modal = <Slider onClose={setShow} />;
  }
  return (
    <>
      <div className="mx-0.4 bg-violet-500 rounded p-2 flex items-center text-center">
        <span className="flex-auto w-[8%]">
          <FiMenu
            className="text-xl cursor-pointer"
            onClick={() => setShow(!show)}
          />
        </span>
        <span className="flex-auto w-[92%]">{title}</span>
      </div>
      {modal}
    </>
  );
}
