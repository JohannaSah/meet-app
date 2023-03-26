import React, { Component } from 'react';
import Event from './Event';
import { WarningAlert } from './Alert';

class EventList extends Component {
  render() {
    const { events } = this.props;
    const online = navigator.onLine;
    return (
      <div className='w-full md:w-4/5 lg:w-3/4'>
        <div className='warningAlert'>
            { !online && <WarningAlert text="You're currently using the app offline. These events might not be up to date." /> }
        </div>

        <ul className='EventList'>
            {events && events.map(event => 
                <li key={event.id}>
                    <Event event={event} />
                </li>
            )}
        </ul>
      </div>
    );
  }
}

export default EventList;