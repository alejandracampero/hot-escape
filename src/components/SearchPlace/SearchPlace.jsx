import React, { Component } from 'react';
import * as flightAPI from '../../services/flightService'

class SearchPlace extends Component {
  state = { 
    places: [],
    formData: {
      query: '',
    }
  }
  // purpose of this component is to take query in state  and return a selectable list
  // of valid places to go to
  sendRequest = async () => {
    const query = this.state.formData.query;
    const results = await flightAPI.searchPlace(query);
    console.log(query, results.Places);
    this.setState({places: results.Places})
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData, [e.target.name]: e.target.value
    }
    this.setState({ formData })
  }

  render() { 

    return ( 
      <>
      {this.state.places.length ?
        <select
        size={this.state.places.length}
      >
        {this.state.places.map((place, idx) =>
        <option key={idx}>
          {place.PlaceName}
        </option>)}
      </select>

      :
      <></>
    
    }
        
        <input 
            value={this.state.formData.query} 
            type="text" 
            name="query"
            onChange={this.handleChange}
          />
        <button onClick={this.sendRequest}>Send</button>
      </>
     );
  }
}
 
export default SearchPlace;