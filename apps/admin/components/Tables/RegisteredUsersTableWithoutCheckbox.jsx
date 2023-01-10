import React, { useState } from 'react';
import { useQueries } from 'react-query';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
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
  const [searchInput, setSearchInput] = useState('');

  const [usersQuery, userCountQuery] = useQueries([
    {
      queryKey: ['getUsers', selectedIndex * 10, { from: selectedIndex * 10, to: (selectedIndex + 1) * 9, matching: searchInput }],
      queryFn: async () =>
        supabase
          .from('users')
          .select(`id, email, fullname, phone, companies:companyid(name), enabled`)
          .ilike('fullname', `%${searchInput}%`)
          .range(selectedIndex * 10, (selectedIndex + 1) * 10 - 1)
          .order('fullname', { ascending: true }),
      keepPreviousData: true,
      refetchInterval: 60000,
    },
    {
      queryKey: ['getUserCount', { matching: searchInput }],
      queryFn: async () =>
        supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .ilike('fullname', `%${searchInput}%`),
      keepPreviousData: true,
      refetchInterval: 60000,
    },
  ]);

  const queries = [usersQuery, userCountQuery];

  const isLoading = queries.some((e) => e.isLoading);

  const userCount = userCountQuery.isLoading ? 0 : userCountQuery.data.count;

  if (selectedIndex > 0 && (selectedIndex + 1) * 10 > Math.ceil(userCount / 10) * 10)
    // It is out of bounds, set the selected index to be that of the last button
    setSelectedIndex(Math.floor(userCount / 10));

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            {isLoading ? (
              <h1 className="pr-2">Showing 0 to 0 of 0 entries</h1>
            ) : (
              <h1 className="pr-2">
                Showing {Math.min(selectedIndex * 10 + 1, userCount)} to{' '}
                {Math.min((selectedIndex + 1) * 10, userCount)} of {userCount} entries
              </h1>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by name" value={searchInput} setValue={setSearchInput} />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number', 'Status']}
      headingColor="bg-success"
      className={className}
      showCheckbox={false}
      columnKeys={['name', 'email', 'company', 'mobileNumber', 'enabled']}
      data={usersQuery.isLoading ? [] : parseData(usersQuery.data?.data)}
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
