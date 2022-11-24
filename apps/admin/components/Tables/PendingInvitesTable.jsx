import React, { useState, useEffect } from 'react';
import { useQueries } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../pages/api/supabase';

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    name: e.name,
    company: e.companies.name,
    email: e.email,
  }));

// This table shows Pending Invites and is built on the BaseTable component.
const PendingInvitesTable = ({ className }) => {
  const paginationValues = [10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedInvites, setSelectedInvites] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);

  const [inviteQuery, inviteCountQuery] = useQueries([
    {
      queryKey: ['getInvites'],
      queryFn: async () =>
        supabase
          .from('invite')
          .select(`id, name, companies:company(name), email`)
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1),
    },
    {
      queryKey: ['getInviteCount'],
      queryFn: async () => supabase.from('invite').select('*', { count: 'exact' }),
    },
  ]);

  const inviteCount =
    inviteCountQuery.isLoading || !inviteCountQuery.data ? 0 : inviteCountQuery.data.count;

  useEffect(() => {
    setSelectedIndex(0);
  }, [option]);

  useEffect(() => {
    inviteQuery.refetch();
  });

  const revokeInvites = async () => {
    await supabase
      .from('invite')
      .delete()
      .in(
        'id',
        selectedInvites.map((e) => e.id)
      );
    inviteQuery.refetch();
  };

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

  const renderTableButtons = () => {
    const tableButtons = [];
    if (inviteQuery.isLoading) {
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
    const count = inviteCount / option;
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
    return tableButtons;
  };
  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Pending Invites</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > inviteCount
                ? inviteCount
                : (selectedIndex + 1) * option}{' '}
              of {inviteCount} entries
            </h1>
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
            <SearchBar placeholder="Search by e-mail" />
          </div>
        </div>
      }
      headings={['Name', 'Company', 'E-mail']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'company', 'email']}
      onChange={onChangeHandler}
      data={inviteQuery.isLoading ? undefined : parseData(inviteQuery?.data.data)}
      footer={
        <div className="flex justify-between bg-none">
          <button
            className="btn btn-warning text-white"
            onClick={revokeInvites}
            disabled={inviteQuery.isLoading || selectedInvites.length === 0}
          >
            REVOKE SELECTED
          </button>
          <div className="flex justify-end bg-none">{renderTableButtons()}</div>
        </div>
      }
    />
  );
};

PendingInvitesTable.propTypes = {
  className: PropTypes.string,
};

export default PendingInvitesTable;
