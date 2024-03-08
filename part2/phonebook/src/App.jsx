import { useState, useEffect } from 'react';
import personService from './services/persons';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setNewFilterName] = useState('');
  const [changeMessage, setChangeMessage] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const checkName = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    const changedPerson = { ...checkName, number: newNumber };

    if (checkName && checkName.number === newPerson.number) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (checkName && checkName.number !== newPerson.number) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(checkName.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== checkName.id ? p : returnedPerson))
            );
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setChangeMessage(`number of ${newName} is changed`);
            }, 5000);
          })
          .catch((error) => {
            setChangeMessage(
              `Information of ${newName} has already been removed from server`
            );
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setChangeMessage(`Add ${returnedPerson.name}`);
          setNewName('');
          setNewNumber('');
          setChangeMessage(`Successfully added ${newName}`);
          setTimeout(() => {
            setChangeMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setChangeMessage(`[error] ${error.response.data.error}`);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== returnedPerson.id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    setNewFilterName(event.target.value);
  };

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={changeMessage} />
      <form>
        <div>
          filter shown with{' '}
          <input value={filterName} onChange={handleNewFilter} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filterPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
