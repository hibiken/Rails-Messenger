import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import { searchUsers } from '../api/users_search';

const getSuggestionValue = (suggestion) => suggestion.username;

const renderSuggestion = (suggestion) => (
  <div className="user-suggestion-input__suggestion-item">
    <div className="user-suggestion-input__suggestion-item-avatar">
      <img
        className="user-suggestion-input__suggestion-item-avatar-image"
        src={suggestion.avatarUrl}
        width={30}
      />
    </div>
    <div className="user-suggestion-input__suggestion-item-username">
      {suggestion.username}
    </div>
  </div>
);

class UserSuggestionInput extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selectedUsers: [],
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const selectedUserIds = this.state.selectedUsers.map(u => u.id);
    searchUsers(value).then((users) => {
      const newSuggestions = users.filter(u => selectedUserIds.indexOf(u.id) === -1);
      this.setState({
        suggestions: newSuggestions,
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
    this.setState({
      value: '',
      selectedUsers: this.state.selectedUsers.concat(suggestion),
    });
  }

  onKeyDown = (event) => {
    const { value, selectedUsers } = this.state;
    if (event.key === 'Backspace' && value.length === 0) {
      this.props.onKeyDown(event);
      this.setState({
        selectedUsers: selectedUsers.slice(0, selectedUsers.length - 1),
      });
    }
  }

  render() {
    const { value, suggestions, selectedUsers } = this.state;
    const placeholder = selectedUsers.length === 0 ? 'Type the name of a person' : '';

    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };

    const theme = {
      container: 'user-suggestion-input__root',
      containerOpen: 'user-suggestion-input__root-open',
      input: 'user-suggestion-input__input',
      suggestionsContainer: 'user-suggestion-input__suggestions-container',
      suggestionsContainerOpen: 'user-suggestion-input__suggestions-container--open',
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
