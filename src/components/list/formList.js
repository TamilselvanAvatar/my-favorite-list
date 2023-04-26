import React, { useState, useRef, useEffect } from 'react';
import List from './list';
export default function FormList() {
  const [term, setTerm] = useState('');
  const [show, setShow] = useState(false);
  const input = useRef();
  const onSubmitHandler = () => {
    setTerm(input.current.value);
  };
  useEffect(() => {
    if (!show) {
      setTerm('');
    }
  }, [show]);
  return (
    <div className="flex flex-wrap flex-col items-center w-[75%] mx-auto my-5">
      <div className="sm:flex sm:flex-col sm:items-center ">
        <input
          ref={input}
          type="text"
          value={term}
          onChange={onSubmitHandler}
          className="rounded border border-2 border-sky-500 focus:outline-none focus:shadow-2xl focus:outline-sky-100 focus:shadow-sky-50 px-2 placeholder:italic placeholder:text-slate-400 "
          placeholder="Type Title"
        />
        <input
          value={`${show ? 'Close' : 'Add'}`}
          type="button"
          className={`mx-2 sm:mt-1 rounded px-2 border-2  bg-green-500 w-[60px] text-center cursor-pointer ${
            show ? 'bg-red-400' : ''
          } `}
          onClick={() => term && setShow(!show)}
        />
      </div>
      {show && <List term={show ? term : ''} newClose={setShow} />}
    </div>
  );
}
