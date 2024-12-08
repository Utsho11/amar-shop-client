import { TCategory, TResponseRedux } from "../../types";
import { baseApi } from "../api/baseApi";

const extendedCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `category`,
        method: "GET",
      }),
      providesTags: ["category"],
      transformResponse: (response: TResponseRedux<TCategory[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    addCategory: builder.mutation({
      query: (newCategory: FormData) => ({
        url: `admin/create-category`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["category"],
    }),

    // Update an existing category
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `category/${id}`,
        method: "PATCH",
        body: updatedCategory,
      }),
      invalidatesTags: ["category"],
    }),

    // Delete a category
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = extendedCategory;
