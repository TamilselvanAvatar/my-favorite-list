import React, { createContext, useState } from 'react';

const ListContext = createContext();

const ListProvider = ({ children }) => {
  const capitalise = (value) =>
    value.slice(0, 1).toUpperCase() + value.slice(1);
  const snakeCase = (value) => value.toLowerCase().trim().replaceAll(' ', '_');
  const normalCase = (value) =>
    value
      .split('_')
      .map((el) => capitalise(el))
      .join(' ');

  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState('');

  const addList = (alist, currentList) => {
    // console.log(alist);
    setList([...alist]);
    setCurrentList(currentList);
  };

  const addObjToList = (obj) => {
    setList([...list, obj]);
  };

  const valueToshare = {
    list,
    addList,
    capitalise,
    snakeCase,
    normalCase,
    currentList,
    addObjToList,
  };

  return (
    <ListContext.Provider value={valueToshare}>{children}</ListContext.Provider>
  );
};

export { ListProvider };
export default ListContext;
