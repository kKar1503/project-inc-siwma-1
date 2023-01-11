import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';

// This table shows a preview of Company Profiles and is built on the BaseTable component.

const CompanyProfilesPreviewTable = ({ data }) => {
  // For Search Support
  const [displayData, setDisplayData] = useState(data); // Data to be displayed in the table
  const [searchTerm, setSearchTerm] = useState('');

  useMemo(() => {
    setDisplayData(data.filter((row) => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      return row.name.toLowerCase().includes(lowerCaseTerm) || 
      (row.website !== undefined && row.website.toLowerCase().includes(lowerCaseTerm));
    }))
  }, [data, searchTerm]);

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Company Profiles Preview</h1>
            <h1 className="pr-2">Processed {data.length} company profiles from selected file</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
            </select>
            <SearchBar value={searchTerm} setValue={setSearchTerm} placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['Company', 'Website']}
      headingColor="bg-primary"
      showCheckbox
      columnKeys={['name', 'website']}
      data={displayData}
    />
  );
};

CompanyProfilesPreviewTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      website: PropTypes.string,
    })
  ),
};

export default CompanyProfilesPreviewTable;
