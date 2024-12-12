import { TProduct, TResponseRedux } from "../../types";
import { baseApi } from "../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Products
    getProductsByVendor: builder.query({
      query: () => ({
        url: "vendor/get-products",
        method: "GET",
      }),
      providesTags: ["product"],
      keepUnusedDataFor: 0,
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetProductsByVendorQuery } = vendorApi;
