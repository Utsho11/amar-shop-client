import { PaginatedProducts } from "../../components/home/ProductSection";
import { TProduct, TResponseRedux, TReview } from "../../types";
import { baseApi } from "../api/baseApi";

const extendedProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Products
    getProducts: builder.query({
      query: ({ page = 1, limit = 8, sortByPrice, category, keyword }) => {
        // Construct query parameters dynamically
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (category) params.append("category", category);
        if (keyword) params.append("keyword", keyword);
        if (sortByPrice) params.append("sortByPrice", sortByPrice);

        return {
          url: `product?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<PaginatedProducts>) => {
        return {
          data: response?.data,
        };
      },
    }),

    //get single product
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `product/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProduct>) => {
        return {
          data: response?.data,
        };
      },
    }),

    getReviewsSingleProduct: builder.query({
      query: (id: string) => ({
        url: `product/review/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TReview>) => {
        return {
          data: response?.data,
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
    editProduct: builder.mutation({
      query: (data) => ({
        url: `vendor/update-product`,
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

    getFlashSaleProducts: builder.query({
      query: () => ({
        url: `product/flashSaleProducts`,
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

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useEditProductMutation,
  useGetSingleProductQuery,
  useGetFlashSaleProductsQuery,
  useGetReviewsSingleProductQuery,
} = extendedProduct;
