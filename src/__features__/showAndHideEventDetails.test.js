import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/__features__/showAndHideEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('An event is collapsed by default', ({ given, when, then }) => {
        given('that the list of events has been loaded', () => {
            AppWrapper = mount(<App />);
        });
         
        when('the users views the list and performs no action', () => {     
          
        });

        then('all event details should be collapsed', () => {
           AppWrapper.update();
           expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
        });
    });

    test('User can expand an event to see the details', ({ given, when, then }) => {
        given('that the user has selected an event', () => {
            AppWrapper = mount(<App />)

        });

        when('the user clicks on the Show Details button', () => {
            AppWrapper.update();
            AppWrapper.find('.event .detailsButton').at(0).simulate('click');
        });

        then('the event details will be expanded and displayed', () => {
           expect(AppWrapper.find('.event .eventDetails')).toHaveLength(1);
        });
    });

    test('User can collapse the event details', ({ given, when, then }) => {
        given('that a user does not want to view the expanded details anymore', async () => {
           AppWrapper = await mount(<App />);
           AppWrapper.update();
           AppWrapper.find('.event .detailsButton').at(0).simulate('click');
        });

        when('the user clicks the Hide Details button', () => {
          AppWrapper.update();
          AppWrapper.find('.event .detailsButton').at(0).simulate('click');
        });

        then('the event details should be collapsed', () => {
            expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
        });
    })
});