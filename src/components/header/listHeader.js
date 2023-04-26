import React, { useState, useContext } from 'react';
import ListContext from '../context/listContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import FormList from '../list/formList';
export default function ListHeader() {
  const { normalCase, currentList } = useContext(ListContext);
  const [add, setAdd] = useState(false);
  let title =
    currentList && normalCase(currentList.key.split('_').slice(1).join(' '));
  return (
    <>
      <div
        className={`w-[65%] rounded mx-auto p-2 items-center flex flex-row m-2 justify-evenly relative  ${
          currentList ? 'border shadow-3xl' : ''
        }`}
      >
        <span className="font-bold italic text-center">{title}</span>
        <span
          className="rounded m-2 absolute top-0 right-0 border border-solid border-black bg-gray-100 hover:bg-blue-500 hover:text-white hover:border-none"
          onClick={() => setAdd(!add)}
        >
          {currentList &&
            (add ? <RiSubtractLine /> : <RiAddLine title="Add List" />)}
        </span>
      </div>
      {add && <FormList />}
    </>
  );
}
