import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Pending Invites and is built on the BaseTable component.

const PendingInvitesTable = ({ data, height }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Pending Invites</h1>
            <h1>Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by e-mail" />
          </div>
        </div>
      }
      headings={['Company', 'E-mail', 'Mobile Number']}
      headingColor="bg-warning"
      showCheckbox
      height={height}
      columnKeys={['company', 'email', 'mobileNumber']}
      data={data}
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-warning text-white">REVOKE SELECTED</button>
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              styles="rounded-l-lg"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              styles="rounded-r-lg"
            />
          </div>
        </div>
      }
    />
  );
};

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
  height: PropTypes.string,
};

export default PendingInvitesTable;
