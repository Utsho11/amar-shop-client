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
      keepUnusedDataFor: 0,
    }),
    getAllShop: builder.query({
      query: () => ({
        url: "admin/all-shops",
        method: "GET",
      }),
      providesTags: ["shop"],
      keepUnusedDataFor: 0,
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
    getSingleShop: builder.query({
      query: (id) => ({
        url: `shop/${id}`,
        method: "GET",
      }),
      providesTags: ["shop"],
      keepUnusedDataFor: 0,
    }),

    getProductsBySingleShop: builder.query({
      query: (id) => ({
        url: `shop/products/${id}`,
        method: "GET",
      }),
      providesTags: ["shop"],
      keepUnusedDataFor: 0,
    }),

    getFollowers: builder.query({
      query: (id: string) => ({
        url: `shop/followers/${id}`,
        method: "GET",
      }),
      providesTags: ["follow"],
      keepUnusedDataFor: 0,
    }),

    followShop: builder.mutation({
      query: (shopId: string) => ({
        url: `shop/follow/${shopId}`,
        method: "POST",
      }),
      invalidatesTags: ["follow"],
    }),

    unfollowShop: builder.mutation({
      query: (shopId: string) => ({
        url: `shop/unfollow/${shopId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["follow"],
    }),
  }),
});

export const {
  useGetMyShopQuery,
  useCreateShopMutation,
  useGetAllShopQuery,
  useBlockShopMutation,
  useEditShopMutation,
  useGetSingleShopQuery,
  useGetProductsBySingleShopQuery,
  useGetFollowersQuery,
  useFollowShopMutation,
  useUnfollowShopMutation,
} = extendedShop;
