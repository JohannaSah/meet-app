import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = { number: 32 };

    handleInputChanged = (event) => {
        const inputValue = event.target.value;
        this.props.updateEvents(null,inputValue);
        this.setState({ number: inputValue });
        console.log(this.props);
        if (inputValue < 0 || inputValue > 100) {
            this.setState({
                query: inputValue,
                infoText: 'Please choose a number between 0-100',
            });
        }
        else {
            return this.setState({
                query: inputValue,
                infoText: '',
            });
        }
    };


    render() {
        const { number } = this.state;

        return (
            <div className='NumberOfEvents'>
                <ErrorAlert text={this.state.infoText} />
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