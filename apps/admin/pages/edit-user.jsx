import { useState } from 'react';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';

const EditUser = () => {
  const [email, setEmail] = useState('E-mail');
  const [companyName, setCompanyName] = useState('Company');
  const [mobileNumber, setMobileNumber] = useState('9232 3232');

  return (
    <div className="flex flex-col w-full h-full gap-8 p-8 overflow-auto">
      <NavBar />

      <div className="flex flex-row grow h-40 shadow-xl items-center p-6 rounded-2xl space-between justify-between bg-base-100">
        <form className="flex flex-col w-full gap-12">
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
                {...('fullname',
                {
                  required: 'Please enter your full name',
                  maxLength: {
                    value: 255,
                    message: 'Full name should not be more than 255 characters',
                  },
                })}
              />{' '}
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
              </label>
              <label className="flex flex-col gap-2 flex-1">
                Mobile Number
                <input
                  className="input input-bordered rounded-lg w-full"
                  placeholder="Your mobile number"
                  type="tel"
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex flex-col gap-2 flex-1">
                Password
                <input
                  className="input input-bordered rounded-lg w-full"
                  placeholder="Your password"
                  type="password"
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

          <div className="flex flex-col gap-4">
            <button type="submit" className="btn btn-primary" disabled={false}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditUser.getLayout = (page) => <AdminPageLayout pageName="Overview">{page}</AdminPageLayout>;
