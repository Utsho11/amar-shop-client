import { TCategory } from "../../types";
import { baseApi } from "../api/baseApi";

const extendedCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => ({
        url: `category`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = extendedCategory;
