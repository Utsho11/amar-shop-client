import { TResponseRedux, TTNXHistory } from "../../types";
import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user"],
      keepUnusedDataFor: 0,
    }),

    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/admin/suspend-user/${id}`,
        method: "PATCH",
      }),
      // Invalidates the product cache to refetch updated data
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `admin/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    getTNXDetails: builder.query({
      query: () => ({
        url: "admin/all-transactions",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: TResponseRedux<TTNXHistory[]>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useSuspendUserMutation,
  useDeleteUserMutation,
  useGetTNXDetailsQuery,
} = userApi;
