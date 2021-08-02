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
    
    }
  }
  getLocData = async(event)=>{
    event.preventDefault();
   let cityName= event.target.city.value;
  let URL=`https://us1.locationiq.com/v1/search.php?key=pk.b2d9bf0052a0428c7de26a517415f6f9&q=${cityName}&format=json`;

  let locResult = await axios.get(URL);  
   this.setState({
     disName : locResult.data[0].display_name,
     lat : locResult.data[0].lat,
     lon: locResult.data[0].lon,
     showMap: true,
   })

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
        Name
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

<p>
&copy;NadaAl-abdullah
</p>
</div>
     
    )
  }
}
export default App;