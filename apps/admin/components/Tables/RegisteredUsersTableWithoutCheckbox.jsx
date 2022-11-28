import React, { useEffect, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { HiDotsVertical } from 'react-icons/hi';
import { ImCheckmark, ImCross } from 'react-icons/im';
import Image from 'next/image';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import pic from '../../public/avatar.png';
import supabase from '../../pages/api/supabase';
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
    action: 1,
  }));

// This table shows Registered Users and is built on the BaseTable component.
const RegisteredUsersTable = ({ className }) => {
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

  const innerImage = (props) => (
    <div className="w-10 h-10 mr-4">
      <Image
        // remove later
        // eslint-disable-next-line react/prop-types
        src={props.row.original.profilePicture}
        alt="Profile Picture"
        layout="fill"
        width={100}
        height={100}
        className="rounded-full aspect-square object-cover"
      />
    </div>
  );

  const registeredUsersColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'profilePicture',
        Cell: innerImage,
      },
      {
        Header: 'USER',
        accessor: 'name',
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
      },
      {
        Header: 'COMPANY',
        accessor: 'company',
      },
      {
        Header: 'MOBILE NUMBER',
        accessor: 'mobileNumber',
      },
      {
        Header: 'VISIBLE',
        accessor: 'visible',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: (props) =>
          // eslint-disable-next-line react/destructuring-assignment, react/prop-types
          props.value === true ? (
            <ImCheckmark className="text-success" />
          ) : (
            <ImCross className="text-error" />
          ),
      },
    ],
    []
  );

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">Showing 1 to 10 of 100 entries</h1>
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
      columns={registeredUsersColumns}
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
