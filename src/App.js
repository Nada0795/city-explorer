import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';

import './App.css'
import Weather from './components/weather';
import Map from './components/Map'
import Movies from './components/Movies'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
     disName :'',
     lat :'',
     lon :'',
     showMap:false,
     errMsg: 'Unable to geocode',
     displayErr:false,
     weatherArr:[]
    showCard: false,
    weather :[],
    movies:[],
    }
  }
  getLocData = async(event)=>{
    event.preventDefault();
   let cityName= event.target.city.value;
  let URL=`https://us1.locationiq.com/v1/search.php?key=pk.e98623dff1c928d4100d271b111bad0d&q=${cityName}&format=json`;
  try{
  let locResult = await axios.get(URL); 
   this.setState({
    
     disName : locResult.data[0].display_name,
     lat : locResult.data[0].lat,
     lon: locResult.data[0].lon,
     showMap: true,
showCard:true,
displayErr:false,
   })
this.getWethearData(cityName);

 }
  catch{
    this.setState({
      displayErr:true,
    })
  }
}

getWethearData = async(name)=>{

let URL=`http://localhost:3001/weather?searchQuery=${name}`;
try{
let weatherResult = await axios.get(URL); 
 this.setState({
   weatherArr : weatherResult.data,

 })
 console.log(weatherResult.data)
}


const urlMovies = `${process.env.REACT_APP_SERVER_URL}/movies?city=${city}`
    let moviesResult = await axios.get(urlMovies)
    this.setState({
      movies : moviesResult.data
    })


catch{
  this.setState({
    displayErr:true,
    showMap:false,
    showCard:false,

  })
}
}


  render(){
    return(
     
      <div>
<h1>
  City-Explorer
</h1>
<h3>
  where would you like to explore?
</h3>
<Form onSubmit={this.getLocData}>
  <Row className="align-items-center">
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
        Country Name
      </Form.Label>
      <Form.Control id="inlineFormInputName" placeholder="Enter City" name='city' />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Explore</Button>
    </Col>
  </Row>
</Form>
<p>
{this.state.disName}
</p>

<p>The Latitude Is : {this.state.lat}</p>
<p>The Longitude Is : {this.state.lon}</p>

{
  this.state.showMap && <img style={{width:"20rem"}} src={`https://maps.locationiq.com/v3/staticmap?key=pk.e98623dff1c928d4100d271b111bad0d&center=${this.state.lat},${this.state.lon}& zoom=18`} alt="map"/>
}
{ 
this.state.weatherArr && this.state.weatherArr.map(item=> 
  {
   return <Weather date={item.date} description={item.description}/>
  }

  )

}

<map 
showCard={this.state.showCard}
displayErr={this.state.displayErr}
errorMsg={this.state.errMsg}
/>

<Movies showCard= {this.state.showCard} movies={this.state.movies} ></Movies>

<Weather showCard= {this.state.showCard} weather={this.state.weather} ></Weather>

{
  // this.state.displayErr && this.state.errMsg
}


{/* https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg */}

<p>
&copy;NadaAl-abdullah
</p>

</div>
     
    )
  }
}
export default App;