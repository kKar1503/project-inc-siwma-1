import React, { useEffect, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import pic from '../../public/avatar.png';
import TablePagination from './TablePagination';

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
  const supabase = useSupabaseClient();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [usersQuery, userCountQuery] = useQueries([
    {
      queryKey: ['getUsers', selectedIndex * 10, (selectedIndex + 1) * 10 - 1],
      queryFn: async () =>
        supabase
          .from('users')
          .select(`id, email, fullname, phone, companies:companyid(name), enabled`)
          .range(selectedIndex * 10, (selectedIndex + 1) * 10 - 1)
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

  const queries = [usersQuery, userCountQuery];

  const isLoading = queries.some((e) => e.isLoading);

  const userCount = userCountQuery.isLoading ? 0 : userCountQuery.data.count;

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * 10 + 1} to{' '}
              {(selectedIndex + 1) * 10 > userCount ? userCount : (selectedIndex + 1) * 10} of{' '}
              {userCount} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number', 'Status']}
      headingColor="bg-success"
      className={className}
      showCheckbox={false}
      columnKeys={['name', 'email', 'company', 'mobileNumber', 'enabled']}
      data={usersQuery.isLoading ? undefined : parseData(usersQuery.data?.data)}
      footer={
        <div className="flex justify-end bg-none">
          <div className="flex justify-end bg-none">
            {
              // Table pagination buttons
              <TablePagination
                rows={userCount}
                rowsPerPage={10}
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                className="bg-success"
                selectedColor="bg-success"
                isLoading={isLoading}
              />
            }
          </div>
        </div>
      }
    />
  );
};

RegisteredUsersTable.propTypes = {
  className: PropTypes.string,
};

export default RegisteredUsersTable;
