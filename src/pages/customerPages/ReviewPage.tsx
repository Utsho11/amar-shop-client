import { FieldValues } from "react-hook-form";
import {
  useAddReviewMutation,
  useGetOrderItemQuery,
} from "../../redux/services/orderApi";
import ASForm from "../../components/form/ASForm";
import ASTextarea from "../../components/form/ASTextarea";
import ASSelectField from "../../components/form/ASSelect";
import { toast } from "sonner";

const ReviewPage = () => {
  const ratingOptions = [
    {
      value: 1,
      label: "1 (Lowest)",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5 (Highest)",
    },
  ];
  const { data } = useGetOrderItemQuery(null);
  const [addReview] = useAddReviewMutation();

  const products = data?.data || [];

  const handleReview = async (data: FieldValues) => {
    const reviewData = {
      productId: data.productId,
      rating: data.rating,
      comment: data.review,
    };

    try {
      const toastId = toast.loading("Reviw Posting...");
      await addReview(reviewData);
      toast.success("Review added successfully!", {
        id: toastId,
        duration: 2000,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add review!");
    }

    // console.log(data);
  };

  return (
    <div className="">
      <div className="my-5">
        <h1 className="text-center font-semibold text-3xl">Review Products</h1>
      </div>
      {products?.length > 0 ? (
        <>
          {products?.map((product, index) => (
            <div className="my-8" key={index + 1}>
              <div className="flex items-center justify-between">
                <img
                  className="w-[5rem] h-[5rem] rounded-lg"
                  src={product.product?.imageUrl}
                  alt={product.product?.name}
                />
                <h2 className="text-lg font-semibold">
                  {product.product?.name}
                </h2>
              </div>
              <ASForm
                onSubmit={(data) =>
                  handleReview({ ...data, productId: product.productId })
                }
                label="Submit Review"
              >
                <ASSelectField
                  name="rating"
                  label="Select Rating"
                  options={ratingOptions}
                />
                <ASTextarea
                  name="review"
                  label="Drop a review"
                  placeholder="Write your review here..."
                />
              </ASForm>
            </div>
          ))}
        </>
      ) : (
        <h1 className="text-3xl text-slate-600 text-center">
          Nothing to review. Please Buy a product First.
        </h1>
      )}
    </div>
  );
};

export default ReviewPage;
