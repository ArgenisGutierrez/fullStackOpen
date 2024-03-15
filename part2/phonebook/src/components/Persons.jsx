const Persons = ({persons,handleDeletePerson}) =>{
  return (
    <div>
    {persons.map(person =>
      <p key={person.id}>{person.name} {person.number} <button id={person.id} onClick={handleDeletePerson}>{'delete'}</button></p>
    )}
    </div>
  )
}

export default Persons
