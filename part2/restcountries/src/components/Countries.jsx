import Countrie from "./Countrie"
const Countries = ({ countries, handleShowCountrie, show }) => {
  if (countries.length == 0) {
    return (
      <div>
        <p></p>
      </div>
    )
  }
  if (countries.length == 1) {
    return (
      <Countrie countrie={countries[0]} />
    )
  }

  if (countries.length <= 10) {
    if (show.length) {
      return (
        <div>
          {countries.map(countrie =>
            <p key={countrie.ccn3}>{countrie.name.common} <button id={countrie.ccn3} onClick={handleShowCountrie}>show</button> </p>
          )}
          <Countrie countrie={show[0]}/>
        </div>
      )
    }
    return (
      <div>
        {countries.map(countrie =>
          <p key={countrie.ccn3}>{countrie.name.common} <button id={countrie.ccn3} onClick={handleShowCountrie}>show</button> </p>
        )}
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches,specify another filter</p>
      </div>
    )
  }
}

export default Countries
