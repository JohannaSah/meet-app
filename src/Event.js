import React, { Component } from "react";

class Event extends Component {

    state = { collapsed: true };
    toggleDetails = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed
        }));
    };


    render() {
        const { event } = this.props;
        const { collapsed } = this.state;

        return (
            <div className={`event ${this.state.collapsed ? '' : 'expanded'}`}>
                <h2 className="eventTitle">
                    { event.summary }
                </h2>

                <p className="startTime">
                    { new Date(event.start.dateTime).toString() }
                </p>

                <p className="eventLocation">
                    { `Location: ${event.location}` }
                </p>

                <button
                    className="detailsButton"
                    onClick={this.toggleDetails}
                >
                    { collapsed ? 'Show' : 'Hide'} Details
                </button>

                { !collapsed && (
                    <div className="eventDetails">
                        <h3 className="about">
                            About the event:
                        </h3>

                        <a 
                            className="link"
                            href={event.htmlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See the details on Google Calendar
                        </a>     

                        <p className="description">
                            { event.description }
                        </p>                   
                    </div>
                )}

            </div>
        );
    }
}

export default Event;