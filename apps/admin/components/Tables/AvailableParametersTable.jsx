import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTableCat from './BaseTableCat';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Available Parameters and is built on the BaseTable component.

const AvailableParametersTable = ({ data, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BaseTableCat
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Categories</h1>
            <h1>Showing 1 to 10 of X entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      }
      headings={['Category Name', 'Category Description']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['categoryName', 'categoryDesc']}
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

AvailableParametersTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      categoryName: PropTypes.string,
      categoryDesc: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default AvailableParametersTable;
