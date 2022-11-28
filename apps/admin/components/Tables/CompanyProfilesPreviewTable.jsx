import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows a preview of Company Profiles and is built on the BaseTable component.

const CompanyProfilesPreviewTable = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['Company', 'Website']}
      headingColor="bg-primary"
      showCheckbox
      columnKeys={['name', 'website']}
      data={data}
      footer={
        <div className="flex justify-end bg-none">
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
