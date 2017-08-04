import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => (
  <div className="table min-h100 center">
    <div className="table-cell">
      <svg
        className="icon-loading"
        xmlns="http://www.w3.org/2000/svg"
        fill={props.color}
        viewBox="0 0 32 32">
        <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
        <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 16 16"
            to="360 16 16"
            dur=".8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  </div>
);

Loader.propTypes = {
  color: PropTypes.string.isRequired,
}

Loader.defaultProps = {
  color: 'rgb(0, 132, 255)',
};

export default Loader;
