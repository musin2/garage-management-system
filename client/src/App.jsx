import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
      <h1>Home Page</h1>
    </>
  )
}

export default App
