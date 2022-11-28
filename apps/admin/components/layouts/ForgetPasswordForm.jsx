import cx from 'classnames';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const propTypes = {
  onSendResetPassword: PropTypes.func,
  formNote: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Separating the form logic in this component so if the fields gets changed,
 * it will not call for a rerender for the other components on the page (Separation
 * of Concerns).
 *
 * Following SGDS guidelines for form fields:
 * https://designsystem.tech.gov.sg/components/text-input
 *
 * Specs:
 * - Checkbox and label 16px apart (gap-4)
 * - Input field 8px apart from label (gap-2)
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const ForgetPasswordForm = ({ onSendResetPassword, formNote, disabled, className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (disabled) return;
        onSendResetPassword(data);
      })}
      className={cx(className, 'flex flex-col w-full gap-12')}
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          E-Mail
          <input
            className={cx('input input-bordered', {
              'input-error': errors.email !== undefined,
            })}
            placeholder="Your e-mail"
            type="email"
            {...register('email', {
              required: 'Please enter your e-mail',
            })}
          />
          {errors.email && <span className="text-error">{errors.email.message}</span>}
        </label>
      </div>

      <div className="flex flex-col gap-4">
        {formNote && <div>{formNote}</div>}
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Send Reset Link
        </button>
      </div>
    </form>
  );
};

ForgetPasswordForm.propTypes = propTypes;

export default ForgetPasswordForm;
