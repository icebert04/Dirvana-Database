import axios from 'axios';
import {React,  useState, useEffect} from 'react';
import { HistoricalChart } from '../config/api'
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

function HistoricalEth(props) {

      return (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
            <h2 className="text-2xl font-semibold leading-tight">Historical Data</h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Prices
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
            <p></p>
            <p></p>
            <p className='hide-mobile'>${props.coins.market_cap.toLocaleString()}</p>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${props.coins.current_price.toLocaleString()}
                    </p>
                  </td><td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
                    </td><td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">${props.coins.total_volume.toLocaleString()}</p>
                    </td>
                    <td className="text-grey-600 whitespace-no-wrap">${props.coins.market_cap.toLocaleString()}</td>
              </tbody>
            </table>
          </div>
        </div> 
      </div>
    </div>
      )
}

export default HistoricalEth