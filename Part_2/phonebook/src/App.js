import { useState, useEffect } from 'react';

import phoneServices from './services/phone';

const Notification = ({message, messageType}) => {
  const notifStyle = {
    border: '2px solid green',
    backgroundColor: 'lightgrey',
    width: '90vw',
    borderRadius : 5,
    margin: '0 auto',
    paddingLeft: 4 
  }

  if (messageType === 1)
  {
    notifStyle.border = '2px solid red';
  }
  if (message !== null){
    return(
      <div style={notifStyle}>{message}</div>
    )
  }
}

const Person = ({ person, setPersons, setAll, all, setMessage, setMessageType }) => {
  const handleDelete = () => {
    const value = window.confirm(`Delete ${person.name} ?`);
    if(value === true)
    {
      phoneServices.deleteContact(person.id).then(response => {
        const newPersons = all.filter(p => p.id !== person.id);
        setPersons(newPersons);
        setAll(newPersons);
      }).catch(err => {
        console.log(err);
        setMessageType(1);
        setMessage(`Information of ${person.name} has already been removed from the server`);
        setTimeout(()=> {
          setMessage(null);
        }, 5000);
      })
    }
  }
  return (
    <div>
      <p>{person.name} {person.number} <button onClick={handleDelete}>delete</button></p>
    </div>
  )
}

const Search = (props) => {
  return( <p>filter shown with<input value={props.search} onChange={props.searchChange} /></p>)
}

const Form = (props) => {

  return(
    <form onSubmit={props.submitContact}>
    <h1>add a new contact</h1>
    <div>
      name: <input value={props.newName} onChange={props.inputName} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.inputNumber} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
  )
}
//if app breaks revert until this comment is 'remember'
function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [all, setAllpersons] = useState(persons);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); //messageType is 0 for success and 1 for errors

  useEffect((() => {
    phoneServices.getContacts().then(result => {
      const person = result.data;
      setPersons(person);
      setAllpersons(person);
    }).catch(err => {
      console.log(err);
      setMessageType(1);
      setMessage(`Could not connect to the server`);
    })
  }),[])

  const submitContact = (event) => {
    event.preventDefault();
    const findPerson = all.findIndex(p => p.name.toLocaleLowerCase() === newName.toLocaleLowerCase());
    if (findPerson === -1) {
      const newPerson = {name: newName, number: newNumber}
      phoneServices.addContact(newPerson).then(response => {
        const newPersons = all.concat(response.data);
        setPersons(newPersons);
        setAllpersons(newPersons);
        setMessageType(0);
        setMessage(` Added ${newName}`);
        setTimeout(()=> {
          setMessage(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
        setSearch('');
      }).catch(err => {
        setMessageType(1);
        setMessage(`could not add ${newName} to contacts`);
        console.log(err);
      })
    }
    else {
      const value = window.confirm(`${newName} already added to phonebook, replace old number with a new one?`);
      if(value === true)
      {
        const existingPerson = all[findPerson];
        const updatedContact = {...existingPerson, number: newNumber};
        phoneServices.updateContact(updatedContact).then(res => {
          const otherContacts = all.filter(p => p.id !== updatedContact.id);
          const newContactList = otherContacts.concat(updatedContact);
          setAllpersons(newContactList);
          setPersons(newContactList);
        }).catch(err => {
          setMessageType(1);
          setMessage(`Information of ${newName} has already been removed from the server`);
          setTimeout(()=> {
            setMessage(null);
          }, 5000);
        })
      }
    }

  }
  const inputName = (e) => {
    setNewName(e.target.value);
  }
  const inputNumber = (e) => {
    setNewNumber(e.target.value);
  }
  const searchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    // setPersons(personToShow);
    if (value !== '') {
      const searchedPersons = all.filter(p => p.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
      if (searchedPersons.length !== 0) {
        setPersons(searchedPersons);
      }
      else {
        alert(`No match for ${value} was found`);
      }
    }
    else {
      setPersons(all);
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message ={message} messageType={messageType}/>
      <Search search={search} searchChange={searchChange}/>
      <Form submitContact={submitContact} newName={newName} inputName={inputName} newNumber={newNumber} inputNumber={inputNumber}/>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <Person key={person.name} person={person} setPersons={setPersons} setAll={setAllpersons} all={all} setMessage={setMessage} setMessageType={setMessageType}/>
      })}
    </div>
  );
}

export default App;
