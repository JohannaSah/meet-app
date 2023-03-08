import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> Component', () => {
    let locations, CitySearchWrapper, query, suggestions;
    beforeAll(() => {        
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch />);
        query = CitySearchWrapper.state('query');
        suggestions = CitySearchWrapper.state('suggestions');
    });

    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {
        CitySearchWrapper.setState({
            query: 'London'
        });
        const eventObject = { target: { value: 'Berlin' }};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    test('render list of suggestion correctly', () => {
        CitySearchWrapper.setState({ suggestions: locations });
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
        expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    test('suggestion list match the query when changed', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: 'Berlin' },
        });
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });

    test('selecting a suggestion should change query state', () => {
        CitySearchWrapper.setState({
            query: 'Berlin'
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });
});