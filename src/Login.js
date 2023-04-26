import React, { useState, useContext, useEffect } from 'react';
import UserContext from './components/context/userContext';
import { useFetchUsersQuery, useAddUserMutation } from './components/store';
import Spinner from './components/spinner/spinner';
export default function login() {
  const [user, setUser] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [loginError, setLoginError] = useState(false);
  const [exist, setExist] = useState(false);
  const { loginHandler } = useContext(UserContext);
  const { data, error, isFetching } = useFetchUsersQuery();
  const [doAddUser, result] = useAddUserMutation();

  useEffect(() => {
    setLoginError(false);
  }, [user]);

  const onLogin = () => {
    const name = user.name;
    const password = user.password;
    if (data[name] && data[name] === password) {
      loginHandler(name);
      setUser({ name: '', password: '', confirmPassword: '' });
    } else {
      setLoginError(true);
    }
  };
  const onCreateUser = () => {
    const name = user.name;
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    if (name && password && confirmPassword === password) {
      doAddUser({ name, password });
      setUser({ name: '', password: '', confirmPassword: '' });
    }
  };

  let content = (
    <div className="flex flex-col m-2 items-center">
      {exist && (user.name.length <= 3 || user.password <= 3) ? (
        <p className="text-center p-2 text-red-500 italic">
          "Name or Password should minimum 3 chars required"
        </p>
      ) : (
        ''
      )}
      {result.isSuccess && (
        <p className="text-center p-2 text-green-500 italic">
          Added Successfylly!
        </p>
      )}
      {(error || result.isError) && (
        <p className="text-center p-2 text-red-500 italic">
          Something went wrong!
        </p>
      )}
      {loginError && (
        <p className="text-center p-2 text-red-500 italic">
          User Name or Password wrong. Else Create new user
        </p>
      )}
      <label className="text-center italic font-semibold m-2">
        Welcome to My Favorite List
      </label>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
        className="rounded border border-2 border-gray-700 px-1 m-2 focus:outline-violet-500"
        placeholder="Enter the name"
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="rounded border border-2 border-gray-700 px-1 m-2 focus:outline-violet-500"
        placeholder="Enter the password"
      />
      {exist && (
        <input
          type="password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          className="rounded border border-2 border-gray-700 px-1 m-2  focus:outline-violet-500"
          placeholder="Repeat the password"
        />
      )}
      <span
        className="block rounded-full border border-2 bg-gradient-to-r from-purple-400 to-pink-500 py-1 text-white w-[100px] text-center cursor-pointer mb-2"
        onClick={!exist ? onLogin : onCreateUser}
      >
        {!exist ? 'Login' : 'Add'}
      </span>
      <span
        className="block rounded-full border border-2 bg-gradient-to-r from-green-400 to-gray-500 py-1 text-white w-[100px] text-center cursor-pointer"
        onClick={() => setExist(!exist)}
      >
        {!exist ? 'Create User' : 'Login'}
      </span>
    </div>
  );

  if (isFetching) {
    content = <Spinner />;
  }

  return (
    <div className="h-[500px] grid  grid-cols-1 content-center">
      <div className="w-[50%] sm:w-[80%] md:w-[75%] content-center mx-auto bg-white p-4 rounded shadow-3xl">
        {content}
      </div>
    </div>
  );
}
