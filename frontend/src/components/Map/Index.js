import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({shop}) => {

  const lat = shop.lat;
  const lng = shop.long;

  const mapStyles = {
    height: "400px",
    width: "400px",
  };

  const defaultCenter = {
    lat, lng
  }

  return (

    <LoadScript
      googleMapsApiKey='AIzaSyBOdWkRdSuj0BPRTjyobY4N4tKrpYPGnBs&callback=initMap'>
       <GoogleMap
         mapContainerStyle={mapStyles}
         zoom={16}
         center={defaultCenter}
         className='shop-map'

       >
      <Marker key={shop.id} position={defaultCenter}/>
       </GoogleMap>
    </LoadScript>
   )
 }

 export default Map;
