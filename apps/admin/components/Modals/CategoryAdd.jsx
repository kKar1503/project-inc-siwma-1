import PropTypes from 'prop-types';
import cx from 'classnames';
import { Alert } from '@inc/ui';
import { useState } from 'react';
import BaseModal from './BaseModal';
import { CategoryAddFormContext } from '../forms/categoryAdd';

/**
 * Company creation modal
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns The company registration modal
 */
const CategoryAdd = ({ isOpen, onRequestClose, onSuccess }) => {
  // -- Component states -- //
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // -- Handlers -- //
  /**
   * Handles for when the success state changes
   * @param {boolean} value The value of the new success state
   */
  const handleSuccessChange = (value) => {
    // Invoke the onSuccess handler if the changed state is successful
    if (value && onSuccess) {
      onSuccess();
    }

    // Update the success state
    setSubmitSuccess(value);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      header={
        <div>
          <h3 className="text-lg font-bold">Create an individual company</h3>
          <p className="text-sm">Register a company profile to the system</p>
        </div>
      }
      siblings={
        // TODO: Make the alert fade in and out
        // Can only be done using either opacity or visibility css properties, but those properties do not remove the alert from the DOM
        // Using the hidden class alongside any of those properties negate them
        // So the transition can only be achieved either by Javascript with setTimeouts, or maybe Framer Motion
        <div className={cx('w-full transition', { hidden: !submitSuccess })}>
          <Alert
            level="success"
            message="Company created successfully"
            className="text-white lg:w-1/3 !absolute shadow-lg translate-x-1/2 right-[50%] mt-5"
            onRequestClose={() => setSubmitSuccess(false)}
            dismissable
          />
        </div>
      }
    >
      <CategoryAddFormContext
        submitSuccess={submitSuccess}
        onSuccessChange={handleSuccessChange}
      />
    </BaseModal>
  );
};

CategoryAdd.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default CategoryAdd;
