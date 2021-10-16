import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import { fetchShops } from "../../store/shops";
import Shop from "./shop";
import ShopDetails from "./ShopDetails";
import RecentActivity from "./RecentActivity";
import './Shop.css'
import { fetchAllReviews } from "../../store/reviews";

const Shops = () => {
  const [selectedShops, setSelectedShops] = useState([]);
  const [scrollWidth, setScrollWidth] = useState(7) //the number to determine the scroll distance
  const [scrollIndex, setScrollIndex] = useState(7); //the number to track the current index
  const [loaded, setLoaded] = useState(false);
  const [distanceArr, setDistanceArr] = useState([]);
  const [ratingsArr, setRatingsArr] = useState([]);
  const [order, setOrder] = useState('alphabetical');

  const dispatch = useDispatch()

  const allShops = useSelector(state => state.shops);
  const reviews = useSelector( state => state.reviews)


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
      scrollRight(distanceArr, scrollWidth);
    }

    if(order === 'rating'){
      scrollRight(ratingsArr, scrollWidth)
    }
    else if (order === 'alphabetical'){
      console.log('scrolling right');
      scrollRight(allShops, scrollWidth);
   }
  }
  function scrollRight(arr, num) {
    console.log('begin scrolling right')
    if (scrollIndex > arr.length - num) {
      console.log('hit the end!!!')
      const end = arr.slice(scrollIndex);
      const start = arr.slice(0, num - (end.length));
      console.log(end, start)
      setSelectedShops([...end, ...start]);
      setScrollIndex(start.length);
      return;
    } else {
      setSelectedShops(arr.slice(scrollIndex, scrollIndex + num));
      setScrollIndex(prev => prev + num);
    }
  }

  const scrollBack = () => {
    if(order === 'distance'){}
    if(order === 'rating'){
    }
    else if (order === 'alphabetical'){

    }
  }

  function scrollLeft(arr, num) {
    console.log('left');
  }

  const handleOrder = ({target}) =>{
    setOrder(target.value);
  }

  useEffect(()=> {
    if (order == 'distance' ) {
      if(distanceArr.length > 0){
        setSelectedShops(distanceArr.slice(0,7));
        setScrollIndex(scrollWidth)
      }else {
        navigator.geolocation.getCurrentPosition(success, error);
         }
       }
    if (order =='rating'){
      if (ratingsArr.length > 0){
        setSelectedShops(ratingsArr.slice(0,7))
        setRatingsArr(ratingsArr);
      }else {
        const averagesObj = getAverage(reviews);
        const ratingsArr = allShops.map((shop) => ({...shop, avgRating: averagesObj[shop.id]|| 0})).sort((a,b)=> b.avgRating - a.avgRating)
        console.log(ratingsArr);
        setSelectedShops(ratingsArr.slice(0,7))
        setRatingsArr(ratingsArr);
        setScrollIndex(scrollWidth)
      }
    }
    if (order == 'alphabetical'){
      setSelectedShops(allShops.slice(0, 7))
      setScrollIndex(scrollWidth);
      }

  }, [order])

  function success(pos) {
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;
    console.log('user:', userLat, userLng)
    const distanceArr = allShops.map(shop => ({...shop, distance: calculateDistance(userLat, userLng, shop.lat, shop.long)}) ).sort( (a,b) => a.distance -b.distance);
    setSelectedShops(distanceArr.slice(0,7))
    setDistanceArr(distanceArr);
    setScrollIndex(scrollWidth)
  }

  return (
    <Switch >
    <Route exact path='/shops'>
    <div class="content-container">
      <h2 className='the-best'>The Best Coffee in Ohio</h2>
      <div className="controller">
        <span onClick={scrollBack} className='show-more left'><i class="fas fa-caret-left"></i></span>
         <span onClick={scroll} className='show-more right'><i class="fas fa-caret-right"></i></span>
         <label for='sort-by' className='sort-by'>Order By</label>
        <select  value={order} onChange={handleOrder} >
          <option value='alphabetical'>Alphabetical</option>
          <option value='rating'>Rating</option>
          <option value='distance'>Distance</option>
        </select>
      </div>


      <div className='shops-container'>
        {selectedShops.map(shop => {
          return <Shop shop={shop} />
        }) }
       <span onClick={scrollBack} className='show-more bottom-left'><i class="fas fa-caret-left"></i></span>
      <span onClick={scroll} className='show-more bottom-right'><i class="fas fa-caret-right"></i></span>
      </div>
      <div className="recent-container">
        <RecentActivity />
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

function getAverage(reviews){
 const keys = Object.keys(reviews);
 const avg = {};
 keys.map( x => avg[x] = 0);


  for (let i = 0; i < keys.length; i++){
    let arr = reviews[keys[i]];
    for(let j = 0; j < arr.length; j++){

      avg[keys[i]] += parseInt(arr[j].rating);
    }
    avg[keys[i]] = avg[keys[i]] / arr.length;
  }
return avg;
}

function error(){
  console.log('err')
  // setOrder('') //rating in the future
}

export default Shops;
