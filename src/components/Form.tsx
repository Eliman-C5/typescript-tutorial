import { useReducer, useState } from "react"
import useNewSubForm from "../hooks/useNewSubForm"
import { Sub } from '../types'
//Reutilizando interfaces
//Hay que diferenciar entre dos tipos de interfaces: 
//1.- Las que serian de la logica de negocios
//2.- Las que serian de la logica de programacion
//La forma de diferenciarlas es que unas se pueden explicar a un usuario y otras no
//Se recomienda separar las interfaces de logica de negocios y reutilizarlas. Y nunca las dejes
//dentro de los componentes porque no cumplen mayor funcion en el componente

interface FormProps {
  onNewSub: (newSub: Sub) => void
}

const Form = ({onNewSub}: FormProps) => {

  //const [inputValues, setInputValues] = useState<FormState['inputValues']>(INITIAL_STATE);
  
  const [inputValues, dispatch] = useNewSubForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNewSub(inputValues);
    handleClear()
  }
  
  //Implicatamente el event tiene un tipo any porque esta fuera del contexto del formulario
  //En estos casos se hace algo llamado hover
  //PASO 1 (FUNCION INICIAL)
  // const handleChange = e => {
  //   setInputValues({
  //     ...inputValues,
  //     [e.target.name]: e.target.value
  //   })
  // }
  
  //PASO 3 (FUNCION TERMINADA CON TIPO DE DATO)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
  
    const {name, value} = e.target
  
    dispatch({
      type: 'change_value',
      payload: {
        inputName: name,
        inputValue: value
      }
    });
    
  }
  
  const handleClear = () => {
    dispatch({
      type: 'clear'
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* PASO 2 (PROCESO PARA HACER HOVER) */}
      {/* Ponemos la funcion en onChange y hacemos hover sobre el parametro para ver el tipo de dato */}
      {/* Y despues asignamos el tipo de dato a la funcion fuera de el contexto */}
      <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick" />
      <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="subMonths" />
      <input onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar" />
      <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description" />
      
      <button onClick={handleClear} type="button">Clear the form</button>
      <button type="submit">Save new sub!</button>
    </form>
  )
}

export default Form