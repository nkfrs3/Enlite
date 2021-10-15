import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import './Profile.css';


const formatDate = (date) => {

  const arr = date.split('-');
  const monthAndDay = `${arr[1]}/${arr[2].slice(0,2)}/${arr[0]}`
  return `${monthAndDay}`;
}

const ProfilePage = () => {
  const [authorized, setAuthorized] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  // const [profile,setProfile] = useState({});

  const user = useSelector(state => state.session.user);

  const {id} = useParams();
  console.log(id, user)

  useEffect(() => {

    fetch(`/api/reviews/users/${id}`).then(res => res.json()).then(json => setReviews(json));
    if (user && user.id){
      fetch(`/api/checkin/${user.id}`).then(res => res.json()).then(json => setCheckIns(json)).catch(e => console.log(e));
    }

  }, [])

  useEffect(()=> {
    if (user == undefined) {
      setAuthorized(false);
    }
    if (user && user.id == id){
      setAuthorized(true);
    }
  },[user])


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

    <div className='recent-activity'>
    <h3>Your Recent Activity</h3>
      <div className='recent-reviews-container'>
      <h4>Recent Reviews</h4>
      {reviews?.map(review => <ProfileFeed review={review}/>)}
      </div>

      <div>
      <h4>Recent Checkins</h4>
      { checkIns.map(checkIn =>    <div className='recent-item'>

        <span> <i class="far fa-check-square"></i>{checkIn.Shop.name}{formatDate(checkIn.createdAt)}</span>
      </div>) }
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
