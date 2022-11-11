import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Registered Users and is built on the BaseTable component.

const RegisteredUsersTableWithoutCheckbox = ({ data, className }) => {
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
            <h1 className="mt-3">Show</h1>
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number']}
      headingColor="bg-success"
      showCheckbox={false}
      className={className}
      columnKeys={['name', 'email', 'company', 'mobileNumber']}
      data={data}
      footer={
        <div className="flex justify-end bg-none">
          <TableButton
            index={0}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedColor="bg-success"
<<<<<<< HEAD
            className="rounded-l-lg hover:bg-success"
=======
            classNames="rounded-l-lg hover:bg-success"
>>>>>>> 0e40719 (fix: renamed styles prop to classNames as per convention)
          />
          <TableButton
            index={1}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedColor="bg-success"
<<<<<<< HEAD
            className="hover:bg-success"
=======
            classNames="hover:bg-success"
>>>>>>> 0e40719 (fix: renamed styles prop to classNames as per convention)
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
  className: PropTypes.string,
};

export default RegisteredUsersTableWithoutCheckbox;
