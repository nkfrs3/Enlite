import {useHistory, Route, Switch } from 'react-router-dom';
import ShopDetails from './ShopDetails';

const Shop = ({shop}) => {
  const history = useHistory();

  const handleVisit = () => {
    history.push(`/shops/${shop.id}`)
  }


  return (
     <div className='shop-card'>
      <h3 className='shop-name' onClick={handleVisit}>{shop.name}</h3>
        <span className='shop-logo' style={{  backgroundImage: `url(${shop.image})` }} onClick={handleVisit}> </span>
        <p className='address'>address: {shop.address}</p>
        { shop.website && <a href={shop.website} target="_blank"> visit them here </a>}
    </div>
  )
}


export default Shop;
