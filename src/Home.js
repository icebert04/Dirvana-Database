import { React,  useState, useEffect } from 'react';
import { Reorder } from 'framer-motion'
import ThreeCrypto from './ThreeCrypto';


export default function Home() {
  const [cryptoData,setCryptoData] = useState([]);
  const [exchangeData,setExchangeData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
          fetchCryptoData();
          console.log('Crypto Table Updated');
        },5000)
        return () => clearInterval(interval);
      },[cryptoData])
      
      const fetchCryptoData = async () => {
        const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10');
        const cryptoResponse = await data.json();
        const sortedData = cryptoResponse.sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        // console.log(sortedData);
        setCryptoData(sortedData)
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
          fetchExchangeData();
          console.log('Exchange Table Updated');
        },5000)
        return () => clearInterval(interval);
      },[cryptoData])
    
      const fetchExchangeData = async () => {
        const data = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=10');
        const exchangeResponse = await data.json();
        const sortedData = exchangeResponse.sort((a,b) => b.trust_score_rank - a.trust_score_rank)
        // console.log(sortedData);
        setExchangeData(sortedData)
      }
    return(
        <>
        <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Top Cryptocurrencies by Market Cap</h2>
            <p className='small'>54,062<small> (13,889 are Actively Traded)</small></p>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
            >
              <Reorder.Group values={cryptoData} onReorder={setCryptoData}>
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
                      Price Percentage 24h 
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Price Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.map(cryptocurrency => 
                  <Reorder.Item as='tr' key={cryptocurrency.price_change_percentage_24h} value={cryptocurrency.price_change_percentage_24h}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={cryptocurrency.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {cryptocurrency.name}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">${cryptocurrency.current_price.toLocaleString()}</p>
                      <p className="text-gray-600 whitespace-no-wrap">USD</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.market_cap.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.total_volume.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">${cryptocurrency.price_change_24h.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.price_change_percentage_24h.toLocaleString()}%</p>
                    </td>
                    {cryptocurrency.price_change_percentage_24h > 0 ? 
                    (<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Upward Trend</span>
                      </span>
                    </td>) 
                    : 
                    (<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Downward Trend</span>
                      </span>
                    </td>
                    )}
                  </Reorder.Item>
                  )}
                </tbody>
              </table>
              </Reorder.Group>
              
            </div>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Top Global Crypto Exchanges</h2>
        <p className='small'>724<small> (485 are Active)</small></p>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
            >
              <Reorder.Group values={exchangeData} onReorder={setExchangeData}>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Exchange
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Trust Score
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      24h Volume (Normalized)
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      24h Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeData.map(exchanges => 
                  <Reorder.Item as='tr' key={exchanges.trust_score_rank} value={exchanges.trust_score_rank}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={exchanges.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {exchanges.name}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">{exchanges.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{exchanges.trust_score}/10</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{exchanges.trade_volume_24h_btc_normalized.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{exchanges.trade_volume_24h_btc.toLocaleString()}</p>
                    </td>
                    
                  </Reorder.Item>
                  )}
                </tbody>
              </table>
              </Reorder.Group>
              
            </div>
          </div>
  
  {/* 
          <div>
          <h2 className="text-2xl font-semibold leading-tight">Historical Data</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
            >
              <Reorder.Group values={ethData} onReorder={setEthData}>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Market Cap
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ethData.map(hData => 
                  <Reorder.Item as='tr' key={hData.date} value={hData.date}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hData.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">${hData.prices}/</p>
                      <p className="text-gray-600 whitespace-no-wrap">USD</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{hData.total_volume}</p>
                    </td>
                  </Reorder.Item>
                  )}
                </tbody>
              </table>
              </Reorder.Group>
              
            </div>
          </div> */}
  
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Historical Data</h2>
          </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <ThreeCrypto/>
                </div>
              </div>
        </div>
      </div>
        </>
    )
}