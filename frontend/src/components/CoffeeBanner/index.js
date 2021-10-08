import React, {useState, useEffect} from "react";
import './CoffeeBanner.css'

const CoffeeBanner = () => {
  const [coffees, setCoffees] = useState([]);
  const [selected, setSelected] = useState();
  const [count, setCounter] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [options, setOptions] = useState();
  const [scrollCounter, setScrollCounter] = useState(0);



  const scrollRight = () => {
   console.log(coffees);
    if (scrollCounter >= 15){
      setScrollCounter(0)
      setOptions(coffees.slice(0, 5));
    }else {
      setOptions(coffees.slice(scrollCounter + 5, scrollCounter + 10))
      setScrollCounter(prev => prev + 5);
    }

}
  const scrollLeft = () => {
    if (scrollCounter < 5){
      setScrollCounter(coffees.length - 5)
      setOptions(coffees.slice(coffees.length -5));
    }else {
      setOptions(coffees.slice(scrollCounter -5, scrollCounter))
      setScrollCounter(prev => prev - 5);
    }

}
  useEffect(()=> {
    fetch('https://api.sampleapis.com/coffee/hot')
      .then(res => res.json())
      .then(json =>{
        setCoffees((json.map(obj => ({title:obj.title, description:obj.description}))).slice(0, -1) )
      }
        )}, []);

        useEffect(()=> {
          setSelected(coffees[0]);
          setOptions(coffees.slice(0,5));
        }, [coffees])


  return (
    <div className='coffee-banner-container'>
    {!hidden && ( <div className="coffee-banner">
        <h2>{selected?.title}</h2>
        <p>{selected?.description}</p>
        <span className='scroll scroll-left' onClick={scrollLeft}><i class="fas fa-angle-left"></i></span>
        <ul className='coffee-selector'>
          {options?.map(type => <li key={type.title} onClick={()=> {
            setSelected(coffees.find(coffee => coffee.title == type.title));
          }}>{type.title}</li>)}
        </ul>
        <span className='scroll scroll-right' onClick={scrollRight}><i class="fas fa-angle-right"></i></span>
      </div>)}
          {hidden ? (<span className='show-banner' onClick={(e) => {e.preventDefault();
                   setHidden(!hidden);
          }}><i class="fas fa-chevron-down"></i></span>
          ) : (<span  className='hide-banner' style={{marginTop:'0px'}}onClick={(e) => {e.preventDefault();
                   setHidden(!hidden);
          }}><i class="fas fa-chevron-up"></i></span>) }
    </div>
  )
}

export default CoffeeBanner;
