import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = { num: 32 };

    changeNum = (value) => {
        this.setState({ num: value });
        this.props.updateNumberOfEvents(value);
        if (value < 1 || value > 32) {
            this.setState({ errorText: 'Please select a value between 1 and 32' });
        } else this.setState({ errorText: '' });
    };

    componentDidMount() {
        this.setState({ num: this.props.num || 32 });
    }

    render() {
        const { num } = this.state;

        return (
            <div>
                <label>
                    Number of Events
                    <input
                        className='num'
                        type='number'
                        value={num}
                        onChange={(event) => {
                            this.changeNum(event.target.value);
                        }}
                    >
                    </input>
                </label>
            </div>
        );
    }
}

export default NumberOfEvents;