import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';

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
      <label className="flex flex-col gap-2" htmlFor="company">
        Company
        <input
          className="input input-bordered rounded-md"
          placeholder="REGISTERED COMPANY NAME HERE"
        />
      </label>
      <label className="flex flex-col gap-2" htmlFor="name">
        Full Name
        <input className="input input-bordered rounded-md" placeholder="Your full name" />
      </label>
      <div className="flex flex-row gap-4">
        <label className="flex flex-col gap-2" htmlFor="email">
          E-Mail
          <input className="input input-bordered rounded-md" placeholder="Your email address" />
        </label>
        <label className="flex flex-col gap-2" htmlFor="password">
          Password
          <input className="input input-bordered rounded-md" placeholder="Your password" />
        </label>
      </div>
      <div className="flex flex-row gap-4">
        <label className="flex flex-col gap-2" htmlFor="phone">
          Mobile Number
          <input className="input input-bordered rounded-md" placeholder="Your mobile number" />
        </label>
        <label className="flex flex-col gap-2" htmlFor="confirm">
          Confirm Password
          <input className="input input-bordered rounded-md" placeholder="Confirm your password" />
        </label>
      </div>
    </div>
    <div className="flex flex-row justify-between">
      <label className="flex flex-row gap-4" htmlFor="remember">
        <input type="checkbox" className="checkbox checkbox-primary" />
        Remember Me
      </label>
      <Link href="/">
        <p className="text-primary underline">Forgot Password?</p>
      </Link>
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
