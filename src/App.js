import React, { Component } from 'react'
import axios from "axios";
export default class App extends Component {

    state = {
      number : " ",
        rates : [],
        fromCurrency : "",
        toCurrency : "",
        USD : " ",
        convertedAmount : " ",
        country : []


    }
    componentDidMount(){
      this.fetchExchangeRate();
    }

  

     getCountries = (toCurrency) => {
      try {
          const response =  axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
          
      // return response.data.map(country => country.name);
      } catch (error) {
          throw new Error(`Unable to get countries that use ${toCurrency}`);
      }
      
  }

    
    fetchExchangeRate = () => {
        axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
        .then((response)=>{
            const rates = response.data.rates;
            this.setState({rates})
        })
    }




    change = (e) => {
      const number = e.target.value
      this.setState({number})

    }

    fromCurrencyFunc = (e) => {
      const fromCurrency = e.target.value
      this.setState({fromCurrency})
    }


    toCurrencyFunc = (e) => {
      const toCurrency = e.target.value
      this.setState({toCurrency})
      this.getCountries(toCurrency)

    }

    Convert = () => {
      const rate = this.state.rates
      const USD = 1/rate[this.state.fromCurrency]
      const exchangeRate = USD * rate[this.state.toCurrency]
      const convertedAmount = (this.state.number * exchangeRate).toFixed(2)
      this.setState({convertedAmount})
      
    }


    render() {
      const object = this.state.rates
        return (
          <div>

            <input onChange={this.change} type="Number">
            
            </input>
            From:
            <select onChange={this.fromCurrencyFunc} >
              {Object.entries(object).map(([key,value],i) => 
    <option selected={i === 0} key={i} value={key} >{key}</option>
)
}
            </select>

To:
           
            <select onChange={this.toCurrencyFunc}>
              {Object.entries(object).map(([key,value],i) => 
    <option key={i} value={key} >{key}</option>
)
}
            </select>
            <p> from currency : {this.state.fromCurrency}
            </p>
            <p> to currency : {this.state.toCurrency}
            </p>
            <p>
              Amount : {this.state.number}
            </p>
            <p>
             Converted Ammount : {this.state.convertedAmount}
            </p>
            <button onClick={this.Convert}>
              Convert
            </button>
       

      
   

            
          </div>
        )
    }
}
