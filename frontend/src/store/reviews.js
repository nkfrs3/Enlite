import { csrfFetch } from "./csrf";
//going to be my reviews store
const SEND_REVIEW = "reviews/sendReview";
const FETCH_REVIEW = 'reviews/fetchReview'
const LOAD_ALL = "review/loadAll"
const EDIT_REVIEW = 'review/edit'
const DELETE_REVIEW = 'review/delete'

const getAllReviews = (reviews) => ({
  type: LOAD_ALL,
  reviews
});

export const fetchAllReviews = () => async(dispatch) => {
  const res = await fetch('/api/reviews');
  const allReviews = await res.json();
  dispatch(getAllReviews(allReviews))
}

const getReviewsForShop = (reviews) => ({
  type: FETCH_REVIEW,
  reviews
});


export const fetchReviewsForShop = (shopId) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${shopId}`);
  const reviews = await res.json();
  dispatch(getReviewsForShop(reviews))
}

const sendReview = (review, associatedUser) => ({
  type: SEND_REVIEW,
  payload: review,
  associatedUser
});

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
  dispatch(sendReview(data.review, data.associatedUser));
  return data;
};

const edit_Review = (review) => ({
  type: EDIT_REVIEW,
  payload: review,
});

export const editReview = (review) => async(dispatch) =>{
  const { id, image, comment, rating } = review;
  const formData = new FormData();
  formData.append("comment", comment);
  formData.append("rating", rating);
  // formData.append("userId", userId);
  // formData.append("shopId", shopId);
  // for single file
  if (image) formData.append("image", image);

  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(edit_Review(data));
  return data;
}

const handleDelete =(id, reviewId) => ({
  type: DELETE_REVIEW,
  id,
  reviewId
})

export const deleteReview = (reviewId, id) => async(dispatch) => {
 await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });
  dispatch(handleDelete(id, reviewId));

}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type){
    case LOAD_ALL:
      console.log(action)
      let obj = {};
      action.reviews.forEach(review => {
        (!obj[review.shopId]) ?  obj[review.shopId] = [review] :
        obj[review.shopId].push(review)

      });
      return {
        ...obj,
        ...state
      };
    case SEND_REVIEW:
      console.log(action.payload, "action.payload!")
      const shopId = action.payload.shopId;
      const newObj = {...state};
      if (!newObj[shopId]) {
        newObj[shopId] = action.payload;
        newObj[shopId] = action.payload.User = action.associatedUser;
        return newObj;
      }
      const target = newObj[shopId];
    newObj[shopId] = [action.payload, ...target]
    newObj[shopId][0].User = action.associatedUser;
    return newObj;

    case FETCH_REVIEW: //gets all the reviews for a single shop
      const newState = {...state}
      if (!action.reviews || !action.reviews.length) return newState;

      const shopID = (action.reviews[0].shopId);
      newState[shopID] = [...action.reviews];
      return newState;

      case EDIT_REVIEW:
        const prevObj = {...state}
        console.log(action.payload);
        const shop_Id = action.payload.shopId;
        const review_Id = action.payload.id;
        let postsArr = prevObj[shop_Id];
        console.log(postsArr);
        postsArr.map( each => {if(each.id === review_Id){
          console.log('founddd!!!')
          return action.payload;
        }
          });
          console.log('postsArr', postsArr);

      return  {...state, [action.payload.shopId]: postsArr}

      case DELETE_REVIEW:
        const prev = {...state}
        const shopid = action.id;
        const arr = prev[action.id].filter(item => item.id !== action.reviewId);
        prev[shopid] = arr;
        return prev;
    default:
      return state;
  }
}








export default reviewsReducer;
