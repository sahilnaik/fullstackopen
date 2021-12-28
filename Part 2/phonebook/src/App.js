import React, { useState } from 'react'
import { useMemo } from 'react/cjs/react.development'
import Name from './components/name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [phone, setPhone]= useState('')
  const [filt,setFilter]=useState('')

  const addName=(event)=>{
    event.preventDefault()
    console.log("newName ",newName)
    console.log("phone ",phone)
    console.log('clicked', event.target);
    const found = persons.find(person=> person.name === newName);
    console.log("found ",found)
    if(found){
      window.alert(`${newName} is already added to phonebook`);
    }
    else{
      const addNewName={
        name: newName,
        number: phone,
        id: persons.length +1
      }
      setPersons(persons.concat(addNewName))
      setNewName("")
      setPhone("")
      console.log()
    }
    
    
  }
  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)  
    
  }
 
  const filterSearch = useMemo(() => {
    return persons.filter(person =>
      person.name.toLowerCase().includes(filt.toLowerCase())
    )
  }, [filt, persons])
  const handleFilterChange=(event)=>{
  
    setFilter(event.target.value)

  }
  const handlePhoneChange=(event)=>{
    console.log(event.target.value)
    setPhone(event.target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          filter shown with: <input value={filt} onChange={handleFilterChange}/>
        </div>
        <div>
          <h2>Add a new record</h2>
          name: <input value={newName} onChange={handleNameChange}/>
          <br></br>
          phone: <input value={phone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterSearch.map(person=> <Name key={person.id} id={person.id} name={person.name} phone={person.number}/>)}
       
    
      
    </div>
    
  )
}

export default App