import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BaseTableParameter } from './BaseTableParameter';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Available Parameters and is built on the BaseTable component.

const parseId = (data) => {
  if (data.length !== 0) {
    const array = [];
    data.forEach((e) => {
      array.push(e.parameter.id);
    });
    return array.toString();
  }
  return '0';
};

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    name: e.name,
    display_name: e.display_name,
    parameter_type_id: e.parameter_type.id,
    parameter_type_name: e.parameter_type.name,
    datatype_id: e.datatype.id,
    datatype_name: e.datatype.name,
    active: e.active ? `Active` : `Disabled`,
  }));

const AvailableParametersTable = ({ className, id }) => {
  const supabase = useSupabaseClient();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: parameters, isLoading } = useQuery({
    queryKey: ['categoryParameters', id],
    queryFn: async () =>
      supabase.from('categories_parameters').select(`parameter(id)`).eq('category(id)', `${id}`),
    enabled: !!id,
  });

  const params = isLoading || id === undefined ? undefined : parseId(parameters?.data);

  const { data, status } = useQuery({
    queryKey: ['availableParameters', params],
    queryFn: async () =>
      supabase
        .from('parameter')
        .select(`id, name, display_name, parameter_type(id, name), datatype(id, name), active`)
        .filter('id', 'not.in', `(${params})`),
    // The query will not execute until the userId exists
    enabled: !!params,
  });

  return (
    <BaseTableParameter
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Available Parameters</h1>
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
      data={status !== 'success' ? undefined : parseData(data?.data)}
      table="Available"
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

AvailableParametersTable.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default AvailableParametersTable;
