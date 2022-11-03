import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Registered Users and is built on the BaseTable component.

const RegisteredUsersTable = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center pt-6 px-6">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1>Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
            </select>
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number']}
      headingColor="bg-primary"
      showCheckbox
      columnKeys={['name', 'email', 'company', 'mobileNumber']}
      data={data}
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-primary text-white">DEACTIVATE SELECTED</button>
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              styles="rounded-l-lg"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              styles="rounded-r-lg"
            />
          </div>
        </div>
      }
    />
  );
};

RegisteredUsersTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      // eslint-disable-next-line react/forbid-prop-types
      profilePicture: PropTypes.object,
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      mobileNumber: PropTypes.string,
    })
  ),
};

export default RegisteredUsersTable;
