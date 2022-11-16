import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import pic from '../../public/avatar.png';
import CreateSupabaseClient from '../../utils/supabase';

// This table shows Registered Users and is built on the BaseTable component.

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    profilePicture: pic,
    name: e.fullname,
    email: e.email,
    company: e.companies.name,
    mobileNumber: e.phone,
  }));

const supabase = CreateSupabaseClient();

const RegisteredUsersTable = ({ className }) => {
  const paginationValues = [1, 2, 3];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [option, setOption] = useState(paginationValues[0]);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () =>
      supabase.from('users').select(`id, email, fullname, phone, companies:companyid(name)`),
  });

  const renderTableButtons = () => {
    const tableButtons = [];
    if (isLoading) return;
    const count = data.data.length / option;
    // eslint-disable-next-line no-plusplus
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
    // eslint-disable-next-line consistent-return
    return tableButtons;
  };

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">Showing 1 to 10 of {data?.data.length} entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select
              value={option}
              className="select select-bordered w-25"
              onChange={(e) => setOption(e.target.value)}
            >
              <option value={paginationValues[0]}>{paginationValues[0]} per page</option>
              <option value={paginationValues[1]}>{paginationValues[1]} per page</option>
              <option value={paginationValues[2]}>{paginationValues[2]} per page</option>
            </select>
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['User', 'E-mail', 'Company', 'Mobile Number']}
      headingColor="bg-primary"
      showCheckbox
      className={className}
      columnKeys={['name', 'email', 'company', 'mobileNumber']}
      data={
        isLoading
          ? undefined
          : parseData(data.data.slice(selectedIndex * option, (selectedIndex + 1) * option))
      }
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-primary text-white">DEACTIVATE SELECTED</button>
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
