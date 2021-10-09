import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [authorized, setAuthorized] = useState(false);

  const user = useSelector(state => state.session.user);

  const {id} = useParams();
  console.log(id, user)

  useEffect(()=> {
    if (user == undefined) {
      console.log('woahhh')
      setAuthorized(false);
    }
    if (user && user.id == id){
      setAuthorized(true);
    }
  },[user])


  return (
    <>
    {authorized && user.username}
    </>
  )
}

export default ProfilePage;
