import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const listApi = createApi({
  reducerPath: 'list',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-favorite-list-94d32-default-rtdb.firebaseio.com',
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  tagTypes: ['list'],
  endpoints(builder) {
    return {
      addList: builder.mutation({
        invalidatesTags: ['list'],
        //in genral user refer arg
        //When we add users , Below thing will execute "fetchUsers" key
        query: (listName) => {
          return {
            url: '/list.json',
            body: { [listName]: '[]' },
            method: 'PATCH',
          };
        },
      }),
      //Adjust - best word
      removeList: builder.mutation({
        invalidatesTags: ['list'],
        //in genral user refer arg
        //When we add users , Below thing will execute "fetchUsers" key
        query: (obj) => {
          return {
            url: '/list.json',
            body: { ...obj },
            method: 'PUT',
          };
        },
      }),
      fetchList: builder.query({
        providesTags: ['list'],
        // in genral 'user' refer arg
        //This is included for refetch the Users when we a new Users
        query: () => {
          return {
            url: '/list.json',
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
export const { useFetchListQuery, useAddListMutation, useRemoveListMutation } =
  listApi;
export { listApi };
