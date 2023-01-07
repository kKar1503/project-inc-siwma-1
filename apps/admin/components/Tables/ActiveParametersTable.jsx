import React, { useState, useContext } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTableParameter } from './BaseTableParameter';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import DataContext from '../../DataContext';

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

const ExistingCategories = ({ className, id }) => {
  const { paramIds, setParamIds, options, setOptions } = useContext(DataContext);
  const paginationValues = [5, 10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAvailParam, setSelectedAvailParam] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [paramQuery, paramCountQuery] = useQueries([
    {
      queryKey: [
        'activeParameters',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
        id,
      ],
      queryFn: async () =>
        supabase
          .from('categories_parameters')
          .select(
            `category(name), parameter(id, name, display_name, parameter_type(id, name), datatype(id, name), active)`
          )
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1)
          .eq('category(id)', `${id}`),
      enabled: !!id,
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getActiveParamCount', id],
      queryFn: async () =>
        supabase
          .from('categories_parameters')
          .select('*', { count: 'exact', head: true })
          .eq('category(id)', `${id}`),
      enabled: !!id,
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const archiveCategory = async () => {
    await supabase
      .from('category')
      .update({
        active: false,
      })
      .eq(
        'id',
        selectedAvailParam.map((e) => e.id)
      );
    setSelectedAvailParam(selectedAvailParam.map((e) => ({ ...e, active: 'Disabled' })));
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const unarchiveCategory = async () => {
    await supabase
      .from('category')
      .update({
        active: true,
      })
      .eq(
        'id',
        selectedAvailParam.map((e) => e.id)
      );
    setSelectedAvailParam(selectedAvailParam.map((e) => ({ ...e, active: 'Active' })));
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const availParamCount =
    paramCountQuery.isLoading || paramCountQuery.data === undefined
      ? 0
      : paramCountQuery.data.count;

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
    const count = availParamCount / option;
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
    if (!selected && selectedAvailParam.find((user) => user.id === targetUser.id)) {
      const result = [...selectedAvailParam].filter((user) => user.id !== targetUser.id);
      setSelectedAvailParam(result);
    }

    if (selected && !selectedAvailParam.find((user) => user.id === targetUser.id)) {
      const result = [...selectedAvailParam];
      result.push(targetUser);
      setSelectedAvailParam(result);
    }
    if (selected) {
      const newOptions = [...options, targetUser.id];
      setOptions(newOptions);
      setParamIds({ options: newOptions, table: 'Active' });
      console.log(options);
      console.log(paramIds);
    } else {
      const newOptions = options.filter((ops) => ops !== targetUser.id);
      setOptions(newOptions);
      if (newOptions.length !== 0) {
        setParamIds({ options: newOptions, table: 'Active' });
      } else {
        setOptions([]);
        setParamIds(undefined);
      }
    }
  };

  const checkInput = (type) => {
    if (type === 'Active') {
      return selectedAvailParam.every(
        (e) =>
          e.active === 'Disabled' ||
          (!selectedAvailParam.every((category) => category.active === 'Disabled') &&
            !selectedAvailParam.every((category) => category.active === 'Active'))
      );
    }
    if (type === 'Disabled') {
      return selectedAvailParam.every(
        (e) =>
          e.active === 'Active' ||
          (!selectedAvailParam.every((category) => category.active === 'Disabled') &&
            !selectedAvailParam.every((category) => category.active === 'Active'))
      );
    }
    return false;
  };

  return (
    <BaseTableParameter
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > availParamCount
                ? availParamCount
                : (selectedIndex + 1) * option}{' '}
              of {availParamCount} entries
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
              onClick={archiveCategory}
              disabled={paramQuery.isLoading || checkInput('Active')}
            >
              DEACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={unarchiveCategory}
              disabled={paramQuery.isLoading || checkInput('Disabled')}
            >
              ACTIVATE SELECTED
            </button>
          </div>

          <div className="flex justify-end bg-none">{renderTableButtons()}</div>
        </div>
      }
    />
  );
};

ExistingCategories.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default ExistingCategories;
