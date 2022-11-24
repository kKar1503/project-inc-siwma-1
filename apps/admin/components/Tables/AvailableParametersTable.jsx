import { useQuery } from 'react-query';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseTableCat from './BaseTableCat';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../supabaseClient';

// This table shows Available Parameters and is built on the BaseTable component.

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    active: e.active ? `Active` : `Disabled`,
  }));

const AvailableParametersTable = ({ className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => supabase.from('category').select(`id, name, datatype, active`),
  });

  useEffect(() => {
    refetch();
  });
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
      data={isLoading ? undefined : parseData(data?.data)}
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
  className: PropTypes.string,
};

export default AvailableParametersTable;
