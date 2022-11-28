import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Registered Users and is built on the BaseTable component.

const RegisteredUsersTableWithoutCheckbox = ({ data, columns, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number']}
      headingColor="bg-success"
      showCheckbox={false}
      className={className}
      columns={columns}
      data={data}
      footer={
        <div className="flex justify-end bg-none">
          <TableButton
            index={0}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedColor="bg-success"
            className="rounded-l-lg hover:bg-success"
          />
          <TableButton
            index={1}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedColor="bg-success"
            className="hover:bg-success"
          />
          <TableButton
            index={2}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedColor="bg-success"
            className="rounded-r-lg hover:bg-success"
          />
        </div>
      }
    />
  );
};

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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.string,
      Cell: PropTypes.element,
    })
  ),
  className: PropTypes.string,
};

export default RegisteredUsersTableWithoutCheckbox;
