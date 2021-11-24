import React from 'react';
import NumberOfEvents from "../NumberOfEvents";
import { shallow } from 'enzyme';


describe('<NumberOfEvents unit testing', () => {
    
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render text input', () =>{
        expect(NumberOfEventsWrapper.find('.newValue')).toHaveLength(1);
    });

    test('changes the state of numberOfEvents correctly', () =>{
        const newValue = { target: { value: 10 }};
        NumberOfEventsWrapper.find('.newValue').simulate('change', newValue);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
    });
})