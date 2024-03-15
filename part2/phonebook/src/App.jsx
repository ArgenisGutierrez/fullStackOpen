import { useState, useEffect } from 'react'
import Message from './components/Message'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import './index.css'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(persons)
  const [newMessage,setMessage]= useState(null)
  const [typeMessage,setTypeMessage]= useState('success')

  //Efectos
  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
        setShowAll(initialPersons)
      })
  }, [showAll])

  // Events
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const id = persons.find(person=>person.name===newName).id
        personService.updatePerson(id,personObject)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>person.id!==id ?person :returnedPerson))
          setShowAll(persons.map(person=>person.id!==id ?person :returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error=>{
          setMessage(`Information of ${personObject.name} has already been removed from server`)
          setTypeMessage('error')
          setTimeout(()=>setMessage(null),3000)
        })
      }
    } else {
      personService.createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setShowAll(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setTypeMessage('success')
          setMessage(`Add ${personObject.name}`)
          setTimeout(()=>setMessage(null),3000)
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const value = event.target.value
    const filtered = persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
    setShowAll(filtered)
  }

  const handleDeletePerson = (event) => {
    const id = event.target.id
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`)) {
      personService.deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
          setShowAll(persons.filter(person => person.id !== returnedPerson.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={newMessage} className={typeMessage}/>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} newNumber={newNumber} newName={newName} />
      <h3>Numbers</h3>
      <Persons persons={showAll} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
