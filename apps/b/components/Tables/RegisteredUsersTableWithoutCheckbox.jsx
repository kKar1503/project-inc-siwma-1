import React from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';

// This table shows Registered Users and is built on the BaseTable component.

const RegisteredUsersTableWithoutCheckbox = ({ data }) => (
  <BaseTable
    header={
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col pb-3">
          <h1 className="font-bold text-xl">Registered Users</h1>
          <h1>Showing 1 to 10 of 100 entries</h1>
        </div>
        <div className="flex flex-row gap-4">
          <h1 className="mt-3">Show</h1>
          <SearchBar placeholder="Search by name" />
        </div>
      </div>
    }
    headings={['User', 'E-mail', 'Company', 'Mobile Number']}
    headingColor="bg-primary"
    showCheckbox={false}
    columnKeys={['name', 'email', 'company', 'mobileNumber']}
    data={data}
  />
);

RegisteredUsersTableWithoutCheckbox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      profilePicture: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      mobileNumber: PropTypes.string,
    })
  ),
};

export default RegisteredUsersTableWithoutCheckbox;
