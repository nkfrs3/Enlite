import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
// import {createCheckIn} from '../../store/checkins'

import './Checkin.css'



function CheckIn({id}) {
const [checkIn, setCheckIn] = useState(false);
const currentUser = useSelector(state => state.session.user);

 useEffect(()=> {
   console.log(`check-in-${id}`)
  let status = document.cookie.split('; ').find(row => row.startsWith(`check-in-${id}`))
  if (status) {
    let check = status.split('=')[1];
    console.log(check, status)
    if (check == 'true'){
      setCheckIn(true);
    }
  }
 }, [id])

  const handleCheckin = async () => {
    if (currentUser){
      let stamp = `check-in-${id}=true;max-age=${60*60*24};`
      document.cookie = stamp;
        const data = {userId: currentUser.id, shopId: id}
        const res = await csrfFetch('/api/checkin', {
          method: "PUT",
          body: JSON.stringify(data)
        })
        setCheckIn(true);
      }
    }

    // dispatch(createCheckIn(data))


  return (
    <div className='checkin-container'>
      {checkIn && <span className ='success'> Checked In! <i class="far fa-check-square" style={{color: 'greenyellow'}}></i></span> }
      { !checkIn && <> <span className='checkIn-btn' onClick={handleCheckin}><i class="far fa-check-square"></i></span>
        <p>check-in?</p> </> }
    </div>
  )
}

export default CheckIn;
