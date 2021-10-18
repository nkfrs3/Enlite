import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Stars from './Stars'


const Shop = ({shop}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const shopReviews = useSelector(state => state.reviews[shop.id]);

  const handleVisit = () => {
    history.push(`/shops/${shop.id}`)
  }

  return (
     <div className='shop-card'>
      <h3 className='shop-name' onClick={handleVisit}>{shop.name}</h3>
        { !!shop.avgRating && shop.avgRating > 0 &&
           <span className='shop-rating'>
            <span className='total-reviews'>Total: {shopReviews?.length}</span>
            <span className='average'>Average: {shop.avgRating}</span>
            <Stars rating={shop.avgRating}/></span>
             }

        <span className='shop-logo' style={{  backgroundImage: `url(${shop.image})` }} onClick={handleVisit}> </span>
        <p className='address'>{shop.address}</p>
        <span className='zipcode'>{shop.city}, OH {shop.zipcode}</span>
      { shop?.distance && <span className ='shop-distance'>distance: {shop.distance.toFixed(2)} mi.</span> }
        { shop.website && <a href={shop.website} target="_blank"> visit them here </a>}
    </div>
  )
}


export default Shop;
