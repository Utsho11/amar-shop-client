import { TOrderHistory, TOrderItem, TResponseRedux } from "../../types";
import { baseApi } from "../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "customer/checkout",
        method: "POST",
        body: data,
      }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: "customer/add-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    getOrderItem: builder.query({
      query: () => ({
        url: "customer/orderItemForReview",
        method: "GET",
      }),
      providesTags: ["review"],
      transformResponse: (response: TResponseRedux<TOrderItem[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    getOrderHistoryForCustomer: builder.query({
      query: () => ({
        url: "customer/myOrderHistory",
        method: "GET",
      }),
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrderHistory[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    getMyWishlist: builder.query({
      query: () => ({
        url: "customer/wishlist",
        method: "GET",
      }),
      providesTags: ["wishlist"],
      transformResponse: (response: any) => {
        return {
          data: response.data,
        };
      },
    }),
    toggleWishlist: builder.mutation({
      query: (data: { productId: string }) => ({
        url: "customer/wishlist/toggle",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    confirmCodOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `customer/confirm-cod/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),
    getCustomerDashboardStats: builder.query({
      query: () => ({
        url: "customer/dashboard-stats",
        method: "GET",
      }),
      providesTags: ["order", "wishlist", "review"],
      transformResponse: (response: any) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderItemQuery,
  useAddReviewMutation,
  useGetOrderHistoryForCustomerQuery,
  useGetMyWishlistQuery,
  useToggleWishlistMutation,
  useConfirmCodOrderMutation,
  useGetCustomerDashboardStatsQuery,
} = orderApi;
