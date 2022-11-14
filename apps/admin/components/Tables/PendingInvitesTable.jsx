import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import CreateSupabaseClient from '../../utils/supabase';

// This table shows Pending Invites and is built on the BaseTable component.

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    name: e.name,
    company: e.company,
    email: e.email,
  }));

const supabase = CreateSupabaseClient();

const PendingInvitesTable = ({ className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: async () => supabase.from('invite').select('*'),
  });

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Pending Invites</h1>
            <h1 className="pr-2">Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
            </select>
            <SearchBar placeholder="Search by e-mail" />
          </div>
        </div>
      }
      headings={['Name', 'Company', 'E-mail']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'company', 'email']}
      data={isLoading ? undefined : parseData(data.data)}
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-warning text-white">REVOKE SELECTED</button>
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              className="rounded-l-lg hover:bg-warning"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              className="hover:bg-warning"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              className="rounded-r-lg hover:bg-warning"
            />
          </div>
        </div>
      }
    />
  );
};

PendingInvitesTable.propTypes = {
  className: PropTypes.string,
};

export default PendingInvitesTable;
