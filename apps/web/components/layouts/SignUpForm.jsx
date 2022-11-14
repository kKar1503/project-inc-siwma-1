/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link'; // ! Unused Var

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
 * @type {import("next").NextPage<{
 *  className?: string;
 * }>}
 */
const SignUpForm = ({ className }) => (
  <form className={cx(className, 'flex flex-col w-full gap-12')}>
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        Company
        <input
          className="input input-bordered rounded-lg"
          placeholder="REGISTERED COMPANY NAME HERE"
          disabled // Company Name should be auto-filled
        />
      </label>
      <label className="flex flex-col gap-2">
        Full Name
        <input className="input input-bordered rounded-lg" placeholder="Your full name" />
      </label>
      <div className="flex flex-col md:flex-row gap-4">
        <label className="flex flex-col gap-2 flex-1">
          E-Mail
          <input
            className="input input-bordered rounded-lg w-full"
            placeholder="Your email address"
          />
        </label>
        <label className="flex flex-col gap-2 flex-1">
          Password
          <input
            className="input input-bordered rounded-lg w-full"
            placeholder="Your password"
            type="password"
          />
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <label className="flex flex-col gap-2 flex-1">
          Mobile Number
          <input
            className="input input-bordered rounded-lg w-full"
            placeholder="Your mobile number"
            type="tel"
          />
        </label>
        <label className="flex flex-col gap-2 flex-1">
          Confirm Password
          <input
            className="input input-bordered rounded-lg w-full"
            placeholder="Confirm your password"
            type="password"
          />
        </label>
      </div>
    </div>

    <button type="submit" className="btn btn-primary">
      Register
    </button>
  </form>
);

SignUpForm.propTypes = {
  className: PropTypes.string,
};

export default SignUpForm;
