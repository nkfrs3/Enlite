import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FaCoffee } from 'react-icons/fa';
import Stars from "./Stars";
import {fetchReviewsForShop} from '../../store/reviews'
import EditReview from "./EditReview";


const ShopReviewFeed = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const reviews = useSelector(state => {if (state.reviews[id]) return state.reviews[id]});

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [hoverRating, setHoverRating] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const handleRating = (i) => setRating(i);
  const handleMouseOver = value => {
    setHoverRating(value);
  }

  const handleComment = ({target}) => {setComment(target.value)}

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleMouseLeave = () => {
    setHoverRating(undefined);
  }

  const cups = [1, 2, 3, 4, 5];
  const colors = {gold: '#A68A5B', grey: '#1A0A40 '}
  const styles = {
    cups: {

     }
   }


  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
  }

  const currentUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(fetchReviewsForShop(id));

    },[dispatch, id] )


const formatDate = (date) => {
  const time = new Date(date).toLocaleTimeString('en',
                 { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Adak' });

  const arr = date.split('-');
  const monthAndDay = `${arr[1]}/${arr[2].slice(0,2)}/${arr[0]}`
  console.log(monthAndDay, time)
  return `${monthAndDay} ${time}`;
}

  return (
    <>
      <div className='review-feed-container'>
        <h2>Reviews</h2>
       { reviews?.length && reviews.map(review =>
       <div className='individual-review' >
         {currentUser?.id === review.User?.id &&
         <span className='edit-review' onClick={()=> { setShowEdit(!showEdit);
    setReviewId(review.id)}}>{showEdit ? 'cancel' : 'edit'}</span>}
         <span className='review-author'>-{review.User?.username}</span>
         <span className='review-date'>{formatDate(review.createdAt)}</span>
        <p>{review.comment}</p>
        <div className='review-image-container'>
          <img className='review-image' src={review?.image}></img>
        </div>
        <Stars rating={review.rating}/>
       </div>

       ) }
      </div>

        {/* start of edit form */}
     { showEdit && <EditReview reviewId={reviewId} setShowEdit={setShowEdit}/> }

      </>
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
