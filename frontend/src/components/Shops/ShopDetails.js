import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCoffee } from 'react-icons/fa';
import { createReview } from "../../store/reviews";
import ShopReviewFeed from "./ShopReviewFeed";
import { fetchReviewsForShop } from "../../store/reviews";
import Map from "../Map/Index";

const ShopDetails = () => {
  const {id} = useParams();
  const [rating, setRating] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [hoverRating, setHoverRating] = useState(undefined);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user);
  const visited = useSelector(state => state.shops.find(shop => shop.id == id));
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


  const cups = [1, 2, 3, 4, 5];

  const colors = {gold: '#A68A5B', grey: '#1A0A40 '}
  const styles = {
    cups: {

     }
   }

   const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    if (rating <= 0 ){
      newErrors.push('You must provide a score.')
      setErrors(newErrors)
    }
    const userId = currentUser.id;
    const shopId = id;
    let body;

    if (image && image.name) {
      body = {image, comment, rating, userId, shopId}
    }else {
     body = { comment, rating, userId, shopId}
    }

    dispatch(createReview(body))
      .then(() => {
        setComment("");
        setRating(0);
        setImage(null);
      })
      .catch(async (res) => {
        console.log(res)
        // const data = await res.json();
        // if (data && data.errors) {
        //   newErrors = data.errors;
        //   setErrors(newErrors);
        // }
      });
      if (!newErrors.length) {
        setRating(0);
        setShowReview(false);
      }
  };

  useEffect(()=> {
    setErrors([]);
  }, [rating])


   const handleComment = ({target}) => {setComment(target.value)}


  return (
    <div className='shop-details'>
      <h1 className='shop-name'>{visited?.name}</h1>
      <ShopReviewFeed id={id, currentUser}/>
   { visited && <Map shop={visited} />}
     { currentUser ? <span  className='show-review' onClick={()=> {setShowReview(!showReview); setComment('')}}>{(showReview) ? 'cancel' : 'leave a review ?'}</span> : <span className='show-review' style={{cursor: "default"}}>login to review</span> }

      { showReview &&  <form className='review' onSubmit={handleSubmit} >
        <h3 className='review-title'>Review</h3>
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
        </form> }
    </div>

  )



}

export default ShopDetails;
