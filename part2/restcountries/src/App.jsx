import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState([])
  const [show,setShow]= useState([])
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilter = (event) => {
    const value = event.target.value
    if(value.length){
    const countriesFilter = countries.filter(countrie => countrie.name.common.toLowerCase().includes(value.toLowerCase()))
    setFilter(countriesFilter)
    }else{
    setFilter([])
    }
  }

  const handleShowCountrie = (event)=>{
    const countrie = countries.filter(countrie=>countrie.ccn3===event.target.id)
    setShow(countrie)
  }

  return (
    <div>
      find countries <input onChange={handleFilter} />
      <Countries countries={filter} handleShowCountrie={handleShowCountrie} show={show}/>
    </div>
  )

}

export default App
