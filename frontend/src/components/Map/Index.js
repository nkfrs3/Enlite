import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({shop}) => {

  const lat = shop.lat;
  const lng = shop.long;

  const mapStyles = {
    height: "400px",
    width: "400px",
    gridArea: "map",
    marginTop: "50px"
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

       >
      <Marker key={shop.id} position={defaultCenter}/>
       </GoogleMap>
    </LoadScript>
   )
 }

 export default Map;
