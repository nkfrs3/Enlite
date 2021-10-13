import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Stars from "./Stars";
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

const formatDate = (date) => {
  const time = new Date(date).toLocaleTimeString('en',
                 { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });

  const arr = date.split('-');
  const monthAndDay = `${arr[1]}/${arr[2].slice(0,2)}/${arr[0]}`
  console.log(monthAndDay, time)
  return `${monthAndDay} ${time}`;
}

  return (
      <div className='review-feed-container'>
        <h2>Reviews</h2>
       { reviews?.length ? reviews.map(review =>
       <div className='individual-review' >
         <span className='review-author'>-{review.User?.username}</span>
         <span className='review-date'>{formatDate(review.createdAt)}</span>
        <p>{review.comment}</p>
        <div className='review-image-container'>
          <img className='review-image' src={review?.image}></img>
        </div>
        <Stars rating={review.rating}/>
       </div>
       ) : <div className="no-reviews">Be The First To Review This Location</div>}

      </div>
  )
}

// export const Stars = ({rating}) => {
//  let numStars = [];
//  let i = rating;
//  while (i > 0){
//    numStars.push('3');
//   i--;
//  }

//   return (
//     <span className='stars-container'>
//     {numStars.map(x => <span className='stars'><i class="fas fa-star"></i></span>)}
//     </span>
//   )
// }

export default ShopReviewFeed;
