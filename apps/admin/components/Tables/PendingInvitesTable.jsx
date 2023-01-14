import React, { useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import InviteActionMenu from './actionMenus/InviteActionMenu';

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
  const queryClient = useQueryClient();
  const paginationValues = [10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedInvites, setSelectedInvites] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);
  const [searchInput, setSearchInput] = useState('');

  const [inviteQuery, inviteCountQuery] = useQueries([
    {
      queryKey: [
        'getInvites',
        {
          from: selectedIndex * option,
          to: (selectedIndex + 1) * option - 1,
          matching: searchInput,
        },
      ],
      queryFn: async () =>
        supabase
          .from('invite')
          .select(`id, name, companies:company(name), email`)
          .or(`name.ilike.%${searchInput}%, email.ilike.%${searchInput}%)`)
          // .ilike('name', `%${searchInput}%`)
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getInviteCount', { matching: searchInput }],
      queryFn: async () =>
        supabase
          .from('invite')
          .select('*', { count: 'exact', head: true })
          .or(`name.ilike.%${searchInput}%, email.ilike.%${searchInput}%)`),
      // .ilike('name', `%${searchInput}%`)
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const inviteCount = inviteCountQuery.isLoading ? 0 : inviteCountQuery.data.count;

  const queries = [inviteQuery, inviteCountQuery];

  const isLoading = queries.some((query) => query.isLoading);

  const revokeInvites = async () => {
    await supabase
      .from('invite')
      .delete()
      .in(
        'id',
        selectedInvites.map((e) => e.id)
      );
    queryClient.invalidateQueries();
  };

  const resendInvite = async (id) => {
    await supabase
      .from('invite')
      .update(
        { expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) } // 7 days from now
      )
      .eq('id', id);
    queryClient.invalidateQueries();
  };

  const singleRevoke = async (id) => {
    await supabase.from('invite').delete().eq('id', id);
    queryClient.invalidateQueries();
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
    if (isLoading) {
      return (
        <TableButton
          index={0}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-warning"
          className="rounded-lg hover:bg-warning"
          disabled
        />
      );
    }
    const count = inviteCount / option;
    for (let i = 0; i < count; i++) {
      tableButtons.push(
        <TableButton
          index={i}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-warning"
          className={cx('hover:bg-warning', {
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
            {isLoading ? (
              <h1 className="pr-2">Showing 0 to 0 of 0 entries</h1>
            ) : (
              <h1 className="pr-2">
                Showing {Math.min(selectedIndex * option + 1, inviteCount)} to{' '}
                {Math.min((selectedIndex + 1) * option, inviteCount)} of {inviteCount} entries
              </h1>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select
              value={option}
              className="select select-bordered w-25"
              onChange={(e) => setOption(e.target.value)}
            >
              {paginationValues.map((value) => (
                <option value={value}>{value} per page</option>
              ))}
            </select>
            <SearchBar
              placeholder="Search by e-mail or name"
              value={searchInput}
              setValue={setSearchInput}
            />
          </div>
        </div>
      }
      headings={['Name', 'Company', 'E-mail']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'company', 'email']}
      onChange={onChangeHandler}
      actionMenu={<InviteActionMenu data={{}} onRevoke={singleRevoke} onResend={resendInvite} />}
      data={isLoading ? undefined : parseData(inviteQuery?.data.data)}
      footer={
        <div className="flex justify-between bg-none">
          <button
            className="btn btn-warning text-white"
            onClick={revokeInvites}
            disabled={isLoading || selectedInvites.length === 0}
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
