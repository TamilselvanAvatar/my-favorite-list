import React, { useState, useContext, useEffect } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import ProfileList from '../list/buttonList';
import ListContext from '../context/listContext';
import UserContext from '../context/userContext';
import {
  useFetchListQuery,
  useAddListMutation,
  useRemoveListMutation,
} from '../store';
import Spinner from '../spinner/spinner';
export default function profileList({ onClose }) {
  const { data, error, isFetching } = useFetchListQuery();
  const [doAddList, result] = useAddListMutation();
  const [doRemoveList, rResult] = useRemoveListMutation();
  const [profileList, setProfileList] = useState([]);
  const [listAdder, setListAdder] = useState(false);
  const [title, setTitle] = useState('');
  const { addList, normalCase, snakeCase } = useContext(ListContext);
  const { login, logOutHandler } = useContext(UserContext);

  useEffect(() => {
    if (login.name) {
      const tempList = Object.keys(data || {}).filter((key) =>
        key.startsWith(login.name + '_')
      );
      setProfileList(tempList);
    }
  }, [data]);

  const deleteList = (obj) => {
    doRemoveList(obj);
  };

  let listContent = profileList.map((name, index) => {
    return (
      <ProfileList
        title={name}
        name={login.name}
        key={index}
        data={data}
        normalCase={normalCase}
        addList={addList}
        deleteList={deleteList}
        close={onClose}
      />
    );
  });

  if (isFetching || result.isLoading || rResult.isLoading) {
    listContent = <Spinner />;
  }

  const handleSave = () => {
    setListAdder(false);
    doAddList(snakeCase(login.name + ' ' + title));
    setTitle('');
  };
  const textStyle = 'text-center text-sm italic';
  return (
    <>
      <div className="w-[40%] mx-auto mt-5 mb-2">
        <img
          className="rounded-full bg-current"
          src="https://th.bing.com/th/id/OIP.qv32lLxfIsQEoi9ohch7ewAAAA?pid=ImgDet&w=300&h=318&rs=1"
          alter="Profile"
        />
      </div>
      <div className={textStyle}>Welcome {login.name || 'Saitama'}</div>
      <div className={textStyle}>
        <p
          className="cursor-pointer itatic text-blue-500"
          onClick={logOutHandler}
        >
          Sign out
        </p>
      </div>
      <hr className="border-2 w-[95%] mx-auto m-4" />
      <div className="font-semibold ml-2 relative mr-2">
        <span>Your List</span>
        <span
          className="rounded absolute top-0 right-0 border border-solid border-black bg-gray-100 hover:bg-blue-500 hover:text-white hover:border-none"
          onClick={() => setListAdder(!listAdder)}
        >
          {listAdder ? <RiSubtractLine /> : <RiAddLine title="Add List" />}
        </span>
      </div>
      <div
        className="my-3 w-[90%] mx-auto"
        style={{ display: `${listAdder ? 'block' : 'none'}` }}
      >
        <input
          type="text"
          className="w-[70%] mx-auto ml-2 px-1 rounded md:placeholder:text-sm md:w-[55%]"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Type the Title"
        />
        <input
          type="button"
          className="w-[20%] mx-auto ml-2 px-2 rounded bg-violet-500 cursor-pointer md:text-sm md:w-[25%] outline outline-2 outline-violet-500"
          value="Save"
          onClick={handleSave}
        />
      </div>
      <div className="rounded border shadow-3xl w-[95%] mx-auto mt-2">
        {error || result.isError || rResult.isError ? (
          <p className="text-center italic text-red-500">
            Something went wrong
          </p>
        ) : (
          listContent
        )}
      </div>
    </>
  );
}
