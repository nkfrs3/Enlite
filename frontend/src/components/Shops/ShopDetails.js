import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import shopsReducer from "../../store/shops";
import { FaCoffee } from 'react-icons/fa';
import Map from "../Map/Index";

const ShopDetails = ({shop}) => {
  const {id} = useParams();
  const [rating, setRating] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [hoverRating, setHoverRating] = useState(undefined);
  const [comment, setComment] = useState('');

  const currentUser = useSelector(state => state.session.user);

  let visited = shop.find(each => each.id == parseInt(id));

  const handleRating = (i) => setRating(i);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleMouseOver = value => {
    setHoverRating(value);
  }
  const handleMouseLeave = () => {
    setHoverRating(undefined);
  }
  const handleSubmit = (e) => e.preventDefault();

  const cups = [1, 2, 3, 4, 5];

  const colors = {gold: '#A68A5B', grey: '#1A0A40 '}
  const styles = {
    cups: {

     }
   }

   const handleComment = ({target}) => {setComment(target.value); if(!target.value.length){
    target.style.height = '30px';
   }
   else {target.style.height = '250px' }}


  return (
    <div className='shop-details'>
      <p className='shop-name'>{visited?.name}</p>
   {/* { visited && <Map shop={visited} />} google map comment in later */}
     { currentUser && <span  className='show-review' onClick={()=> setShowReview(!showReview)}>{(showReview) ? 'cancel' : 'leave a review ?'}</span> }
      { showReview &&  <form className='review' onSubmit={handleSubmit}>
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
        <textarea onChange={handleComment} placeholder="How was your stay?" />
        <button className='submit-review'>Submit</button>
        </form> }
    </div>

  )



}

export default ShopDetails;
