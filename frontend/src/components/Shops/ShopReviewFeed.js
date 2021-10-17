import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FaCoffee } from 'react-icons/fa';
import Stars from "./Stars";
import {deleteReview, fetchReviewsForShop,} from '../../store/reviews'
import EditReview from "./EditReview";

export const formatDateAndTime = (date) => {
  const time = new Date(date).toLocaleTimeString('en');

  const arr = date.split('-');
  const monthAndDay = `${arr[1]}/${arr[2].slice(0,2)}/${arr[0]}`

  return `${monthAndDay} ${time}`;

  }

const ShopReviewFeed = ({count}) => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  const reviews = useSelector(state =>  state.reviews[id])



  const currentUser = useSelector(state => state.session.user);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [hoverRating, setHoverRating] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const handleRating = (i) => setRating(i);
  const [loading, setLoading] = useState(false);
  // const [count, setCount] = useState(0);

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


  // useEffect(() => {

  //   dispatch(fetchReviewsForShop(id)).then(()=> setLoading(true))
  //   console.log(count)
  //   },[dispatch, count])


  const handleDelete = (reviewId) => {

    let answer = window.confirm("Confirm to delete post.");
    if (answer){
      dispatch(deleteReview(reviewId, parseInt(id)))
    }else return;

  }



  return (
    <>
      <div className='review-feed-container'>
        <h2>Reviews</h2>
       { reviews?.length && reviews.map((review) =>
       <div className='individual-review' >
         {currentUser?.id === review.User?.id && <>
         <span className='edit-review' onClick={()=> { setShowEdit(!showEdit);
        setReviewId(review.id)}}>edit</span>
          <span className='delete-review' onClick={() => handleDelete(review.id)}>delete</span></>
        }
         <span className='review-author'>-{review.User?.username}</span>
         <span className='review-date'>{formatDateAndTime(review.createdAt)}</span>
        <p>{review.comment}</p>
       <div className='review-image-container'>

        { review.image ? <img className='review-image' src={review?.image}></img> : <img className='review-image' src={'data:image/jpeg;base64,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'}></img> }

        </div>

        <Stars rating={review.rating}/>
       </div>

          ) }
      </div>

     { showEdit && <EditReview reviewId={reviewId} setShowEdit={setShowEdit}/> }

      </>
  )

}


export default ShopReviewFeed;
