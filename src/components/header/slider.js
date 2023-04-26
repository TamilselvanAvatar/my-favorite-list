import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineCancel } from 'react-icons/md';
import Profile from '../profile/profile';
export default function ({ onClose }) {
  const [close, setClose] = useState(true);
  const content = useRef();
  const overClose = useRef();

  const blackDropHandler = (e) => {
    if (e.target === content.current.parentElement) {
      setClose(false);
    }
  };

  useEffect(() => {
    if (overClose.current.classList[0] === 'animate-rSlide') {
      let time = setTimeout(() => {
        onClose(false);
        clearTimeout(time);
      }, 1000);
    }
  }, [close]);
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      ref={overClose}
      className={`${
        close ? 'animate-slide' : 'animate-rSlide overflow-hidden '
      } h-screen fixed top-0 left-0 `}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={blackDropHandler}
    >
      <div
        ref={content}
        className="lg:w-[20%] md:w-[40%] h-screen rounded relative flex flex-col bg-gradient-to-r from-violet-200 to-fuchsia-200 "
      >
        <div className="inline-block absolute right-0 top-0 rounded-full shadow-lg shadow-[#74777cd6] ">
          <MdOutlineCancel
            onClick={() => setClose(false)}
            className="text-lg text-red-500 cursor-pointer "
          />
        </div>
        <Profile onClose = {onClose} />
      </div>
    </div>,
    document.getElementById('modal')
  );
}
