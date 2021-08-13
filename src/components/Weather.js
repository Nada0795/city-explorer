import React from 'react';

class Weather extends React.Component{

  // constructor(props){
  //  super(props);

  //   this.state={
  //     date:'',
  //     description:'',
  //     Arr:[]
  //   }
  // }

  // getInfo =()=>{

  //   this.setState={
  //     date: 
  //   }
  // }


    render(){

      <h2>weatheeeeeer</h2>

      console.log(this.props.weatherArr)
      console.log(this.props.date) //undefined
      console.log(this.props.description) //undefined

        return(
           this.props.weatherArr.map((item)=>{
              <div>
                <p><h6>Date:</h6> {item.date}</p>
                <p><h6>Description:</h6> {item.description}
                <br/>____ ____ ____ </p>
              </div>       
              })
      
        )
    }
}

export default Weather;