import React, { Component } from 'react'
import axios from "axios";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Container,Row,Col,Card } from 'react-bootstrap';

export default class App extends Component {


  

    state = {
      number : " ",
        rates : [],
        fromCurrency : "",
        toCurrency : "",
        USD : " ",
        convertedAmount : " ",
        name:" ",
        timestamp:" ",
        date : " ",
        formatedTime : " "


    }
    componentDidMount(){
      this.fetchExchangeRate();
    }

  

   
    
    fetchExchangeRate = () => {
        axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
        .then((response)=>{
          const {rates,date,timestamp} = response.data

            var unix_timestamp = this.state.timestamp
            var x = new Date(unix_timestamp * 1000);
            var hours = x.getHours();
            var minutes = "0" + x.getMinutes();
            var seconds = "0" + x.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            this.setState({rates,date,timestamp,formattedTime})

            
            console.log(this.state.formattedTime)

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
          <div className="App">

<Container>

<Card>
  <Card.Header>
    <h1>CURRENCY CONVERTER</h1>
  </Card.Header>
  <Card.Body>
  <Row>
    <Col>
    Amount : {this.state.number}

    </Col>
    <Col>
    From currency : {this.state.fromCurrency}
    
    </Col>

    <Col>
    To currency : {this.state.toCurrency}
  
    </Col>
  </Row>
  <Row>
    <Col> <input onChange={this.change} type="Number"/> </Col>
    <Col>           <select onChange={this.fromCurrencyFunc} >
              {Object.entries(object).map(([key,value],i) => 
    <option selected={i === 0} key={i} value={key} >{key}</option>
)
}
            </select>
            </Col>
    <Col>
    <select onChange={this.toCurrencyFunc}>
              {Object.entries(object).map(([key,value],i) => 
    <option key={i} value={key} >{key}</option>
)
}
            </select>
    </Col>
  </Row>
 
  <Row>
    <Col>
    
    </Col>
    <Col>
    <h1>
    {this.state.number}  {this.state.fromCurrency} = <b>{this.state.convertedAmount}</b> {this.state.toCurrency}
    </h1>
    Converted Amount : {this.state.convertedAmount} {this.state.toCurrency}

    </Col>
    <Col>

    </Col>
  </Row>
<Col>

</Col>
<Col>
<Button onClick={this.Convert} variant="warning" size="lg" >Convert</Button>

</Col>
<Col>
Last update  {this.state.date} {this.state.formattedTime}
</Col>
  

  </Card.Body>
</Card>
  

  
</Container>

          </div>
        )
    }
}
