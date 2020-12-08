import React, { Component } from 'react'

export default class RestaurantDetail extends Component {
    constructor(props){
      super(props)
      console.log(props.match.params.restaurant_id)

      //set up everything want to display
      this.state = {
        restaurant: {},
        avgReview: 0,
      }

    }

    //fetching by restaurant_id

    //component didMount
    componetDidMount() {
      

    }
    render() {
      return (
        <div></div>
      )
    }
}
