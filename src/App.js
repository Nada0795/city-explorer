import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
     disName :'',
     lat :'',
     lon :'',
     showMap:false,
     errMsg: 'Unable to geocode',
     displayErr:false
    }
  }
  getLocData = async(event)=>{
    event.preventDefault();
   let cityName= event.target.city.value;
  let URL=`https://us1.locationiq.com/v1/search.php?key=pk.b2d9bf0052a0428c7de26a517415f6f9&q=${cityName}&format=json`;
  try{
  let locResult = await axios.get(URL);  
   this.setState({
     disName : locResult.data[0].display_name,
     lat : locResult.data[0].lat,
     lon: locResult.data[0].lon,
     showMap: true,
   })
 }
  catch{
    this.setState({
      displayErr:true,
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
{
  this.state.showMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.b2d9bf0052a0428c7de26a517415f6f9&center=${this.state.lat},${this.state.lon}& zoom=18`} alt="map"/>
}
{
  this.state.displayErr && this.state.errMsg
}
<p>
&copy;NadaAl-abdullah
</p>
</div>
     
    )
  }
}
export default App;