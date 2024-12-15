import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    forgetPass: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      void,
      { token: string; userId: string; password: string }
    >({
      query: ({ token, userId, password }) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: {
          Authorization: `${token}`, // Set the token as a header
        },
        body: { userId, password },
      }),
    }),

    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/admin/create-coupon",
        method: "POST",
        body: data,
      }),
    }),

    checkCoupon: builder.mutation({
      query: (data) => ({
        url: "/admin/check-coupon",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useForgetPassMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useCreateCouponMutation,
  useCheckCouponMutation,
} = authApi;
