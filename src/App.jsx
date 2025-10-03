import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layouts/Home'
import PokeApi from './layouts/PokeApi'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pokeapi' element={<PokeApi/>}/>
      </Routes>
    </>
  )
}

export default App