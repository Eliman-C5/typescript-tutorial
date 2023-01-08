import React, { useEffect, useRef, useState } from 'react';
import { Sub } from './types';
import './App.css';
import Form from './components/Form';
import List from './components/List'

// const INITIAL_STATE = [
//   {
//     nick: 'dapelu',
//     subMonths: 3,
//     avatar: 'https://i.pravatar.cc/150?u=dapelu',
//     description: 'Dapelu hace de moderadora veces'
//   },
//   {
//     nick: 'Sergio Serrano',
//     subMonths: 3,
//     avatar: 'https://i.pravatar.cc/150?u=sergio_serrano',
//   }
// ]

//Se recomienda separar el estado de el componente
// EJEMPLO: interface "nombreDelComponente"State
interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}
//Ya que normalmente un componente tiene varios estados y no solo uno. Se recomienda poner
//dentro de la interface cada uno de los estados que puede tener mi componente
//Asi sera mas facil de leer a la hora de usar el useState

function App() {

  const [subs, setSubs] = useState<AppState["subs"]>([]); //"En mis estados, busca el tipo subs"
  //Esto tambien se puede escribir asi:
  // const [subs, setSubs] = useState<Sub[]>([]);
  //La unica diferencia es que en el primero se lee "Un array de tipo Sub" y en el segundo se lee al reves
  //"Un tipo sub dentro de un array"
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    
    fetch('http://localhost:3001/subs')
      .then(res => res.json())
      .then(subs => {
        console.log(subs)
        setSubs(subs)
      })
  
  }, [])
  
  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(n => n + 1);
  }
  
  
  return (
    <div className="App" ref={divRef}>
      <h1>Midu subs</h1>
      <List subs={subs} />
      {/* <List subs={subs}>
      {
        [1, 2, 3].map(n => <div className="" style={{color: '#000'}}>{n}</div> )
      }
      </List> */}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
