import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import ShopReviewFeed from "../Shops/ShopReviewFeed";

const ProfilePage = () => {
  const [authorized, setAuthorized] = useState(false);
  const [reviews, setReviews] = useState([])
  const user = useSelector(state => state.session.user);

  const {id} = useParams();
  console.log(id, user)

  useEffect(() => {

    fetch(`/api/reviews/users/${id}`).then(res => res.json()).then(json => setReviews(json));
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
    {authorized && user.username}
    <div>
      {/* {reviews.length && reviews.map(review => )} */}
    </div>
    </>
  )
}

export default ProfilePage;
