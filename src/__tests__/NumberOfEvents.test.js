import React, { Component } from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let mockFn = jest.fn();
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow( <NumberOfEvents updateEvents={ mockFn } />);
    });

    test('renders <NumbersOfEvents />', () => {
        expect(NumberOfEventsWrapper.exists()).toBe(true);
    });

    test('renders a default of 32 events', () => {
        expect(NumberOfEventsWrapper.find('input.number-input').prop('type')).toBe('number');
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
    });

    test('user can change the number of events rendered and it is rendered correctly', () => {
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
        NumberOfEventsWrapper.find('input.number-input').simulate('change', {
            target: { value: 10 }
        });
        expect(NumberOfEventsWrapper.state('number')).toBe(10);
    });

})