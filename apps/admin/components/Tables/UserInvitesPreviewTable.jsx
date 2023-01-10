import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';

// This table shows Registered Users and is built on the BaseTable component.

const UserInvitesPreviewTable = ({ data }) => {
  // For Search Support
  const [displayData, setDisplayData] = useState(data); // Data to be displayed in the table
  const [searchTerm, setSearchTerm] = useState('');

  useMemo(() => {
    setDisplayData(data.filter((row) => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      return  (row.email.toLowerCase().includes(lowerCaseTerm) || row.company.toLowerCase().includes(lowerCaseTerm));
    }))
  }, [data, searchTerm]);

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">User Invites Preview</h1>
            <h1 className="pr-2">Processed {data.length} user invites from selected file</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
            </select>
            <SearchBar value={searchTerm} setValue={setSearchTerm} placeholder="Search by e-mail" />
          </div>
        </div>
      }
      headings={['Company', 'E-mail', 'Mobile Number']}
      headingColor="bg-accent"
      showCheckbox
      columnKeys={['company', 'email', 'mobileNumber']}
      data={displayData}
    />
  );
};

UserInvitesPreviewTable.propTypes = {
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

export default UserInvitesPreviewTable;
