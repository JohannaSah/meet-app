import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = { number: 32 };

    changeNumber = (value) => {
        this.setState({ number: value });
    };

    componentDidMount() {
        this.setState({ number: this.props.number || 32 });
    }

    render() {
        const { number } = this.state;

        return (
            <div className='NumberOfEvents'>
                <h3> 
                    Number of Events:
                    <input
                        className='number-input'
                        type='number'
                        value={ number }
                        onChange={ (event) => {
                            this.changeNumber(event.target.value);
                        }}
                    >
                    </input>
                </h3>
            </div>
        );
    }
}

export default NumberOfEvents;