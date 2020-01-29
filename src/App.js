import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // define starting state
  state = {
    baseCurrency: "EUR",
    baseCurrencies: ['CAD','HKD','ISK','PHP','DKK','HUF','CZK','AUD','RON','SEK','IDR','INR','BRL','RUB','HRK','JPY','THB','CHF','SGD','PLN','BGN','TRY','CNY','NOK','NZD','ZAR','USD','MXN','ILS','GBP','KRW','MYR','EUR'],
    currencies: ['USD', 'HKD', 'AUD', 'GBP', 'CNY'],
    exchangeRates: "", 
    exchangeBase: "",
    exchangeDate: "",
  }

 
render(){
  return (
    <div className='Container' >
      <div className='header'>
        <h1> Data Visualization</h1>
      </div>
      <div className='main'>
        <div className='BarChart-header'>
          <div className="BarChart-header--title">
              Currency
          </div>
          <div className="BarChart-header--base-selection" id='base-selection'>
              Base
          </div>
        </div>
        <div className='BarChart-choices' id="list-box">List Of Currencies: </div>
        <div className='BarChart-frame' id='chart-location'>
        </div>
      </div>
      <div className='footer'>
          <div>Note: the vertical height is based on value of 1 unit of each currency to a base currency</div>
      </div>
  </div>
  );
  }
}

export default App;