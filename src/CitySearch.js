import React, { Component } from 'react';
import { extractLocations } from './api';

class CitySearch extends Component {
    state = {
        query: "",
        suggestions: [],
        showSuggestions: undefined
      };
    
      handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
          this.setState({
            query: value,
            suggestions: [],
            showSuggestions: false,
          });
        } else {
          return this.setState({
            query: value,
            suggestions: [],
            suggestions: suggestions,
          });
        }
      };
    
      handleItemClicked = (suggestion) => {
        this.setState({
          query: suggestion,
          showSuggestions: false
        });

        this.props.updateEvents(suggestion);
      };
    
      handleInputFocus = () => {this.setState({showSuggestions: true})};

      render() {
        return (
          <div className="CitySearch">
            <h3>
              Find a City:
            </h3>

            <input
              type="text"
              className="city"
              value={this.state.query}
              onChange={this.handleInputChanged}
              onFocus={ this.handleInputFocus }
              placeholder="Search for a city"
            />

            <ul 
              className="suggestions"
              style={this.state.showSuggestions ? {}: { display: 'none' }}  
            >
              {this.state.suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => this.handleItemClicked(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
              <li 
                onClick={() => this.handleItemClicked('all')}
              >
                <b> See all cities </b>
              </li>
            </ul>
            
          </div>
        );
      }
    }
    
    export default CitySearch;