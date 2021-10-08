import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const ShopDetails = ({shop}) => {
  const {id} = useParams();
  console.log(id, '!!!')
  console.log(shop)
  return (
    <>
    <div>Shop Details Page</div>
    <p>{shop.name}</p>
    </>
  )

}

export default ShopDetails;
