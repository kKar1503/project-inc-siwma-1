import React, { useEffect, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Image from 'next/image';
import { HiDotsVertical } from 'react-icons/hi';
import { BaseTable } from './BaseTable';
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
  }));

// This table shows Registered Users and is built on the BaseTable component.
const RegisteredUsersTable = ({ className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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
        Header: 'ACTIONS',
        accessor: 'action',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: (props) => (
          <div className="flex items-center gap-2 dropdown dropdown-bottom dropdown-end">
            <button htmlFor="actionDropdown">
              <div>
                <HiDotsVertical />
              </div>
            </button>
            <ul
              id="actionDropdown"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button>Edit</button>
              </li>
              <li>
                <button>View More</button>
              </li>
            </ul>
          </div>
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
            <h1 className="pr-2">
              Showing {selectedIndex * 10 + 1} to{' '}
              {(selectedIndex + 1) * 10 > userCount ? userCount : (selectedIndex + 1) * 10} of{' '}
              {userCount} entries
            </h1>
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number', 'Status']}
      headingColor="bg-success"
      className={className}
      showCheckbox={false}
      columnKeys={registeredUsersColumns}
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
