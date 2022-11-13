/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

const propTypes = {
  defaultFullname: PropTypes.string,
  defaultPhone: PropTypes.string,
  email: PropTypes.string,
  companyName: PropTypes.string,
  onRegister: PropTypes.func,
  formNote: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * This Form is closely related to the SignInForm.
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
const RegisterForm = ({
  defaultFullname,
  defaultPhone,
  email,
  companyName,
  onRegister,
  formNote,
  disabled,
  className,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: defaultFullname,
      phone: defaultPhone,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onRegister(data);
      })}
      className={cx(className, 'flex flex-col w-full gap-12')}
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Company
          <input
            className="input input-bordered rounded-lg"
            placeholder="REGISTERED COMPANY NAME HERE"
            value={companyName}
            disabled // Company Name should be auto-filled
          />
        </label>
        <label className="flex flex-col gap-2">
          Full Name
          <input
            className="input input-bordered rounded-lg"
            placeholder="Your full name"
            {...register('fullname', {
              required: 'Please enter your full name',
              maxLength: {
                value: 255,
                message: 'Full name should not be more than 255 characters',
              },
            })}
          />
          {errors.name && <span className="text-error">{errors.name.message}</span>}
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex flex-col gap-2 flex-1">
            E-Mail
            <input
              className="input input-bordered rounded-lg w-full"
              placeholder="Your email address"
              value={email}
              disabled
            />
            {errors.email && <span className="text-error">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-2 flex-1">
            Password
            <input
              className="input input-bordered rounded-lg w-full"
              placeholder="Your password"
              type="password"
              {...register('password', {
                required: 'Please enter your password',
              })}
            />
            {errors.password && <span className="text-error">{errors.password.message}</span>}
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex flex-col gap-2 flex-1">
            Mobile Number
            <input
              className="input input-bordered rounded-lg w-full"
              placeholder="Your mobile number"
              type="tel"
              {...register('phone', {
                required: 'Please enter your mobile number',
                maxLength: {
                  value: 255,
                  message: 'Mobile number should not be more than 255 characters',
                },
              })}
            />
            {errors.mobile && <span className="text-error">{errors.mobile.message}</span>}
          </label>
          <label className="flex flex-col gap-2 flex-1">
            Confirm Password
            <input
              className="input input-bordered rounded-lg w-full"
              placeholder="Confirm your password"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === getValues('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <span className="text-error">{errors.confirmPassword.message}</span>
            )}
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {formNote && <div>{formNote}</div>}
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Register
        </button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = propTypes;

export default RegisterForm;
