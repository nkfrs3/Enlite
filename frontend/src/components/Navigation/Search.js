import { useEffect, useState } from "react"
import { useHistory } from "react-router"

const Search = () => {
  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  // const [isLoaded, setIsLoaded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  useEffect(()=> {
    if(term.length > 0) {
      // setIsLoaded(false);
      setShowSearch(true);
      fetch(`/api/search/live/${term}`).then(res => res.json()).then(json => {setResults(json); console.log(json)}).catch(e => console.log(e));
      // setIsLoaded(true);
    } else (setResults(""));

  }, [term])

  const handleSearch = (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  }

  useEffect(() => {
    if (!showSearch) return;
    const closeModal = () => {
      setShowSearch(false);
      setTerm('');
    };
    document.addEventListener('click', closeModal);

    return () => document.removeEventListener("click", closeModal);
  }, [showSearch]);


  return (
    <div className='search-bar'>
      <input type="text" placeholder='search' value={term} onChange={handleSearch} onClick={()=> {setShowSearch(true); setResults([])}}/>
      {results.length > 0 && showSearch && <ul className='search-results'>
        { results.map(shop => <div onClick={(e) => history.push(`/shops/${shop.id}`)}>{shop.name}, {shop.city}</div>)}
      </ul>
     }
    </div>
  )
}

export default Search;
