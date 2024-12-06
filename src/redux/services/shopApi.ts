import { baseApi } from "../api/baseApi";

export type TShop = {
  id: string;
  vendorEmail: string;
  name: string;
  logoUrl: string;
  description: string;
  isDeleted: boolean;
  isBlacklisted: boolean;
  createdAt: string;
  updatedAt: string;
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
  }),
});

export const { useGetMyShopQuery } = extendedShop;
