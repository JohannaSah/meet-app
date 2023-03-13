import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;