import { useSelector } from 'react-redux';
import { useState } from 'react';
import './LandingPage.css'

const LandingPage = () => {
  const currentUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState();
  const handleClick = (e) => {
    e.preventDefault();

  }
 return (
   <>
  <div className='landing-page'>
    <h1>Enlite</h1>
    <h3>A place to discover and share local coffee spots in Ohio.</h3>
   {!currentUser  && <button onClick={handleClick}>Get Started</button>}
  </div>

  </>
 )
}


export default LandingPage;
