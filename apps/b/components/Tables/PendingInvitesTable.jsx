import React from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';

// This table shows Pending Invites and is built on the BaseTable component.

const PendingInvitesTable = ({ data }) => (
  <BaseTable
    header={
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col pb-3">
          <h1 className="font-bold text-xl">Pending Invites</h1>
          <h1>Showing 1 to 10 of 100 entries</h1>
        </div>
        <div className="flex flex-row gap-4">
          <SearchBar placeholder="Search by name" />
        </div>
      </div>
    }
    headings={['Company', 'E-mail', 'Mobile Number']}
    headingColor="bg-warning"
    columnKeys={['company', 'email', 'mobileNumber']}
    data={data}
  />
);

PendingInvitesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      mobileNumber: PropTypes.string,
    })
  ),
};

export default PendingInvitesTable;
