import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  isOptional: PropTypes.bool,
};

/**
 * RadioButton is a component that renders a radio button.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const RadioButton = ({ text, options, onChangeValue, isOptional }) => (
  <>
    <label htmlFor="condition" className="label">
      <span className="label-text text-xl font-bold">{text}</span>
    </label>
    <div id="condition" className="btn-group w-full">
      {isOptional && (
        <input
          type="radio"
          name="options"
          key="None"
          data-title="None"
          value="None"
          className={classNames(
            {
              'w-1/2': !isOptional,
              'w-1/3': isOptional,
            },
            'btn bg-white border-primary text-primary hover:bg-primary hover:text-primary-content'
          )}
          onChange={onChangeValue}
        />
      )}
      {options.map((option) => (
        <input
          type="radio"
          name="options"
          key={option}
          data-title={`${option}`}
          value={`${option}`}
          className={classNames(
            {
              'w-1/2': !isOptional,
              'w-1/3': isOptional,
            },
            'btn bg-white border-primary text-primary hover:bg-primary hover:text-primary-content'
          )}
          onChange={onChangeValue}
        />
      ))}
    </div>
  </>
);

RadioButton.propTypes = propTypes;

export default RadioButton;
