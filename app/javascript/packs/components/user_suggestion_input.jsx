import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';

const users = [
  {
    userId: 6,
    username: 'Peizhi Zheng',
    email: '460657727@qq.com',
    avatarUrl: 'http://graph.facebook.com/v2.6/825613910923392/picture',
  },
  {
    userId: 9,
    username: 'Jay Mo',
    email: 'jayhxmo@outlook.com',
    avatarUrl: 'http://graph.facebook.com/v2.6/1876094729378442/picture',
  }
];

const getSuggestions = () => users;

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
    console.log('newValue', newValue);
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested value', value);
    this.setState({
      suggestions: getSuggestions(),
    })
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

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type the name of a person',
      value,
      onChange: this.onChange,
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
