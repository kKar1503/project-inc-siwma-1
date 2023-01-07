import React, { useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTableParam } from './BaseTableParam';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

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

const ExistingParameters = ({ className }) => {
  const paginationValues = [5, 10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedParameter, setSelectedParameters] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [parameterQuery, parameterCountQuery] = useQueries([
    {
      queryKey: [
        'parameters',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
      ],
      queryFn: async () =>
        supabase
          .from('parameter')
          .select(`id, name, display_name, parameter_type(id, name), datatype(id, name)`)
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1)
          .order('name', { ascending: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getParameterCount'],
      queryFn: async () => supabase.from('parameter').select('*', { count: 'exact', head: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  // const archiveParameter = async () => {
  //   const ids = [];
  //   selectedParameter.map((e) => ids.push(e.id));
  //   await supabase
  //     .from('parameter')
  //     .update({
  //       active: false,
  //     })
  //     .in('id', ids);
  //   setSelectedParameters(selectedParameter.map((e) => ({ ...e, active: 'Disabled' })));
  //   queryClient.invalidateQueries({ queryKey: ['parameters'] });
  // };

  // const unarchiveParameter = async () => {
  //   const ids = [];
  //   selectedParameter.map((e) => ids.push(e.id));
  //   await supabase
  //     .from('parameter')
  //     .update({
  //       active: true,
  //     })
  //     .in('id', ids);
  //   setSelectedParameters(selectedParameter.map((e) => ({ ...e, active: 'Active' })));
  //   queryClient.invalidateQueries({ queryKey: ['parameters'] });
  // };

  const parameterCount =
    parameterCountQuery.isLoading || parameterCountQuery.data === undefined
      ? 0
      : parameterCountQuery.data.count;

  const renderTableButtons = () => {
    const tableButtons = [];
    if (parameterQuery.isLoading) {
      return (
        <TableButton
          index={0}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-warning"
          className="rounded-lg hover:bg-warning"
          disabled
        />
      );
    }
    const count = parameterCount / option;
    for (let i = 0; i < count; i++) {
      tableButtons.push(
        <TableButton
          index={i}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-warning"
          className={cx('hover:bg-warning', {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i >= count - 1,
          })}
        />
      );
    }
    return tableButtons;
  };

  const onChangeHandler = (targetUser, selected) => {
    if (!selected && selectedParameter.find((user) => user.id === targetUser.id)) {
      const result = [...selectedParameter].filter((user) => user.id !== targetUser.id);
      setSelectedParameters(result);
    }

    if (selected && !selectedParameter.find((user) => user.id === targetUser.id)) {
      const result = [...selectedParameter];
      result.push(targetUser);
      setSelectedParameters(result);
    }
    console.log(selectedParameter);
  };

  const checkInput = (type) => {
    if (type === 'Active') {
      return selectedParameter.every(
        (e) =>
          e.active === 'Disabled' ||
          (!selectedParameter.every((parameter) => parameter.active === 'Disabled') &&
            !selectedParameter.every((parameter) => parameter.active === 'Active'))
      );
    }
    if (type === 'Disabled') {
      return selectedParameter.every(
        (e) =>
          e.active === 'Active' ||
          (!selectedParameter.every((parameter) => parameter.active === 'Disabled') &&
            !selectedParameter.every((parameter) => parameter.active === 'Active'))
      );
    }
    return false;
  };

  return (
    <BaseTableParam
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Existing Categories</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > parameterCount
                ? parameterCount
                : (selectedIndex + 1) * option}{' '}
              of {parameterCount} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select
              value={option}
              className="select select-bordered w-25"
              onChange={(e) => {
                setOption(e.target.value);
              }}
            >
              {paginationValues.map((value) => (
                <option value={value}>{value} per page</option>
              ))}
            </select>
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['Parameter Name', 'Display Name', 'Parameter Type', 'Data type']}
      headingColor="bg-success"
      showCheckbox
      className={className}
      columnKeys={['name', 'description', 'active']}
      onChange={onChangeHandler}
      data={
        parameterQuery.isLoading || parameterQuery.data === undefined
          ? undefined
          : parseData(parameterQuery.data?.data)
      }
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex gap-4">
            {/* <button
              className="btn btn-primary text-white"
              onClick={archiveParameter}
              disabled={parameterQuery.isLoading || checkInput('Active')}
            >
              DEACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={unarchiveParameter}
              disabled={parameterQuery.isLoading || checkInput('Disabled')}
            >
              ACTIVATE SELECTED
            </button> */}
            <button
              className="btn btn-primary text-white"
              disabled={
                parameterQuery.isLoading ||
                selectedParameter.length > 1 ||
                selectedParameter.length === 0
              }
            >
              <Link
                href={`/parameter/${
                  selectedParameter.length === 0 ? undefined : selectedParameter[0].id
                }`}
              >
                Edit
              </Link>
            </button>
          </div>

          <div className="flex justify-end bg-none">{renderTableButtons()}</div>
        </div>
      }
    />
  );
};

ExistingParameters.propTypes = {
  className: PropTypes.string,
};

export default ExistingParameters;
