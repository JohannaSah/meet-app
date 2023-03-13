import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    
    let EventWrapper, event;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);   
    });

    test(' render <Event /> component', () => {
        expect(EventWrapper.exists()).toBe(true);
    });
    
    test('event title (= event.summary) (h2) is rendered correctly', () => {
        const summary	= EventWrapper.find('h2.eventTitle');
        expect(summary).toHaveLength(1);
        expect(summary.text()).toBe(event.summary);
    });

    test('renders the start details', () => {
        const start = EventWrapper.find('p.startTime');
        expect(start).toHaveLength(1);
        expect(start.text()).toBe(new Date(event.start.dateTime).toString());
    });

    test('renders the location details', () => {
        const location = EventWrapper.find('p.eventLocation');
        expect(location).toHaveLength(1);
        expect(location.text()).toBe(`Location: ${event.location}`);
    });

    test('renders button show details, when the details are collapsed', () => {
        const detailsButton = EventWrapper.find('button.detailsButton');
        expect(detailsButton).toHaveLength(1);
        expect(detailsButton.text()).toBe('Show Details');
    });

    test('renders details in collapsed state as default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });

    test('expand details, when clicking show details', () => {
        const detailsButton = EventWrapper.find('button.detailsButton');
        expect(detailsButton.text()).toBe('Show Details');
        expect(EventWrapper.find('h3.about')).toHaveLength(0);
        expect(EventWrapper.find('a.link')).toHaveLength(0);
        expect(EventWrapper.find('p.description')).toHaveLength(0);
        detailsButton.simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('renders button hide details, when details are expanded', () => {
        const detailsButton = EventWrapper.find('button.detailsButton');
        expect(detailsButton).toHaveLength(1);
        expect(detailsButton.text()).toBe('Hide Details');
    });

    test('collapse details, when clicking hide details', () => {
        EventWrapper.setState({ collapsed: false });
        const detailsButton = EventWrapper.find('button.detailsButton');
        const aboutHeader = EventWrapper.find('h3.about');
        const link = EventWrapper.find('a.link');
        const description = EventWrapper.find('p.description');

        expect(detailsButton.text()).toBe('Hide Details');
        expect(aboutHeader).toHaveLength(1);
        expect(aboutHeader.text()).toBe('About the event:');
        expect(link).toHaveLength(1);
        expect(link.text()).toBe('See the details on Google Calendar');
        expect(link.prop('href')).toBe(event.htmlLink);
        expect(description).toHaveLength(1);
        expect(description.text()).toBe(event.description);

        detailsButton.simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
  
});