import { csrfFetch } from "./csrf";
//going to be my reviews store
const SEND_REVIEW = "reviews/sendReview";

const sendReview = (review) => ({
  type: SEND_REVIEW,
  payload: review,
});

export const createReview = (review) => async (dispatch) => {
  const { image, comment, rating } = review;

  const formData = new FormData();
  formData.append("comment", comment);
  formData.append("rating", rating);

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

const initialState = { reviews: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type){
    case SEND_REVIEW:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
}








export default reviewsReducer;
