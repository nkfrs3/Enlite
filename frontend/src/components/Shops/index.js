import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../../store/shops";
import Shop from "./shop";
import './Shop.css'

const Shops = () => {
  const [selectedShops, setSelectedShops] = useState([]);
  const [limit, setLimit] = useState(7);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()

  const allShops = useSelector(state => state.shops);

  useEffect(() => {
    const res = dispatch(fetchShops());

    }, [dispatch]);

    useEffect(()=> {
      if (!loaded){
        if (allShops.length> 0 ){
          setLoaded(true);
          setSelectedShops(allShops.slice(0,7));
        }
      }
    }, [allShops])


  const scroll = () => {
    if (limit > allShops.length - 8 ) {
      setSelectedShops(allShops.slice(0, 7));
      setLimit(0);
      return;
    } else {
        setSelectedShops(allShops.slice(limit, limit+7));
        setLimit(limit => limit + 7)
      }
  }

  return (
    <div class="content-container">
      <h2 className='the-best'>The Best Coffee in Ohio</h2>
      <span onClick={scroll} className='show-more'><i class="fas fa-ellipsis-h"></i></span>
      <div className='shops-container'>
        {selectedShops.map(shop => {
          return <Shop shop={shop}/>
        }) }
      </div>
    </div>
  )
}


export default Shops;
