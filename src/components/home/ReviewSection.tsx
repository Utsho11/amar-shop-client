import { TReview } from "../../types";
export type ReviewSectionProps = {
  reviews: TReview[];
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-4">
        Customer Reviews: {reviews.length}
      </h2>
      <div className="">
        {reviews.map((review, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={review.image}
                alt={review.username}
              />
              <div className="ml-4">
                <h4 className="text-sm font-bold">{review.username}</h4>
                <p className="text-xs text-gray-600">
                  {review.rating} out of 5
                </p>
              </div>
            </div>
            <p className="text-sm leading-loose">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
