import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { useState } from 'react';

const BaseModal = ({ id, header, children }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Initialise reference to the modal box
  let modalRef = null;

  /**
   * Toggles the focus state of the modal box
   */
  const setFocus = (focused) => {
    // We use !isFocused in our check because the value of isFocused only updates in the next render
    if (modalRef && focused) {
      // Focus the modal box
      modalRef.focus();
    }

    setIsFocused(focused);
  };

  /**
   * Component is supposedly no longer in focus
   * However, we first need to check if the children components are in focus as focusing on children blurs parent elements
   * We also need to check if the focus has actually left the target element (switching tabs/windows will fire onBlur(), but the element is actually still in focus)
   */
  const handleOnBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && e.target !== document.activeElement) {
      // The focused element isn't a child element, close the modal
      setFocus(false);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={isFocused}
        onChange={(e) => setFocus(e.currentTarget.checked)}
      />
      <div className="modal cursor-pointer">
        <div
          // The div must have tabIndex set to 0, otherwise the onBlur() event will not fire
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="modal-box rounded-xl max-w-4xl cursor-default"
          onBlur={handleOnBlur}
          ref={(modal) => {
            modalRef = modal;
          }}
        >
          <button
            onClick={() => setFocus(false)}
            className="text-lg absolute right-4 top-2 hover:cursor-pointer"
          >
            <IoCloseSharp />
          </button>
          <div className="pb-3">{header}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

BaseModal.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default BaseModal;
