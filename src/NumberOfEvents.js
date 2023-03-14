import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = { number: 32 };

    handleInputChanged = (event, props) => {
        let inputValue = event.target.value;
        if(inputValue < 0) inputValue = 0;
        this.props.updateEvents(null,inputValue);
        this.setState({ number: inputValue });
        console.log(this.props);
    }


    render() {
        const { number } = this.state;

        return (
            <div className='NumberOfEvents'>
                <h3 className='searchTitle'> 
                    Number of Events:
                </h3>
                <input
                    className='number-input'
                    type='number'
                    value={ number }
                    onChange={ (event) => {
                        this.handleInputChanged(event);
                    }}
                />
                
            </div>
        );
    }
}

export default NumberOfEvents;