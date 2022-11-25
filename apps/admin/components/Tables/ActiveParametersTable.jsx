import { useQuery } from 'react-query';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseTableParam from './BaseTableParam';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../supabaseClient';

// This table shows Active Parameters and is built on the BaseTable component.

const parseData = (data) => {
  if (data.length !== 0) {
    return data.map((e) => ({
      id: e.parameter.id,
      name: e.parameter.name,
      display_name: e.parameter.display_name,
      parameter_type_id: e.parameter.parameter_type.id,
      parameter_type_name: e.parameter.parameter_type.name,
      datatype_id: e.parameter.datatype.id,
      datatype_name: e.parameter.datatype.name,
      active: e.parameter.active ? `Active` : `Disabled`,
    }));
  }
  return [];
};

const ActiveParametersTable = ({ className, id }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ['activeParameters', id],
    queryFn: async () =>
      supabase
        .from('categories_parameters')
        .select(
          `category(name), parameter(id, name, display_name, parameter_type(id, name), datatype(id, name), active)`
        )
        .eq('category(id)', `${id}`),
    enabled: !!id,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['activeParameters'],
    queryFn: async () =>
      supabase
        .from('categories_parameters')
        .select(
          `category(name), parameter(id, name, display_name, parameter_type(id, name), datatype(id, name))`
        )
        .eq('category(id)', `1`),
    // .eq('category(id)', `${id}`),
  });

  useEffect(() => {
    refetch();
  });
  return (
    <BaseTableParam
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
      headings={['Parameter Name', 'Display Name', 'Parameter Type', 'Data type', 'Active']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'display_name', 'parameter_type_name', 'datatype_name', 'active']}
      data={isLoading || id === undefined ? undefined : parseData(data?.data)}
      table="Active"
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
