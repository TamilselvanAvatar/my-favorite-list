import React, { useContext, useEffect } from 'react';
import Header from './components/header/header';
import ListHeader from './components/header/listHeader';
import List from './components/list/list';
import ListContext from './components/context/listContext';
import UserContext from './components/context/userContext';
import { useRemoveListMutation } from './components/store';
import Spinner from './components/spinner/spinner';
export default function Root() {
  const { currentList, list } = useContext(ListContext);
  const { login } = useContext(UserContext);
  const [doAddList, result] = useRemoveListMutation();
  // console.log(list); minor bug

  useEffect(() => {
    if (currentList) {
      // console.log('List - Main', list);
      const tempData = { ...currentList.data };
      tempData[currentList.key] = JSON.stringify(list);
      doAddList(tempData);
    }
  }, [list]);
  return (
    <>
      <Header title="My Favorite List" />
      <ListHeader />
      {result.isLoading ? (
        <Spinner />
      ) : result.isError ? (
        <p className="text-center text-red-500">Something went wrong!</p>
      ) : (
        login &&
        list.map((el, index) => {
          return <List key={index} {...el} />;
        })
      )}
    </>
  );
}
