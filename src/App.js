import React, { Component, PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {

  state = {
    events: [],
    locations: [],
    selectedLocations: 'all',
    number: 32,
    showWelcomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({ events, locations: extractLocations(events) });
            }
        });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  };

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
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number};
    })
    return data;
  };

  render() {
    const { locations, number, events } = this.state;

    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <h1 className="app-title"> Meet App </h1>

        <h2 className='listTitle'> Events </h2>
        
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
        <div className='scatterChart'>
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="Number of Events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className='event-grid'>
          <EventList events={this.state.events} />
        </div>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>

    );
  };
};

export default App;