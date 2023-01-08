import React, { useState } from 'react';
import { useQueries } from 'react-query';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TablePagination from './TablePagination';

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    name: e.name,
    company: e.companies.name,
    email: e.email,
  }));

// This table shows Pending Invites and is built on the BaseTable component.
const PendingInvitesTable = ({ className }) => {
  const supabase = useSupabaseClient();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedInvites, setSelectedInvites] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [inviteQuery, inviteCountQuery] = useQueries([
    {
      queryKey: [
        'getInvites',
        { from: selectedIndex * 10, to: (selectedIndex + 1) * 9, matching: searchInput },
      ],
      queryFn: async () =>
        supabase
          .from('invite')
          .select(`id, name, companies:company(name), email`)
          .ilike('name', `%${searchInput}%`)
          .range(selectedIndex * 10, (selectedIndex + 1) * 10 - 1),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getInviteCount', { matching: searchInput}],
      queryFn: async () =>
        supabase
          .from('invite')
          .select('*', { count: 'exact', head: true })
          .ilike('name', `%${searchInput}%`),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const queries = [inviteQuery, inviteCountQuery];

  const isLoading = queries.some((query) => query.isLoading);

  const inviteCount = isLoading ? 0 : inviteCountQuery.data.count;

  const onChangeHandler = (targetInvite, selected) => {
    if (!selected && selectedInvites.find((invite) => invite.id === targetInvite.id)) {
      const result = [...selectedInvites].filter((invite) => invite.id !== targetInvite.id);
      setSelectedInvites(result);
    }

    if (selected && !selectedInvites.find((invite) => invite.id === targetInvite.id)) {
      const result = [...selectedInvites];
      result.push(targetInvite);
      setSelectedInvites(result);
    }
  };

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Pending Invites</h1>
            {isLoading ? (
              <h1 className="pr-2">Showing 0 to 0 of 0 entries</h1>
            ) : (
              <h1 className="pr-2">
                Showing {Math.min(selectedIndex * 10 + 1, inviteCount)} to{' '}
                {Math.min((selectedIndex + 1) * 10, inviteCount)} of {inviteCount} entries
              </h1>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar
              placeholder="Search by e-mail"
              value={searchInput}
              setValue={setSearchInput}
            />
          </div>
        </div>
      }
      headings={['Name', 'Company', 'E-mail']}
      headingColor="bg-warning"
      className={className}
      showCheckbox={false}
      columnKeys={['name', 'company', 'email']}
      onChange={onChangeHandler}
      data={isLoading ? undefined : parseData(inviteQuery?.data.data)}
      footer={
        <div className="flex justify-end bg-none">
          {
            // Table pagination buttons
            <TablePagination
              rows={inviteCount}
              rowsPerPage={10}
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
              className="bg-warning"
              selectedColor="bg-warning"
              isLoading={isLoading}
            />
          }
        </div>
      }
    />
  );
};

PendingInvitesTable.propTypes = {
  className: PropTypes.string,
};

export default PendingInvitesTable;
