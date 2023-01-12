import React, { useState, useContext } from 'react';
import { useQuery, useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTableParameter } from './BaseTableParameter';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import DataContext from '../../DataContext';

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

const ExistingCategories = ({ className, id }) => {
  const { paramIds, setParamIds, options, setOptions, selectedAvailParam, setSelectedAvailParam } =
    useContext(DataContext);
  const paginationValues = [5, 10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [option, setOption] = useState(paginationValues[0]);
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const { data: parameters, isLoading } = useQuery({
    queryKey: ['categoryParameters', id],
    queryFn: async () =>
      supabase.from('categories_parameters').select(`parameter(id)`).eq('category(id)', `${id}`),
    enabled: !!id,
  });

  const params = isLoading || id === undefined ? undefined : parseId(parameters?.data);
  const [paramQuery, paramCountQuery] = useQueries([
    {
      queryKey: [
        'availableParameters',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
        params,
      ],
      queryFn: async () =>
        supabase
          .from('parameter')
          .select(`id, name, display_name, parameter_type(id, name), datatype(id, name), active`)
          .filter('id', 'not.in', `(${params})`)
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1),

      enabled: !!params,
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getAvaliableParamCount', params],
      queryFn: async () =>
        supabase
          .from('parameter')
          .select('id, name, display_name, parameter_type(id, name), datatype(id, name), active', {
            count: 'exact',
            head: true,
          })
          .filter('id', 'not.in', `(${params})`),
      enabled: !!params,
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const archiveParam = async () => {
    const ids = [];
    selectedAvailParam.map((e) => ids.push(e.id));
    await supabase
      .from('parameter')
      .update({
        active: false,
      })
      .in('id', ids);
    setSelectedAvailParam(selectedAvailParam.map((e) => ({ ...e, active: 'Disabled' })));
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
    queryClient.invalidateQueries({ queryKey: ['getActiveParamCount'] });
    queryClient.invalidateQueries({ queryKey: ['getAvaliableParamCount'] });
  };

  const unarchiveParam = async () => {
    const ids = [];
    selectedAvailParam.map((e) => ids.push(e.id));
    await supabase
      .from('parameter')
      .update({
        active: true,
      })
      .in('id', ids);
    setSelectedAvailParam(selectedAvailParam.map((e) => ({ ...e, active: 'Active' })));
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
    queryClient.invalidateQueries({ queryKey: ['getActiveParamCount'] });
    queryClient.invalidateQueries({ queryKey: ['getAvaliableParamCount'] });
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
    console.log(selectedAvailParam);
    if (selected) {
      const newOptions = [...options, targetUser.id];
      setOptions(newOptions);
      setParamIds({ options: newOptions, table: 'Available' });
    } else {
      const newOptions = options.filter((ops) => ops !== targetUser.id);
      setOptions(newOptions);
      if (newOptions.length !== 0) {
        setParamIds({ options: newOptions, table: 'Available' });
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
            <h1 className="font-bold text-xl">Available Parameters</h1>
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
            {/* <SearchBar placeholder="Search by name" /> */}
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
      table="Available"
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex gap-4">
            <button
              className="btn btn-primary text-white"
              onClick={archiveParam}
              disabled={paramQuery.isLoading || checkInput('Active')}
            >
              DEACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={unarchiveParam}
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
