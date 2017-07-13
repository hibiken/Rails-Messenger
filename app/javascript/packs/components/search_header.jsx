import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import UserSuggestionInput from './user_suggestion_input';

class SearchHeader extends Component {
  // TODO: this function has no purpose, other than fullfilling proptypes
  // validation
  handleChange = (usernames) => {
    console.log('handleChange!!!', usernames);
  }

  render() {
    const autoSuggestRenderInput = () => {
      return (
        <UserSuggestionInput />
      );
    };
    return (
      <header className="search-header__root">
        <label className="search-header__label">To:</label>
        <TagsInput
          value={this.props.usernames}
          onChange={this.handleChange}
          renderInput={autoSuggestRenderInput}
        />
      </header>
    );
  }
}

SearchHeader.propTypes = {
  usernames: PropTypes.array.isRequired,
};

export default SearchHeader;
