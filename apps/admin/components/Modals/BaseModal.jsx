import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useRef } from 'react';

/**
 * Replacement overlay for the default overlay supplied by the Modal component (Actually just removes the default overlay)
 * We replace the default overlay because the default overlay honestly sucks and you cannot style it so here we are
 */
const ModalOverlay = (props, contentElement) => (
  <div className="modalOverlay">{contentElement}</div>
);

// Bind modal to the app element https://www.npmjs.com/package/react-modal
Modal.setAppElement('#__next');

/**
 * Base modal for other modals to be built on top of
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const BaseModal = ({ header, isOpen, onRequestClose, children, siblings }) => {
  // Initialise reference to the modal box
  const modalRef = useRef();
  const siblingsRef = useRef();

  /**
   * Focuses the modal
   */
  const focusModal = () => {
    // Check if the modal should be focused
    if (modalRef && isOpen) {
      // Focus the modal box
      modalRef.current.focus();
    }
  };

  /**
   * Component is supposedly no longer in focus
   * However, we first need to check if the children components are in focus as focusing on children blurs parent elements
   * We also need to check if the focus has actually left the target element (switching tabs/windows will fire onBlur(), but the element is actually still in focus)
   * Lastly, we want to know if the currently focused element is a sibling element that was passed through (The modal is not in focus, but its sibling is, and so we do not want to close this overlay)
   */
  const handleOnBlur = (e) => {
    // Check if the currently focused element is the modal or any of its children
    if (e.relatedTarget === modalRef.current || modalRef.current.contains(e.relatedTarget)) {
      // It is, return early
      return;
    }

    // Check if the currently focused element is a sibling element or any of its children
    if (
      siblings &&
      (e.relatedTarget === siblingsRef.current || siblingsRef.current.contains(e.relatedTarget))
    ) {
      // It is, return early
      return;
    }

    // Check if the event was fired from alt-tabbing
    if (e.target === document.activeElement) {
      // It was, return early
      return;
    }

    // Check if the event was fired because the element dissappeared
    // This could happen when sibling elements appear conditionally, and whilst the focus is on them, they disappear, causing a onBlur event
    if (e.relatedTarget == null) {
      // It was, set the focus back on the modal and return early
      modalRef.current.focus();
      return;
    }

    // The currently focused element is not the modal, a sibling element nor any of their children.
    // It is safe to assume that the user clicked on the modal overlay instead.
    // Attempt to close the modal
    onRequestClose();
  };

  return (
    // Wrapper component that handles modal logic
    <Modal
      isOpen={isOpen}
      onAfterOpen={focusModal}
      className="absolute"
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      // We have to specify a dummy overlay to get rid of the terrible default overlay they have
      overlayElement={ModalOverlay}
      overlayClassName="modalOverlay"
    >
      {/* The real modal overlay */}
      <div className="modal modal-open cursor-pointer flex-col">
        {/* Modal */}
        <div
          // The div must have tabIndex set to 0, otherwise the onBlur() event will not fire
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="modal-box rounded-xl max-w-4xl cursor-default"
          onBlur={handleOnBlur}
          ref={modalRef}
        >
          <button
            onClick={onRequestClose}
            className="text-lg absolute right-0 top-0 m-4 hover:cursor-pointer"
          >
            <IoCloseSharp />
          </button>
          <div className="pb-3">{header}</div>
          {children}
        </div>
        {/* Sibling element */}
        <div
          /**
           * The div needs tabIndex 0 set, otherwise it cannot be focused, causing issues where the modal might be closed prematurely
           * after the focus has been shifted to the sibling element
           */
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onBlur={handleOnBlur}
          className="cursor-default"
          ref={siblingsRef}
        >
          {siblings}
        </div>
      </div>
    </Modal>
  );
};

const propTypes = {
  header: PropTypes.node,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  siblings: PropTypes.node,
};

BaseModal.propTypes = propTypes;

export default BaseModal;
