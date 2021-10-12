import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {fetchReviewsForShop} from '../../store/reviews'

const ShopReviewFeed = ({currentUser}) => {
  const {id} = useParams();

const reviews = useSelector(state =>{
    return state.reviews[id] }
   );

const dispatch = useDispatch();


console.log(id, 'params id')
useEffect(() => {
dispatch(fetchReviewsForShop(id));

},[dispatch, id],

)

  return (
      <div className='review-feed-container'>
        <h2>Reviews</h2>
       { reviews?.length && reviews.map(review =>
       <p>{review.comment}</p> )  }

      </div>
  )
}

export default ShopReviewFeed;
