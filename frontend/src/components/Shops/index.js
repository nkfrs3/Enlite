import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import { fetchShops } from "../../store/shops";
import Shop from "./shop";
import ShopDetails from "./ShopDetails";
import './Shop.css'
import { fetchAllReviews } from "../../store/reviews";

const Shops = () => {
  const [selectedShops, setSelectedShops] = useState([]);
  const [limit, setLimit] = useState(7);
  const [loaded, setLoaded] = useState(false);
  const [distanceArr, setDistanceArr] = useState([]);
  const [order, setOrder] = useState('');

  const dispatch = useDispatch()

  const allShops = useSelector(state => state.shops);


  useEffect(() => {
    const res = dispatch(fetchShops());
    const reviews = dispatch(fetchAllReviews());
    }, [dispatch]);


    useEffect(()=> {
      if (!loaded){
        if (allShops.length> 0 ){
          setLoaded(true);
          setSelectedShops(allShops.slice(0,7));
        }
      }
    }, [allShops]);


  const scroll = () => {
    if(order === 'distance'){
      if (limit > distanceArr.length - 7 ) {
        const end = distanceArr.slice(limit);
        const start = distanceArr.slice(0, 7 - (end.length-1))
        setSelectedShops([...end, ...start]);
        // setSelectedShops(allShops.slice(0, 7));
        setLimit(start.length);
        return;
      } else {
          setSelectedShops(distanceArr.slice(limit, limit+7));
          setLimit(limit => limit + 7)
        }
    }
    else {
      if (limit > allShops.length - 7 ) {
        const end = allShops.slice(limit);
        const start = allShops.slice(0, 7 - (end.length-1))
        setSelectedShops([...end, ...start]);
        // setSelectedShops(allShops.slice(0, 7));
        setLimit(start.length);
        return;
      } else {
          setSelectedShops(allShops.slice(limit, limit+7));
          setLimit(limit => limit + 7)
        }
    }

  }

  const handleOrder = ({target}) =>{
    setOrder(target.value);
  }

  useEffect(()=> {
    if (order == 'distance'){
      navigator.geolocation.getCurrentPosition(success, error);
    }

    if (order == 'alphabetical'){
      setSelectedShops(allShops.slice(0, 7))
      setLimit(7);
      }

  }, [order])

  function success(pos) {
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;
    console.log('user:', userLat, userLng)
    const distanceArr = allShops.map(shop => ({...shop, distance: calculateDistance(userLat, userLng, shop.lat, shop.long)}) ).sort( (a,b) => a.distance -b.distance);
    console.log(distanceArr)
    setSelectedShops(distanceArr.slice(0,7))
    setDistanceArr(distanceArr);
    setLimit(7)
  }

  return (
    <Switch >
    <Route exact path='/shops'>
    <div class="content-container">
      <h2 className='the-best'>The Best Coffee in Ohio</h2>
      <span onClick={scroll} className='show-more'><i class="fas fa-ellipsis-h"></i></span>
      <label for='sort-by' className='sort-by'>Order By</label>
        <select  value={order} onChange={handleOrder} >
          <option value='alphabetical'>Alphabetical</option>
          <option value='rating'>Rating</option>
          <option value='distance'>Distance</option>
        </select>

      <div className='shops-container'>
        {selectedShops.map(shop => {
          return <Shop shop={shop}/>
        }) }
      <span onClick={scroll} className='show-more'><i class="fas fa-ellipsis-h"></i></span>
      </div>

    </div>
    </Route>

    <Route path="/shops/:id" >
      <ShopDetails shop={selectedShops}/>
    </Route>

    </Switch>
  )
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lng2 - lng1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

}


function error(){
  console.log('err')
  // setOrder('') //rating in the future
}

export default Shops;
