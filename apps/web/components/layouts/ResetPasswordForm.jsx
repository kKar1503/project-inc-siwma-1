import cx from 'classnames';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

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
const ResetPasswordForm = ({ onResetPassword, formNote, disabled, className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (disabled) return;
        onResetPassword(data);
      })}
      className={cx(className, 'flex flex-col w-full gap-12')}
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          New Password
          <input
            className={cx('input input-bordered', {
              'input-error': errors.newPassword !== undefined,
            })}
            placeholder="Your new password"
            type="password"
            {...register('newPassword', {
              required: 'Please enter your new password',
            })}
          />
          {errors.newPassword && <span className="text-error">{errors.newPassword.message}</span>}
        </label>
      </div>

      <div className="flex flex-col gap-4">
        {formNote && <div>{formNote}</div>}
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Reset Password
        </button>
      </div>
    </form>
  );
};

const propTypes = {
  onResetPassword: PropTypes.func,
  formNote: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

ResetPasswordForm.propTypes = propTypes;

export default ResetPasswordForm;
