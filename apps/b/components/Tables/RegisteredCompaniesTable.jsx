import React from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';

// This table shows Registered Companies and is built on the BaseTable component.

const RegisteredCompaniesTable = ({ data }) => (
  <BaseTable
    header={
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col pb-3">
          <h1 className="font-bold text-xl">Registered Companies</h1>
          <h1>Showing 1 to 10 of 100 entries</h1>
        </div>
        <div className="flex flex-row gap-4">
          <SearchBar placeholder="Search by e-mail" />
        </div>
      </div>
    }
    headings={['Company', 'Website', 'Bio']}
    headingColor="bg-primary"
    showCheckbox
    columnKeys={['company', 'website', 'bio']}
    data={data}
  />
);

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
};

export default RegisteredCompaniesTable;
