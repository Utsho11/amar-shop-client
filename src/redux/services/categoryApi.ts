import { TCategory } from "../../types";
import { baseApi } from "../api/baseApi";

const extendedCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => `category`,
      transformResponse: (response: TCategory[]) => response,
      providesTags: ["category"],
    }),

    // postCategory: builder.mutation<Category, Partial<Category>>({
    //   query: (newCategory) => ({
    //     url: "addCategory",
    //     method: "POST",
    //     body: newCategory,
    //   }),
    //   invalidatesTags: ["category"],
    //   transformResponse: (response: Category) => response,
    // }),

    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `/deleteCategory/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["category"],
    // }),
  }),
});

export const { useGetCategoriesQuery } = extendedCategory;
