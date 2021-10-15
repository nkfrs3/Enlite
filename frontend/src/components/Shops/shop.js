import {useHistory, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stars from './Stars'
import ShopDetails from './ShopDetails';

const Shop = ({shop}) => {
  const [avgRating, setAvgRating] = useState(null);
  const history = useHistory();
  const shopReviews = useSelector(state => state.reviews[shop.id]);
  // console.log(`omgomgomg`, shopReviews);


  const handleVisit = () => {
    history.push(`/shops/${shop.id}`)
  }

useEffect(() => {
  if (shopReviews && shopReviews.length > 0){
    let num = shopReviews.length;
    let total = 0;
    for (let i = 0; i < num; i++){
      total += shopReviews[i].rating
      console.log(total)
    }
    setAvgRating((total / num).toFixed(2))
  }

  }, [shopReviews])


  return (
     <div className='shop-card'>
      <h3 className='shop-name' onClick={handleVisit}>{shop.name}</h3>
        { avgRating > 0 &&
           <span className='shop-rating'>
            <span className='total-reviews'>Total: {shopReviews?.length || 0}</span>
            <span className='average'>Average: {avgRating}</span>
            <Stars rating={avgRating}/></span> }

        <span className='shop-logo' style={{  backgroundImage: `url(${shop.image})` }} onClick={handleVisit}> </span>
        <p className='address'>{shop.address}</p>
        <span className='zipcode'>{shop.city}, OH {shop.zipcode}</span>
      { shop?.distance && <span className ='shop-distance'>distance: {shop.distance.toFixed(2)} mi.</span> }
        { shop.website && <a href={shop.website} target="_blank"> visit them here </a>}
    </div>
  )
}


export default Shop;
