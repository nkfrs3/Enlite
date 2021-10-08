
const Shop = ({shop}) => {
  console.log(shop.image)
  return (
    <div className='shop-card'>
      <h3 className='shop-name'>{shop.name}</h3>
        <span className='shop-logo' style={{  backgroundImage: `url(${shop.image})` }}> </span>
        <p className='address'>address: {shop.address}</p>
        { shop.website && <a href={shop.website} target="_blank"> visit them here </a>}
    </div>
  )
}


export default Shop;
