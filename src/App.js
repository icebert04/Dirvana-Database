import { React,  useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Coins from './component/Coins'
import Coin from './routes/Coin'
import Home from './Home.js'
import axios from 'axios'

// reorder
function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false'
  
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data[0])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
    <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path='/coin' element={<Coin />} >
        <Route path=':coinId' element={<Coin />} />
          </Route>
    </Routes>
    </>
  );
}

export default App;