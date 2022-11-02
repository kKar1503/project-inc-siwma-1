import React from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';

// This table shows Pending Invites and is built on the BaseTable component.

const PendingInvitesTable = ({ data }) => (
  <BaseTable
    data={data}
    theadColor="bg-warning"
    header={
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col pb-3">
          <h1 className="font-bold text-xl">Registered Users</h1>
          <h1>Showing 1 to 10 of 100 entries</h1>
        </div>
        <div className="flex flex-row gap-4">
          <SearchBar placeholder="Search by name" />
        </div>
      </div>
    }
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
