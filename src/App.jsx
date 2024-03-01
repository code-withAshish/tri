  import { useState, useEffect } from 'react'
  import axios from 'axios'
  import './App.css'
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Play from './Pages/Play'
import Home from './Pages/Home'
import StatsPage from './Pages/StatsPage'

  function App() {
    const [data, setData] = useState(null);
    const [stats, setStats] = useState(null);
    // const [count, setCount] = useState(0)

    useEffect(() => {

      axios.get('http://localhost:3000/').then((res) => {
        setData(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    });

    axios.get('http://localhost:3000/stats').then((res) => {
      setStats(res.data)
    console.log(res.data)
  }).catch((err) => {
    console.log(err)
  });
    }, []);
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/play' element={<Play />}> </Route>
          <Route path='/stats' element={<StatsPage />}> </Route>
        </Routes>
      </BrowserRouter>
    )
  }

  export default App
 