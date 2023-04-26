import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
export default function buttonList({
  title,
  data,
  name,
  addList,
  normalCase,
  deleteList,
  close,
}) {
  const [element, setElement] = useState(false);
  const onClickHandler = () => {
    const tempList = [...eval(data[title])];
    addList(tempList, { key: title, data });
    close(false);
  };
  const onDeletHandler = () => {
    let obj = { ...data };
    delete obj[title.toString()];
    deleteList(obj);
  };
  return (
    <div
      className={`rounded-full drop-shadow-2xl p-2 m-2 w-[80%] mx-auto bg-gray-500 text-white text-center  ${
        element ? 'flex flex-row items-center justify-around' : ''
      } cursor-pointer`}
      onClick={onClickHandler}
      onMouseEnter={() => {
        setElement(true);
      }}
      onMouseLeave={() => {
        setElement(false);
      }}
    >
      <span>{normalCase(title.replace(name, '').trim())}</span>
      {element && (
        <span className="text-xl text-red-500 rounded-full  bg-white">
          <MdDelete onClick={onDeletHandler} />
        </span>
      )}
    </div>
  );
}
