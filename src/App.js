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

  stateArrayPush = (srcArray, newItem) => {
    const arrayAdd = srcArray.slice(); // duplicating array
    arrayAdd.push(newItem);
    return arrayAdd;
  }
  
  stateArrayRemove = (srcArray, removingItem) => {
    const arraySourceCopy = srcArray.slice(); // duplicating array
    const arrayUpdate = arraySourceCopy.filter((item) => item !== removingItem);
    return arrayUpdate;
  }
 
  formatRates = (ObjCurrencyRates) => {
    for (const key in ObjCurrencyRates) {
      ObjCurrencyRates[key] = ObjCurrencyRates[key].toFixed(3)
    }
  }
  calcHeights(selectedCurrencies, allRates){
    let largest = 1;
    for (const currency of selectedCurrencies) {
        console.log('Calc:', currency, allRates[currency])
        if ( +allRates[currency] > largest) {
            largest = allRates[currency];
        }
    }
    console.log('highest height:', largest)
    const maxHeight = 260;
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
      console.log('Initial fetch...');
      console.log(fetchedData);

      // Add BaseCurrency as 1.0
      fetchedData.rates[this.state.baseCurrency] = 1.00;

      // Change rates to two digits floating
      this.formatRates(fetchedData.rates)

      // Calculate Heights of bars
      const Heights = this.calcHeights(this.state.currencies, fetchedData.rates);
      console.log('Initial heights:', Heights)

      // Initial Base rate
      this.setState({
        exchangeRates:  fetchedData.rates,
        exchangeBase: fetchedData.base,
        exchangeDate: fetchedData.date,
        heights: Heights,
      })
    })
  } 

  updateChart = (Base) =>{
    let url=`https://api.exchangeratesapi.io/latest?base=${Base}`;
    fetch(url)
    .then(res => res.json())
    .then(fetchedData => {
      console.log('Update fetch...');
      console.log(fetchedData);


      // Add BaseCurrency as 1.0
      fetchedData.rates[Base] = 1.00;

      // Change rates to two digits floating
      this.formatRates(fetchedData.rates)


      const currenciesWithNewBase = this.stateArrayPush(this.state.currencies, Base);
      const updatedCurrencies = this.stateArrayRemove(currenciesWithNewBase, this.state.baseCurrency)

      const Heights = this.calcHeights(updatedCurrencies, fetchedData.rates);
      console.log('Updated heights:', Heights)

      // Initial Base rate
      this.setState({
        exchangeRates: fetchedData.rates,
        exchangeBase: fetchedData.base,
        exchangeDate: fetchedData.date,
        heights: Heights,
        baseCurrency: Base,
        currencies: updatedCurrencies, 
      })
      console.log(this.state.exchangeRates);
    })
  }


  onChangeBaseCurrencyHandler = (ev) => {
    console.log('Event:', ev.target.value);
  const baseCurrency = ev.target.value;
    this.updateChart(baseCurrency) 
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
                <form>
                Base: 
                <select onChange={this.onChangeBaseCurrencyHandler}>
                  {this.state.baseCurrencies.map(item => (
                    item === this.state.baseCurrency? 
                    <option value={item} selected>{item}</option>
                    : <option value={item}>{item}</option>
                  ))}
                </select>
                </form>
            </div>
          </div>
          <div className='BarChart-choices' id="list-box">List Of Currencies: </div>
          <div className='BarChart-frame' id='chart-location'>
            {this.state.currencies.map( (item, indx) => (
              <div className='BarChart-bar' style={this.state.heights[indx]}>{item} <br/>
              {this.state.exchangeRates[item]}</div>
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