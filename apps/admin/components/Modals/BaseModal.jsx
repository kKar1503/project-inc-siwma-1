import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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
const BaseModal = ({ header, isOpen, onRequestClose, children }) => {
  // Initialise reference to the modal box
  let modalRef = null;

  /**
   * Focuses the modal
   */
  const focusModal = () => {
    // Check if the modal should be focused
    if (modalRef && isOpen) {
      // Focus the modal box
      modalRef.focus();
    }
  };

  /**
   * Component is supposedly no longer in focus
   * However, we first need to check if the children components are in focus as focusing on children blurs parent elements
   * We also need to check if the focus has actually left the target element (switching tabs/windows will fire onBlur(), but the element is actually still in focus)
   */
  const handleOnBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && e.target !== document.activeElement) {
      // The focused element isn't a child element, close the modal
      onRequestClose();
    }
  };

  return (
    // Wrapper component that handles modal logic
    <Modal
      isOpen={isOpen}
      onAfterOpen={focusModal}
      className="absolute"
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      overlayElement={ModalOverlay}
      overlayClassName="modalOverlay"
    >
      {/* The real modal overlay */}
      <div className="modal modal-open cursor-pointer">
        {/* Modal */}
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
            onClick={onRequestClose}
            className="text-lg absolute right-0 top-0 m-4 hover:cursor-pointer"
          >
            <IoCloseSharp />
          </button>
          <div className="pb-3">{header}</div>
          {children}
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
};

BaseModal.propTypes = propTypes;

export default BaseModal;
