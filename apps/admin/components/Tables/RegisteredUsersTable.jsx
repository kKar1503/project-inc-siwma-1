import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
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
    company: e.companyid,
    mobileNumber: e.phone,
  }));

const supabase = CreateSupabaseClient();

const RegisteredUsersTable = ({ className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => supabase.from('users').select('*'),
  });

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
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
      data={isLoading ? undefined : parseData(data.data)}
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-primary text-white">DEACTIVATE SELECTED</button>
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="rounded-l-lg hover:bg-primary"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              styles="hover:bg-primary"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="rounded-r-lg hover:bg-primary"
            />
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
