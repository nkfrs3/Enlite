import { useEffect, useState } from 'react'
import {createCheckIn} from '../../store/checkins'

import './Checkin.css'



function CheckIn({currentUser, id}) {
const [checkIn, setCheckIn] = useState(false);

 useEffect(()=> {
   console.log(`check-in-${id}`)
  let status = document.cookie.split(';').find(row => row.startsWith(`check-in-${id}`));
  console.log(status);

 }, [])

  const handleCheckin = () => {
    if (!checkIn){
      let stamp = `check-in-${id}=true;max-age=${60*60*24};`
      document.cookie = stamp;
    }

    // dispatch(createCheckIn(data))
  }

  return (
    <div className='checkin-container'>
        <span className='checkIn-btn' onClick={handleCheckin}><i class="far fa-check-square"></i></span>
        <p>check-in?</p>
    </div>
  )
}

export default CheckIn;
