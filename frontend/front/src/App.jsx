import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)
  const title = "IUDC Sistema de Contol de Acceso"
  return (
    <>
      <Header title={title}/>
      <Footer/>
    </>
  )
}

export default App
