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

      keepUnusedDataFor: 0,
      transformResponse: (response: TResponseRedux<TOrderHistory[]>) => {
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
} = orderApi;
