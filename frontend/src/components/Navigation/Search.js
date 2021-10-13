import { useEffect, useState } from "react"


const Search = () => {
  const [term, setTerm] = useState("")
const [results, setResults] = useState([]);

  useEffect(()=> {
    if(term.length > 0) {
      fetch(`/api/search/live/${term}`).then(res => res.json()).then(json => console.log(json));

    }

  }, [term])

  const handleSearch = (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  }

  return (
    <div className='search-bar'>
      <input type="text" placeholder='search' value={term} onChange={handleSearch} />
      <span>{results}</span>
    </div>
  )
}

export default Search;
