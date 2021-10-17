import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import './Profile.css';


export const formatDate = (date) => {

  const arr = date.split('-');
  const monthAndDay = `${arr[1]}/${arr[2].slice(0,2)}/${arr[0]}`
  return `${monthAndDay}`;
}

const ProfilePage = () => {
  const [authorized, setAuthorized] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [showEdit, setShowEdit] = useState(false)
  const [icon, setIcon] = useState("fas fa-user-circle")
  const [color, setColor] = useState('#A68A5B')
  // const [profile,setProfile] = useState({});

  const user = useSelector(state => state.session.user);

  const {id} = useParams();
  console.log(id, user)

  useEffect(() => {

    fetch(`/api/reviews/users/${id}`).then(res => res.json()).then(json => setReviews(json));
     fetch(`/api/checkin/${id}`).then(res => res.json()).then(json => setCheckIns(json)).catch(e => console.log(e));
  }, [])

  useEffect(() => {
    if (!showEdit) return;

    const closeModal = () => {
      setShowEdit(false);
    };
    document.addEventListener('click', closeModal);
    return () => document.removeEventListener("click", closeModal);
  }, [showEdit]);

  useEffect(()=> {
    if (user == undefined) {
      setAuthorized(false);
    }
    if (user && user.id == id){
      setAuthorized(true);
    }
  },[user])

  const handleEdit = () => {
    setShowEdit(true)
  }

  const handleSubmit = e => {
    e.preventdefault();
  }

  return (
    <>
    <div className='profile-banner'>
     <span className='profile-image'><i class="fas fa-user-circle"></i></span>
      <h1>{user?.username}</h1>
      <div>
          <span className='profile-label'>number of reviews:</span><span className='count'> {reviews.length}</span>
          <span className='profile-label'>number of checkins:</span><span className='count'>{checkIns.length}</span>
      </div>
    </div>
    {authorized && <span className="edit-profile-btn" onClick={handleEdit}>edit profile</span>}

    {showEdit && <form className="edit-profile-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <label className="icons">
          <h3>Set Icon</h3>
          <div className='icon-container'>
            <span onClick={(e)=> setIcon('fas fa-user-circle')} style={{outline: icon === 'fas fa-user-circle' ? '5px solid #A68A5B': 'none'}}><i class='fas fa-user-circle' style={{color: color}} ></i></span>

            <span onClick={(e)=> setIcon('fas fa-female')} style={{outline: icon === 'fas fa-female' ? '5px solid #A68A5B': 'none'}}><i class=" fas fa-female" style={{color: color}}  ></i></span>

            <span onClick={(e)=> setIcon('fas fa-regular fa-user-astronaut')} style={{outline: icon === 'fas fa-regular fa-user-astronaut' ? '5px solid #A68A5B': 'none'}}><i class="fas fa-regular fa-user-astronaut" style={{color: color}}></i></span>

            <span onClick={(e)=> setIcon('fas fa-solid fa-user-ninja')} style={{outline: icon === 'fas fa-solid fa-user-ninja' ? '5px solid #A68A5B': 'none'}}><i class=" fas fa-solid fa-user-ninja" style={{color: color}}></i></span>
          </div>
          </label>

        <label className="colors">
          <h3>Set Icon Color</h3>
          <div className='colors-container'>
            <span onClick={() => setColor('#A68A5B')} style={{backgroundColor: '#A68A5B'}}></span>
            <span onClick={() => setColor('rgb(172, 41, 172)')} style={{backgroundColor: 'rgb(172, 41, 172)'}}></span>
            <span onClick={() => setColor('rgb(60, 127, 228)')} style={{backgroundColor: 'rgb(60, 127, 228)'}}></span>
            <span onClick={() => setColor('red')} style={{backgroundColor: 'red'}}></span>
          </div>
        </label>
        <button type='submit'>SUBMIT</button>
      </form> }
    <div className='recent-activity'>
    <h3>Your Recent Activity</h3>
      <div className='recent-reviews-container'>
      <h4>Recent Reviews</h4>
      { reviews?.map((review, i) => { if (i < 5) {
        return <ProfileFeed review={review}/> }
      })}
      </div>

      <div>
      <h4>Recent Checkins</h4>
      { checkIns.map((checkIn, i) =>  { if (i< 5){ return <div className='recent-item'>

        <span> <i class="far fa-check-square" style={{marginRight: '5px'}}></i>{checkIn.Shop.name}{formatDate(checkIn.createdAt)}</span>
      </div>} } )}
      </div>
    </div>
    </>
  )
}

const ProfileFeed = ({review}) => {
  return (
    <div className='recent-item'>
      <span><strong>Shop:</strong> {review.Shop.name}</span>
      <span>You said: {review.comment}, and gave it a <strong> {review.rating}</strong> </span>

      <span> on {formatDate(review.createdAt)}</span>
    </div>
  )

}

export default ProfilePage;
