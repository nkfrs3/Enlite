import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaCoffee } from 'react-icons/fa';
import { editReview } from "../../store/reviews";



const EditReview = ({reviewId, setShowEdit}) => {
  const {id} = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [hoverRating, setHoverRating] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const handleRating = (i) => setRating(i);
  const handleMouseOver = value => {
    setHoverRating(value);
  }


  const reviewToEdit = useSelector(state => state.reviews[id].find(each => each.id === reviewId));
  console.log(reviewToEdit)
  const handleComment = ({target}) => {setComment(target.value)}

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  useEffect(()=> {
    setRating(reviewToEdit.rating);
    setImage(reviewToEdit.image);
    setComment(reviewToEdit.comment);
  }, [reviewToEdit])

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
    let body;

    if (image && image.name) {
      body = {image, comment, rating, userId, id}
    }else {
     body = { comment, rating, userId, id}
    }

    dispatch(editReview(body))
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
        setShowEdit(false);
      }
     };


  return (

    <form className='review' onSubmit={handleSubmit} >
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
    <textarea onChange={handleComment}  placeholder="How was your stay?" value={comment}/>
    <button className='submit-review' type='submit'>Submit</button>
    </form>
      )
}


export default EditReview;
