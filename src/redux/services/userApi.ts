import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user"],
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
  }),
});

export const {
  useGetUsersQuery,
  useSuspendUserMutation,
  useDeleteUserMutation,
} = userApi;
