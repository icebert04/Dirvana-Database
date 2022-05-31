import { React,  useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Reorder} from 'framer-motion'
import Coin from './routes/Coin';
import Coins from './component/Coins'


export default function ThreeCrypto (props) {
  const [threeCrypto, setThreeCrypto] = useState([]);
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchThreeData();
      console.log('Crypto Table Updated');
    },5000)
    return () => clearInterval(interval);
  },[threeCrypto])

  const fetchThreeData = async () => {
    const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=3');
    const cryptoResponse = await data.json();
    const sortedData = cryptoResponse.sort((a,b) => b.market_cap - a.market_cap)
    // console.log(sortedData);
    setThreeCrypto(sortedData)
  }
      
  

  return(
      <div>
           {/* <Reorder.Group values={threeCrypto} onReorder={setThreeCrypto}>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Cryptocurrency
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Market Cap
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Total Volume 
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Price Change 24h 
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Price % 24h 
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
              {threeCrypto.map(threecrypto => 
                <Reorder.Item as='tr' key={threecrypto.market_cap} value={threecrypto.market_cap}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={threecrypto.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {threecrypto.name}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">{threecrypto.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${threecrypto.current_price}</p>
                    <p className="text-gray-600 whitespace-no-wrap">USD</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-600 whitespace-no-wrap">{threecrypto.market_cap}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-600 whitespace-no-wrap">{threecrypto.total_volume}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-600 whitespace-no-wrap">${threecrypto.price_change_24h}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-600 whitespace-no-wrap">{threecrypto.price_change_percentage_24h}%</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link to={`/coin/${threecrypto.id}`} element={<Coin />} key={threeCrypto.id}>
                        <p className=" p-2 text-white text-center whitespace-no-wrap bg-blue-500 hover:bg-blue-700 border border-blue-700 rounded">
                            more
                        </p>
                    </Link>
                  </td>
                </Reorder.Item>
              )}

              </tbody>
            </table> 
            </Reorder.Group>*/}
              <Coins coins={coins}/>
      </div>
  )
}