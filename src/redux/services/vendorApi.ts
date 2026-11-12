import { TOrderHistory, TProduct, TResponseRedux } from "../../types";
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
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    getOrderHistoryForVendor: builder.query({
      query: () => ({
        url: "vendor/order-history",
        method: "GET",
      }),
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrderHistory[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }: { orderId: string; status: string }) => ({
        url: `vendor/update-order-status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
    getVendorDashboardStats: builder.query({
      query: () => ({
        url: "vendor/dashboard-stats",
        method: "GET",
      }),
      providesTags: ["order", "product"],
      transformResponse: (response: any) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useGetProductsByVendorQuery,
  useGetOrderHistoryForVendorQuery,
  useUpdateOrderStatusMutation,
  useGetVendorDashboardStatsQuery,
} = vendorApi;
