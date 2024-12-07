import { TProduct, TResponseRedux } from "../../types";
import { baseApi } from "../api/baseApi";

const extendedProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Products
    getProducts: builder.query({
      query: () => ({
        url: "product",
        method: "GET",
      }),
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    // Delete Product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vendor/delete-product/${id}`,
        method: "DELETE",
      }),
      // Invalidates the product cache to refetch updated data
      invalidatesTags: ["product"],
    }),

    // Duplicate Product
    duplicateProduct: builder.mutation<TProduct, string>({
      query: (id) => ({
        url: `vendor/duplicate-product/${id}`,
        method: "POST",
      }),
      // Invalidates the product cache to refetch updated data
      invalidatesTags: ["product"],
    }),

    // Edit Product
    editProduct: builder.mutation<
      TProduct,
      { id: string; data: Partial<TProduct> }
    >({
      query: ({ id, data }) => ({
        url: `vendor/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      // Invalidates the product cache to refetch updated data
      invalidatesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `vendor/create-product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useEditProductMutation,
} = extendedProduct;
