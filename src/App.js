import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // define starting state
  state = {
    baseCurrency: "EUR",
    baseCurrencies: ['CAD','HKD','ISK','PHP','DKK','HUF','CZK','AUD','RON','SEK','IDR','INR','BRL','RUB','HRK','JPY','THB','CHF','SGD','PLN','BGN','TRY','CNY','NOK','NZD','ZAR','USD','MXN','ILS','GBP','KRW','MYR','EUR'],
    currencies: ['USD', 'HKD', 'AUD', 'GBP', 'CNY', 'EUR'],
    heights: [],
    exchangeRates: {}, 
    exchangeBase: "EUR",
    exchangeDate: "1970-01-01",
  }

calcHeights(selectedCurrencies, allRates){
  let largest = 1;
  for (const currency of selectedCurrencies) {
      if (allRates[currency] > largest) {
          largest = allRates[currency];
      }
  }
  const maxHeight = 240;
  const Heights = [];
  for (const currency of selectedCurrencies) {
    let calculatedHeight = maxHeight / largest * allRates[currency]
    Heights.push({ height: +calculatedHeight.toFixed(0)});
  }
  return Heights;
}

componentDidMount(){
  let url=`https://api.exchangeratesapi.io/latest?base=${this.state.baseCurrency}`;
  fetch(url)
  .then(res => res.json())
  .then(fetchedData => {
    console.log('fetch...');
    console.log(fetchedData);

    fetchedData.rates['EUR'] = 1.00;
    const Heights = this.calcHeights(this.state.currencies, fetchedData.rates);
    console.log(Heights)
    // Initial Base rate
    this.setState({
      exchangeRates: fetchedData.rates,
      exchangeBase: fetchedData.base,
      exchangeDate: fetchedData.date,
      heights: Heights,
    })
    console.log(this.state.exchangeRates);
  })
} 

onClickBaseCurrencyHandler(ev){
  console.log(ev.target.value);
  this.setState({
    baseCurrency: ev.target.value,
  })
}

updateChart = ()=>{
  let url=`https://api.exchangeratesapi.io/latest?base=${this.state.baseCurrency}`;
  fetch(url)
  .then(res => res.json())
  .then(fetchedData => {
    console.log('fetch...');
    console.log(fetchedData);

    fetchedData.rates['EUR'] = 1.00;
    const Heights = this.calcHeights(this.state.currencies, fetchedData.rates);
    console.log(Heights)
    // Initial Base rate
    this.setState({
      exchangeRates: fetchedData.rates,
      exchangeBase: fetchedData.base,
      exchangeDate: fetchedData.date,
      heights: Heights,
    })
    console.log(this.state.exchangeRates);
  })
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
              Base: 
              <select onChange={this.onChangeBaseCurrencyHandler}>
                {this.state.baseCurrencies.map(item => (
                  item === this.state.baseCurrency? 
                  <option value={item} selected>{item}</option>
                  : <option value={item}>{item}</option>
                ))}
              </select>
              {}
          </div>
        </div>
        <div className='BarChart-choices' id="list-box">List Of Currencies: </div>
        <div className='BarChart-frame' id='chart-location'>
          {this.state.currencies.map( (item, indx) => (
            <div className='BarChart-bar' style={this.state.heights[indx]}>{item}: {this.state.exchangeRates[item]}</div>
          ))}
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