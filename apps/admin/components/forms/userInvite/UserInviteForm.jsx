import { FormInputGroup, FormTextInput, FormSelectInput } from '@inc/ui';
import PropTypes from 'prop-types';

const UserInviteForm = ({ onSubmit, options, isLoading, submitSuccess }) => (
  <form onSubmit={onSubmit}>
    <FormInputGroup
      classname="flex-1"
      label="E-mail"
      name="email"
      isLoading={isLoading}
      success={submitSuccess}
      required
    >
      <FormTextInput
        customValidation={{
          pattern: {
            value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Email address must be of a valid format',
          },
        }}
      />
    </FormInputGroup>

    <FormInputGroup
      classname="flex-1"
      label="Name"
      name="name"
      isLoading={isLoading}
      success={submitSuccess}
      required
    >
      <FormTextInput />
    </FormInputGroup>

    <FormInputGroup
      className="flex-1"
      label="Company"
      name="companyid"
      isLoading={isLoading}
      success={submitSuccess}
      required
    >
      <FormSelectInput options={options} />
    </FormInputGroup>

    <div className="modal-action">
      <button className="btn btn-outline btn-primary w-full">Send Invite</button>
    </div>
  </form>
);

UserInviteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    data: {
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    },
  }),
};

export default UserInviteForm;
