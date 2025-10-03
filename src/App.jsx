import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layouts/Home'
import PokeListados from './layouts/PokeApi'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/poke' element={<PokeListados/>}/>
      </Routes>
    </>
  )
}

export default App