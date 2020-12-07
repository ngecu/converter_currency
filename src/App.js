import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button,Container,Row,Col,Card} from 'react-bootstrap';

export default class App extends Component {
  state = {
    number : " ",
    rates : [],
    fromCurrency : " ",
    toCurrency : " ",
    USD : " ",
    convertedAmount : " ",
    name : " ",
    timestamp : " ",
    date : " ",
    formatedTime : " "
  }

  componentDidMount(){
    this.fetchExchangeRate()
  }

  fetchExchangeRate = () =>{
    axios.get('http://data.fixer.io/api/lates1t?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
    .then((response)=>{
      const {rates,timestamp,date} = response.data;
      
      var unix_timestamp = timestamp
      var x = new Date(unix_timestamp * 1000);
      var hours = x.getHours();
      var minutes = "0" + x.getMinutes();
      var seconds = "0" + x.getSeconds();
      var formatedTime = hours + ":" + minutes.substr(-2) + ":" +seconds.substr(-2);
      

      this.setState({rates,timestamp,date,formatedTime})
      console.log("formated Time state:",this.state.formatedTime)

    })
    .catch((error)=>{
      console.log("error:",error)
    })

  }

  change = (e) => {
    const number = e.target.value
    this.setState({number})
    console.log("number is ,",number)
  }

  fromCurrency = (e) => {
    const fromCurrency = e.target.value
    this.setState({fromCurrency})
  }
  toCurrency = (e) => {
    const toCurrency = e.target.value
    this.setState({toCurrency})
  }

  Convert = () => {
    const {rates,fromCurrency,toCurrency,number} = this.state
    const USD = 1/rates[fromCurrency]
    const exchangeRate = USD * rates[toCurrency]
    const convertedAmount = (number * exchangeRate).toFixed(2)
    this.setState({convertedAmount})
  }

  render() {
    const {timestamp,rates,number,toCurrency,fromCurrency,convertedAmount,date,formatedTime} = this.state
    return (
      <div className="App" >
        <Container>
          <Card>
            <Card.Header>
              <h1>CURRENCY CONVERTER</h1>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                Amount: {number}
                </Col>
                <Col>
                From Currency: {fromCurrency}
                </Col>
                <Col>
                To Currency : {toCurrency}
                </Col>
              </Row>
              <Row>
                <Col>
                <input onChange={this.change}  type="Number"/>
                </Col>
                <Col>
                <select onChange={this.fromCurrency} >
                  {Object.entries(rates).map(([key,value],i)=> <option selected={i === 0} key={i} value={key}>{key}</option> )}
                 
                </select>
                </Col>
                <Col>
                <select onChange={this.toCurrency}>
                  {Object.entries(rates).map(([key,value],i)=> <option selected={i === 0} key={i} value={key}>{key}</option> )}
                 
                </select>
                </Col>
              </Row>
              <Row>
                <Col>
                
                </Col>
                <Col>
                <h1>
                  {number} {fromCurrency} =  <b> {convertedAmount} </b> {toCurrency}
                  </h1></Col>
                  <Col>
                  
                  </Col>
              </Row>
              <Row>
                <Col>
                </Col>
                <Col>
                <Button onClick={this.Convert} size="lg" variant="warning">Convert</Button>
                </Col>
                <Col>
                Last Update : {date} {formatedTime}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <p>
          {timestamp}
          </p>
      </div>
    )
  }
}
