/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const propTypes = {
  onLogin: PropTypes.func,
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
const LoginForm = ({ onLogin, formNote, disabled, className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (disabled) return;
        onLogin(data);
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
            placeholder="Your company e-mail"
            type="email"
            {...register('email', {
              required: 'Please enter your e-mail',
            })}
          />
          {errors.email && <span className="text-error">{errors.email.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          Password
          <input
            className={cx('input input-bordered', {
              'input-error': errors.password !== undefined,
            })}
            placeholder="Your password"
            type="password"
            {...register('password', {
              required: 'Please enter your password',
            })}
          />
          {errors.password && <span className="text-error">{errors.password.message}</span>}
        </label>
      </div>

      <div className="flex flex-row justify-between">
        <label className="flex flex-row gap-4">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            {...register('rememberMe')}
          />
          Remember Me
        </label>
        <Link href="/forget-password">
          <p className="text-primary underline">Forgot Password?</p>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {formNote && <div>{formNote}</div>}
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Login
        </button>
      </div>
    </form>
  );
};

LoginForm.propTypes = propTypes;

export default LoginForm;
