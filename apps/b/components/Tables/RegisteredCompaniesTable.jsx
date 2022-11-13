import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Registered Companies and is built on the BaseTable component.

const RegisteredCompaniesTable = ({ data, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Companies</h1>
            <h1 className="pr-2">Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['Company', 'Website', 'Bio']}
      headingColor="bg-primary"
      showCheckbox
      className={className}
      columnKeys={['company', 'website', 'bio']}
      data={data}
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-primary text-white">SUSPEND SELECTED</button>
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="rounded-l-lg hover:bg-primary"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="hover:bg-primary"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="rounded-r-lg hover:bg-primary"
            />
          </div>
        </div>
      }
    />
  );
};

RegisteredCompaniesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      profilePicture: PropTypes.string,
      company: PropTypes.string,
      website: PropTypes.string,
      bio: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default RegisteredCompaniesTable;
