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
       <div className='individual-review' >
        <p>{review.comment}</p>
        <div className='review-image-contianer'>
          <img className='review-image' src={review?.image}></img>
        </div>
        <Stars rating={review.rating}/>
       </div>
       )}

      </div>
  )
}

const Stars = ({rating}) => {
 let numStars = [];
 let i = rating;
 while (i > 0){
   numStars.push('3');
  i--;
 }

  return (
    <span className='stars-container'>
    {numStars.map(x => <span className='stars'><i class="fas fa-star"></i></span>)}
    </span>
  )
}

export default ShopReviewFeed;
