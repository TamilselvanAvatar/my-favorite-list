import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-favorite-list-94d32-default-rtdb.firebaseio.com',
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  tagTypes: ['users'],
  endpoints(builder) {
    return {
      addUser: builder.mutation({
        invalidatesTags: ['users'],
        //in genral user refer arg
        //When we add users , Below thing will execute "fetchUsers" key
        query: ({ name, password }) => {
          return {
            url: '/users.json',
            body: { [name]: password },
            method: 'PATCH',
          };
        },
      }),
      fetchUsers: builder.query({
        providesTags: ['users'],
        // in genral 'user' refer arg
        //This is included for refetch the Users when we a new Users
        query: () => {
          return {
            url: '/users.json',
            method: 'GET',
          };
        },
      }),
    };
  },
});
// State are automatically create Slice and then add to Origial state
// The Hook is automatically created
// And Appended with Query or Mutation
export const { useFetchUsersQuery, useAddUserMutation } = usersApi;
export { usersApi };
