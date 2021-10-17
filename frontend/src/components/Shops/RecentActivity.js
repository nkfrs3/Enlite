import { useEffect, useState } from "react";
import {formatDateAndTime} from '../Shops/ShopReviewFeed'
import './RecentActivity.css'

const RecentActivity = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch("/api/reviews/recent").then(res => res.json()).then(json => setFeed(json))

  }, [])

  return (
    <div className='most-recent-activity'>
      <h2>Most Recent Activity</h2>
      {feed.map(item => {
          if (item.rating){
            return <span className='recent-review' style={{display: 'flex'}}>
            <span style={{color: item.User.profileColor, fontSize: '1.5em'}}>
            <i className={item.User.profileIcon} > </i>
              </span>
              <p>{item.User.username}: <span style={{letterSpacing: '-0.5px'}}>{formatDateAndTime(item.createdAt)}</span> <br /> {item.Shop.name} {item.rating}/5</p>
            </span>

          }else {
                return <span className='recent-checkin' style={{display: 'flex'}}>
                   <span style={{color: item.User.profileColor, fontSize: '1.5em'}}>
                      <i className={item.User.profileIcon} > </i> </span>
                      <p>{item.User.username}: <span style={{letterSpacing: '-0.5px'}}>{formatDateAndTime(item.createdAt)}</span> <br /> {item.Shop.name} <i class="far fa-check-square" style={{color: 'lightgreen', marginLeft: '5px'}}></i></p>

                </span>
          }

      })}
    </div>
  )
}

export default RecentActivity
