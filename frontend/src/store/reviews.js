import { csrfFetch } from "./csrf";
//going to be my reviews store
const SEND_REVIEW = "reviews/sendReview";
const FETCH_REVIEW = 'reviews/fetchReview'

const sendReview = (review) => ({
  type: SEND_REVIEW,
  payload: review,
});

const getReviewsForShop = (reviews) => ({
  type: FETCH_REVIEW,
  reviews
})

export const fetchReviewsForShop = (shopId) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${shopId}`);
  const reviews = await res.json();
  dispatch(getReviewsForShop(reviews))

}

export const createReview = (review) => async (dispatch) => {
  const { image, comment, rating, userId, shopId } = review;

  const formData = new FormData();
  formData.append("comment", comment);
  formData.append("rating", rating);
  formData.append("userId", userId);
  formData.append("shopId", shopId);
  // for multiple files
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  // for single file
  if (image) formData.append("image", image);

  const res = await csrfFetch(`/api/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(sendReview(data.review));
};

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type){
    case SEND_REVIEW:
      const shopId = action.payload.shopId;
      const newObj = {...state};
    newObj[shopId].push(action.payload);
    return newObj;

    case FETCH_REVIEW:
      const newState = {...state}
      const shopID = (action.reviews[0].shopId);
      newState[shopID] = action.reviews;
      return newState;

    // const shopID = action.reviews.shopId
    //   if (state.shopID){
    //     action.reviews.map(each => newState[shopID].push(each))
    //   }
    //   else {
    //     action.reviews.map(each => newState[shopID] = [each])
    //   }
      return newState;
    default:
      return state;
  }
}








export default reviewsReducer;
