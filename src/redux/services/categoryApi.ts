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
  }),
});

export const { useGetCategoriesQuery } = extendedCategory;
