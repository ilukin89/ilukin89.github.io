import React from 'react';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { shallow, mount } from 'enzyme';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';



describe('<App /> component', () => {

  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  
  test('render NumberOfEvents', () =>{
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
});

});

// integration test

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });


  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });
  
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });
  
  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(32);
    AppWrapper.unmount();
  });


  test("the state numberOfEvents is passed properly to the component NumberOfEvents", async () => {
    let AppWrapper = mount(<App />);
    AppWrapper.setState({ showWelcomeScreen: false });
    const allEvents = await getEvents();
    const number = 20;
    AppWrapper.setState({
      events: allEvents.slice(0, number),
      numberOfEvents: number,
    });
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    expect(NumberOfEventsWrapper.prop("numberOfEvents")).toEqual(number);
    AppWrapper.unmount();
  });

  test("NumberofEvents calls to updateNumberOfEvents function passed through props", async () => {
    let AppWrapper = mount(<App />);
    AppWrapper.setState({ showWelcomeScreen: false });
    const number = 20;
    AppWrapper.setState({
      events: mockData.slice(0, number),
      numberOfEvents: number,
    });
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const inputElement = NumberOfEventsWrapper.find('input')
    await inputElement.simulate('change', {
      target: {
        value: 1
      }
    })
    expect(NumberOfEventsWrapper.prop("numberOfEvents")).toEqual(number);
    AppWrapper.unmount();
  });


  // test("the component EventList renders mockdata correctly", async () => {
  //   let AppWrapper = mount(<App />);
  //   AppWrapper.setState({ showWelcomeScreen: false });
  //   const allEvents = await getEvents();
  //   const number = 10;
  //   AppWrapper.setState({
  //     events: allEvents.slice(0, number),
  //     numberOfEvents: number,
  //   });
  //   const EventListWrapper = AppWrapper.find(EventList);
  //   const eventArray = EventListWrapper.prop("events");
  //   expect(eventArray.length).toEqual(number);
  //   AppWrapper.unmount();
  // });

});

