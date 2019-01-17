import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

const Loader = ({full, fill, transparent}) => {
  let className = 'loader';
  if (full) {
    className += ' full';
  }
  if (fill) {
    className += ' fill';
  }
  if (transparent) {
    className += ' transparent';
  }
  return (
    <div className={className}>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Loader.propTypes = {
  full: PropTypes.bool,
  fill: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default Loader;
