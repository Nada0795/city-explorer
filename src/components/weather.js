import React, { Component } from 'react'

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
