import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import CreateSupabaseClient from '../../utils/supabase';

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
  const supabase = CreateSupabaseClient();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [option, setOption] = useState(paginationValues[0]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [option]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['invites'],
    queryFn: async () => supabase.from('invite').select(`id, name, companies:company(name), email`),
  });

  const revokeInvites = async () => {
    await supabase.from('invite').delete().match({ id: '7' });
    refetch();
  };

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
            <h1 className="font-bold text-xl">Pending Invites</h1>
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
            <SearchBar placeholder="Search by e-mail" />
          </div>
        </div>
      }
      headings={['Name', 'Company', 'E-mail']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'company', 'email']}
      data={
        isLoading
          ? undefined
          : parseData(data.data.slice(selectedIndex * option, (selectedIndex + 1) * option))
      }
      footer={
        <div className="flex justify-between bg-none">
          <button className="btn btn-warning text-white" onClick={revokeInvites}>
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
