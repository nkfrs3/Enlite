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
  const [showEdit, setShowEdit] = useState(true);
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
         {currentUser?.id === review.User?.id && <span className='edit-review' onClick={()=> { setShowEdit(true);
  setReviewId(review.id)}} >edit</span>}
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

        <form className='review' onSubmit={handleSubmit} style={{backgroundColor: 'red'}}><span onClick={setShowEdit(false)}>close</span>
      <h3 className='review-title'> Edit Review</h3>
    {errors.length > 0 && <div className="review-errors">
      {  errors?.map(err => (<p>{err}</p>) )}
    </div> }
    <label className='upload-img'><i class="far fa-image"> <span className='img-label'> {image?.name ? image.name.slice(0,10) + image.name.slice(image.name.length -4) : "upload image" }</span></i>
        <input type="file" onChange={updateFile} />

    { image?.name && <span className='remove-img' onClick={(e)=>{ e.preventDefault(); setImage(null)}}> remove</span>}
      </label>

      <div className='rating' style={styles.cups}>
        {cups.map((each, i) => { return (
        <FaCoffee key={i}
        size={50}
        className='rating-cup'
        color={( hoverRating || rating ) > i ? colors.gold : colors.grey}
        onClick={() => handleRating(i + 1)}
        onMouseOver={() => handleMouseOver(i + 1)}
        onMouseLeave={()=> handleMouseLeave()}
        />)
      })}

    <span className='show-rating'>{rating}/5</span>
    </div>
    <textarea onChange={handleComment}  placeholder="How was your stay?" />
    <button className='submit-review' type='submit'>Submit</button>
    </form>
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
