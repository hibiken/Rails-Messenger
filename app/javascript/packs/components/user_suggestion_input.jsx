import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import { searchUsers } from '../api/users_search';

const getSuggestionValue = (suggestion) => suggestion.username;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion.username}
  </div>
);

class UserSuggestionInput extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested value', value);
    searchUsers(value).then((users) => {
      this.setState({
        suggestions: users,
      });
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  onSuggestionSelected = (e, { suggestion }) => {
    this.props.addTag(suggestion.username)
    this.setState({ value: '' });
  }

  onKeyDown = (event) => {
    const { value } = this.state;
    if (event.key === 'Backspace' && value.length === 0) {
      this.props.onKeyDown(event);
    }
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type the name of a person',
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };

    const theme = {
      container: 'user-suggestion-input__root',
      containerOpen: 'user-suggestion-input__root-open',
      input: 'user-suggestion-input__input',
      suggestionsContainer: 'user-suggestion-input__suggestions-container',
      suggestionsList: 'user-suggestion-input__suggestions-list',
      suggestionHighlighted: 'user-suggestion-input__suggestion-highlighted',
    }

    return (
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        highlightFirstSuggestion
      />
    );
  }
}

UserSuggestionInput.propTypes = {
  addTag: PropTypes.func.isRequired,
}

export default UserSuggestionInput;
