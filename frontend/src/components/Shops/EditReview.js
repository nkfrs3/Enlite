// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { FaCoffee } from 'react-icons/fa';
// import { editReview } from "../../store/reviews";



// const EditReview = () => {
//   const [rating, setRating] = useState(0);
//   const [hideForm, setHideForm] = useState(false);
//   const [comment, setComment] = useState('');
//   const [image, setImage] = useState(null);
//   const [hoverRating, setHoverRating] = useState(undefined);
//   const [errors, setErrors] = useState([]);
//   const dispatch = useDispatch();
//   const handleRating = (i) => setRating(i);
//   const handleMouseOver = value => {
//     setHoverRating(value);
//   }

//   const handleComment = ({target}) => {setComment(target.value)}

//   const updateFile = (e) => {
//     const file = e.target.files[0];
//     if (file) setImage(file);
//   };

//   const handleMouseLeave = () => {
//     setHoverRating(undefined);
//   }
//   const cups = [1, 2, 3, 4, 5];
//   const colors = {gold: '#A68A5B', grey: '#1A0A40 '}
//   const styles = {
//     cups: {

//      }
//    }

//    useEffect(() => {
//      setHideForm(false);

//    }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newErrors = [];
//   }

//   return (
//     <>
// { !hideForm &&
//     <form className='review' onSubmit={handleSubmit} style={{backgroundColor: 'red'}}><span onClick={setHideForm(true)}>close</span>
//     <h3 className='review-title'> Edit Review</h3>
//    {errors.length > 0 && <div className="review-errors">
//     {  errors?.map(err => (<p>{err}</p>) )}
//    </div> }
//   <label className='upload-img'><i class="far fa-image"> <span className='img-label'> {image?.name ? image.name.slice(0,10) + image.name.slice(image.name.length -4) : "upload image" }</span></i>
//       <input type="file" onChange={updateFile} />

//    { image?.name && <span className='remove-img' onClick={(e)=>{ e.preventDefault(); setImage(null)}}> remove</span>}
//     </label>

//     <div className='rating' style={styles.cups}>
//       {cups.map((each, i) => { return (
//         <FaCoffee key={i}
//         size={50}
//         className='rating-cup'
//         color={( hoverRating || rating ) > i ? colors.gold : colors.grey}
//         onClick={() => handleRating(i + 1)}
//         onMouseOver={() => handleMouseOver(i + 1)}
//         onMouseLeave={()=> handleMouseLeave()}
//         />)
//       })}

//     <span className='show-rating'>{rating}/5</span>
//     </div>
//     <textarea onChange={handleComment}  placeholder="How was your stay?" />
//     <button className='submit-review' type='submit'>Submit</button>
//     </form>
//   } </> )
// }


// export default EditReview;