import React, { useEffect, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import pic from '../../public/avatar.png';
import supabase from '../../pages/api/supabase';

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    profilePicture: pic,
    name: e.fullname,
    email: e.email,
    company: e.companies.name,
    mobileNumber: e.phone,
    enabled: e.enabled === 0 ? `Suspended` : `Activated`,
  }));

// This table shows Registered Users and is built on the BaseTable component.
const RegisteredUsersTable = ({ className }) => {
  const queryClient = useQueryClient();
  const paginationValues = [10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);

  const [usersQuery, userCountQuery] = useQueries([
    {
      queryKey: [
        'getUsers',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
      ],
      queryFn: async () =>
        supabase
          .from('users')
          .select(`id, email, fullname, phone, companies:companyid(name), enabled`)
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1)
          .order('fullname', { ascending: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getUserCount'],
      queryFn: async () => supabase.from('users').select('*', { count: 'exact', head: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const userCount = userCountQuery.isLoading ? 0 : userCountQuery.data.count;

  useEffect(() => {
    setSelectedIndex(0);
  }, [option]);

  const suspendUsers = async () => {
    await supabase
      .from('users')
      .update({ enabled: 0 })
      .in(
        'id',
        selectedUsers.map((e) => e.id)
      );
    setSelectedUsers(selectedUsers.map((e) => ({ ...e, enabled: 'Suspended' })));
    queryClient.invalidateQueries();
  };

  const activateUsers = async () => {
    await supabase
      .from('users')
      .update({ enabled: 1 })
      .in(
        'id',
        selectedUsers.map((e) => e.id)
      );
    setSelectedUsers(selectedUsers.map((e) => ({ ...e, enabled: 'Activated' })));
    queryClient.invalidateQueries();
  };

  const onChangeHandler = (targetUser, selected) => {
    if (!selected && selectedUsers.find((user) => user.id === targetUser.id)) {
      const result = [...selectedUsers].filter((user) => user.id !== targetUser.id);
      setSelectedUsers(result);
    }

    if (selected && !selectedUsers.find((user) => user.id === targetUser.id)) {
      const result = [...selectedUsers];
      result.push(targetUser);
      setSelectedUsers(result);
    }
  };

  const checkInput = (type) => {
    if (type === 'Activated') {
      return selectedUsers.every(
        (e) =>
          e.enabled === 'Suspended' ||
          (!selectedUsers.every((user) => user.enabled === 'Suspended') &&
            !selectedUsers.every((user) => user.enabled === 'Activated'))
      );
    }
    if (type === 'Suspended') {
      return selectedUsers.every(
        (e) =>
          e.enabled === 'Activated' ||
          (!selectedUsers.every((user) => user.enabled === 'Suspended') &&
            !selectedUsers.every((user) => user.enabled === 'Activated'))
      );
    }
    return false;
  };

  const renderTableButtons = () => {
    const tableButtons = [];
    if (usersQuery.isLoading) {
      return (
        <TableButton
          index={0}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-primary"
          className="rounded-lg hover:bg-primary"
          disabled
        />
      );
    }
    const count = userCount / option;
    for (let i = 0; i < count; i++) {
      tableButtons.push(
        <TableButton
          index={i}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-primary"
          className={cx('hover:bg-primary', {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i >= count - 1,
          })}
        />
      );
    }
    return tableButtons;
  };

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > userCount ? userCount : (selectedIndex + 1) * option}{' '}
              of {userCount} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select
              value={option}
              className="select select-bordered w-25"
              onChange={(e) => setOption(e.target.value)}
            >
              {paginationValues.map((value) => (
                <option value={value}>{value} per page</option>
              ))}
            </select>
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number', 'Status']}
      headingColor="bg-primary"
      showCheckbox
      className={className}
      columnKeys={['name', 'email', 'company', 'mobileNumber', 'enabled']}
      onChange={onChangeHandler}
      data={usersQuery.isLoading ? undefined : parseData(usersQuery.data?.data)}
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex gap-4">
            <button
              className="btn btn-primary text-white"
              onClick={suspendUsers}
              disabled={usersQuery.isLoading || checkInput('Activated')}
            >
              DEACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={activateUsers}
              disabled={usersQuery.isLoading || checkInput('Suspended')}
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

RegisteredUsersTable.propTypes = {
  className: PropTypes.string,
};

export default RegisteredUsersTable;
