import { useQuery } from 'react-query';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseTableCat from './BaseTableCat';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../supabaseClient';

// This table shows Active Parameters and is built on the BaseTable component.

const parseData = (data) =>
  data.map((e) => ({
    id: e.parameter.id,
    name: e.parameter.name,
    display_name: e.parameter.description,
    parameter_type_id: e.parameter.parameter_type.id,
    parameter_type_name: e.parameter.parameter_type.name,
    datatype_id: e.parameter.datatype.id,
    datatype_name: e.parameter.datatype.name,
  }));

const ActiveParametersTable = ({ className, id }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['activeParameters', id],
    queryFn: async () =>
      supabase
        .from('categories_parameters')
        .select(
          `category(name), parameter(id, name, display_name, parameter_type(id, name), datatype(id, name))`
        )
        .eq('category(id)', `1`),
    // .eq('category(id)', `${id}`),
  });

  return (
    <BaseTableCat
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Active Parameters</h1>
            <h1>Showing 1 to 10 of X entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      }
      headings={['Parameter Name', 'Data type']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'parameter_type_name']}
      data={isLoading ? undefined : parseData(data?.data)}
      footer={
        <div className="flex justify-between bg-none">
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

ActiveParametersTable.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default ActiveParametersTable;
