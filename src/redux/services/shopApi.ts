import { baseApi } from "../api/baseApi";

export type TShop = {
  id: string;
  vendorEmail?: string;
  name: string;
  logoUrl: string;
  description: string;
  isBlacklisted?: boolean;
};

const extendedShop = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyShop: builder.query({
      query: () => ({
        url: "vendor/get-my-shop",
        method: "GET",
      }),
      providesTags: ["shop"],
    }),
    getAllShop: builder.query({
      query: () => ({
        url: "admin/all-shops",
        method: "GET",
      }),
      providesTags: ["shop"],
    }),
    createShop: builder.mutation({
      query: (data) => ({
        url: "vendor/create-shop",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["shop"],
    }),
    blockShop: builder.mutation({
      query: (shopId: string) => ({
        url: `admin/block-shop/${shopId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["shop"],
    }),
    editShop: builder.mutation({
      query: (data) => ({
        url: `vendor/update-shop`,
        method: "PATCH",
        body: data,
      }),
      // Invalidates the product cache to refetch updated data
      invalidatesTags: ["shop"],
    }),
  }),
});

export const {
  useGetMyShopQuery,
  useCreateShopMutation,
  useGetAllShopQuery,
  useBlockShopMutation,
  useEditShopMutation,
} = extendedShop;
