import React, { useState, useContext } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTableParam } from './BaseTableParam';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

const parseData = (data) => {
  if (data.length !== 0) {
    return data.map((e) => ({
      id: e.id,
      name: e.name,
      display_name: e.display_name,
      parameter_type_id: e.parameter_type.id,
      parameter_type_name: e.parameter_type.name,
      datatype_id: e.datatype.id,
      datatype_name: e.datatype.name,
      active: e.active ? `Active` : `Disabled`,
    }));
  }
  return [];
};

const ExistingParameters = ({ className, id }) => {
  const paginationValues = [5, 10, 20, 30];
  const [selectedActiveParam, setSelectedActiveParam] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [option, setOption] = useState(paginationValues[0]);
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [paramQuery, paramCountQuery] = useQueries([
    {
      queryKey: [
        'existingParams',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
      ],
      queryFn: async () =>
        supabase
          .from('parameter')
          .select(
            `id, name, display_name, parameter_type(id, name), datatype(id, name), active`
          )
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getExistingParamCount'],
      queryFn: async () =>
        supabase
          .from('parameter')
          .select('*', { count: 'exact', head: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const archiveParam = async () => {
    const ids = [];
    selectedActiveParam.map((e) => ids.push(e.id));
    await supabase
      .from('parameter')
      .update({
        active: false,
      })
      .in('id', ids);
    await supabase
      .from('categories_parameters')
      .delete()
      .eq('category', id)
      .filter('parameter', 'in', `(${ids.toString()})`);
    setSelectedActiveParam([]);
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    queryClient.invalidateQueries({ queryKey: ['existingParameters'] });
    queryClient.invalidateQueries({ queryKey: ['getExistingParamCount'] });
  };

  const existingParamCount =
    paramCountQuery.isLoading || paramCountQuery.data === undefined
      ? 0
      : paramCountQuery.data.count;

  const archiveParameter = async () => {
    const ids = [];
    selectedActiveParam.map((e) => ids.push(e.id));
    await supabase
      .from('parameter')
      .update({
        active: false,
      })
      .in('id', ids);
    setSelectedActiveParam(selectedActiveParam.map((e) => ({ ...e, active: 'Disabled' })));
    queryClient.invalidateQueries({ queryKey: ['existingParams'] });
  };

  const unarchiveParameter = async () => {
    const ids = [];
    selectedActiveParam.map((e) => ids.push(e.id));
    await supabase
      .from('parameter')
      .update({
        active: true,
      })
      .in('id', ids);
    setSelectedActiveParam(selectedActiveParam.map((e) => ({ ...e, active: 'Active' })));
    queryClient.invalidateQueries({ queryKey: ['existingParams'] });
  };

  const renderTableButtons = () => {
    const tableButtons = [];
    if (paramQuery.isLoading) {
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
    const count = existingParamCount / option;
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
    if (!selected && selectedActiveParam.find((user) => user.id === targetUser.id)) {
      const result = [...selectedActiveParam].filter((user) => user.id !== targetUser.id);
      setSelectedActiveParam(result);
    }

    if (selected && !selectedActiveParam.find((user) => user.id === targetUser.id)) {
      const result = [...selectedActiveParam];
      result.push(targetUser);
      setSelectedActiveParam(result);
    }
  };

  const checkInput = (type) => {
    if (type === 'Active') {
      return selectedActiveParam.every(
        (e) =>
          e.active === 'Disabled' ||
          (!selectedActiveParam.every((parameter) => parameter.active === 'Disabled') &&
            !selectedActiveParam.every((parameter) => parameter.active === 'Active'))
      );
    }
    if (type === 'Disabled') {
      return selectedActiveParam.every(
        (e) =>
          e.active === 'Active' ||
          (!selectedActiveParam.every((parameter) => parameter.active === 'Disabled') &&
            !selectedActiveParam.every((parameter) => parameter.active === 'Active'))
      );
    }

    return false;
  };

  return (
    <BaseTableParam
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">All parameters</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > existingParamCount
                ? existingParamCount
                : (selectedIndex + 1) * option}{' '}
              of {existingParamCount} entries
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
      headings={['Parameter Name', 'Display Name', 'Parameter Type', 'Data type', 'Active']}
      headingColor="bg-success"
      showCheckbox
      className={className}
      columnKeys={['name', 'display_name', 'parameter_type_name', 'datatype_name', 'active']}
      onChange={onChangeHandler}
      data={
        paramQuery.isLoading || paramQuery.data === undefined
          ? undefined
          : parseData(paramQuery.data?.data)
      }
      table="Active"
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex gap-4">
            <button
              className="btn btn-primary text-white"
              onClick={archiveParameter}
              disabled={paramQuery.isLoading || checkInput('Active')}
            >
              DEACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={unarchiveParameter}
              disabled={paramQuery.isLoading || checkInput('Disabled')}
            >
              ACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              disabled={
                paramQuery.isLoading ||
                selectedActiveParam.length > 1 ||
                selectedActiveParam.length === 0
              }
            >
              <Link
                href={`/parameter/${
                  selectedActiveParam.length === 0 ? undefined : selectedActiveParam[0].id
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
  id: PropTypes.string,
};

export default ExistingParameters;
