import React, { useState, useEffect } from 'react'
import { useMemo } from 'react/cjs/react.development'
import Name from './components/name'
import phonebookServices from './services/phonebook'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phone, setPhone]= useState('')
  const [filt,setFilter]=useState('')
  const [message, setMessage]= useState(null)
  useEffect(()=>{
    console.log('effect');
    phonebookServices.getAll()
    .then(response=>setPersons(response))
  },[])

  const Notification = ( {notification} ) => {
   
    if (notification === null) {
      return null
    }
    const {message, className}=notification
  console.log("message",message)
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
  console.log('render', persons.length, 'notes')
  const addName=(event)=>{
    event.preventDefault()
    console.log("newName ",newName)
    console.log("phone ",phone)
    console.log('clicked', event.target);
    const found = persons.find(person=> person.name === newName);
    console.log("found ",found)
    if(found){
      const addNewName={
        ...found, number:phone
        
      }
      if (window.confirm(`${newName} is already added to phonebook, replace older number with new one?`)){
        phonebookServices.update(found.id, addNewName).then(()=>phonebookServices.getAll().then(response=>{
          setPersons(response)
          setMessage({message: `${newName} updated`,className:'success'})
          setNewName("")
          setPhone("")
        })).catch(error => {
          setMessage({message:
            `Information of '${newName}' was already deleted from server`, className:'error'}
          )
          setPersons(persons.filter(n => n.id !== found.id))
        })
      }
    }
    else{
      const addNewName={
        name: newName,
        number: phone,
        
      }
      phonebookServices.create(addNewName).then(response=>{
        setPersons(persons.concat(response))
        setMessage({message: `${newName} added`, className: 'success'})
        setNewName("")
        setPhone("")
      }).catch((error) => {
        setMessage({message: error.response.data.error,className: 'error'})
        setTimeout(()=>{
          setMessage(null)
        },5000)
      })
      
      console.log()
    }
    
    
  }
  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)  
    
  }
 
  const filterSearch = useMemo(() => {
    console.log("personsafterdeleting", persons)
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
 const deleteName=(person)=>{
   console.log(person)
  if (window.confirm(`Delete ${person.name}`)){
   phonebookServices.remove(person.id).then(()=>phonebookServices.getAll().then(response=>{
    setPersons(response)
    setMessage({message: `${person.name} deleted`, className:'success'})
    setNewName("")
    setPhone("")
  })).catch((error) => {
    setMessage({message: error.response.data.error,className: 'error'})
    setTimeout(()=>{
      setMessage(null)
    },5000)
  })
}
 }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={message}/>
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
      {filterSearch.map(person=> <Name key={person.id} id={person.id} name={person.name} phone={person.number} deleteName={()=>deleteName(person)}/>)}
       
    
      
    </div>
    
  )
}

export default App