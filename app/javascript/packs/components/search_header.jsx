import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import UserSuggestionInput from './user_suggestion_input';

class SearchHeader extends Component {
  constructor() {
    super();
    this.state = {
      usernames: [],
    };
  }

  handleChange = (usernames) => {
    this.setState({ usernames });
  }

  render() {
    const autoSuggestRenderInput = ({ addTag, ...props }) => {
      return (
        <UserSuggestionInput
          addTag={addTag}
          onKeyDown={props.onKeyDown}
        />
      );
    };
    return (
      <header className="search-header__root">
        <label className="search-header__label">To:</label>
        <TagsInput
          value={this.state.usernames}
          onChange={this.handleChange}
          renderInput={autoSuggestRenderInput}
        />
      </header>
    );
  }
}

export default SearchHeader;
