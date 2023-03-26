import React, { Component } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {

  state = {
    events: [],
    locations: [],
    selectedLocations: 'all',
    number: 32
  }

  async componentDidMount() {
    this.mounted = true;
      getEvents().then((events) => {
        if (this.mounted) {
          events = events.slice(0, this.state.number);
          this.setState({ events, locations: extractLocations(events) });
        }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, inputNumber) => {
    const {number, selectedLocations} = this.state;
    if (location) {
      getEvents().then(events => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter(event => event.location === location);
        const eventsToShow=locationEvents.slice(0, number);
        this.setState({
        events: eventsToShow,
        selectedLocations: location
        });
      });  
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocations === 'all') ?
        events :
        events.filter((event) => event.location === selectedLocations);
        const eventsToShow=locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          number: inputNumber
        });
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className='Title'>
          <h1> Meet App </h1>
          <p> where you can find all the exciting coding workshops </p>
        </div>
        <div className="search-inputs">
          <CitySearch 
            locations={this.state.locations} 
            updateEvents={this.updateEvents} 
          />
          <NumberOfEvents 
            number={this.state.number}
            updateEvents={this.updateEvents} 
          />
        </div>
        <div className='event-grid'>
          <EventList events={this.state.events} />
        </div>
      </div>

    );
  }
}

export default App;