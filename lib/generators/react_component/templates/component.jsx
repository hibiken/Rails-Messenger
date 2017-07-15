import React from 'react';
import PropTypes from 'prop-types';

const <%= component_name %>  = (props) => {
  return (
    <div className="<%= component_name.underscore.dasherize %>__root">
      <%= component_name %>
    </div>
  );
};

<% if attributes.size > 0 -%>
<%= component_name %>.propTypes = {
<% attributes.each do |attr| -%>
  <%= attr.name.camelize(:lower) %>: PropTypes.<%= attr.type.to_s.downcase %>,
<% end -%>
};
<% end %>

export default <%= component_name %>;
