import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import Map from './Component/Map';
import Weather from './Component/Weather';
import Movies from './Component/Movies';

import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      display_name: '',
      lat: '',
      lon: '',
      showMap: false,
      displayErr: false,
      errMsg: 'unable to geocode',
      weatherArr:[],
      movieArr:[],

    }
  }

  //==============================================location Map lab6================================================
  getLocationData = async (event) => {
    event.preventDefault();

    let cityName = event.target.city.value
    console.log(cityName)

    //  https://eu1.locationiq.com/v1/search.php?key=pk.4c3005b1826605a4f7ba622e6e59cb39&q=amman&format=json

    let URL = `https://eu1.locationiq.com/v1/search.php?key=pk.4c3005b1826605a4f7ba622e6e59cb39&q=${cityName}&format=json`

    try {
    let locResult = await axios.get(URL);
    console.log(locResult.data[0].display_name);

      this.setState({
        display_name: locResult.data[0].display_name,
        lat: locResult.data[0].lat,
        lon: locResult.data[0].lon,
        showMap: true,
      })

 //=================================================Weather API lab8=============================================================
// http://localhost:3001/getWeather?lat=47.6038321&lon=-122.3300624&searchQuery=Seattle
let URLServer=`http://localhost:3001/getWeather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${city}`;
let weatherResult= await axios.get(URLServer)
this.setState({
  weatherArr : weatherResult.data
})


//=======================================================MOvies APi Lab8==========================================================================
// http://localhost:3001/getMovie?city=amman
const URLMovies= `http://localhost:3001/getMovie?city=${city}`
let movieResult= await axios.get(URLMovies)
this.setState({
  movieArr : movieResult.data
})

    }

    catch {
      this.setState({
        displayErr: true,
        showMap:false,
      })
    }
    // this.getWeather(city)
  }

  //============================================Weather local lab7=====================================================

  // getWeather= async(city)=>{


  //   // http://localhost:3001/weather?lat=47.6038321&lon=-122.3300624&searchQuery=Seattle
  //   let URL =` http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${this.state.city}`
  //   let weatherResult= await axios.get(URL);
  //    this.setState({
  //      weatherArr: weatherResult.data    
  //    })
  //    //console.log(this.state.weatherArr)
  // };


//===================================================================================================================================================
  render() {
    return (
      <div>
        <h1>
          City Explorer2
        </h1>

        <Form onSubmit={this.getLocationData}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Choose city
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Choose city"
                name='city'
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2"  >
                Expolr!
              </Button>
            </Col>
          </Row>
        </Form>



        <Map
          display_name={this.state.display_name}
          lat={this.state.lat}
          lon={this.state.lon}
          showMap={this.state.showMap}
          displayErr={this.state.displayErr}
          errMsg={this.state.errMsg}
        />

        <Weather weatherArr={this.state.weatherArr}/>

        <Movies movieArr={this.state.movieArr}
        ></Movies>
       
      </div>
    )
  }
}

export default App;