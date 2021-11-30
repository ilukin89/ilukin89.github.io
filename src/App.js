import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
  }

// Function for updating the events state when a city is selected

  updateEvents = (location) => {
  getEvents().then((events) => {
    const locationEvents = (location === 'all') ?
      events :
      events.filter((event) => event.location === location);
      const shownEvents = locationEvents.slice(0, this.state.numberOfEvents);
    this.setState({
      events: shownEvents,
      currentLocation: location
    });
  });
}

  // Function to update the number of events displaying on the page when the user inputs a new number

  updateNumberofEvents = (newNumberOfEvents) => {
  this.setState({
    numberOfEvents: newNumberOfEvents
  });
  this.updateEvents(this.state.currentLocation);
}

componentDidMount() {
  this.mounted = true;
  getEvents().then((events) => {
    const { numberOfEvents} = this.state;
    if (this.mounted) {
      const locationEvents = events.slice(0, numberOfEvents);
      this.setState({ 
        events: locationEvents, 
        locations: extractLocations(events) });
    }
  });
}

componentWillUnmount(){
  this.mounted = false;
}

  render() {
    const {numberOfEvents, locations, events} = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <EventList events={events}/>
        <NumberOfEvents updateNumberofEvents={this.updateNumberofEvents} numberOfEvents={numberOfEvents} />
      </div>
    );
  }
}

export default App;
