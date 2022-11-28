import React, { useState, useEffect } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../pages/api/supabase';
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedInvites, setSelectedInvites] = useState([]);

  const [inviteQuery, inviteCountQuery] = useQueries([
    {
      queryKey: ['getInvites', selectedIndex * 10, (selectedIndex + 1) * 10 - 1],
      queryFn: async () =>
        supabase
          .from('invite')
          .select(`id, name, companies:company(name), email`)
          .range(selectedIndex * 10, (selectedIndex + 1) * 10 - 1),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getInviteCount'],
      queryFn: async () => supabase.from('invite').select('*', { count: 'exact', head: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const queries = [inviteQuery, inviteCountQuery];

  const isLoading = queries.some((query) => query.isLoading);

  const inviteCount = inviteCountQuery.isLoading ? 0 : inviteCountQuery.data.count;

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

  const pendingInvitesColumns = React.useMemo(
    () => [
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
    ],
    []
  );
  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Pending Invites</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * 10 + 1} to{' '}
              {(selectedIndex + 1) * 10 > inviteCount ? inviteCount : (selectedIndex + 1) * 10} of{' '}
              {inviteCount} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by e-mail" />
          </div>
        </div>
      }
      headings={['Name', 'Company', 'E-mail']}
      headingColor="bg-warning"
      className={className}
      showCheckbox={false}
      columnKeys={pendingInvitesColumns}
      onChange={onChangeHandler}
      data={inviteQuery.isLoading ? undefined : parseData(inviteQuery?.data.data)}
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
