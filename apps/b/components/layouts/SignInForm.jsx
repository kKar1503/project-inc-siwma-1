/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';

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
 * @type {import("next").NextPage<{
 *  className?: string;
 * }>}
 */
const SignInForm = ({ className }) => (
  <form className={cx(className, 'flex flex-col w-full gap-12')}>
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        E-Mail
        <input className="input input-bordered" />
      </label>
      <label className="flex flex-col gap-2">
        Password
        <input className="input input-bordered" />
      </label>
    </div>

    <div className="flex flex-row justify-between">
      <label className="flex flex-row gap-4">
        <input type="checkbox" className="checkbox checkbox-primary" />
        Remember Me
      </label>
      <Link href="/">
        <p className="text-primary underline">Forgot Password?</p>
      </Link>
    </div>

    <button type="submit" className="btn btn-primary">
      Login
    </button>
  </form>
);

SignInForm.propTypes = {
  className: PropTypes.string,
};

export default SignInForm;
