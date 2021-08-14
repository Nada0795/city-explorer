

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

 class Weather extends Component {
    render() {
        return (
            <>
                <h2>{this.props.date}</h2>
                <p>{this.props.description}</p>
            </>
        )
    }
}

export default Weather;
